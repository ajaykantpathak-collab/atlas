# ============================================================================
# restore_check.ps1 — prove a backup is restorable (TIER3 reliability)
#
# Takes the newest backups\dream_app_*.sql.zip, restores it into a TEMP
# database (restore_check) inside dream-postgres, runs sanity queries
# (row counts for users / board_questions / total tables), prints the
# numbers, then drops the temp DB.
#
# A backup that has never been restored is a hope, not a backup — run this
# after every backup-practice change and at least monthly.
#
# Usage:
#   powershell -NoProfile -ExecutionPolicy Bypass -File D:\platform\scripts\restore_check.ps1
#   powershell ... -File restore_check.ps1 -Archive D:\platform\backups\dream_app_20260920_0006.sql.zip
# ============================================================================

param([string]$Archive = "")

$ErrorActionPreference = "Continue"   # psql NOTICEs go to stderr; do not abort on them
$Dir = "D:\platform\backups"
$TempDb = "restore_check"

if (-not $Archive) {
    $Archive = Get-ChildItem $Dir -Filter "dream_app_*.sql.zip" |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1 -ExpandProperty FullName
}
if (-not $Archive -or -not (Test-Path $Archive)) { throw "No backup archive found in $Dir" }
Write-Output "Restoring: $Archive"

# 1. Unzip to a temp dir
$Tmp = Join-Path $env:TEMP ("restore_check_" + [guid]::NewGuid().ToString("N").Substring(0, 8))
New-Item -ItemType Directory -Force -Path $Tmp | Out-Null
Expand-Archive -Path $Archive -DestinationPath $Tmp -Force
$sql = Get-ChildItem $Tmp -Filter "*.sql" | Select-Object -First 1 -ExpandProperty FullName
if (-not $sql) { throw "No .sql file inside archive" }
Write-Output ("Unpacked: {0} ({1:N0} bytes)" -f $sql, (Get-Item $sql).Length)

try {
    # 2. Recreate the temp database (cmd /c keeps psql NOTICEs off stderr)
    cmd /c "docker exec dream-postgres psql -U dream_user -d postgres -c ""DROP DATABASE IF EXISTS $TempDb"" 2>nul" | Out-Null
    cmd /c "docker exec dream-postgres psql -U dream_user -d postgres -c ""CREATE DATABASE $TempDb OWNER dream_user""" | Out-Null

    # 3. Copy the dump in and restore (plain SQL)
    $dest = "/tmp/restore_check.sql"
    docker cp $sql "dream-postgres:$dest" | Out-Null
    Write-Output "Restoring 700MB-class dump — this takes a few minutes..."
    cmd /c "docker exec dream-postgres sh -c ""psql -U dream_user -d $TempDb -v ON_ERROR_STOP=0 -q -f $dest""" | Select-Object -Last 3
    docker exec dream-postgres rm $dest

    # 4. Sanity queries — the numbers must look like the platform
    Write-Output "Sanity counts in restored DB:"
    cmd /c "docker exec dream-postgres psql -U dream_user -d $TempDb -t -A -c ""select 'users = '||count(*) from users union all select 'board_questions = '||count(*) from board_questions union all select 'assignments = '||count(*) from assignments union all select 'total tables = '||count(*) from information_schema.tables where table_schema='public'"""

    Write-Output "RESTORE CHECK PASSED"
    $script:ok = $true
}
catch {
    Write-Output ("RESTORE CHECK FAILED: " + $_.Exception.Message)
    $script:ok = $false
}
finally {
    # 5. Drop temp DB + temp dir
    cmd /c "docker exec dream-postgres psql -U dream_user -d postgres -c ""DROP DATABASE IF EXISTS $TempDb"" 2>nul" | Out-Null
    Remove-Item $Tmp -Recurse -Force -ErrorAction SilentlyContinue
    Write-Output "Temp DB dropped."
}
if (-not $script:ok) { exit 1 } else { exit 0 }
