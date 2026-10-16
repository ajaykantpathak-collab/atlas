"""Walk through sims: click Begin, then repeatedly find the primary action
(option button / continue / next), record every slide's text + feedback,
detect dead ends and grading anomalies."""
import sys, json, re, time
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright

SIMS = [
 (6,  'v3_c6_math_ch01_p1'),
 (6,  'v3_c6_math_ch01_p2'),
 (6,  'v3_c6_science_ch01_p1'),
 (8,  'v3_c8_math_ch01_p1'),
 (8,  'v3_c8_math_ch01_p2'),
 (8,  'v3_c8_science_ch01_p1'),
 (10, 'v3_c10_math_ch01_p1'),
 (10, 'v3_c10_math_ch02_p1'),
 (10, 'v3_c10_bio_ch01_p1'),
 (10, 'v3_c10_chem_ch01_p1'),
 (12, 'v3_c12_math_ch01_p1'),
 (12, 'v3_c12_math_ch02_p1'),
 (12, 'v3_c12_physics_ch01_p1'),
 (12, 'v3_c12_chemistry_ch01_p1'),
]

def walk(page, cl, sim):
    rec = {'cl':cl,'sim':sim,'slides':[], 'anomalies':[], 'boot':None}
    page.goto(f'http://localhost/sims-v2/{sim}', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(3500)
    body = page.inner_text('body')
    if 'wandered off' in body:
        rec['boot'] = 'DEAD(wandered off)'; return rec
    rec['boot'] = 'ok'
    try:
        page.get_by_text(re.compile('Begin the mission', re.I)).first.click(timeout=6000)
    except Exception:
        rec['boot'] = 'no-begin-button'; return rec
    page.wait_for_timeout(2500)
    seen_texts = set()
    for step in range(40):  # up to 40 slides
        body = re.sub(r'\s+',' ', page.inner_text('body'))
        # capture the core content region (between title bar and nav)
        m = re.search(r'Teaches \d+ topics.*?(?:in class)?(.{0,400})', body)
        core = body[:1000]
        # find question/heading
        qm = re.search(r'(?:QUESTION!|Challenge|Think|Quick check| Quiz)(.{0,300})', body, re.I)
        slide = {'step':step, 'has_q': bool(qm), 'snippet': (qm.group(1)[:160] if qm else body[:160])}
        # dead buttons?
        btns = page.locator('button:visible').count()
        slide['visible_buttons'] = btns
        # primary interactions: option-like buttons (large text blocks)
        clicked = False
        # 1) option buttons: buttons with > 15 chars text that are not nav
        for sel in ['button']:
            els = page.locator(sel)
            n = els.count()
            opts = []
            for i in range(n):
                try:
                    t = els.nth(i).inner_text().strip()
                except Exception:
                    continue
                if 12 < len(t) < 220 and not re.search(r'^(previous|next|back|begin|skip|hint|exit|menu|sound|replay|volume|fullscreen|continue)', t, re.I):
                    opts.append((i, t))
            if opts:
                # click the LAST option (often wrong for "which is right" content) on first pass
                i, t = opts[-1]
                slide['clicked_option'] = t[:80]
                try:
                    els.nth(i).click(timeout=3000)
                    clicked = True
                    page.wait_for_timeout(2200)
                    after = re.sub(r'\s+',' ', page.inner_text('body'))
                    # feedback detection
                    fb = re.search(r'(Correct|Not quite|Try again|Well done|Exactly|Oops|Actually)[^.{0,160}]', after, re.I)
                    slide['feedback'] = fb.group(0)[:120] if fb else None
                    # grading anomaly: verify obvious facts later from log
                except Exception as e:
                    slide['click_error'] = str(e)[:80]
                break
        if not clicked:
            # 2) continue/next buttons
            for label in ['Continue','Next','Got it','I get it','Let’s go',"Let's go",'Reveal','Check','Submit','Onward','Next slide']:
                try:
                    page.get_by_text(re.compile(f'^{label}', re.I)).first.click(timeout=1200)
                    clicked = True
                    page.wait_for_timeout(1800)
                    break
                except Exception:
                    continue
        slide['advanced'] = clicked
        new_text = re.sub(r'\s+',' ', page.inner_text('body'))
        slide['changed'] = new_text[:300] != body[:300]
        rec['slides'].append(slide)
        if not clicked:
            rec['anomalies'].append(f'stuck at step {step}: no clickable option/continue; body={body[:180]}')
            break
        if not slide['changed']:
            # maybe same slide but state changed; count repeats
            if step > 3:
                rec['anomalies'].append(f'no text change at step {step} after click')
        # detect loop: same question text seen 3+ times
        key = (qm.group(1)[:80] if qm else body[:80])
        seen_texts[key] = seen_texts.get(key, 0) + 1
        if seen_texts[key] >= 4:
            rec['anomalies'].append(f'loop: same slide "{key[:60]}" seen {seen_texts[key]}x')
            break
    return rec

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    out = []
    for cl, sim in SIMS:
        try:
            rec = walk(page, cl, sim)
        except Exception as e:
            rec = {'cl':cl,'sim':sim,'exception':str(e)[:200]}
        out.append(rec)
        n = len(rec.get('slides',[]))
        print(f"== c{cl} {sim}: boot={rec.get('boot')} slides={n} anomalies={rec.get('anomalies', [])[:2]}")
        for s in rec.get('slides', [])[:6]:
            print('   step', s['step'], '| q:', s['has_q'], '| clicked:', str(s.get('clicked_option'))[:50], '| fb:', str(s.get('feedback'))[:40], '| adv:', s.get('advanced'), '| chg:', s.get('changed'))
    ctx.close(); b.close()
json.dump(out, open(r'D:/platform/.studentA_tmp/simwalk_results.json','w'), indent=1, ensure_ascii=False)
