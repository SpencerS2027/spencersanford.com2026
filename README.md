# Spencer Sanford Portfolio Website

A personal portfolio website showcasing professional experience, artistic works, and technical projects. Built with pure HTML5, CSS3, and vanilla JavaScript for simplicity and performance.

## Project Structure

```
/
├── index.html              # Main HTML document (single-page application)
├── css/
│   ├── styles.css         # Main stylesheet with CSS custom properties
│   ├── critical.css       # Critical above-the-fold styles (inline in HTML)
│   └── responsive.css     # Media queries for responsive breakpoints
├── js/
│   ├── navigation.js      # Navigation and scroll handling
│   ├── responsive.js      # Viewport detection and layout adaptation
│   └── assets.js          # Image format detection and lazy loading
├── images/
│   ├── portfolio/         # Art portfolio images
│   ├── experience/        # Experience section images
│   └── icons/            # UI icons and favicon
├── content/              # Content data (optional)
└── README.md             # This file
```

## Content Update Guide

This website is designed to make content updates simple and straightforward. Follow these guidelines to add or modify content without touching CSS or JavaScript files.

### Adding Work Experience

1. Open `index.html`
2. Find the section: `<div class="experience-category">` with `<h3>Work Experience</h3>`
3. Add a new list item inside `<ul class="experience-list">`:

```html
<li class="experience-item">
  <h4 class="experience-title">Your Job Title</h4>
  <time class="experience-date" datetime="2023-01">January 2023</time>
  <p class="experience-description">Description of your role and achievements</p>
</li>
```

### Adding Hackathons

1. Open `index.html`
2. Find the section: `<div class="experience-category">` with `<h3>Hackathons</h3>`
3. Add a new list item with the same structure as work experience

### Adding Education/Classes

1. Open `index.html`
2. Find the section: `<div class="experience-category">` with `<h3>Education</h3>`
3. Add a new list item with the same structure as work experience

### Adding Personal Projects

1. Open `index.html`
2. Find the section: `<div class="experience-category">` with `<h3>Personal Projects</h3>`
3. Add a new list item with the same structure as work experience

### Adding Reviews (Books, Movies, Shows, Anime)

1. Open `index.html`
2. Find the section: `<div class="art-category">` with `<h3>Reviews</h3>`
3. Add a new article inside `<div class="art-grid">`:

```html
<article class="art-item">
  <h4>Review Title</h4>
  <p class="art-meta">Book/Movie/Show - Date</p>
  <p class="art-excerpt">Brief excerpt of your review (150 characters)...</p>
  <button class="read-more" aria-expanded="false">Read More</button>
  <div class="art-full-content" hidden>
    <p>Full review content goes here...</p>
  </div>
</article>
```

### Adding Prose/Writing Samples

1. Open `index.html`
2. Find the section: `<div class="art-category">` with `<h3>Prose</h3>`
3. Add a new article with the same structure as reviews

### Adding Visual Art

1. Prepare your images:
   - Create a WebP version (primary format): `artwork-name.webp`
   - Create a JPEG fallback: `artwork-name.jpg`
   - Place both in `images/portfolio/`

2. Open `index.html`
3. Find the section: `<div class="art-category">` with `<h3>Visual Art</h3>`
4. Add a new figure inside `<div class="art-grid">`:

```html
<figure class="art-item">
  <picture>
    <source srcset="images/portfolio/artwork-name.webp" type="image/webp">
    <img src="images/portfolio/artwork-name.jpg" alt="Description of artwork" loading="lazy">
  </picture>
  <figcaption>Artwork Title - Medium</figcaption>
</figure>
```

## Image Guidelines

- **Format**: Provide both WebP (primary) and JPEG/PNG (fallback) versions
- **Location**: 
  - Portfolio images: `images/portfolio/`
  - Experience images: `images/experience/`
  - Icons: `images/icons/`
- **Naming**: Use kebab-case (lowercase with hyphens): `my-artwork.webp`
- **Alt Text**: Always provide descriptive alt text for accessibility
- **Lazy Loading**: Add `loading="lazy"` attribute to images below the fold

## Deployment

This website is designed for GitHub Pages deployment:

1. Push changes to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Select the main branch as the source
4. Your site will be available at `https://yourusername.github.io/repository-name/`

## Technical Details

- **No Build Process**: Direct deployment from source files
- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **Performance**: Optimized with critical CSS, lazy loading, and WebP images
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support
- **Responsive**: Mobile-first design with breakpoints at 768px and 1024px

## Browser Support

- Modern browsers with ES6 support
- WebP fallback for older browsers
- Graceful degradation for JavaScript-disabled environments

## Maintenance

- Keep content in HTML files organized and commented
- Follow consistent naming conventions (kebab-case)
- Test on multiple devices and browsers after updates
- Validate HTML using [W3C Validator](https://validator.w3.org/)

## License

Personal portfolio website © Spencer Sanford
