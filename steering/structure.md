# Project Structure

## Website Organization

```
.
├── .kiro/                  # Kiro configuration and specs
│   ├── steering/          # AI assistant guidance documents
│   ├── specs/             # Feature and bugfix specifications
│   └── settings/          # Kiro settings (MCP config, etc.)
├── .vscode/               # VSCode workspace settings
├── css/                   # Stylesheets
│   └── style.css         # Main stylesheet
├── js/                    # JavaScript files
│   └── main.js           # Main script
├── images/                # Image assets
├── index.html            # Homepage
└── README.md             # Project documentation
```

## Kiro Directories

### `.kiro/steering/`
Contains markdown files that guide the AI assistant:
- `product.md` - Product overview and purpose
- `tech.md` - Technology stack and common commands
- `structure.md` - Project organization (this file)

### `.kiro/specs/`
Spec-driven development files organized by feature:
```
.kiro/specs/
└── {feature-name}/
    ├── requirements.md    # Feature requirements
    ├── design.md         # Technical design
    └── tasks.md          # Implementation tasks
```

## Conventions

### File Naming
- Use kebab-case for HTML files: `about-us.html`, `contact.html`
- Use lowercase for all web files
- Keep URLs clean and readable

### Code Organization
- One CSS file for small sites, split by component for larger sites
- Separate JavaScript by functionality (utils.js, animations.js, etc.)
- Keep images organized by type or page
- Use semantic HTML5 elements

## Asset Management

- Optimize images before adding (use WebP when possible)
- Keep original assets in separate folder if needed
- Use relative paths for portability
- Consider CDN for external libraries
