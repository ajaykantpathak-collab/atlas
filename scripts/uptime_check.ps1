# ============================================================================
# uptime_check.ps1 — tiny uptime probe for the Atlas platform (TIER3)
#
# Checks the two public surfaces:
#   http://localhost/api/health   (backend stack: postgres/neo4j/redis/qdrant)
#   http://localhost/             (frontend via nginx)
#
# Every run appends a line to logs\uptime_log.txt:
#   2026-09-19T17:40:01.000+00:00 OK    health=200 frontend=200
#   2026-09-19T17:45:01.000+00:00 FAIL  health=0 frontend=502
# FAIL lines make the log greppable for incident post-mortems.
#
# Run on demand:
#   powershell -NoProfile -ExecutionPolicy Bypass -File D:\platform\scripts\uptime_check.ps1
# Schedule every 5 minutes (run once):
#   schtasks /Create /TN "Atlas Uptime Check" /SC MINUTE /MO 5 /ST 00:00 ^
#     /TR "powershell -NoProfile -ExecutionPolicy Bypass -File D:\platform\scripts\uptime_check.ps1"
#
# Exit code: 0 = both OK, 1 = any failure (script-friendly).
# ============================================================================

param(
    [string]$BaseUrl = "http://localhost",
    [int]$TimeoutSec = 10
)

$ErrorActionPreference = "SilentlyContinue"
$LogDir = "D:\platform\logs"
$LogFile = Join-Path $LogDir "uptime_log.txt"
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

function Probe($url) {
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec $TimeoutSec
        $sw.Stop()
        return @{ code = [int]$resp.StatusCode; ms = $sw.ElapsedMilliseconds }
    } catch {
        $sw.Stop()
        $code = 0
        if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode }
        return @{ code = $code; ms = $sw.ElapsedMilliseconds }
    }
}

$health = Probe "$BaseUrl/api/health"
$front  = Probe "$BaseUrl/"

$ok = ($health.code -eq 200) -and ($front.code -eq 200)
$stamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")

if ($ok) {
    $line = "{0} OK    health={1} frontend={2} health_ms={3} frontend_ms={4}" -f `
        $stamp, $health.code, $front.code, $health.ms, $front.ms
} else {
    $line = "{0} FAIL  health={1} frontend={2} health_ms={3} frontend_ms={4}" -f `
        $stamp, $health.code, $front.code, $health.ms, $front.ms
}

Add-Content -Path $LogFile -Value $line
Write-Output $line
if ($ok) { exit 0 } else { exit 1 }
