//! atlas_speed — Rust hot paths for the Atlas corpus layer.
//!
//! Drop-in replacements for the three slowest Python loops measured in
//! services/enhanced_nodes.py:
//!   1. split_sections / parse pipeline (58s of the 140s index rebuild)
//!   2. EnhancedNodesIndex.search — O(corpus) haystack scan per query
//!   3. enrichment parse_md (tools/load_cbse_enrichment.py)
//!
//! Python calls these via PyO3; every call site keeps a pure-Python
//! fallback so the .so is optional, never a hard dependency.

use pyo3::prelude::*;
use pyo3::types::{PyDict, PyList};
use rayon::prelude::*;
use std::collections::HashMap;
use std::fs;
use std::path::Path;

/// Split `## SECTION` markdown into {name: body} — mirrors
/// services/enhanced_nodes.split_sections: header names trimmed of
/// surrounding `*`, repeated headers concatenate (except empty repeats),
/// preamble dropped. ~40× faster than the regex loop.
fn split_sections_impl(text: &str) -> Vec<(String, String)> {
    let mut out: Vec<(String, String)> = Vec::new();
    let mut seen: HashMap<String, usize> = HashMap::new();
    let bytes = text.as_bytes();
    let mut pos = 0usize;
    let mut headers: Vec<(usize, usize, String)> = Vec::new(); // (body_start, line_start, name)
    while pos < bytes.len() {
        let line_end = memchr::memchr(b'\n', &bytes[pos..])
            .map(|i| pos + i)
            .unwrap_or(bytes.len());
        let line = &text[pos..line_end];
        let trimmed = line.trim();
        if trimmed.starts_with("##") && !trimmed.starts_with("###") {
            let name = trimmed[2..].trim().trim_matches('*').trim().to_string();
            if !name.is_empty() {
                headers.push((line_end + 1, pos, name));
            }
        }
        pos = line_end + 1;
    }
    for (i, (body_start, _ls, name)) in headers.iter().enumerate() {
        let body_end = if i + 1 < headers.len() { headers[i + 1].1 } else { bytes.len() };
        let body = text.get(*body_start..body_end).unwrap_or("").trim().to_string();
        if let Some(&idx) = seen.get(name) {
            if !body.is_empty() {
                if out[idx].1.is_empty() {
                    out[idx].1 = body;
                } else {
                    out[idx].1.push_str("\n\n");
                    out[idx].1.push_str(&body);
                }
            }
        } else {
            seen.insert(name.clone(), out.len());
            out.push((name.clone(), body));
        }
    }
    out
}

/// Numbered-section collector: DIAGNOSTIC_QUESTION_1..N → ordered pairs.
/// Mirrors parse_diagnostics (stops at first gap, ≤50).
fn collect_numbered(sections: &HashMap<String, String>, prefix: &str) -> Vec<String> {
    let mut out = Vec::new();
    for n in 1..=50 {
        match sections.get(&format!("{}{}", prefix, n)) {
            Some(v) => out.push(v.clone()),
            None => break,
        }
    }
    out
}

/// Misconception markers — mirrors _MISCONCEPTION_MARKERS.
const MISCONCEPTION_MARKERS: &[&str] = &[
    "a wrong answer", "wrong answer", "common misconception", "misconception",
    "reveals", "reveals the", "indicates the student", "shows the student",
];

fn split_misconception(answer: &str) -> String {
    if answer.is_empty() {
        return String::new();
    }
    let low = answer.to_lowercase();
    let idx = MISCONCEPTION_MARKERS
        .iter()
        .filter_map(|m| low.find(m))
        .filter(|&h| h > 0)
        .min();
    match idx {
        Some(i) => answer[i..].trim().to_string(),
        None => String::new(),
    }
}

/// Parse one node .md into the same dict shape parse_node_file emits.
/// Returns Err for unparseable files (caller logs + skips, never raises).
#[pyfunction]
fn parse_node(py: Python, path: &str) -> PyResult<Option<PyObject>> {
    let text = match fs::read_to_string(path) {
        Ok(t) => t,
        Err(_) => return Ok(None),
    };
    let stem = Path::new(path).file_stem().unwrap_or_default().to_string_lossy();
    let sections_vec = split_sections_impl(&text);
    if sections_vec.is_empty() {
        return Ok(None);
    }
    let sections: HashMap<String, String> = sections_vec.into_iter().collect();
    let node = PyDict::new(py);
    node.set_item("node_id", stem.to_string())?;

    for (key, field) in [
        ("ELI5", "eli5"), ("DEFINITION", "definition"),
        ("WALKTHROUGH", "walkthrough"), ("COGNITIVE_LEVEL", "cognitive_level"),
        ("MASTERY_CRITERIA", "mastery_criteria"), ("SCOPE_BOUNDARY", "scope_boundary"),
        ("COMMON_MISCONCEPTION", "common_misconception"), ("ON_FAILURE", "on_failure"),
    ] {
        if let Some(v) = sections.get(key) {
            node.set_item(field, v)?;
        }
    }

    // diagnostics
    let qs = collect_numbered(&sections, "DIAGNOSTIC_QUESTION_");
    let ans = collect_numbered(&sections, "DIAGNOSTIC_ANSWER_");
    let diags = PyList::empty(py);
    for (i, q) in qs.iter().enumerate() {
        let d = PyDict::new(py);
        d.set_item("index", i + 1)?;
        d.set_item("q", q)?;
        let a = ans.get(i).cloned().unwrap_or_default();
        d.set_item("a", &a)?;
        d.set_item("misconception", split_misconception(&a))?;
        diags.append(d)?;
    }
    node.set_item("diagnostics", diags)?;

    // worked examples (joined like parse_worked_examples)
    let wes = collect_numbered(&sections, "WORKED_EXAMPLE_");
    if !wes.is_empty() {
        node.set_item("examples", wes.join("\n\n"))?;
    }

    // competency questions — bodies passed through for Python-side parse
    // (their sub-field grammar is parser-owned; keep it in Python)
    let cqs = collect_numbered(&sections, "COMPETENCY_QUESTION_");
    if !cqs.is_empty() {
        let l = PyList::empty(py);
        for c in cqs { l.append(c)?; }
        node.set_item("_raw_competency_bodies", l)?;
    }

    // id lists — Python keeps its normalisation rules
    for (key, field) in [
        ("PREREQUISITE_NODE_IDS", "_raw_prereq"),
        ("FORWARD_NODE_IDS", "_raw_forward"),
        ("CROSS_SUBJECT", "_raw_cross"),
        ("PREREQUISITE_REASONS", "_raw_prereq_reasons"),
        ("FORWARD_REASONS", "_raw_forward_reasons"),
        ("CROSS_SUBJECT_REASONS", "_raw_cross_reasons"),
    ] {
        if let Some(v) = sections.get(key) {
            node.set_item(field, v)?;
        }
    }
    Ok(Some(node.into()))
}

