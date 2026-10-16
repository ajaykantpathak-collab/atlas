# Atlas watchdog alert delivery — called (detached) by watchdog.py when the
# service transitions to "down" or "degraded", and for recovery notices.
#
# Delivery chain (each step logged to <OpsDir>\notify.log):
#   1. Windows toast via raw WinRT ([Windows.UI.Notifications]) - no BurntToast.
#   2. Windows Event Log (Application) - survives reboots and log rotation:
#      uses a dedicated "AtlasWatchdog" source if one has been registered
#      (one-time elevated: [Diagnostics.EventLog]::CreateEventSource('AtlasWatchdog','Application')),
#      otherwise the built-in "WSH" source, which works unelevated.
#   3. Fallback msg box (WScript.Shell Popup, auto-dismisses after 120s) only
#      if the toast itself failed.
#
# Usage:
#   powershell -NoProfile -ExecutionPolicy Bypass -File notify_alert.ps1 ^
#     -Level down -Message "api down 3 checks" [-Title "Atlas Watchdog"] [-OpsDir ...]
param(
    [Parameter(Mandatory = $true)][ValidateSet("down", "degraded", "up")][string]$Level,
    [Parameter(Mandatory = $true)][string]$Message,
    [string]$Title = "Atlas Watchdog",
    [string]$OpsDir = "D:\platform\runtime_data\ops"
)
$ErrorActionPreference = "Continue"
try { if (-not (Test-Path $OpsDir)) { New-Item -ItemType Directory -Path $OpsDir -Force | Out-Null } } catch {}
$log = Join-Path $OpsDir "notify.log"
function Write-NotifyLog([string]$line) {
    try { "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') $line" | Out-File -FilePath $log -Append -Encoding utf8 } catch {}
}

Write-NotifyLog "dispatch level=$Level title=$Title msg=$Message"

# --- 1) toast ---------------------------------------------------------------
$toastOk = $false
try {
    $null = [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime]
    $xml = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent(
        [Windows.UI.Notifications.ToastTemplateType]::ToastText02)
    $texts = $xml.GetElementsByTagName("text")
    $null = $texts.Item(0).AppendChild($xml.CreateTextNode($Title))
    $short = $Message; if ($short.Length -gt 180) { $short = $short.Substring(0, 180) }
    $null = $texts.Item(1).AppendChild($xml.CreateTextNode($short))
    $toast = New-Object Windows.UI.Notifications.ToastNotification($xml)
    # PowerShell's own AppUserModelID - toasts from a plain script host are
    # only delivered when attributed to a registered app id.
    $appid = "{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\WindowsPowerShell\v1.0\powershell.exe"
    [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($appid).Show($toast)
    $toastOk = $true
    Write-NotifyLog "toast sent"
} catch {
    Write-NotifyLog "toast failed: $($_.Exception.Message)"
}

# --- 2) Windows Event Log (Application) --------------------------------------
# WSH LogEvent types: 1=Error 2=Warning 4=Information. Non-admin writable.
$wshType = 4
$entryKind = "Information"
if ($Level -eq "degraded") { $wshType = 2; $entryKind = "Warning" }
if ($Level -eq "down")     { $wshType = 1; $entryKind = "Error" }
$evtMsg = "AtlasWatchdog [$Level] $Message"
try {
    $dedicated = Test-Path "HKLM:\SYSTEM\CurrentControlSet\Services\EventLog\Application\AtlasWatchdog"
    if ($dedicated) {
        $entryType = [System.Diagnostics.EventLogEntryType]::$entryKind
        $di = New-Object System.Diagnostics.EventLog("Application")
        $di.Source = "AtlasWatchdog"
        $di.WriteEntry($evtMsg, $entryType, 1001)
        Write-NotifyLog "eventlog written source=AtlasWatchdog type=$entryKind"
    } else {
        $sh = New-Object -ComObject WScript.Shell
        $ok = $sh.LogEvent($wshType, $evtMsg)
        Write-NotifyLog "eventlog written source=WSH type=$wshType ok=$ok"
    }
} catch {
    Write-NotifyLog "eventlog failed: $($_.Exception.Message)"
}

# --- 3) msg-box fallback (only when the toast could not be shown) ------------
if (-not $toastOk) {
    try {
        $sh = New-Object -ComObject WScript.Shell
        $null = $sh.Popup($evtMsg, 120, $Title, 48)  # 48 = exclamation icon
        Write-NotifyLog "msg-box fallback shown"
    } catch {
        Write-NotifyLog "msg-box fallback failed: $($_.Exception.Message)"
    }
}

Write-NotifyLog "dispatch done"
exit 0
