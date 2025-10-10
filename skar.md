# SKAR Design System
## The Philosophy of Supreme-Inspired Minimalism

---

## Core Philosophy

**Restraint is luxury. White space is statement. Typography is brand.**

SKAR embodies the Supreme design philosophy: brutal simplicity, confident restraint, and intentional minimalism. Every element earns its place. Nothing decorative, only functional.

---

## Design Principles

### 1. **Intentional Restraint**
- Don't chase users; expect them to seek you out
- The design IS the message
- Confidence through simplicity
- No fanfare, just facts

### 2. **Mathematical Precision**
- Consistent spacing system
- Grid-based layouts
- Strict alignment (vertical & horizontal)
- Each element has breathing room

### 3. **Monochromatic Sophistication**
- Black background (#000000)
- White foreground (#FFFFFF)
- Gray scale for hierarchy (#1A1A1A, #999999)
- No gradients (except on swatches for material representation)
- No animations (except essential transitions)

### 4. **Typography as Brand Identity**
- System fonts only (Helvetica/SF Pro/Arial)
- Bold weights for headers, medium for navigation
- Generous letter-spacing (0.05em–0.1em)
- Uppercase treatment for secondary text
- Typography creates the brand voice

---

## Layout Architecture

### **Desktop Structure**
```
┌─────────────────────────────────────────────┐
│  [SKAR]            (Fixed Header)            │
│  Riyadh                                      │
├──────┬──────────────────────────────────────┤
│ new  │                                       │
│cases │         [Product Grid]                │
│refills│                                      │
│ all  │                                       │
│      │                                       │
└──────┴──────────────────────────────────────┘
   180px         Rest of screen
  Sidebar        Main Content
```

### **Mobile Structure** (< 768px)
```
┌─────────────────────────────────────────────┐
│  [SKAR]            (Fixed Header)            │
│  Riyadh                                      │
├─────────────────────────────────────────────┤
│                                              │
│         [Product Grid - Single Column]       │
│                                              │
│                                              │
└─────────────────────────────────────────────┘
```
**Sidebar disappears completely on mobile. Full-width content.**

---

## Spacing System

**Mathematical Progression:**
- `8px` → `16px` → `24px` → `32px` → `48px` → `64px` → `96px` → `128px`

**Gutters:**
- Desktop: 32px
- Mobile: 16px

**Key Spacing Rules:**
- Sections: 32–64px apart
- Product cards: 32px gaps on desktop, 24px on mobile
- Text elements: 4–8px for tight groupings
- Headers to content: 24–32px

---

## Components

### **1. Fixed Header (Top)**
```
SKAR                    ← Bold, 1.25rem, letter-spacing: 0.1em
Riyadh                  ← Gray, 0.6875rem, subtle
```
- Always visible, all pages
- Fixed position, z-index: 999
- Centered text
- Border-bottom: 1px solid rgba(255, 255, 255, 0.1)

### **2. Sidebar Menu (Left, Desktop Only)**
- Width: 180px
- Right-aligned text
- Menu items: 0.8125rem
- Active state: underline
- Hover: opacity 0.6
- 4px gap between items

### **3. Product Grid**
- Auto-fill: minmax(280px, 1fr)
- Gap: 32px desktop, 24px mobile
- Aspect ratio: 1:1 (square)
- Image: max 90% of container
- Hover: translateY(-4px)

### **4. Product Card Structure**
```
┌────────────────────────┐
│                        │
│    [Product Image]     │  ← Transparent PNG, 90% size
│                        │
├────────────────────────┤
│ SKAR Case             │  ← 0.875rem, medium weight
│ Off White             │  ← 0.8125rem, gray
│ $49                   │  ← 0.8125rem, white, medium
└────────────────────────┘
```

### **5. Locked Products**
- Image opacity: 30%
- Lock overlay: rgba(0, 0, 0, 0.3)
- Lock icon: 32px, white, centered
- Status text: "Invite Only" (uppercase, 0.75rem)
- **NO animations, NO shimmer, NO gradients**
- Pure minimalism: locked = dimmed + lock icon

---

## Color Swatches (When Used)

### **Purpose**
Represent actual material colors, not decorative

### **Style**
- 48px circles
- 2px border (transparent or subtle)
- Opacity: 30% for locked
- Lock icon: 18px, white, centered
- Dark overlay: rgba(0, 0, 0, 0.6)

### **Locked Behavior**
```
Click locked color → Show image + "This color is invite only" message
Click unlocked color → Show image + hide message
```

---

## Interaction Patterns

### **Navigation (Desktop)**
1. Click sidebar item → Update category title
2. No view switching needed (grid is always visible)
3. Active state: underline
4. Transition: 200ms ease

### **Navigation (Mobile)**
- Sidebar hidden
- Header remains
- Direct product browsing

### **Product Interaction**
- Hover: Lift 4px (translateY)
- Click: Navigate to detail page
- Transition: 200ms ease

---

## Typography Scale

| Element | Size | Weight | Letter-spacing | Transform |
|---------|------|--------|----------------|-----------|
| Header Logo | 1.25rem | Bold | 0.1em | None |
| Location | 0.6875rem | Normal | 0.02em | None |
| Menu Items | 0.8125rem | Normal | 0.02em | None |
| Category Title | 1.25rem | Medium | 0.02em | None |
| Product Name | 0.875rem | Medium | 0.02em | None |
| Product Color | 0.8125rem | Normal | - | None |
| Product Price | 0.8125rem | Medium | - | None |
| Status Text | 0.75rem | Normal | 0.05em | Uppercase |

---

## Key CSS Variables

```css
:root {
    /* Colors */
    --color-black: #FFFFFF;      /* Foreground */
    --color-white: #000000;      /* Background */
    --color-gray-light: #1A1A1A;
    --color-gray-medium: #999999;
    
    /* Typography */
    --font-primary: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Arial, sans-serif;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;
    
    /* Layout */
    --sidebar-width: 180px;
    --transition: 200ms ease;
}
```

---

## What Makes This Beautiful

### **1. No Unnecessary Elements**
- No hero sections with giant text
- No "About" pages cluttering the experience
- No footer links everywhere
- No social media icons
- No popup modals
- No loading animations
- No scroll indicators

### **2. Pure Functional Design**
- Logo tells you the brand
- Location tells you context
- Menu tells you categories
- Products show what you can buy
- Locked items create desire through simplicity

### **3. The Exclusive Lock Treatment**
**OLD APPROACH (Too Much):**
- ❌ Shimmer animations
- ❌ Gradient overlays
- ❌ Separate exclusive sections
- ❌ Fancy badges with blur effects
- ❌ Multiple lock icons pulsing

**FINAL APPROACH (Perfect):**
- ✓ 30% opacity
- ✓ Simple dark overlay
- ✓ One lock icon, centered
- ✓ "Invite Only" text
- ✓ No movement, no effects
- ✓ Like Supreme's "sold out" grays

**Philosophy:** 
Locked items don't need to scream. They just sit there, unavailable. The restraint creates desire.

### **4. Image Treatment**
- Transparent backgrounds (removed via rembg)
- Products float on black
- No border, no container styling
- Images speak for themselves
- Aspect ratio maintained

### **5. Mobile-First Responsive**
- Sidebar disappears completely (not hamburger menu)
- Single column grid
- Same content, different layout
- No compromise on quality

---

## The Supreme Influence

### **What We Learned from Supreme**
1. **Centered logo + timestamp/location** at top
2. **Minimal sidebar** (right-aligned text)
3. **Product grid as primary view** (not landing page)
4. **Clean product cards** (image + text, nothing else)
5. **Underline for active states** (not background colors)
6. **"view all" link** (not button)
7. **No animations** on category switching
8. **Monospaced feel** through consistent spacing
9. **Confidence in restraint** (let products shine)
10. **Mobile simplification** (remove sidebar entirely)

---

## Build Instructions

### **Structure**
```
/skar/
├── index.html          # Single page, grid view
├── style.css           # All styles, no frameworks
├── main.js             # Minimal JS (category switching)
└── images/             # Product PNGs (transparent bg)
    ├── off-white.png
    ├── glossy-black.png
    ├── metalic-titanium.png
    ├── matte-black.png  (locked)
    └── pink.png          (locked)
```

### **HTML Pattern**
```html
<header class="top-header">
  <h1 class="header-logo">SKAR</h1>
  <p class="header-location">Riyadh</p>
</header>

<aside class="sidebar">
  <nav class="sidebar-nav">
    <a href="#" class="menu-item active" data-category="cases">cases</a>
    <!-- more items -->
  </nav>
</aside>

<main class="main-content">
  <section class="shop-view">
    <div class="shop-header">
      <h2 class="shop-category">cases</h2>
      <a href="#" class="view-all-link">view all</a>
    </div>
    <div class="product-grid">
      <!-- product cards -->
    </div>
  </section>
</main>
```

### **CSS Pattern**
```css
/* Fixed header */
.top-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

/* Sidebar (desktop only) */
.sidebar {
    position: fixed;
    left: 0;
    width: 180px;
}

/* Main content offset */
.main-content {
    margin-left: 180px;
    margin-top: 80px;
}

/* Mobile: remove sidebar */
@media (max-width: 768px) {
    .sidebar { display: none; }
    .main-content { margin-left: 0; }
}
```

---

## The Journey

### **Evolution of SKAR Design**

**Phase 1: Over-designed**
- Multiple sections (hero, highlights, about, footer)
- Fancy animations and gradients
- Too much explanation
- Trying too hard

**Phase 2: Supreme Discovery**
- Studied Supreme Japan's site
- Analyzed their restraint
- Learned about confident minimalism
- Understood white space as luxury

**Phase 3: Simplification**
- Removed hero sections
- Removed about pages
- Removed footer clutter
- Focused on product grid

**Phase 4: Locked Product Evolution**
- Started with shimmer effects and gradients
- Too flashy, not Supreme-like
- Reduced to simple opacity + lock icon
- Perfection through subtraction

**Phase 5: Final Polish**
- Fixed header on all pages
- Sidebar right-aligned
- Mobile sidebar removal
- Pure product focus

---

## Key Learnings

### **What Doesn't Work**
- ❌ Animations for the sake of animation
- ❌ Gradients everywhere
- ❌ Multiple sections fighting for attention
- ❌ Decorative elements
- ❌ Trying to explain too much
- ❌ Hover effects that are too dramatic
- ❌ Locked items with shimmer/pulse effects

### **What Does Work**
- ✓ Black background, white text, gray hierarchy
- ✓ System fonts (no custom fonts needed)
- ✓ Generous white space
- ✓ Consistent spacing system
- ✓ Grid layouts that breathe
- ✓ Subtle hover effects (4px lift)
- ✓ Locked items with simple dimming
- ✓ Product images with transparent backgrounds
- ✓ Sidebar that disappears on mobile
- ✓ Fixed header that stays
- ✓ Underlines for active states
- ✓ Letting the products be the hero

---

## The Locked Product Strategy

### **Marketing Genius**
1. Show all 5 colors in the grid
2. Make 2 colors "Invite Only"
3. Dim them but keep them visible
4. Add simple lock icon
5. Let users click and see the product
6. Show "Invite Only" message
7. Create desire through scarcity

### **Why It Works**
- Users can SEE what they can't have
- Creates FOMO (fear of missing out)
- Status symbol ("invite only")
- No explanation needed
- Confidence in exclusivity
- Like Supreme's limited drops

---

## The Final Result

**A website that:**
- Loads instantly (no frameworks)
- Works everywhere (responsive)
- Looks expensive (minimal design)
- Creates desire (locked products)
- Respects the user (no popups/clutter)
- Embodies the brand (premium/simple)

**In the words of Supreme's philosophy:**
> "Don't try to please everyone. Please yourself. The right people will find you."

SKAR does exactly that.

---

## Rebuild Checklist

If you need to rebuild SKAR from scratch, follow this order:

### 1. **HTML Structure**
- [ ] Fixed header (logo + location)
- [ ] Sidebar with menu items
- [ ] Main content area
- [ ] Product grid with cards
- [ ] Locked products with lock SVG

### 2. **CSS Styling**
- [ ] CSS variables for colors/spacing
- [ ] Fixed header styles
- [ ] Sidebar (right-aligned text)
- [ ] Product grid (auto-fill)
- [ ] Product cards (image + info)
- [ ] Locked overlay (opacity + lock icon)
- [ ] Mobile responsive (hide sidebar)

### 3. **JavaScript**
- [ ] Category switching (update title)
- [ ] Active state management
- [ ] Minimal, functional only

### 4. **Assets**
- [ ] Remove backgrounds from product images
- [ ] Save as PNG with transparency
- [ ] Ensure consistent image quality

### 5. **Polish**
- [ ] Test all menu items
- [ ] Test locked product clicks
- [ ] Test mobile layout
- [ ] Remove any unnecessary code
- [ ] Ensure fast load times

---

## Closing Thoughts

**This is what makes SKAR beautiful:**

Not the colors. Not the typography. Not the spacing.

It's the **restraint**.

Every line of code earns its place. Every pixel has purpose. Nothing is decorative. Everything is intentional.

Supreme taught us that luxury doesn't need to explain itself. It just exists, confident in its simplicity.

SKAR embodies that philosophy.

**The design is the message.**

---

*Built with restraint. Inspired by Supreme. Perfected through subtraction.*

**— SKAR Design System, 2025**

