$ErrorActionPreference = "Stop"

$ScriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $ScriptPath) { $ScriptPath = "c:\Users\34607\Documents\qianyi\1\opencode-workspace\health-workspace" }

$InstallerScript = Join-Path $ScriptPath "installer-v4.ps1"
$OutputExe = Join-Path $ScriptPath "HealthWorkspace-Setup-v4.0.2.exe"

Write-Host "Building Health Workspace Installer EXE..." -ForegroundColor Green
Write-Host "Source: $InstallerScript" -ForegroundColor Cyan
Write-Host "Output: $OutputExe" -ForegroundColor Cyan

if (-not (Test-Path $InstallerScript)) {
    Write-Error "Installer script not found: $InstallerScript"
    exit 1
}

try {
    Import-Module ps2exe -Force -ErrorAction Stop
    
    Write-Host "Compiling PowerShell script to EXE..." -ForegroundColor Yellow
    
    Invoke-PS2EXE -inputFile $InstallerScript -outputFile $OutputExe -noConsole
    
    if (Test-Path $OutputExe) {
        $fileInfo = Get-Item $OutputExe
        Write-Host "Installer EXE created successfully!" -ForegroundColor Green
        Write-Host "File: $($fileInfo.FullName)" -ForegroundColor Cyan
        Write-Host "Size: $([math]::Round($fileInfo.Length / 1MB, 2)) MB" -ForegroundColor Cyan
        Write-Host "Created: $($fileInfo.CreationTime)" -ForegroundColor Cyan
    } else {
        Write-Error "Failed to create installer EXE"
        exit 1
    }
} catch {
    Write-Error "Build failed: $_"
    Write-Error "Stack trace: $($_.ScriptStackTrace)"
    exit 1
}

Write-Host "Build completed successfully!" -ForegroundColor Green