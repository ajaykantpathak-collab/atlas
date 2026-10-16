import subprocess, sys

r = subprocess.run(
    ["node", "D:/platform/deploy/frontend/node_modules/typescript/bin/tsc",
     "--noEmit", "--skipLibCheck"],
    cwd="D:/platform/deploy/frontend",
    capture_output=True, text=True, timeout=120)

print("tsc rc:", r.returncode)
if r.stdout:
    print("STDOUT:")
    for line in r.stdout.splitlines()[:50]:
        print(" ", line)
if r.stderr:
    print("STDERR:")
    for line in r.stderr.splitlines()[:50]:
        print(" ", line)
sys.exit(r.returncode)
