# Image Optimization Guide

This guide explains how to optimize images for the portfolio website.

## Prerequisites

Install the required tools:

### Option 1: Using npm packages (recommended)
```bash
npm install -g sharp-cli
```

### Option 2: Using system tools
- **macOS**: `brew install webp imagemagick`
- **Ubuntu/Debian**: `sudo apt-get install webp imagemagick`
- **Windows**: Download from [WebP website](https://developers.google.com/speed/webp/download)

## Optimization Process

### Step 1: Prepare Source Images

Place your original high-resolution images in a temporary folder (e.g., `images/originals/`).

### Step 2: Convert to WebP

Using cwebp (command-line):
```bash
# Single image
cwebp -q 80 images/originals/sunset-cityscape.jpg -o images/portfolio/sunset-cityscape.webp

# Batch convert all JPG files
for file in images/originals/*.jpg; do
  filename=$(basename "$file" .jpg)
  cwebp -q 80 "$file" -o "images/portfolio/${filename}.webp"
done
```

Using sharp-cli (Node.js):
```bash
sharp -i images/originals/sunset-cityscape.jpg -o images/portfolio/sunset-cityscape.webp --webp
```

### Step 3: Optimize JPEG Fallbacks

Using ImageMagick:
```bash
# Single image
convert images/originals/sunset-cityscape.jpg -quality 85 -strip images/portfolio/sunset-cityscape.jpg

# Batch convert
for file in images/originals/*.jpg; do
  filename=$(basename "$file")
  convert "$file" -quality 85 -strip "images/portfolio/${filename}"
done
```

Using sharp-cli:
```bash
sharp -i images/originals/sunset-cityscape.jpg -o images/portfolio/sunset-cityscape.jpg --jpeg
```

### Step 4: Resize Large Images

If images are larger than 1200px wide:

```bash
# Using ImageMagick
convert input.jpg -resize 1200x\> -quality 85 output.jpg

# Using sharp-cli
sharp -i input.jpg -o output.jpg --resize 1200
```

### Step 5: Verify File Sizes

Check that optimized images meet size requirements:
```bash
# List file sizes
ls -lh images/portfolio/

# Target sizes:
# - WebP: < 200KB
# - JPEG: < 300KB
```

## Online Tools (No Installation Required)

If you prefer not to install command-line tools:

1. **Squoosh** (https://squoosh.app/)
   - Upload image
   - Select WebP format, quality 80
   - Download optimized image
   - Repeat for JPEG format, quality 85

2. **TinyPNG** (https://tinypng.com/)
   - Upload JPEG images
   - Download compressed versions
   - Use Squoosh for WebP conversion

3. **CloudConvert** (https://cloudconvert.com/)
   - Batch convert images to WebP
   - Set quality to 80%

## Automated Script (Bash)

Create a file `scripts/optimize-images.sh`:

```bash
#!/bin/bash

# Image optimization script for portfolio website
# Requires: cwebp, ImageMagick

ORIGINALS_DIR="images/originals"
OUTPUT_DIR="images/portfolio"
WEBP_QUALITY=80
JPEG_QUALITY=85
MAX_WIDTH=1200

echo "Optimizing images from $ORIGINALS_DIR..."

for file in "$ORIGINALS_DIR"/*.{jpg,jpeg,png}; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    name="${filename%.*}"
    
    echo "Processing $filename..."
    
    # Resize if needed and create JPEG
    convert "$file" -resize ${MAX_WIDTH}x\> -quality $JPEG_QUALITY -strip "$OUTPUT_DIR/${name}.jpg"
    
    # Create WebP version
    cwebp -q $WEBP_QUALITY "$OUTPUT_DIR/${name}.jpg" -o "$OUTPUT_DIR/${name}.webp"
    
    echo "  Created: ${name}.jpg and ${name}.webp"
  fi
done

echo "Optimization complete!"
echo ""
echo "File sizes:"
ls -lh "$OUTPUT_DIR"/*.{jpg,webp} 2>/dev/null
```

Make it executable:
```bash
chmod +x scripts/optimize-images.sh
./scripts/optimize-images.sh
```

## Automated Script (PowerShell - Windows)

Create a file `scripts/optimize-images.ps1`:

```powershell
# Image optimization script for portfolio website
# Requires: cwebp.exe, magick.exe (ImageMagick)

$OriginalsDir = "images/originals"
$OutputDir = "images/portfolio"
$WebPQuality = 80
$JpegQuality = 85
$MaxWidth = 1200

Write-Host "Optimizing images from $OriginalsDir..."

Get-ChildItem -Path $OriginalsDir -Include *.jpg,*.jpeg,*.png -Recurse | ForEach-Object {
    $filename = $_.Name
    $name = $_.BaseName
    
    Write-Host "Processing $filename..."
    
    # Resize and create JPEG
    & magick $_.FullName -resize "${MaxWidth}x>" -quality $JpegQuality -strip "$OutputDir\${name}.jpg"
    
    # Create WebP version
    & cwebp -q $WebPQuality "$OutputDir\${name}.jpg" -o "$OutputDir\${name}.webp"
    
    Write-Host "  Created: ${name}.jpg and ${name}.webp"
}

Write-Host "Optimization complete!"
Write-Host ""
Write-Host "File sizes:"
Get-ChildItem -Path $OutputDir -Include *.jpg,*.webp | Format-Table Name, Length
```

Run it:
```powershell
.\scripts\optimize-images.ps1
```

## Verification Checklist

After optimization, verify:

- [ ] All images exist in both WebP and JPEG formats
- [ ] WebP files are smaller than JPEG files
- [ ] File sizes meet requirements (WebP < 200KB, JPEG < 300KB)
- [ ] Images display correctly in the browser
- [ ] WebP images load in Chrome/Firefox/Edge
- [ ] JPEG fallbacks load in Safari/older browsers
- [ ] All images have descriptive alt text in index.html
- [ ] Images have `loading="lazy"` attribute

## Testing

Test image loading:

1. Open index.html in Chrome DevTools
2. Go to Network tab
3. Filter by "Img"
4. Reload page
5. Verify:
   - WebP images load (not JPEG)
   - Images below fold load only when scrolling
   - Total image size is reasonable

Test fallback:

1. Open in Safari or use Chrome DevTools
2. Disable WebP support (DevTools > Rendering > Disable WebP)
3. Reload page
4. Verify JPEG images load

## Placeholder Images for Development

If you don't have real images yet, create simple placeholders:

```bash
# Using ImageMagick to create colored rectangles
convert -size 800x600 xc:#4A90E2 -pointsize 48 -fill white -gravity center \
  -annotate +0+0 "Sunset Cityscape" images/portfolio/sunset-cityscape.jpg

convert -size 800x600 xc:#E24A4A -pointsize 48 -fill white -gravity center \
  -annotate +0+0 "Abstract Geometry" images/portfolio/abstract-geometry.jpg

# Then convert to WebP
cwebp -q 80 images/portfolio/sunset-cityscape.jpg -o images/portfolio/sunset-cityscape.webp
cwebp -q 80 images/portfolio/abstract-geometry.jpg -o images/portfolio/abstract-geometry.webp
```

Or use online placeholder services temporarily:
- https://via.placeholder.com/800x600/4A90E2/FFFFFF?text=Sunset+Cityscape
- https://picsum.photos/800/600

## Resources

- [WebP Documentation](https://developers.google.com/speed/webp)
- [ImageMagick Documentation](https://imagemagick.org/index.php)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Web.dev Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
