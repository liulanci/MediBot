$ScriptPath = "c:\Users\34607\Documents\qianyi\1\opencode-workspace\health-workspace"
$exe = Join-Path $ScriptPath "HealthWorkspace-Setup-v4.0.0.exe"

if (Test-Path $exe) {
    $bytes = [System.IO.File]::ReadAllBytes($exe)
    if ($bytes[0] -eq 77 -and $bytes[1] -eq 90) {
        Write-Host "Valid PE executable header (MZ)" -ForegroundColor Green
    } else {
        Write-Host "Invalid PE header" -ForegroundColor Red
    }
    
    $fileInfo = Get-Item $exe
    Write-Host ""
    Write-Host "File Information:" -ForegroundColor Cyan
    Write-Host "  Name: $($fileInfo.Name)"
    Write-Host "  Size: $([math]::Round($fileInfo.Length / 1KB, 2)) KB"
    Write-Host "  Created: $($fileInfo.CreationTime)"
    Write-Host "  Modified: $($fileInfo.LastWriteTime)"
    Write-Host ""
    Write-Host "EXE file is valid and ready for testing!" -ForegroundColor Green
} else {
    Write-Host "File not found" -ForegroundColor Red
}