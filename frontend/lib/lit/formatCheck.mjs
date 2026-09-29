/**
 * formatCheck — deterministic writing-format checker (Atlas literature engine).
 *
 * Rubric beats ONLY: this module verifies the fixed structural scaffold of the
 * formats taught in the corpus (ICSE c9_eng_icse_01/02/03, c10_eng_icse_02;
 * CBSE writing-skills nodes) — addresses, date, salutation, subject, closing,
 * headings, bylines, word limits. It deliberately does NOT judge the quality,
 * grammar, style or truth of the prose: that is examiner territory, not a
 * deterministic engine's.
 *
 * Every beat carries present/absent + WHERE it was found (line number + the
 * matched snippet), so the UI can show the evidence, not just a tick.
 *
 * Deterministic: regex + line-position rules only. No network, no LLM,
 * no invented formats. Unknown formats are declined with the taught list.
 */
export const TAUGHT_FORMATS = [
    "formal_letter",
    "informal_letter",
    "article",
    "report",
    "notice",
    "story",
];
export const FORMAT_LABELS = {
    formal_letter: "Formal letter",
    informal_letter: "Informal letter",
    article: "Article",
    report: "Report",
    notice: "Notice",
    story: "Story",
};
// ─── taught limits + rubrics (from the corpus format nodes) ──────────────────
const WORD_LIMITS = {
    formal_letter: { min: 100, max: 150 },
    informal_letter: { min: 90, max: 150 },
    article: { min: 100, max: 150 },
    report: { min: 90, max: 150 },
    notice: { min: 30, max: 50 },
    story: { min: 120, max: 250 },
};
// ─── shared matchers ──────────────────────────────────────────────────────────
const RE = {
    date: /\b(\d{1,2}(st|nd|rd|th)?[\s.\-\/]?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[\s.,'\-\/]?\s*(\d{2,4})?|(\d{1,2})[\-\/.](\d{1,2})[\-\/.](\d{2,4}))\b/i,
    subject: /^(subject|sub|regarding|re)\s*[:\-\u2013\u2014]/i,
    salutationFormal: /^(respected|dear|most respected)\s+(sir|madam|sir\/madam|ma'am|principal|editor|manager)\b/i,
    salutationRespected: /^(respected|dear)\s+\S+/i,
    salutationInformal: /^(dear|hi|hey|hello|my dear)\s+[a-z]/i,
    closeFormal: /^(yours\s+(faithfully|sincerely|truly|respectfully)|respectfully\s+yours|thankfully\s+yours)/i,
    closeInformal: /^(with\s+(love|regards|best\s+wishes)|lots\s+of\s+love|yours\s+(lovingly|affectionately|loving|ever|friend)|your\s+(loving|friendly|friend|well[\s-]wisher|grandson|granddaughter|son|daughter|niece|nephew)|love,?|take\s+care|warm\s+regards|best\s+wishes)/i,
    byline: /^(by\s*:?\s*[A-Za-z]|name\s*:)/i,
    noticeHeading: /^notice\b\.?$/i,
    designation: /\b(secretary|head\s*girl|head\s*boy|principal|monitor|captain|president|vice[\s-]*president|treasurer|coordinator|coordinator|editor|warden|cultural\s+secretary|sports\s+captain|class\s+representative)\b/i,
    schoolTop: /\b(school|academy|vidyalaya|college|institute|public school|international school|convent)\b/i,
    placeDateLine: /^[A-Z][A-Za-z.\s']+\s*,\s*\d{1,2}[\s.\-\/]?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|[01]?\d)\b/i,
    addressish: /\b(\d+[\w\/]*\s|no\.?\s*\d|house|flat|plot|road|street|lane|nagar|colony|marg|sector|enclave|apartment|avenue|village|po\b|post|district|dist\.?|pin[\s-]?code|\d{6})/i,
    receiverRole: /^(the\s+(principal|headmaster|headmistress|editor|manager|librarian|director|secretary|warden|commissioner|mayor|dean|registrar|coordinator|teacher|class\s+teacher)|to\s+the\s|sir|madam)/i,
    datetimeRef: /\b(\d{1,2}[\s.\-\/]?(am|pm)|\d{1,2}(st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)|tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|on\s+\d|at\s+\d{1,2}[\s:.]?\d{0,2}\s*(am|pm)?|o'?clock)/i,
    whereRef: /\b(in the|at the|on the|auditorium|playground|ground|hall|library|classroom|lab|laboratory|room\s*\d|assembly|campus|stadium|venue|school premises)\b/i,
    pastLead: /\b(was|were|had|has been|have been|attended|held|organised|organized|conducted|celebrated|marked|took place|inaugurated|hosted|won|began|started|ended|gathered|participated|addressed|visited|launched|planted|donated|presented|awarded)\b/i,
    pastTense: /(\bwas\b|\bwere\b|\bhad\b|\b\w+ed\b)/i,
    presentTense: /(\bis\b|\bare\b|\bam\b|\bwill\b|\bshall\b|\b\w+s\b)/i,
};
function titleLike(line) {
    const t = line.trim();
    if (!t || t.length > 90)
        return false;
    if (t.split(/\s+/).length > 14)
        return false;
    if (RE.date.test(t) && !/^(the\s)?\d/.test(t))
        return false;
    return true;
}
function findLine(lines, lower, re, from = 0) {
    for (let i = from; i < lines.length; i++) {
        if (re.test(lower[i]))
            return [i + 1, clip(lines[i])];
    }
    return null;
}
function clip(s, n = 60) {
    const t = s.trim().replace(/\s+/g, " ");
    return t.length > n ? t.slice(0, n - 1) + "\u2026" : t;
}
function paragraphs(lines, fromIdx) {
    const paras = [];
    let cur = [];
    for (let i = fromIdx; i < lines.length; i++) {
        if (lines[i].trim() === "") {
            if (cur.length)
                paras.push(cur);
            cur = [];
        }
        else
            cur.push(lines[i]);
    }
    if (cur.length)
        paras.push(cur);
    return paras;
}
function tail(lines, n) {
    return lines.slice(Math.max(0, lines.length - n));
}
// ─── rubrics per format ───────────────────────────────────────────────────────
const RUBRICS = {
    formal_letter: [
        {
            name: "Sender's address",
            required: true,
            rule: "Top block: writer's address (street/colony/sector words or house no.) before the date (ICSE c10_eng_icse_02_001 skeleton).",
            test: (l, ix) => {
                const limit = Math.min(5, l.length);
                for (let i = 0; i < limit; i++) {
                    if (RE.date.test(l[i]))
                        break;
                    if (RE.addressish.test(l[i]))
                        return [i + 1, clip(l[i])];
                }
                return null;
            },
        },
        {
            name: "Date",
            required: true,
            rule: "A date line in the top half (e.g. 12 March 2025 / 12-03-2025).",
            test: (l, ix) => findLine(l, ix.lower, RE.date, 0) ?? findLine(l, ix.lower, RE.date, Math.floor(l.length / 2)),
        },
        {
            name: "Receiver's address",
            required: true,
            rule: "After the date: 'The Principal / The Editor …' or a recipient address block.",
            test: (l, ix) => {
                const dateLine = findLine(l, ix.lower, RE.date, 0);
                const from = dateLine ? dateLine[0] : 0;
                for (let i = from; i < Math.min(from + 5, l.length); i++) {
                    if (RE.receiverRole.test(l[i].trim()) || RE.addressish.test(l[i]))
                        return [i + 1, clip(l[i])];
                }
                return null;
            },
        },
        {
            name: "Subject line",
            required: true,
            rule: "A line beginning 'Subject:' / 'Sub:' before the salutation.",
            test: (l, ix) => findLine(l, ix.lower, RE.subject, 0),
        },
        {
            name: "Formal salutation",
            required: true,
            rule: "'Respected Sir/Madam' or 'Dear Sir/Madam' — never a first name in a formal letter.",
            test: (l, ix) => findLine(l, ix.lower, RE.salutationFormal, 0),
        },
        {
            name: "Body paragraphs",
            required: true,
            rule: "At least 2 body paragraphs between the salutation and the closing (intro → matter → conclusion).",
            test: (l, ix) => {
                const sal = findLine(l, ix.lower, RE.salutationFormal, 0);
                if (!sal)
                    return null; // no salutation → scaffold already broken there
                const close = findLine(l, ix.lower, RE.closeFormal, 0);
                const from = sal[0];
                const to = close ? close[0] - 1 : l.length;
                const paras = paragraphs(l.slice(0, Math.max(0, to)), from).filter((p) => p.join(" ").trim().length >= 20);
                return paras.length >= 2 ? [from + 2, paras.length + " body paragraphs"] : null;
            },
        },
        {
            name: "Complimentary close",
            required: true,
            rule: "'Yours faithfully' (name unknown) / 'Yours sincerely' (name known) at the end.",
            test: (l, ix) => {
                const t = tail(l, 5);
                const tl = t.map((s) => s.toLowerCase());
                const m = findLine(t, tl, RE.closeFormal, 0);
                return m ? [l.length - t.length + m[0], m[1]] : null;
            },
        },
        {
            name: "Signature / name",
            required: true,
            rule: "A signer name (and/or designation) after the complimentary close.",
            test: (l, ix) => {
                for (let i = l.length - 1; i >= 0; i--) {
                    const t = l[i].trim();
                    if (!t)
                        continue;
                    if (RE.closeFormal.test(t))
                        return null;
                    if (/^[A-Z][a-zA-Z.]+(\s+[A-Z][a-zA-Z.]*)*$/.test(t))
                        return [i + 1, clip(t)];
                }
                return null;
            },
        },
        {
            name: "Formal register",
            required: false,
            rule: "No casual openers ('Hey', 'Hi') in a formal letter (register rule, ICSE c10_eng_icse_02_002).",
            test: (l, ix) => {
                const bad = l.findIndex((x) => /^(hey|hi|yo|hellooo)\b/i.test(x.trim()));
                return bad === -1 ? [1, "no informal openers found"] : null;
            },
        },
    ],
    informal_letter: [
        {
            name: "Sender's address",
            required: false,
            rule: "Optional in ICSE informal letters (c10_eng_icse_02_001: 'the sender's address may be omitted').",
            test: (l, ix) => {
                const limit = Math.min(5, l.length);
                for (let i = 0; i < limit; i++) {
                    if (RE.date.test(l[i]))
                        break;
                    if (RE.addressish.test(l[i]))
                        return [i + 1, clip(l[i])];
                }
                return null;
            },
        },
        {
            name: "Date",
            required: true,
            rule: "A date line near the top.",
            test: (l, ix) => findLine(l, ix.lower, RE.date, 0),
        },
        {
            name: "Informal salutation",
            required: true,
            rule: "'Dear <name>' / 'Hi <name>' — a personal address, not 'Respected Sir'.",
            test: (l, ix) => findLine(l, ix.lower, RE.salutationInformal, 0),
        },
        {
            name: "Body paragraphs",
            required: true,
            rule: "At least 2 conversational paragraphs.",
            test: (l, ix) => {
                const sal = findLine(l, ix.lower, RE.salutationInformal, 0);
                if (!sal)
                    return null;
                const from = sal[0];
                const closeM = findLine(l, ix.lower, RE.closeInformal, 0);
                const to = closeM ? closeM[0] - 1 : l.length;
                const paras = paragraphs(l.slice(0, Math.max(0, to)), from).filter((p) => p.join(" ").trim().length >= 15);
                return paras.length >= 2 ? [from + 2, paras.length + " body paragraphs"] : null;
            },
        },
        {
            name: "Informal closing",
            required: true,
            rule: "'With love' / 'Yours lovingly' / 'Your friend' — an affectionate close, not 'Yours faithfully'.",
            test: (l, ix) => {
                const t = tail(l, 5);
                const tl = t.map((s) => s.toLowerCase());
                const m = findLine(t, tl, RE.closeInformal, 0);
                return m ? [l.length - t.length + m[0], m[1]] : null;
            },
        },
        {
            name: "Signature / name",
            required: true,
            rule: "The writer's first name at the end.",
            test: (l, ix) => {
                for (let i = l.length - 1; i >= 0; i--) {
                    const t = l[i].trim();
                    if (!t)
                        continue;
                    if (RE.closeInformal.test(t))
                        return null;
                    if (/^[A-Z][a-z]+$/.test(t))
                        return [i + 1, clip(t)];
                }
                return null;
            },
        },
        {
            name: "No formal apparatus",
            required: false,
            rule: "Informal letters drop the subject line and 'Respected Sir/Madam' (register contrast taught in the corpus).",
            test: (l, ix) => {
                const hasSubject = findLine(l, ix.lower, RE.subject, 0);
                const hasRespected = findLine(l, ix.lower, /^respected\b/i, 0);
                return !hasSubject && !hasRespected ? [1, "no subject line / formal salutation present"] : null;
            },
        },
    ],
    article: [
        {
            name: "Title",
            required: true,
            rule: "A heading line (short, no address/date scaffolding).",
            test: (l, ix) => (l[0] && titleLike(l[0]) ? [1, clip(l[0])] : null),
        },
        {
            name: "Byline",
            required: true,
            rule: "'By <name>' under the title.",
            test: (l, ix) => findLine(l, ix.lower, RE.byline, 0),
        },
        {
            name: "Intro paragraph",
            required: true,
            rule: "An opening paragraph that states the topic (first ¶ after the byline).",
            test: (l, ix) => {
                const by = findLine(l, ix.lower, RE.byline, 0);
                const from = by ? by[0] : 1;
                const paras = paragraphs(l, from - 1).filter((p) => p.join(" ").trim().length >= 25);
                return paras.length >= 1 ? [from + 1, clip(paras[0].join(" "), 50)] : null;
            },
        },
        {
            name: "Body development",
            required: true,
            rule: "At least one further paragraph developing the argument/description.",
            test: (l, ix) => {
                const by = findLine(l, ix.lower, RE.byline, 0);
                const from = by ? by[0] : 1;
                const paras = paragraphs(l, from - 1).filter((p) => p.join(" ").trim().length >= 25);
                return paras.length >= 2 ? [from + 2, (paras.length - 1) + " development paragraph(s) after the intro"] : null;
            },
        },
        {
            name: "Conclusion paragraph",
            required: true,
            rule: "A closing paragraph present (structural check only — the engine does not judge whether it reads conclusive).",
            test: (l, ix) => {
                const paras = paragraphs(l, 0);
                const lastP = paras.length ? paras[paras.length - 1] : [];
                return lastP.length && lastP.join(" ").trim().length >= 15
                    ? [l.length - lastP.length + 1, clip(lastP.join(" "), 50)]
                    : null;
            },
        },
    ],
    report: [
        {
            name: "Headline",
            required: true,
            rule: "A heading line announcing the event (short, headline-like).",
            test: (l, ix) => (l[0] && titleLike(l[0]) ? [1, clip(l[0])] : null),
        },
        {
            name: "Byline",
            required: true,
            rule: "'By <name>' (the reporter).",
            test: (l, ix) => findLine(l, ix.lower, RE.byline, 0),
        },
        {
            name: "Place–date line",
            required: true,
            rule: "'City, 14 November 2024:' opening the lead (newspaper report convention).",
            test: (l, ix) => {
                const m = findLine(l, ix.lower, RE.placeDateLine, 0);
                if (m)
                    return m;
                // place + date on the first body line but not line-initial
                const dl = findLine(l, ix.lower, RE.date, 0);
                if (dl && /\,[^\n]*\d/.test(l[dl[0] - 1]))
                    return dl;
                return null;
            },
        },
        {
            name: "Past-tense lead",
            required: true,
            rule: "The lead reports in past tense (was/were/-ed event verbs).",
            test: (l, ix) => {
                for (let i = 0; i < l.length; i++) {
                    const t = l[i].trim();
                    if (!t || titleLike(t) || RE.byline.test(t))
                        continue;
                    if (RE.pastLead.test(t))
                        return [i + 1, clip(t)];
                }
                return null;
            },
        },
        {
            name: "Body paragraphs",
            required: true,
            rule: "At least 2 paragraphs after the lead (details → remarks/aftermath).",
            test: (l, ix) => {
                const paras = paragraphs(l, 0).filter((p) => p.join(" ").trim().length >= 25);
                return paras.length >= 2 ? [2, paras.length + " paragraphs total"] : null;
            },
        },
    ],
    notice: [
        {
            name: "Issuing body",
            required: true,
            rule: "The school/organisation name at the top (notice layout, ICSE c9_eng_icse_03).",
            test: (l, ix) => {
                for (let i = 0; i < Math.min(3, l.length); i++) {
                    if (RE.schoolTop.test(l[i]))
                        return [i + 1, clip(l[i])];
                }
                return null;
            },
        },
        {
            name: "'NOTICE' heading",
            required: true,
            rule: "The word NOTICE as its own heading line.",
            test: (l, ix) => findLine(l, ix.lower, RE.noticeHeading, 0),
        },
        {
            name: "Date",
            required: true,
            rule: "The date of issue (or of the event) as a line.",
            test: (l, ix) => findLine(l, ix.lower, RE.date, 0),
        },
        {
            name: "Notice title",
            required: true,
            rule: "A short title for the event/announcement below the heading.",
            test: (l, ix) => {
                const h = findLine(l, ix.lower, RE.noticeHeading, 0);
                const from = h ? h[0] : 0;
                let seen = 0; // content lines examined after the heading
                for (let i = from; i < l.length && seen < 4; i++) {
                    const t = l[i].trim();
                    if (!t)
                        continue;
                    seen++;
                    if (!RE.date.test(t) && titleLike(t))
                        return [i + 1, clip(t)];
                }
                return null;
            },
        },
        {
            name: "What–when–where body",
            required: true,
            rule: "The body carries the event AND a when/where reference (time or venue words).",
            test: (l, ix) => {
                const hasWhen = findLine(l, ix.lower, RE.datetimeRef, 0);
                const hasWhere = findLine(l, ix.lower, RE.whereRef, 0);
                if (hasWhen && hasWhere) {
                    return [Math.min(hasWhen[0], hasWhere[0]), "when: " + clip(hasWhen[1], 30) + " | where: " + clip(hasWhere[1], 30)];
                }
                return null;
            },
        },
        {
            name: "Writer's name + designation",
            required: true,
            rule: "Signature with a role (Secretary / Head Girl / Monitor / …).",
            test: (l, ix) => {
                const t = tail(l, 6);
                for (let i = t.length - 1; i >= 0; i--) {
                    if (RE.designation.test(t[i])) {
                        return [l.length - t.length + i + 1, clip(t[i])];
                    }
                }
                return null;
            },
        },
        {
            name: "Word limit (\u226450 words)",
            required: true,
            rule: "ICSE notices are capped at 50 words (body + apparatus).",
            test: (l, ix) => null, // handled separately via wordCount
        },
    ],
    story: [
        {
            name: "Title",
            required: true,
            rule: "A title line (a story is headed, taught in every story-writing rubric).",
            test: (l, ix) => (l[0] && titleLike(l[0]) ? [1, clip(l[0])] : null),
        },
        {
            name: "Opening (setting)",
            required: true,
            rule: "An opening paragraph that sets the scene (structural: first ¶, \u226515 words).",
            test: (l, ix) => {
                const paras = paragraphs(l, 1).filter((p) => p.join(" ").trim().length >= 15);
                return paras.length >= 1 ? [2, clip(paras[0].join(" "), 50)] : null;
            },
        },
        {
            name: "Plot development",
            required: true,
            rule: "At least one further paragraph carrying the events.",
            test: (l, ix) => {
                const paras = paragraphs(l, 1).filter((p) => p.join(" ").trim().length >= 25);
                return paras.length >= 2 ? [3, (paras.length - 1) + " development paragraph(s)"] : null;
            },
        },
        {
            name: "Ending",
            required: true,
            rule: "A final paragraph closes the narrative (structural check only).",
            test: (l, ix) => {
                const paras = paragraphs(l, 0);
                const lastP = paras.length ? paras[paras.length - 1] : [];
                return lastP.length && lastP.join(" ").trim().length >= 15
                    ? [l.length - lastP.length + 1, clip(lastP.join(" "), 50)]
                    : null;
            },
        },
        {
            name: "Past-tense narration",
            required: false,
            rule: "Narration leans past tense (was/were/-ed) — counted markers, no quality judgement.",
            test: (l, ix) => {
                const body = l.join(" ");
                const past = (body.match(/(\bwas\b|\bwere\b|\bhad\b|\w+ed\b)/g) ?? []).length;
                return past >= 3 ? [1, past + " past-tense markers"] : null;
            },
        },
    ],
};
// ─── the checker ──────────────────────────────────────────────────────────────
/**
 * Check a piece of writing against the taught format scaffold.
 * `format` accepts the ids in TAUGHT_FORMATS (case-insensitive, spaces or
 * dashes allowed, e.g. "formal-letter"). Anything else is declined with the
 * taught list — the engine never invents formats.
 */
export function checkWritingFormat(text, format) {
    const declinedBase = {
        ok: false, format: null, formatLabel: null, declined: "unknown_format",
        beats: [], presentCount: 0, requiredCount: 0, missingRequired: [],
        wordCount: 0, paragraphCount: 0, wordLimit: null,
        steps: [
            "Decline: unknown writing format \u201C" + String(format ?? "").slice(0, 40) +
                "\u201D. Taught formats: " + TAUGHT_FORMATS.join(", ") + ".",
        ],
    };
    const norm = String(format ?? "")
        .toLowerCase()
        .replace(/[\s\-]+/g, "_");
    const fmt = TAUGHT_FORMATS.find((f) => f === norm || FORMAT_LABELS[f].toLowerCase().replace(/\s+/g, "_") === norm);
    if (!fmt)
        return declinedBase;
    const limit = WORD_LIMITS[fmt];
    if (!text || !text.trim()) {
        return {
            ...declinedBase,
            declined: "empty",
            format: fmt,
            formatLabel: FORMAT_LABELS[fmt],
            wordLimit: { min: limit.min, max: limit.max },
            steps: ["Decline: no text supplied to check against the " + FORMAT_LABELS[fmt] + " format."],
        };
    }
    const lines = text.replace(/\r\n?/g, "\n").split("\n");
    const lower = lines.map((l) => l.toLowerCase());
    const ix = { lower };
    const wordCount = (text.match(/[A-Za-z0-9'\u2019-]+/g) ?? []).length;
    const paraCount = paragraphs(lines, 0).length;
    const beats = [];
    for (const item of RUBRICS[fmt]) {
        let hit = null;
        try {
            hit = item.test(lines, ix);
        }
        catch {
            hit = null; // never crash on junk input
        }
        if (item.name.startsWith("Word limit")) {
            const within = wordCount >= (limit.min ?? 0) && wordCount <= limit.max;
            beats.push({
                name: item.name,
                status: within ? "present" : "missing",
                required: item.required,
                line: null,
                evidence: within ? wordCount + " words (limit " + (limit.min ?? 0) + "\u2013" + limit.max + ")" : wordCount + " words, outside " + (limit.min ?? 0) + "\u2013" + limit.max,
                rule: item.rule,
            });
            continue;
        }
        beats.push({
            name: item.name,
            status: hit ? "present" : item.required ? "missing" : "absent_ok",
            required: item.required,
            line: hit ? hit[0] : null,
            evidence: hit ? hit[1] : null,
            rule: item.rule,
        });
    }
    const requiredBeats = beats.filter((b) => b.required);
    const presentRequired = requiredBeats.filter((b) => b.status === "present").length;
    const missingRequired = requiredBeats.filter((b) => b.status === "missing").map((b) => b.name);
    const presentCount = beats.filter((b) => b.status === "present").length;
    // steps (contract spirit)
    const steps = [];
    steps.push("Rule: the " + FORMAT_LABELS[fmt] + " rubric checks " + requiredBeats.length +
        " mandatory structural beats" + (beats.length > requiredBeats.length ? " +" + (beats.length - requiredBeats.length) + " optional" : "") +
        " — scaffold presence only, no judgement of the prose quality.");
    for (const b of beats) {
        steps.push(b.name + ": " + (b.status === "present" ? "FOUND (line " + b.line + ") \u201C" + b.evidence + "\u201D"
            : b.status === "absent_ok" ? "optional — absent (allowed)"
                : "MISSING — " + b.rule));
    }
    steps.push("Verification: " + presentRequired + "/" + requiredBeats.length + " mandatory beats present; " +
        wordCount + " words against the taught " + (limit.min ?? 0) + "\u2013" + limit.max + " band.");
    steps.push(missingRequired.length
        ? "Interpretation: add the missing beat(s) — " + missingRequired.join("; ") + " — and the scaffold is complete."
        : "Interpretation: the " + FORMAT_LABELS[fmt] + " scaffold is complete; content quality is for the examiner, not this checker.");
    return {
        ok: missingRequired.length === 0,
        format: fmt,
        formatLabel: FORMAT_LABELS[fmt],
        declined: null,
        beats,
        presentCount,
        requiredCount: requiredBeats.length,
        missingRequired,
        wordCount,
        paragraphCount: paraCount,
        wordLimit: { min: limit.min, max: limit.max },
        steps,
    };
}
