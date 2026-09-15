import time
import datetime
import subprocess
import sys

# Wait until 02:07 AM (1h25m from 00:42)
target = datetime.datetime(2026, 8, 31, 2, 7, 0)
now = datetime.datetime.now()
wait_seconds = (target - now).total_seconds()

if wait_seconds > 0:
    print(f"Waiting {wait_seconds:.0f} seconds until {target.strftime('%H:%M:%S')} for key 1 rate limit reset...")
    sys.stdout.flush()
    time.sleep(wait_seconds)

print(f"Starting enrichment generator at {datetime.datetime.now().strftime('%H:%M:%S')}...")
sys.stdout.flush()
subprocess.run([
    sys.executable,
    "cbse_enrichment_generator.py",
    "--class-num", "12",
    "--exclude-hindi"
], cwd=r"D:\platform\backend\content_parsers")
