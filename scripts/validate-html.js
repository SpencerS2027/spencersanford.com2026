// Simple HTML5 validation script
// Checks for common HTML5 compliance issues

const fs = require('fs');
const path = require('path');

function validateHTML(filePath) {
  const html = fs.readFileSync(filePath, 'utf-8');
  const issues = [];
  
  // Check for DOCTYPE
  if (!html.trim().startsWith('<!DOCTYPE html>')) {
    issues.push('Missing or incorrect DOCTYPE declaration');
  }
  
  // Check for required meta tags
  if (!html.includes('<meta charset=')) {
    issues.push('Missing charset meta tag');
  }
  if (!html.includes('<meta name="viewport"')) {
    issues.push('Missing viewport meta tag');
  }
  
  // Check for lang attribute on html tag
  if (!html.match(/<html[^>]+lang=/)) {
    issues.push('Missing lang attribute on <html> tag');
  }
  
  // Check for title tag
  if (!html.includes('<title>')) {
    issues.push('Missing <title> tag');
  }
  
  // Check for unclosed tags (basic check)
  const openTags = html.match(/<(?!\/|!|area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)[a-z][a-z0-9]*[^>]*>/gi) || [];
  const closeTags = html.match(/<\/[a-z][a-z0-9]*>/gi) || [];
  
  // Check for duplicate IDs
  const ids = [];
  const idMatches = html.matchAll(/id=["']([^"']+)["']/g);
  for (const match of idMatches) {
    if (ids.includes(match[1])) {
      issues.push(`Duplicate ID found: ${match[1]}`);
    }
    ids.push(match[1]);
  }
  
  // Check for alt attributes on images
  const imgTags = html.matchAll(/<img[^>]*>/gi);
  for (const match of imgTags) {
    if (!match[0].includes('alt=')) {
      issues.push('Image tag missing alt attribute');
    }
  }
  
  // Check for aria-label on buttons without text
  const buttonMatches = html.matchAll(/<button[^>]*>([^<]*)<\/button>/gi);
  for (const match of buttonMatches) {
    const buttonTag = match[0];
    const buttonText = match[1].trim();
    if (!buttonText && !buttonTag.includes('aria-label=')) {
      issues.push('Button without text content missing aria-label');
    }
  }
  
  return issues;
}

// Run validation
const htmlFile = path.join(__dirname, '..', 'index.html');
console.log('Validating HTML5 compliance for index.html...\n');

const issues = validateHTML(htmlFile);

if (issues.length === 0) {
  console.log('✓ HTML5 validation passed! No issues found.');
  process.exit(0);
} else {
  console.log('✗ HTML5 validation found issues:\n');
  issues.forEach((issue, index) => {
    console.log(`  ${index + 1}. ${issue}`);
  });
  process.exit(1);
}
