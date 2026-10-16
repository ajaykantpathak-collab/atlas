"""Fix tsc errors: Cube->Hexagon, HelpCircleCircleCheck->HelpCircle, make landing page async."""
import subprocess, sys

# Fix 1: landing page — Cube -> Hexagon, add async to function
landing = "D:/platform/deploy/frontend/app/page.tsx"
with open(landing, encoding="utf-8") as f:
    src = f.read()

# Cube -> Hexagon in import and DISCOVERY
src = src.replace("import { BookOpen, Code, Compass, Cube, GraduationCap, Sparkles }",
                  "import { BookOpen, Code, Compass, Hexagon, GraduationCap, Sparkles }")
src = src.replace("    Icon: Cube,", "    Icon: Hexagon,")

# Make the component async so await works in JSX
src = src.replace("export default function LandingPage() {",
                  "export default async function LandingPage() {")

with open(landing, "w", encoding="utf-8") as f:
    f.write(src)
print("Fixed landing page")

# Fix 2: AskResponseCard — HelpCircleCircleCheck -> HelpCircle
card = "D:/platform/deploy/frontend/components/tutor/AskResponseCard.tsx"
with open(card, encoding="utf-8") as f:
    src = f.read()
src = src.replace("HelpCircleCircleCheck", "HelpCircle")
with open(card, "w", encoding="utf-8") as f:
    f.write(src)
print("Fixed AskResponseCard")

# Mirror to root
import shutil
shutil.copy(landing, "D:/platform/frontend/app/page.tsx")
shutil.copy(card, "D:/platform/frontend/components/tutor/AskResponseCard.tsx")
print("Mirrored to root")

# Run tsc
r = subprocess.run(
    ["node", "D:/platform/deploy/frontend/node_modules/typescript/bin/tsc",
     "--noEmit", "--skipLibCheck"],
    cwd="D:/platform/deploy/frontend",
    capture_output=True, text=True, timeout=120)
print("tsc rc:", r.returncode)
if r.stdout: print("STDOUT:", r.stdout[:3000])
if r.stderr: print("STDERR:", r.stderr[:3000])
