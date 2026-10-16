# Sync dev trees -> deploy trees (deploy/ is what Docker builds).
# Usage:  .\sync.ps1            — copies changed files only
#         .\sync.ps1 -Check     — reports drift, copies nothing
param([switch]$Check)

$pairs = @(
    @{ Src = 'backend';  Dst = 'deploy\backend';
       Skip = @('__pycache__','_archive','_cache','tests','*.pyc','*.log') },
    @{ Src = 'frontend'; Dst = 'deploy\frontend';
       Skip = @('node_modules','.next','_shots','_audit*','out') }
)

$total = 0
foreach ($p in $pairs) {
    $src = Join-Path $PSScriptRoot $p.Src
    $dst = Join-Path $PSScriptRoot $p.Dst
    $files = Get-ChildItem -Recurse -File $src |
        Where-Object {
            $rel = $_.FullName.Substring($src.Length)
            -not ($p.Skip | Where-Object { $rel -like "*$_*" })
        }
    foreach ($f in $files) {
        $rel = $f.FullName.Substring($src.Length)
        $target = Join-Path $dst $rel
        if (-not (Test-Path $target) -or
            (Get-FileHash $f.FullName).Hash -ne (Get-FileHash $target).Hash) {
            $total++
            if ($Check) { Write-Output "DRIFT  $rel" }
            else {
                New-Item -ItemType Directory -Force (Split-Path $target) | Out-Null
                Copy-Item $f.FullName $target
                Write-Output "SYNCED $rel"
            }
        }
    }
}
if ($total -eq 0) { Write-Output "Clean — deploy is in sync." }
elseif ($Check) { Write-Output "$total file(s) differ." }
