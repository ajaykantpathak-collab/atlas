"""Extract FABLE_API_KEY from the running fable-coder process."""
import psutil

for p in psutil.process_iter(['pid', 'name', 'cmdline']):
    try:
        if p.info['cmdline'] and 'fable_coder' in ' '.join(p.info['cmdline']):
            env = p.environ()
            api_key = env.get('FABLE_API_KEY', 'NOT_SET')
            api_url = env.get('FABLE_API_URL', 'NOT_SET')
            model = env.get('FABLE_MODEL', 'NOT_SET')
            pid = p.info['pid']
            print(f"PID: {pid}")
            if len(api_key) > 20:
                print(f"FABLE_API_KEY: {api_key[:15]}...{api_key[-5:]}")
            else:
                print(f"FABLE_API_KEY: {api_key}")
            print(f"FABLE_API_URL: {api_url}")
            print(f"FABLE_MODEL: {model}")
            # Write full key to a temp file for the generator script
            with open(r"D:\platform\backend\_fable_key.txt", "w") as f:
                f.write(api_key)
            print("Key written to _fable_key.txt")
            break
    except (psutil.NoSuchProcess, psutil.AccessDenied):
        continue
