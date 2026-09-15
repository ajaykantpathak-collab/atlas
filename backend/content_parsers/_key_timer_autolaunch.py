"""
Wait for the ClaudeOpus key to reset, then auto-launch all 3 supporting file generators.
Checks every 5 minutes. Launches the moment the key works.
"""
import urllib.request, json, ssl, time, subprocess, sys, re

KEY = 'sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK'
URL = 'https://api.claudeopus.pro/v1/messages'
MODEL = 'claude-opus-5'
ctx = ssl.create_default_context()

def check_key():
    """Returns (working: bool, message: str, reset_hours: float)."""
    body = json.dumps({
        'model': MODEL,
        'max_tokens': 10,
        'messages': [{'role': 'user', 'content': 'hi'}],
    }).encode('utf-8')
    req = urllib.request.Request(URL, data=body, method='POST')
    req.add_header('x-api-key', KEY)
    req.add_header('Content-Type', 'application/json')
    req.add_header('anthropic-version', '2023-06-01')
    try:
        with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            text = ''
            for b in data.get('content', []):
                if b.get('type') == 'text':
                    text = b.get('text', '')
                    break
            if 'Token limit' in text or 'Rate limit' in text:
                m = re.search(r'reset in (\d+)h\s*(\d+)?m?', text)
                if m:
                    h = int(m.group(1))
                    mnt = int(m.group(2)) if m.group(2) else 0
                    reset_h = h + mnt / 60.0
                    return (False, text[:100], reset_h)
                return (False, text[:100], 999)
            elif 'Invalid' in text:
                return (False, text[:100], 999)
            else:
                return (True, text[:50], 0)
    except urllib.error.HTTPError as e:
        return (False, f'HTTP {e.code}', 999)
    except Exception as e:
        return (False, str(e)[:100], 999)

def launch_generators():
    """Launch all 3 supporting file generators."""
    script = r'D:\platform\backend\content_parsers\claude_english_supporting.py'
    print('\n' + '='*70)
    print('KEY RESET! Launching all 3 generators...')
    print('='*70)
    
    # Launch eng with 3 workers, engmod and engelec with 2 each
    procs = []
    configs = [
        ('eng', 3),
        ('engmod', 2),
        ('engelec', 2),
    ]
    for subject, workers in configs:
        cmd = [sys.executable, script, '--subject', subject, '--workers', str(workers)]
        print(f'  Launching: {subject} ({workers} workers)')
        p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        procs.append((subject, p))
    
    print('\nAll generators launched. Waiting for completion...')
    for subject, p in procs:
        out, _ = p.communicate()
        print(f'\n=== {subject} finished (exit code {p.returncode}) ===')
        # Print last 10 lines
        lines = out.strip().split('\n')
        for line in lines[-10:]:
            print(f'  {line}')
    
    print('\n' + '='*70)
    print('ALL GENERATORS COMPLETE')
    print('='*70)

# Main loop
print('ClaudeOpus Key Reset Timer')
print(f'Key: {KEY[:20]}...')
print(f'Checking every 5 minutes...')
print()

check_interval = 300  # 5 minutes
attempt = 0

while True:
    attempt += 1
    now = time.strftime('%H:%M:%S')
    working, msg, reset_h = check_key()
    
    if working:
        print(f'[{now}] Attempt {attempt}: KEY WORKING! — {msg}')
        launch_generators()
        break
    elif reset_h < 999:
        print(f'[{now}] Attempt {attempt}: Limit reached, resets in {reset_h:.1f}h — {msg}')
        # Check more frequently as we get close
        if reset_h < 0.5:
            check_interval = 60  # 1 min when close
        elif reset_h < 1:
            check_interval = 120  # 2 min when within 1h
        else:
            check_interval = 300  # 5 min otherwise
    else:
        print(f'[{now}] Attempt {attempt}: Error — {msg}')
        check_interval = 300
    
    print(f'  Next check in {check_interval}s...')
    time.sleep(check_interval)
