# SKAR Routing System

## Overview

Production-ready URL-based routing system using **Cloudflare Pages' native `_redirects` format** combined with client-side JavaScript routing. Works both **locally** and on **Cloudflare Pages** with clean, SEO-friendly URLs.

## Available Routes

### Main Pages
- `/` or `/cases` - Cases shop (default)
- `/perfume` - Perfume gallery with story cards
- `/archive` - Brand story/archive page

### Perfume Story Pages
- `/perfume/mayassa` or `/perfume/riyadh-night` - Mayassa's story (Riyadh Night)
- `/perfume/desert-wind` - The Wanderer's story (Desert Wind)
- `/perfume/sand-dune` - The Silent One's story (Sand Dune)

## How It Works

### Client-Side Routing (SPA)
Uses HTML5 History API for seamless navigation without page reloads:
- Click navigation updates URL and shows content
- Browser back/forward buttons work correctly
- Direct URL access loads correct page
- Smooth transitions between pages

### Server-Side Support (Cloudflare Pages)
Uses Cloudflare's **native `_redirects` file format** for optimal SPA routing:
```
# Main category pages
/cases           /index.html    200
/perfume         /index.html    200
/archive         /index.html    200

# Perfume story pages
/perfume/*       /index.html    200

# Catch-all fallback
/*               /index.html    200
```

**How it works:**
- All routes return `index.html` with HTTP status `200` (not 301/302)
- This is a **rewrite**, not a redirect (URL stays the same in browser)
- JavaScript router detects the URL and shows the correct content
- Works seamlessly on Cloudflare's edge network
- Zero configuration needed beyond the `_redirects` file

## Performance Optimizations

### 1. Resource Preloading
Critical resources are preloaded in HTML `<head>`:
```html
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="main.js" as="script">
<link rel="preload" href="Saudi_Riyal_Symbol.svg" as="image">
```

### 2. External Domain Preconnect
Establishes early connections to external domains:
```html
<link rel="preconnect" href="https://images.unsplash.com">
<link rel="preconnect" href="https://www.youtube.com">
```

### 3. Early Hints (Cloudflare)
HTTP headers in `_headers` file enable Early Hints:
```
Link: </style.css>; rel=preload; as=style
Link: </main.js>; rel=preload; as=script
```

Cloudflare automatically sends these as `103 Early Hints` before the full response.

### 4. Cache Strategy
- **HTML**: No cache (always fresh)
- **CSS/JS**: No browser cache, versioned via query params
- **Images**: 1-day cache, immutable
- **CDN**: Separate cache control for edge servers

## Local Development

### Recommended Setup
The JavaScript router handles all URLs client-side, so you can use any static server:

**Option 1: Python (Simple)**
```bash
python -m http.server 8000
# Visit: http://localhost:8000
```

**Option 2: Node.js http-server (Better for SPAs)**
```bash
npx http-server -p 8000
# Visit: http://localhost:8000
```

**Option 3: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"
- Perfect for development

**Note:** Direct file URLs (`file:///path/to/index.html`) won't work properly due to routing. Always use a local server.

## Cloudflare Pages Deployment

### Quick Deploy Guide

1. **Push to Git Repository**:
   ```bash
   git add .
   git commit -m "Update routing system"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Visit [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
   - Click "Create a project"
   - Select "Connect to Git"
   - Choose your repository
   - **Build settings:**
     - Framework preset: **None**
     - Build command: *(leave empty)*
     - Build output directory: **/**
   - Click "Save and Deploy"

3. **Verify Deployment**:
   - Wait ~1 minute for deployment
   - Test these URLs directly:
     - `https://your-site.pages.dev/`
     - `https://your-site.pages.dev/perfume`
     - `https://your-site.pages.dev/perfume/mayassa`
   - All should load without 404 errors

4. **Optional Performance Optimizations**:
   - Navigate to: **Speed > Optimization**
   - Enable **Early Hints**: Faster resource loading
   - Enable **Auto Minify**: CSS, JS, HTML
   - Enable **Brotli**: Better compression

### Key Files for Cloudflare

**`_redirects`** - Cloudflare's native SPA routing
- Automatically detected and processed
- No build step required
- Runs on Cloudflare's edge network
- Ultra-fast routing

**`_headers`** - HTTP headers and caching
- Controls cache behavior
- Enables Early Hints (103 status)
- Preload critical resources
- Automatically applied to all routes

**Why this approach is better:**
✅ Uses Cloudflare's native format (not custom scripts)
✅ Runs at the edge (no origin server needed)
✅ Zero build time
✅ Simple and maintainable
✅ Industry-standard approach

## SEO Benefits

### Clean URLs
- `/perfume/mayassa` instead of `/#/perfume/mayassa`
- Proper browser history
- Shareable links work correctly

### Metadata
Each route can have different:
- Page title
- Meta description
- Open Graph tags
- Twitter cards

(Currently shares same meta, but can be enhanced per route)

## Navigation Examples

### User Clicks Menu
```javascript
// User clicks "perfume" in menu
navigateTo('/perfume')
// → URL changes to /perfume
// → Perfume gallery shows
// → Menu updates active state
```

### User Clicks Perfume Card
```javascript
// User clicks "Riyadh Night" card
navigateTo('/perfume/mayassa')
// → URL changes to /perfume/mayassa
// → Story page shows
// → Breadcrumb updates
// → Scrolls to top
```

