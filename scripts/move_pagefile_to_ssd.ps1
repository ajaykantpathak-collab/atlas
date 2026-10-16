# move_pagefile_to_ssd.ps1 -- move the Windows pagefile from D: (HDD)
# to C: (SSD). Root-cause fix for the Docker daemon wedges: every memory
# spike swaps through D:\pagefile.sys on the 7200rpm disk, which stalls
# the whole IO pipeline (7 daemon deaths on 2026-10-06).
#
# RUN AS ADMINISTRATOR. Reboot required to take effect.

$ErrorActionPreference = "Stop"
Write-Host "=== Atlas: moving pagefile D:(HDD) -> C:(SSD) ==="

# 1. take manual control of pagefile management
$cs = Get-CimInstance Win32_ComputerSystem
if ($cs.AutomaticManagedPagefile) {
    Set-CimInstance -InputObject $cs -Property @{AutomaticManagedPagefile = $false}
    Write-Host "disabled automatic pagefile management"
}

# 2. remove every D: pagefile
Get-CimInstance Win32_PageFileSetting |
    Where-Object { $_.Name -like "D:\*" } |
    Remove-CimInstance
Write-Host "removed D: pagefile setting"

# 3. create the C: (SSD) pagefile: 16 GB initial, 32 GB max
New-CimInstance -ClassName Win32_PageFileSetting -Property @{
    Name         = "C:\pagefile.sys"
    InitialSize  = [uint32]16384
    MaximumSize  = [uint32]32768
} | Out-Null
Write-Host "created C:\pagefile.sys (16384-32768 MB)"

# 4. verify
Write-Host "`n=== resulting pagefile settings ==="
Get-CimInstance Win32_PageFileSetting |
    Select-Object Name, InitialSize, MaximumSize | Format-Table -AutoSize

Write-Host "REBOOT REQUIRED for the change to take effect."
