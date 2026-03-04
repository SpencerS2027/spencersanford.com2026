# Deployment Guide

This document provides instructions for deploying the portfolio website to GitHub Pages or any static hosting service.

## Pre-Deployment Checklist

### ✓ Static Deployment Compatibility

- [x] **All file paths are relative** - No absolute paths used
- [x] **index.html is at root level** - Required for GitHub Pages
- [x] **No server-side processing required** - Pure static HTML/CSS/JS
- [x] **No build step needed** - Direct deployment from source
- [x] **All assets use relative paths** - CSS, JS, and images

### File Structure Verification

```
/
├── index.html              ✓ At root level
├── css/
│   ├── styles.css         ✓ Relative path
│   ├── critical.css       ✓ Relative path
│   └── responsive.css     ✓ Relative path
├── js/
│   ├── navigation.js      ✓ Relative path
│   ├── responsive.js      ✓ Relative path
│   └── assets.js          ✓ Relative path
├── images/
│   ├── portfolio/         ✓ Relative path
│   ├── experience/        ✓ Relative path
│   └── icons/             ✓ Relative path
└── README.md
```

## Deployment to GitHub Pages

### Step 1: Create GitHub Repository

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Portfolio website"

# Create repository on GitHub, then:
git remote add origin https://github.com/yourusername/yourrepository.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

### Step 3: Wait for Deployment

- GitHub Pages will build and deploy automatically
- Check the deployment status in the **Actions** tab
- Your site will be available at: `https://yourusername.github.io/yourrepository/`

### Step 4: Custom Domain (Optional)

To use a custom domain like `spencersanford.com`:

1. Add a `CNAME` file to the root directory:
   ```
   spencersanford.com
   ```

2. Configure DNS with your domain registrar:
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   
   Type: A
   Name: @
   Values:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   ```

3. In GitHub Pages settings, enter your custom domain
4. Enable **Enforce HTTPS**

## Deployment to Other Static Hosts

### Netlify

1. Create account at [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git repository
4. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
5. Click "Deploy site"

### Vercel

1. Create account at [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
5. Click "Deploy"

### Cloudflare Pages

1. Create account at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Click "Create a project"
3. Connect to your Git repository
4. Configure:
   - Build command: (leave empty)
   - Build output directory: `/`
5. Click "Save and Deploy"

### Manual Deployment (FTP/SFTP)

For traditional web hosting:

1. Connect to your hosting via FTP/SFTP
2. Upload all files to the public directory (usually `public_html` or `www`)
3. Ensure `index.html` is in the root of the public directory
4. Verify file permissions (644 for files, 755 for directories)

## Post-Deployment Verification

### Test Checklist

After deployment, verify the following:

- [ ] Website loads at the correct URL
- [ ] All CSS styles are applied correctly
- [ ] Navigation works (smooth scrolling to sections)
- [ ] All JavaScript functionality works
- [ ] Images load correctly (WebP in modern browsers, JPEG fallback)
- [ ] Lazy loading works for below-fold images
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] All links work (internal navigation)
- [ ] Performance metrics display in Technology section
- [ ] No console errors in browser DevTools
- [ ] HTTPS is enabled (if using custom domain)

### Browser Testing

Test in multiple browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Testing

Use these tools to verify performance:

1. **Google PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Target: 90+ score for both mobile and desktop

2. **WebPageTest**
   - URL: https://www.webpagetest.org/
   - Check load time, first contentful paint, etc.

3. **Lighthouse (Chrome DevTools)**
   - Open DevTools → Lighthouse tab
   - Run audit for Performance, Accessibility, Best Practices, SEO
   - Target: 90+ scores in all categories

## Troubleshooting

### Issue: CSS/JS not loading

**Solution**: Verify all paths are relative and files exist
```bash
# Check file structure
ls -la css/
ls -la js/
```

### Issue: Images not displaying

**Solution**: 
1. Verify images exist in `images/portfolio/` directory
2. Check file names match exactly (case-sensitive)
3. Ensure both WebP and JPEG versions exist

### Issue: 404 errors on GitHub Pages

**Solution**:
1. Verify `index.html` is at repository root
2. Check GitHub Pages is enabled in repository settings
3. Wait 5-10 minutes for deployment to complete

### Issue: Custom domain not working

**Solution**:
1. Verify DNS records are correct
2. Wait 24-48 hours for DNS propagation
3. Check CNAME file exists and contains correct domain
4. Ensure "Enforce HTTPS" is enabled in GitHub Pages settings

## Updating Content

To update the website after deployment:

1. Edit files locally
2. Test changes by opening `index.html` in browser
3. Commit and push changes:
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```
4. GitHub Pages will automatically redeploy (2-5 minutes)

## Rollback

To rollback to a previous version:

```bash
# View commit history
git log --oneline

# Rollback to specific commit
git revert <commit-hash>
git push

# Or reset to previous commit (destructive)
git reset --hard <commit-hash>
git push --force
```

## Monitoring

### Analytics (Optional)

To add Google Analytics:

1. Create Google Analytics account
2. Get tracking ID
3. Add to `index.html` before closing `</head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

### Uptime Monitoring (Optional)

Use services like:
- [UptimeRobot](https://uptimerobot.com/) - Free tier available
- [Pingdom](https://www.pingdom.com/)
- [StatusCake](https://www.statuscake.com/)

## Cost Breakdown

### GitHub Pages (Recommended)
- **Hosting**: $0/month
- **Domain**: ~$12/year (optional)
- **SSL Certificate**: Free (Let's Encrypt via GitHub)
- **Total**: $12/year

### Alternative Hosting
- **Netlify**: $0/month (free tier)
- **Vercel**: $0/month (free tier)
- **Cloudflare Pages**: $0/month (free tier)

All options provide:
- Unlimited bandwidth (within reasonable limits)
- Automatic HTTPS
- CDN distribution
- Automatic deployments from Git

## Support

For issues or questions:
1. Check this deployment guide
2. Review GitHub Pages documentation: https://docs.github.com/pages
3. Check repository issues on GitHub

## Next Steps

After successful deployment:

1. [ ] Add custom domain (optional)
2. [ ] Set up analytics (optional)
3. [ ] Add uptime monitoring (optional)
4. [ ] Share website URL
5. [ ] Update content regularly
6. [ ] Monitor performance metrics

---

**Last Updated**: January 2024
**Deployment Status**: Ready for production
