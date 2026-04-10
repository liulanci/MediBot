$ErrorActionPreference = "Stop"

Write-Host "Generating application icon..." -ForegroundColor Green

$iconPath = Join-Path $PSScriptRoot "icon.ico"
$svgPath = Join-Path $PSScriptRoot "icon.svg"

if (-not (Test-Path $svgPath)) {
    Write-Error "SVG icon file not found: $svgPath"
    exit 1
}

try {
    Add-Type -AssemblyName System.Drawing
    
    $bitmap = New-Object System.Drawing.Bitmap 256, 256
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(76, 175, 80))
    $graphics.FillEllipse($brush, 0, 0, 256, 256)
    
    $brush2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255))
    $graphics.FillEllipse($brush2, 44, 44, 168, 168)
    
    $brush3 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(33, 150, 243))
    $graphics.FillEllipse($brush3, 64, 64, 128, 128)
    
    $font = New-Object System.Drawing.Font("Arial", 48, [System.Drawing.FontStyle]::Bold)
    $brush4 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255))
    $stringFormat = New-Object System.Drawing.StringFormat
    $stringFormat.Alignment = [System.Drawing.StringAlignment]::Center
    $stringFormat.LineAlignment = [System.Drawing.StringAlignment]::Center
    $graphics.DrawString("HW", $font, $brush4, 128, 128, $stringFormat)
    
    $icon = [System.Drawing.Icon]::FromHandle($bitmap.GetHicon())
    $fileStream = [System.IO.File]::OpenWrite($iconPath)
    $icon.Save($fileStream)
    $fileStream.Close()
    
    $graphics.Dispose()
    $bitmap.Dispose()
    
    Write-Host "Icon generated successfully: $iconPath" -ForegroundColor Green
} catch {
    Write-Error "Failed to generate icon: $_"
    exit 1
}
