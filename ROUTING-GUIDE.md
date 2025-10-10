# SKAR Routing System

## Overview

Full URL-based routing system that works both **locally** and on **Cloudflare Pages** with clean, SEO-friendly URLs.

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

### Server-Side Support (Cloudflare)
Uses `_redirects` file for SPA routing on Cloudflare Pages:
```
/cases /index.html 200
/perfume /index.html 200
/perfume/* /index.html 200
/archive /index.html 200
/* /index.html 200
```

All routes serve `index.html` with status `200`, allowing JavaScript to handle routing.

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

Works perfectly with:
- **Live Server** (VS Code extension)
- **Python http.server**: `python -m http.server 8000`
- **Node http-server**: `npx http-server`
- Any static file server

The JavaScript router handles all URLs client-side.

## Cloudflare Pages Deployment

### Setup Steps

1. **Push to Git**:
   ```bash
   git add .
   git commit -m "Add routing system"
   git push
   ```

2. **In Cloudflare Dashboard**:
   - Go to Pages
   - Connect repository
   - Build settings:
     - Build command: (leave empty)
     - Build output directory: `/`
   - Deploy

3. **Enable Speed Features** (Optional):
   - Speed > Optimization > **Early Hints**: ON
   - Speed > Optimization > **Auto Minify**: CSS, JS, HTML
   - Speed > Optimization > **Brotli**: ON

### Files for Cloudflare

- `_redirects` - SPA routing configuration
- `_headers` - HTTP headers, preload hints, cache control

Both files are automatically recognized by Cloudflare Pages.

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

## Testing

### Local Testing
1. Start local server
2. Navigate to `http://localhost:8000/perfume/mayassa`
3. Should load and show Mayassa's story
4. Test browser back/forward buttons
5. Test all navigation links

### Cloudflare Testing
1. Deploy to Cloudflare Pages
2. Visit `https://your-site.pages.dev/perfume/mayassa`
3. Should load correctly (not 404)
4. Test all routes
5. Check Network tab for Early Hints (103 status)

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

