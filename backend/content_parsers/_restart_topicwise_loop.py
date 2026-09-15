import time
import datetime
import subprocess
import sys

# Wait 1 hour 25 minutes from now, then restart topicwise in a loop
while True:
    now = datetime.datetime.now()
    # Next restart target: 1h25m from now
    target = now + datetime.timedelta(minutes=85)
    wait_seconds = (target - now).total_seconds()

    if wait_seconds > 0:
        print(f"Key 0 restart timer: waiting {wait_seconds:.0f}s until {target.strftime('%H:%M:%S')}...")
        sys.stdout.flush()
        time.sleep(wait_seconds)

    print(f"Restarting topicwise (key 0) at {datetime.datetime.now().strftime('%H:%M:%S')}...")
    sys.stdout.flush()
    proc = subprocess.run([
        sys.executable,
        "topicwise_v2.py"
    ], cwd=r"D:\platform\backend\content_parsers")
    print(f"  Topicwise exited with code {proc.returncode}, will restart in 85 min...")
    sys.stdout.flush()
