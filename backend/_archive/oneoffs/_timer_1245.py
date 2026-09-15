"""Timer: wait until 12:45 PM today, then launch both:
1. CISCE Hindi topics generation (10 workers)
2. CBSE Hindi Devanagari conversion of remaining files (10 workers)
"""
import time, subprocess, sys, os
from datetime import datetime, timedelta

TARGET_HOUR = 12
TARGET_MINUTE = 45

def get_target_time():
    """Get today's 12:45 PM, or tomorrow's if already past."""
    now = datetime.now()
    target = now.replace(hour=TARGET_HOUR, minute=TARGET_MINUTE, second=0, microsecond=0)
    if now >= target:
        target += timedelta(days=1)
    return target

def main():
    target = get_target_time()
    print(f"Timer started. Current time: {datetime.now().strftime('%H:%M:%S')}")
    print(f"Target time: {target.strftime('%H:%M:%S')}")
    
    wait_seconds = (target - datetime.now()).total_seconds()
    print(f"Waiting {wait_seconds:.0f} seconds ({wait_seconds/60:.1f} minutes)...")
    print(f"Will launch at {target.strftime('%H:%M:%S')}")
    print("=" * 60)
    
    # Sleep in 60-second intervals so we can show countdown
    while True:
        now = datetime.now()
        remaining = (target - now).total_seconds()
        if remaining <= 0:
            break
        mins = int(remaining // 60)
        secs = int(remaining % 60)
        print(f"\r[{now.strftime('%H:%M:%S')}] {mins}m {secs}s remaining...    ", end="", flush=True)
        time.sleep(min(60, remaining))
    
    print(f"\n\n{'=' * 60}")
    print(f"TIME REACHED: {datetime.now().strftime('%H:%M:%S')}")
    print(f"Launching both jobs!")
    print(f"{'=' * 60}\n")
    
    # Job 1: CISCE Hindi topics
    print("[JOB 1] CISCE Hindi Topics Generator")
    topics_script = r"D:\platform\backend\services\_gen_hindi_cisce_topics.py"
    topics_log = open(r"D:\platform\cbse_data\hindi_cisce\topics\_run.log", "w", encoding="utf-8")
    topics_proc = subprocess.Popen(
        [sys.executable, topics_script],
        stdout=topics_log,
        stderr=subprocess.STDOUT,
        cwd=r"D:\platform\backend",
    )
    print(f"  PID: {topics_proc.pid}")
    print(f"  Log: D:\\platform\\cbse_data\\hindi_cisce\\topics\\_run.log")
    
    # Job 2: CBSE Hindi Devanagari conversion
    print("\n[JOB 2] CBSE Hindi Devanagari Conversion")
    convert_script = r"D:\platform\backend\_convert_hindi_devanagari.py"
    convert_log = open(r"D:\platform\hindi_devanagari\_conversion_run.log", "w", encoding="utf-8")
    convert_proc = subprocess.Popen(
        [sys.executable, convert_script],
        stdout=convert_log,
        stderr=subprocess.STDOUT,
        cwd=r"D:\platform\backend",
        env={**os.environ},
    )
    print(f"  PID: {convert_proc.pid}")
    print(f"  Log: D:\\platform\\hindi_devanagari\\_conversion_run.log")
    
    print(f"\n{'=' * 60}")
    print("Both jobs launched! They will run in the background.")
    print("Check the log files for progress.")
    print(f"{'=' * 60}")

if __name__ == "__main__":
    main()
