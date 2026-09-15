# Audit-only: counts and lists failed (<1KB) _result.json files. Does NOT delete anything.
$dir = 'D:\platform\cbse_coverage_output'
$all = Get-ChildItem $dir -Filter '*_result.json'
$failed = $all | Where-Object { $_.Length -lt 1024 }
Write-Output ("Total result files: " + $all.Count)
Write-Output ("Failed (<1KB) files: " + $failed.Count)
Write-Output ("Successful (>=1KB) files: " + ($all.Count - $failed.Count))
Write-Output ""
Write-Output "=== Failed files (name, size bytes) ==="
$failed | Sort-Object Name | ForEach-Object { Write-Output ("{0}  {1}" -f $_.Name, $_.Length) }
