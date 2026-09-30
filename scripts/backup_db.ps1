# ============================================================================
# backup_db.ps1 — nightly pg_dump of the Atlas platform DB (TIER3 reliability)
#
# What it does
#   1. pg_dump the dream_app database INSIDE the dream-postgres container
#      (plain SQL, schema + data) and docker-copy it out — binary-safe.
#   2. Compress it to backups\dream_app_<stamp>.sql.zip.
#   3. VERIFY the archive is non-trivially sized (>= 100 KB) — a tiny file
#      means the dump failed; the script exits non-zero and logs FAIL.
#   4. Prune old archives, keeping the newest $KeepCount.
#
# Schedule (run once as admin or as the owning user):
#   schtasks /Create /TN "Atlas DB Backup" /SC DAILY /ST 03:30 ^
#     /TR "powershell -NoProfile -ExecutionPolicy Bypass -File D:\platform\scripts\backup_db.ps1"
#
# Manual run:
#   powershell -NoProfile -ExecutionPolicy Bypass -File D:\platform\scripts\backup_db.ps1
#
# Restore drill (see scripts/restore_check.ps1) — every backup strategy that
# has never been restored is a hope, not a backup.
# ============================================================================

param([int]$KeepCount = 14)

$ErrorActionPreference = "Stop"
$Stamp   = Get-Date -Format "yyyyMMdd_HHmm"
$Dir     = "D:\platform\backups"
$LogFile = Join-Path $Dir "backup_log.txt"
$Zip     = Join-Path $Dir ("dream_app_{0}.sql.zip" -f $Stamp)

New-Item -ItemType Directory -Force -Path $Dir | Out-Null

try {
    # 1. Dump inside the container, copy out (docker cp is binary-safe)
    $TmpInContainer = "/tmp/dream_app_dump.sql"
    docker exec dream-postgres sh -c "pg_dump -U dream_user -d dream_app --no-owner -f $TmpInContainer"
    if ($LASTEXITCODE -ne 0) { throw "pg_dump failed (exit $LASTEXITCODE)" }

    $Sql = Join-Path $Dir "dream_app_$Stamp.sql"
    docker cp "dream-postgres:$TmpInContainer" $Sql
    docker exec dream-postgres rm $TmpInContainer
    if (-not (Test-Path $Sql)) { throw "dump file did not land at $Sql" }

    # 2. Compress + remove the raw SQL
    Compress-Archive -Path $Sql -DestinationPath $Zip -Force
    Remove-Item $Sql -Force

    # 3. Verify: size floor catches truncated/empty dumps
    $Size = (Get-Item $Zip).Length
    if ($Size -lt 100000) { throw "backup suspiciously small ($Size bytes)" }

    # 4. Prune, keeping the newest $KeepCount archives
    Get-ChildItem $Dir -Filter "dream_app_*.sql.zip" |
        Sort-Object LastWriteTime -Descending |
        Select-Object -Skip $KeepCount |
        Remove-Item -Force -ErrorAction SilentlyContinue

    Add-Content -Path $LogFile -Value ("{0} OK {1} bytes {2}" -f (Get-Date -Format "s"), $Size, (Split-Path $Zip -Leaf))
    Write-Output "BACKUP OK: $Zip ($Size bytes)"
    exit 0
}
catch {
    Add-Content -Path $LogFile -Value ("{0} FAIL {1}" -f (Get-Date -Format "s"), $_.Exception.Message)
    Write-Error ("BACKUP FAILED: " + $_.Exception.Message)
    exit 1
}
