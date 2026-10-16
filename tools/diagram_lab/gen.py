"""diagram_lab batch runner — VLM -> .md hotspots, validation-gated.

Usage:
  python gen.py --imgs <dir|glob> --out <dir> [--model <name>] [--keys <file>]
                [--endpoint <url>] [--limit N] [--workers 4]

Keys: put keys in --keys file (one per line) or env DIAGRAM_KEYS=k1,k2,...
      Rotates round-robin across all keys; a rate-limited key is skipped
      and retried with the next. Local Ollama needs no key.

Endpoint: any OpenAI-compatible /v1/chat/completions (Ollama :11434/v1,
          build.nvidia.com, OpenRouter, etc.)

Every output .md passes validate.py gates or is discarded (+1 retry).
QC overlays render alongside for eyeball checks.
"""
import os, sys, glob, json, base64, argparse, itertools, time, re
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from validate import parse_md, validate, render_overlay

PROMPT = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'PROMPT.md'),
              encoding='utf-8').read()


def call_vlm(endpoint, key, model, img_path, timeout=120):
    b64 = base64.b64encode(open(img_path, 'rb').read()).decode()
    ext = img_path.rsplit('.', 1)[-1].lower()
    mime = 'image/png' if ext == 'png' else 'image/jpeg'
    body = {
        'model': model,
        'messages': [{'role': 'user', 'content': [
            {'type': 'text', 'text': PROMPT},
            {'type': 'image_url', 'image_url': {'url': f'data:{mime};base64,{b64}'}},
        ]}],
        'temperature': 0.15,
        'max_tokens': 32000,
        'stream': False,
    }
    req = urllib.request.Request(
        endpoint.rstrip('/') + '/chat/completions',
        data=json.dumps(body).encode(),
        headers={'Content-Type': 'application/json',
                 **({'Authorization': f'Bearer {key}'} if key else {})})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = json.loads(r.read())
    return data['choices'][0]['message']['content'].strip()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--imgs', required=True)
    ap.add_argument('--out', required=True)
    ap.add_argument('--model', default='gemma3:27b')
    ap.add_argument('--keys', default='')
    ap.add_argument('--endpoint', default='http://localhost:11434/v1')
    ap.add_argument('--limit', type=int, default=0)
    ap.add_argument('--retries', type=int, default=1)
    a = ap.parse_args()

    imgs = sorted(glob.glob(a.imgs))
    if a.limit:
        imgs = imgs[:a.limit]
    os.makedirs(a.out, exist_ok=True)

    keys = [k.strip() for k in (open(a.keys).read().splitlines() if a.keys and os.path.exists(a.keys)
                                else os.environ.get('DIAGRAM_KEYS', '').split(',')) if k.strip()]
    ring = itertools.cycle(keys or [None])
    if not keys:
        print('no keys — assuming local endpoint (Ollama)')

    report = []
    for i, img in enumerate(imgs):
        base = os.path.basename(img).rsplit('.', 1)[0]
        out_md = os.path.join(a.out, base + '.md')
        if os.path.exists(out_md):
            continue
        ok, last_err = False, ''
        for attempt in range(a.retries + 1):
            key = next(ring)
            try:
                text = call_vlm(a.endpoint, key, a.model, img)
            except Exception as e:
                last_err = f'api: {e}'
                continue
            # reasoning stays on — peel the <thought> block off the final text
            text = re.sub(r'<thought>.*?</thought>', '', text, flags=re.S).strip()
            if text.startswith('```'):
                text = re.sub(r'^```\w*\n|\n?```$', '', text).strip()
            err, doc = parse_md(text)
            if err:
                last_err = err; continue
            errs = validate(doc)
            if errs:
                last_err = '; '.join(errs); continue
            open(out_md, 'w', encoding='utf-8').write(text if text.endswith('\n') else text + '\n')
            ov = render_overlay(out_md, os.path.dirname(img), a.out)
            ok = True
            status = 'not-a-diagram' if doc.get('not_a_diagram') else f"{len(doc['parts'])} parts"
            report.append((base, 'PASS', status))
            print(f'[{i+1}/{len(imgs)}] PASS {base} ({status})')
            break
        if not ok:
            report.append((base, 'FAIL', last_err))
            print(f'[{i+1}/{len(imgs)}] FAIL {base} — {last_err[:100]}')
        time.sleep(0.3)

    fails = [r for r in report if r[1] == 'FAIL']
    with open(os.path.join(a.out, '_report.txt'), 'w') as f:
        f.write(f'total={len(report)} pass={len(report)-len(fails)} fail={len(fails)}\n')
        for b, s, d in report:
            f.write(f'{s} {b} {d}\n')
    print(f'done — {len(report)-len(fails)}/{len(report)} passed, report -> _report.txt')


if __name__ == '__main__':
    main()