### User Clicks Breadcrumb
```javascript
// User clicks "perfume" in breadcrumb
navigateTo('/perfume')
// → URL changes back to /perfume
// → Returns to gallery
```

### User Clicks Browser Back
```javascript
// Browser back button
window.popstate event fires
navigateTo(previousPath, false)
// → URL goes back
// → Content updates
// → No new history entry
```

## Route Mapping

Internal route mapping in `main.js`:
```javascript
const routes = {
    '/': 'cases',
    '/cases': 'cases',
    '/perfume': 'perfume',
    '/perfume/mayassa': 'mayassaStory',
    '/perfume/riyadh-night': 'mayassaStory',
    '/perfume/desert-wind': 'desertWindStory',
    '/perfume/sand-dune': 'sandDuneStory',
    '/archive': 'archive'
};
```

## Adding New Routes

To add a new perfume story:

1. **Add HTML section** with unique ID
2. **Update route mapping**:
   ```javascript
   '/perfume/new-scent': 'newScentStory'
   ```
3. **Update navigateTo()** switch statement
4. **Add to _redirects** if needed

## How It Actually Works

### The Complete Flow

1. **User visits `/perfume/mayassa` directly**:
   ```
   Browser → Cloudflare Edge Server
   ```

2. **Cloudflare reads `_redirects` file**:
   ```
   Pattern: /perfume/*
   Action: Serve /index.html (HTTP 200)
   URL: Stays as /perfume/mayassa (no redirect)
   ```

3. **Browser receives `index.html`**:
   ```
   <html>
     <head>
       <script src="main.js"></script>
     </head>
   </html>
   ```

4. **JavaScript router activates**:
   ```javascript
   const path = window.location.pathname; // "/perfume/mayassa"
   const route = routes[path]; // "mayassaStory"
   navigateTo(path, false); // Show story, don't push history
   ```

5. **User sees the correct page** ✅

### Why This Is Better Than Hash Routing

**Hash Routing** (`/#/perfume/mayassa`):
- ❌ Not SEO-friendly
- ❌ Looks unprofessional
- ❌ Can't share clean URLs
- ❌ Doesn't work with social media previews

**Path Routing with `_redirects`** (`/perfume/mayassa`):
- ✅ SEO-friendly (Google can index)
- ✅ Clean, shareable URLs
- ✅ Works with Open Graph/Twitter cards
- ✅ Professional appearance
- ✅ Browser history works correctly

## Testing

### Local Testing
1. Start local server:
   ```bash
   python -m http.server 8000
   ```

2. Test direct URL access:
   ```
   http://localhost:8000/perfume/mayassa
   ```
   - Should load and show Mayassa's story
   - URL should stay as `/perfume/mayassa`
   - No 404 errors

3. Test navigation:
   - Click menu items
   - Use browser back/forward buttons
   - Click breadcrumbs
   - All should work smoothly

4. Test all routes:
   ```
   http://localhost:8000/
   http://localhost:8000/cases
   http://localhost:8000/perfume
   http://localhost:8000/perfume/mayassa
   http://localhost:8000/perfume/desert-wind
   http://localhost:8000/archive
   ```

### Cloudflare Testing

1. **Deploy to Cloudflare Pages**
2. **Test direct URL access** (most important):
   ```
   https://your-site.pages.dev/perfume/mayassa
   ```
   - Should load correctly (not 404)
   - Content should match the route

3. **Check browser console**:
   - No errors
   - Routes are being detected

4. **Test Edge Performance**:
   - Open DevTools → Network tab
   - Look for `103 Early Hints` status
   - Check response headers for cache control
   - Verify preload hints are working

5. **Test all routes from different devices**:
   - Desktop browsers
   - Mobile browsers
   - Share links via social media (check previews)

## Troubleshooting

### Problem: 404 on `/perfume` when deployed
**Solution:** 
- Verify `_redirects` file is in the root directory
- Check Cloudflare build output includes `_redirects`
- Wait 1-2 minutes after deployment for changes to propagate

### Problem: Routes work locally but not on Cloudflare
**Solution:**
- Ensure `_redirects` file has proper line endings (LF, not CRLF)
- Check file is named exactly `_redirects` (no extension)
- Verify deployment logs show `_redirects` was processed

### Problem: Content doesn't update after navigation
**Solution:**
- Check JavaScript console for errors
- Verify `hideAllViews()` function is working
- Check CSS `.hidden` class is defined

### Problem: Browser back button doesn't work
**Solution:**
- Verify `popstate` event listener is attached
- Check `navigateTo()` receives `pushState = false` on popstate
- Ensure history state is being set correctly

### Problem: Social media previews don't work
**Solution:**
- Add route-specific meta tags (future enhancement)
- Use Open Graph debugger tools
- Verify `_headers` file includes proper meta tag headers

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers

Requires JavaScript enabled (SPA architecture).

## Performance Metrics

Expected improvements:
- **TTFB**: Reduced via Early Hints
- **FCP**: Faster via resource preloading
- **LCP**: Improved via image preconnect
- **CLS**: Minimal (design is stable)

Monitor in Cloudflare Web Analytics after deployment.

---

**This routing system provides:**
✅ Clean URLs  
✅ Browser back/forward support  
✅ Direct URL access  
✅ Performance optimization  
✅ SEO-friendly structure  
✅ Works locally and on Cloudflare  
✅ No page reloads  
✅ Smooth user experience  

