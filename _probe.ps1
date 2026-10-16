Write-Output '=== enhanced_nodes.py locations ==='
Get-ChildItem 'D:\platform\backend','D:\platform\deploy\backend' -Recurse -Filter 'enhanced_nodes.py' -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty FullName

Write-Output ''
Write-Output '=== board tokens in backend/api ==='
$pat = "icse|isc_|cisce|board"
Get-ChildItem 'D:\platform\backend\api' -Filter '*.py' -ErrorAction SilentlyContinue |
    Select-String -Pattern $pat -CaseSensitive:$false |
    Select-Object -First 30 |
    ForEach-Object { "$($_.Filename):$($_.LineNumber): $($_.Line.Trim())" }

Write-Output ''
Write-Output '=== content dir constants ==='
Get-ChildItem 'D:\platform\backend' -Recurse -Filter '*.py' -ErrorAction SilentlyContinue |
    Select-String -Pattern 'enhanced_nodes_md|cisce_nodes' |
    Select-Object -First 25 |
    ForEach-Object { "$($_.Filename):$($_.LineNumber): $($_.Line.Trim())" }
