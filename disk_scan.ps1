$ErrorActionPreference = 'SilentlyContinue'
Write-Output "=== C:\ root system files ==="
Get-ChildItem C:\ -Force -File | Select Name, @{n='GB';e={[math]::Round($_.Length/1GB,1)}} | Sort GB -Descending | Select -First 5 | Format-Table -AutoSize

Write-Output "=== Docker vhdx ==="
Get-ChildItem "C:\Users\Alesha4285\AppData\Local\Docker\wsl" -Recurse -Filter *.vhdx | Select FullName, @{n='GB';e={[math]::Round($_.Length/1GB,1)}} | Format-Table -AutoSize

Write-Output "=== AppData\Local top consumers ==="
Get-ChildItem 'C:\Users\Alesha4285\AppData\Local' -Directory | ForEach-Object {
    $s = (Get-ChildItem $_.FullName -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum
    [PSCustomObject]@{ GB = [math]::Round($s/1GB,1); Dir = $_.Name }
} | Where-Object { $_.GB -ge 0.5 } | Sort GB -Descending | Format-Table -AutoSize

Write-Output "=== User profile top consumers ==="
Get-ChildItem 'C:\Users\Alesha4285' -Directory -Force | ForEach-Object {
    $s = (Get-ChildItem $_.FullName -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum
    [PSCustomObject]@{ GB = [math]::Round($s/1GB,1); Dir = $_.Name }
} | Where-Object { $_.GB -ge 1 } | Sort GB -Descending | Select -First 10 | Format-Table -AutoSize
