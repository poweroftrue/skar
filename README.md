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
├── index.html          # Main page (cases catalog)
├── shop.html           # Shop page (perfumes)
├── style.css           # All styles
├── main.js             # Navigation logic
├── Saudi_Riyal_Symbol.svg  # Currency icon
├── images/             # Product images
├── _headers            # Cloudflare Pages headers config
└── README.md           # This file
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

© 2025 SKAR · Riyadh

