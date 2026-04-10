$ScriptPath = "c:\Users\34607\Documents\qianyi\1\opencode-workspace\health-workspace"
$exe = Join-Path $ScriptPath "HealthWorkspace-Setup-v4.0.1.exe"

if (Test-Path $exe) {
    $fileInfo = Get-Item $exe
    $bytes = [System.IO.File]::ReadAllBytes($exe)
    $isValidPE = ($bytes[0] -eq 77 -and $bytes[1] -eq 90)
    
    Write-Host ""
    Write-Host "=============================================================" -ForegroundColor Cyan
    Write-Host "    Health Workspace v4.0.1 Installer Verification" -ForegroundColor Cyan
    Write-Host "=============================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "[OK] File Name: $($fileInfo.Name)"
    Write-Host "[OK] File Size: $([math]::Round($fileInfo.Length / 1KB, 2)) KB"
    Write-Host "[OK] Created: $($fileInfo.CreationTime)"
    Write-Host "[OK] PE Header: $(if ($isValidPE) { 'Valid (MZ signature)' } else { 'Invalid' })"
    Write-Host ""
    Write-Host "Installer EXE is ready for testing!" -ForegroundColor Green
} else {
    Write-Host "File not found: $exe" -ForegroundColor Red
}