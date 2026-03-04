# Portfolio Images

This directory contains visual art portfolio images in both WebP and JPEG formats.

## Image Optimization Guidelines

### Required Images

The following images are referenced in index.html and need to be created:

1. **sunset-cityscape** - Digital painting of a futuristic city skyline
2. **abstract-geometry** - Abstract geometric composition
3. **portrait-study** - Charcoal portrait study
4. **nature-landscape** - Watercolor landscape painting
5. **urban-sketch** - Ink sketch of a city street
6. **digital-collage** - Surreal digital collage

### Format Requirements

Each image must be provided in two formats:
- **WebP format** (.webp) - Primary format for modern browsers
- **JPEG format** (.jpg) - Fallback for older browsers

### Optimization Steps

1. **Convert to WebP**:
   ```bash
   # Using cwebp (WebP encoder)
   cwebp -q 80 input.jpg -o output.webp
   ```

2. **Compress JPEG**:
   ```bash
   # Using ImageMagick
   convert input.jpg -quality 85 -strip output.jpg
   ```

3. **Recommended Tools**:
   - [Squoosh](https://squoosh.app/) - Web-based image optimizer
   - [ImageOptim](https://imageoptim.com/) - Mac app for image compression
   - [TinyPNG](https://tinypng.com/) - Online PNG/JPEG compressor
   - cwebp - Command-line WebP encoder

### Size Guidelines

- Maximum width: 1200px
- Maximum file size: 200KB per image (WebP), 300KB (JPEG)
- Aspect ratio: Maintain original aspect ratio
- Quality: 80-85% for WebP, 85-90% for JPEG

### Naming Convention

- Use kebab-case for filenames
- Match the names referenced in index.html
- Example: `sunset-cityscape.webp`, `sunset-cityscape.jpg`

### Adding New Images

1. Create both WebP and JPEG versions
2. Optimize file sizes using tools above
3. Add to this directory
4. Update index.html with new `<picture>` element:

```html
<figure class="art-item">
  <picture>
    <source srcset="images/portfolio/your-image.webp" type="image/webp">
    <img src="images/portfolio/your-image.jpg" alt="Descriptive alt text" loading="lazy">
  </picture>
  <figcaption>Image Title - Medium, Year</figcaption>
</figure>
```

### Placeholder Images

For development/testing, you can use placeholder services:
- https://via.placeholder.com/800x600.jpg
- https://picsum.photos/800/600

Or create simple colored rectangles using any image editor.

## Current Status

The images directory currently contains .gitkeep files. Replace these with actual optimized images before deployment.