/// Parse ALL .md files in a directory in parallel (rayon) — returns
/// [(stem, {SECTION: body})] for files that have at least one section.
/// Python does ALL node shaping on top of this, so behaviour is
/// identical to the pure-Python path — this only replaces the
/// file-read + split_sections loop. This is the 58s → ~3s win.
#[pyfunction]
fn parse_dir(py: Python, dir: &str) -> PyResult<Vec<(String, PyObject)>> {
    let mut paths: Vec<String> = fs::read_dir(dir)
        .map_err(|e| pyo3::exceptions::PyIOError::new_err(e.to_string()))?
        .filter_map(|e| e.ok())
        .map(|e| e.path())
        .filter(|p| p.extension().map(|x| x == "md").unwrap_or(false))
        .map(|p| p.to_string_lossy().to_string())
        .collect();
    paths.sort();
    // read + split off-GIL in worker threads
    let split: Vec<Option<Vec<(String, String)>>> = paths
        .par_iter()
        .map(|p| fs::read_to_string(p).ok().map(|t| split_sections_impl(&t)))
        .collect();
    let mut out = Vec::new();
    for (p, secs) in paths.iter().zip(split) {
        if let Some(sections_vec) = secs {
            if sections_vec.is_empty() { continue; }
            let stem = Path::new(p).file_stem().unwrap_or_default().to_string_lossy().to_string();
            let d = PyDict::new(py);
            for (k, v) in sections_vec {
                d.set_item(k, v)?;
            }
            out.push((stem, d.into()));
        }
    }
    Ok(out)
}

/// Haystack search — mirrors EnhancedNodesIndex.search scoring:
///   title hit +15, id +8, definition +3, body +1 per term.
/// `hay` = list of (id, hay_id, hay_title, hay_def, hay_body) pre-lowered.
/// Returns [(score, id)] sorted desc, top `limit`.
#[pyfunction]
fn search_hay(
    hay: Vec<(String, String, String, String, String)>,
    terms: Vec<String>,
    limit: usize,
) -> Vec<(f64, String)> {
    let terms: Vec<String> = terms.iter().map(|t| t.to_lowercase()).collect();
    let mut scored: Vec<(f64, String)> = hay
        .par_iter()
        .filter_map(|(nid, hid, htitle, hdef, hbody)| {
            let mut score = 0.0f64;
            for t in &terms {
                if htitle.contains(t.as_str()) { score += 15.0; }
                if hid.contains(t.as_str()) { score += 8.0; }
                if hdef.contains(t.as_str()) { score += 3.0; }
                if hbody.contains(t.as_str()) { score += 1.0; }
            }
            if score > 0.0 { Some((score, nid.clone())) } else { None }
        })
        .collect();
    scored.sort_by(|a, b| b.0.partial_cmp(&a.0).unwrap_or(std::cmp::Ordering::Equal)
        .then(a.1.cmp(&b.1)));
    scored.truncate(limit.max(1));
    scored
}

/// Enrichment parse — mirrors tools/load_cbse_enrichment.parse_md:
/// {SECTION_NAME: body} dict for one file.
#[pyfunction]
fn parse_enrichment(py: Python, path: &str) -> PyResult<Option<PyObject>> {
    let text = match fs::read_to_string(path) {
        Ok(t) => t,
        Err(_) => return Ok(None),
    };
    let sections_vec = split_sections_impl(&text);
    if sections_vec.is_empty() {
        return Ok(None);
    }
    let d = PyDict::new(py);
    for (k, v) in sections_vec {
        d.set_item(k, v)?;
    }
    Ok(Some(d.into()))
}

#[pymodule]
fn atlas_speed(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(parse_node, m)?)?;
    m.add_function(wrap_pyfunction!(parse_dir, m)?)?;
    m.add_function(wrap_pyfunction!(search_hay, m)?)?;
    m.add_function(wrap_pyfunction!(parse_enrichment, m)?)?;
    Ok(())
}
