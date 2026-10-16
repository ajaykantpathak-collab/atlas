import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    console=[]; posts=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:130]}') if m.type=='error' else None)
    page.on('request', lambda r: posts.append(f'{r.method} {r.url.replace("http://localhost","")[:70]}') if r.method in ('POST','PUT','PATCH','DELETE') else None)
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(4000)
    page.goto('http://localhost/settings', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(4000)
    for tab in ['Notifications','Appearance','Language & Region','Privacy & Security','Accessibility']:
        try:
            page.get_by_text(re.compile(f'^{tab}$', re.I)).first.click()
            page.wait_for_timeout(2000)
            body = re.sub(r'\s+',' ', page.inner_text('body'))
            # extract the section after the tab list
            m = re.search(r'About (.{0,300})$', body) or re.search(r'Accessibility (.{0,300})$', body) or re.search(r'Privacy & Security (.{0,300})$', body)
            note(f'== {tab}: ' + body[200:650])
            page.screenshot(path=rf'D:/platform/.studentA_tmp/shot_settings_{tab.split()[0].lower()}.png', full_page=True)
        except Exception as e:
            note(f'== {tab}: ERR {str(e)[:80]}')
    # Edit Profile: click and save
    try:
        page.get_by_text(re.compile('^Account$', re.I)).first.click(); page.wait_for_timeout(1500)
        page.get_by_text(re.compile('Edit Profile', re.I)).first.click(); page.wait_for_timeout(2000)
        body = re.sub(r'\s+',' ', page.inner_text('body'))
        note('EDIT PROFILE VIEW: ' + body[200:700])
        page.screenshot(path=r'D:/platform/.studentA_tmp/shot_settings_edit.png', full_page=True)
        # try to change name and save
        inps = page.locator('input:visible')
        note(f'edit inputs: {inps.count()}')
        if inps.count() >= 1:
            inps.nth(0).fill('Demo Student Renamed')
            save = page.get_by_text(re.compile('Save', re.I)).first
            save.click(timeout=4000)
            page.wait_for_timeout(3000)
            body2 = re.sub(r'\s+',' ', page.inner_text('body'))
            note('AFTER SAVE: ' + body2[200:550])
            note('POSTs during edit: ' + ' || '.join(posts[-6:]))
            page.screenshot(path=r'D:/platform/.studentA_tmp/shot_settings_saved.png', full_page=True)
    except Exception as e:
        note('edit flow err: ' + str(e)[:120])
    # Sign Out from settings
    try:
        posts.clear()
        page.get_by_text(re.compile('Sign Out', re.I)).first.click(timeout=4000)
        page.wait_for_timeout(3500)
        note('after Sign Out url: ' + page.url)
        ls = page.evaluate("() => Object.keys(localStorage).join(',')")
        note('localStorage: ' + ls)
        note('POSTs at signout: ' + ' || '.join(posts[-4:]))
    except Exception as e:
        note('signout err: ' + str(e)[:100])
    note('console: ' + ' || '.join(console[:6]))
    ctx.close(); b.close()
