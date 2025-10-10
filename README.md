# SKAR

A minimalist, Supreme-inspired e-commerce site for premium cases.

## Features

- Clean, minimal design
- Responsive layout
- Product catalog with locked/invite-only items
- Supreme-style navigation

## Deployment to Cloudflare Pages

### Option 1: Git Integration (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Click "Create a project"
4. Connect your Git repository
5. Configure build settings:
   - **Framework preset**: None
   - **Build command**: (leave empty)
   - **Build output directory**: `/`
6. Click "Save and Deploy"

Your site will be live at `https://your-project.pages.dev`

### Option 2: Direct Upload

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click "Create a project"
3. Select "Direct Upload"
4. Upload all files in this directory (or create a zip file)
5. Your site will be deployed instantly

## Cache Management

### Why Cache Issues Happen

Cloudflare caches your site for performance, but this means changes won't appear immediately. The `_headers` file in this project has aggressive no-cache rules, but you still need to purge Cloudflare's cache after deployment.

### Option 1: Manual Cache Purging (Quick & Easy)

After each deployment:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your domain
3. Go to **Caching** → **Configuration**
4. Click **Purge Everything** button
5. Confirm the purge

⚠️ **Note**: Purging everything will temporarily slow your site as the cache rebuilds. This is normal.

### Option 2: Selective Cache Purging (Better)

If you only want to clear specific files:

1. Go to **Caching** → **Configuration**
2. Click **Custom Purge**
3. Enter the URLs you want to purge:
   ```
   https://yourdomain.com/
   https://yourdomain.com/index.html
   https://yourdomain.com/style.css
   https://yourdomain.com/main.js
   ```
4. Click **Purge**

### Option 3: Development Mode (While Making Changes)

If you're actively developing and deploying:

1. Go to **Caching** → **Configuration**
2. Toggle **Development Mode** to **On**
3. This bypasses cache for 3 hours
4. Make your changes and test
5. Turn it **Off** when done

### Option 4: Manual API Call (Advanced)

Purge cache directly using cURL:

```bash
# Purge everything
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'

# Purge specific files
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"files":["https://yourdomain.com/","https://yourdomain.com/style.css","https://yourdomain.com/main.js"]}'
```

### Cache-Busting with Version Numbers

This project uses version query strings (e.g., `style.css?v=20251010`) to force browsers to fetch new files. 

**When you make changes to CSS or JS:**
1. Update the version number in `index.html`
2. Change `?v=20251010` to `?v=YYYYMMDD` (today's date)
3. Deploy
4. Purge cache

This ensures all users get the latest files.

### Quick Deployment Workflow

Here's the recommended workflow after making changes:

```bash
# 1. Update version numbers in index.html if you changed CSS/JS
# 2. Test locally
# 3. Commit and push (if using Git integration)
git add .
git commit -m "Update site"
git push

# 4. Wait for Cloudflare to deploy (~30 seconds)
# 5. Purge the cache via Cloudflare Dashboard:
#    - Go to Caching → Configuration → Purge Everything
#    OR use Development Mode while actively developing

# Done! Your changes are now live.
```

## Custom Domain

To add a custom domain:

1. Go to your Cloudflare Pages project
2. Click "Custom domains"
3. Add your domain
4. Update your DNS settings as instructed

## Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

## File Structure

```
/
├── index.html          # Main page (cases + perfumes + archive)
├── style.css           # All styles
├── main.js             # Navigation & checkout logic
├── Saudi_Riyal_Symbol.svg  # Currency icon
├── images/             # Product images (cases + perfume pods)
├── _headers            # Cloudflare cache control headers
├── robots.txt          # SEO robots file
├── favicon.svg         # Site favicon
├── PERFUME-IMAGES-NEEDED.md    # Guide for perfume pod images
├── PERFUME-PAGE-SUMMARY.md     # Implementation details
└── README.md           # This file
```

## Site Sections

The site now has three main sections accessible via navigation:

1. **cases** - Premium phone cases (Off White, Metallic Titanium, etc.)
2. **perfume** - Solid perfume pods inspired by Nord Fragrances
3. **archive** - Brand story and philosophy

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

© 2025 SKAR · Riyadh

