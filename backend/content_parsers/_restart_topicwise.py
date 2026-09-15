import time
import datetime
import subprocess
import sys

# Wait until 02:07 AM (key 0 rate limit reset time)
target = datetime.datetime(2026, 8, 31, 2, 7, 0)
now = datetime.datetime.now()
wait_seconds = (target - now).total_seconds()

if wait_seconds > 0:
    print(f"Key 0 restart timer: waiting {wait_seconds:.0f}s until {target.strftime('%H:%M:%S')}...")
    sys.stdout.flush()
    time.sleep(wait_seconds)

print(f"Restarting topicwise (key 0) at {datetime.datetime.now().strftime('%H:%M:%S')}...")
sys.stdout.flush()
subprocess.run([
    sys.executable,
    "topicwise_v2.py"
], cwd=r"D:\platform\backend\content_parsers")
