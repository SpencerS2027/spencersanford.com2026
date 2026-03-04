# Simple HTML5 validation script for PowerShell
# Checks for common HTML5 compliance issues

$htmlFile = Join-Path (Join-Path $PSScriptRoot "..") "index.html"
$html = Get-Content $htmlFile -Raw
$issues = @()

Write-Host "Validating HTML5 compliance for index.html...`n" -ForegroundColor Cyan

# Check for DOCTYPE
if (-not $html.TrimStart().StartsWith('<!DOCTYPE html>')) {
    $issues += "Missing or incorrect DOCTYPE declaration"
}

# Check for required meta tags
if ($html -notmatch '<meta charset=') {
    $issues += "Missing charset meta tag"
}
if ($html -notmatch '<meta name="viewport"') {
    $issues += "Missing viewport meta tag"
}

# Check for lang attribute on html tag
if ($html -notmatch '<html[^>]+lang=') {
    $issues += "Missing lang attribute on <html> tag"
}

# Check for title tag
if ($html -notmatch '<title>') {
    $issues += "Missing <title> tag"
}

# Check for duplicate IDs
$idMatches = [regex]::Matches($html, 'id=["'']([^"'']+)["'']')
$ids = @{}
foreach ($match in $idMatches) {
    $id = $match.Groups[1].Value
    if ($ids.ContainsKey($id)) {
        $issues += "Duplicate ID found: $id"
    }
    $ids[$id] = $true
}

# Check for alt attributes on images
$imgMatches = [regex]::Matches($html, '<img[^>]*>')
foreach ($match in $imgMatches) {
    if ($match.Value -notmatch 'alt=') {
        $issues += "Image tag missing alt attribute: $($match.Value.Substring(0, [Math]::Min(50, $match.Value.Length)))..."
    }
}

# Check for semantic HTML usage
$hasMain = $html -match '<main'
$hasNav = $html -match '<nav'
$hasHeader = $html -match '<header' -or $html -match '<h1'

if (-not $hasMain) {
    $issues += "Missing <main> element for main content"
}
if (-not $hasNav) {
    $issues += "Missing <nav> element for navigation"
}

# Display results
if ($issues.Count -eq 0) {
    Write-Host "HTML5 validation passed! No issues found." -ForegroundColor Green
    exit 0
} else {
    Write-Host "HTML5 validation found issues:" -ForegroundColor Yellow
    for ($i = 0; $i -lt $issues.Count; $i++) {
        $issueText = $issues[$i]
        Write-Host "  Issue $($i + 1): $issueText" -ForegroundColor Yellow
    }
    exit 1
}
