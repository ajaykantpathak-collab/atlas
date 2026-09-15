# Delete ONLY failed (<1KB) _result.json files in cbse_coverage_output so the pipeline reprocesses them.
# Scoped: -Filter '*_result.json', Where-Object Length -lt 1024, single directory only.
$dir = 'D:\platform\cbse_coverage_output'
$before = (Get-ChildItem $dir -Filter '*_result.json').Count
$failed = Get-ChildItem $dir -Filter '*_result.json' | Where-Object { $_.Length -lt 1024 }
Write-Output ("Result files before: " + $before)
Write-Output ("Failed files to delete: " + $failed.Count)
$deleted = 0
foreach ($f in $failed) {
    try {
        Remove-Item $f.FullName -Force
        $deleted++
    } catch {
        Write-Output ("FAILED to delete: " + $f.Name + " -> " + $_.Exception.Message)
    }
}
$after = (Get-ChildItem $dir -Filter '*_result.json').Count
Write-Output ("Deleted: " + $deleted)
Write-Output ("Result files after: " + $after)
Write-Output ("Remaining successful files: " + $after)
