"""Latency + console sweep across all student pages."""
import sys, json, re, time
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright

ROUTES = ['/','/login','/dashboard','/learn','/practice','/diagnostic','/sims-v2','/exam','/progress',
          '/achievements','/my-world','/explore','/quizzes','/study-tools','/portfolio','/homework','/junior','/premium','/games','/settings','/profile']

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    results = []
    # login first (demo) so authed pages render
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(3500)
    for route in ROUTES:
        console = []
        page.on('console', lambda m: console.append(f'{m.type}:{m.text[:130]}'))
        page.on('pageerror', lambda e: console.append(f'PAGEERROR:{str(e)[:200]}'))
        slow = []
        def on_resp(r):
            t = (r.request.timing or {}).get('responseStart', -1)
            try:
                dur = r.request.timing['responseStart']
            except Exception:
                dur = -1
            if dur > 10000:
                slow.append(f'{r.status} {r.url[:90]} {dur}ms')
        page.on('response', on_resp)
        t0 = time.time()
        status = 'ok'
        try:
            page.goto(f'http://localhost{route}', wait_until='domcontentloaded', timeout=30000)
            page.wait_for_timeout(5000)
            load = time.time() - t0
            body = re.sub(r'\s+',' ', page.inner_text('body'))
            errs = [c for c in console if c.startswith('error') or c.startswith('PAGEERROR')]
            results.append({'route':route,'load_s':round(load,1),'len':len(body),'errors':errs[:5],
                            'notable':body[:110]})
            if errs or load > 10:
                print(f'{route}: {load:.1f}s errs={len(errs)} | {errs[:2]}')
        except Exception as e:
            results.append({'route':route,'load_s':round(time.time()-t0,1),'exception':str(e)[:120]})
            print(f'{route}: EXCEPTION {str(e)[:100]}')
    ctx.close(); b.close()
json.dump(results, open(r'D:/platform/.studentA_tmp/latency_results.json','w'), indent=1)
print('--- summary ---')
for r in results:
    print(f"{r.get('route')}: {r.get('load_s')}s errors={len(r.get('errors',[]))}")
