param(
    [int]$IntervalSec = 10,
    [int]$DurationSec = 600,
    [string]$OutCsv = "D:\platform\deploy\backend\tests\perf_results\host_samples.csv"
)
$ErrorActionPreference = "SilentlyContinue"
New-Item -ItemType Directory -Force -Path (Split-Path $OutCsv) | Out-Null
"timestamp,cpu_pct,ram_free_mb,ram_total_mb,vmmemwsl_ws_mb,node3001_ws_mb,docker_backend_ws_mb" |
    Out-File -FilePath $OutCsv -Encoding utf8
$end = (Get-Date).AddSeconds($DurationSec)
while ((Get-Date) -lt $end) {
    $cpu = (Get-CimInstance Win32_Processor |
        Measure-Object -Property LoadPercentage -Average).Average
    $os = Get-CimInstance Win32_OperatingSystem
    $freeMb = [math]::Round($os.FreePhysicalMemory / 1KB)
    $totMb = [math]::Round($os.TotalVisibleMemorySize / 1KB)
    $vmmem = (Get-Process vmmemWSL -ErrorAction SilentlyContinue |
        Measure-Object WorkingSet64 -Sum).Sum
    $vmmemMb = if ($vmmem) { [math]::Round($vmmem / 1MB) } else { 0 }
    $nodeWs = (Get-Process -Id 17608 -ErrorAction SilentlyContinue).WorkingSet64
    $nodeMb = if ($nodeWs) { [math]::Round($nodeWs / 1MB) } else { 0 }
    $dback = (Get-Process "com.docker.backend" -ErrorAction SilentlyContinue |
        Measure-Object WorkingSet64 -Sum).Sum
    $dbackMb = if ($dback) { [math]::Round($dback / 1MB) } else { 0 }
    "$(Get-Date -Format o),$cpu,$freeMb,$totMb,$vmmemMb,$nodeMb,$dbackMb" |
        Out-File -FilePath $OutCsv -Append -Encoding utf8
    Start-Sleep -Seconds $IntervalSec
}
