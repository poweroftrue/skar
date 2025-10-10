# SKAR Perfume Page - Storytelling Implementation

## The Leap Forward

Unlike the cases page which uses a simple product grid, the perfume section takes a completely different approach: **each perfume is a human story**.

## Design Philosophy

### Cases vs Perfumes
- **Cases**: Grid layout, minimal text, product-focused
- **Perfumes**: Story layout, narrative text, emotion-focused

The perfume page is designed to connect emotionally. Each fragrance comes with a real human story told in clean, evocative text alongside the product image.

## Layout Structure

### Story Card Layout
Each perfume uses a horizontal card with two columns:
- **Left**: Product image (400px wide, 4:5 aspect ratio)
- **Right**: Story content (flexible width)

### Story Content Includes:
1. **Title** - Perfume name (2rem, lowercase)
2. **Story Text** - 2-3 paragraphs of narrative
3. **Meta Section** - Scent notes + price

## The Stories

### Desert Wind
A story about solitude and clarity. About the shamal wind that sweeps through the Empty Quarter. For the wanderers who find peace in the desert.

**Narrative themes**: Independence, desert wisdom, honest authenticity

### Riyadh Night  
A story about transformation and arrival. About Riyadh after sunset when the city comes alive. For those in the moment between who they were and who they're becoming.

**Narrative themes**: Urban confidence, possibility, magnetic presence

### Sand Dune
A story about silence and calm. About finding peace at the crest of a dune. For those who understand that real confidence is quiet.

**Narrative themes**: Minimalism, inner peace, understated strength

### Royal Oud (Locked)
A story about earned exclusivity. Brief, mysterious text about stories that aren't told but earned.

**Narrative themes**: Trust, patience, exclusivity

## Writing Style

### Voice
- Lowercase throughout (matching SKAR brand)
- Second person ("you") to create intimacy
- Short sentences. Poetic. Direct.
- No excess. Clean text.

### Structure
Each story follows this pattern:
1. **Opening**: Set the scene (place, time, feeling)
2. **Middle**: Connect to the person wearing it
3. **Close**: Tie back to the scent itself

### Language Principles
- ✅ Evocative but restrained
- ✅ Riyadh-focused references
- ✅ Emotion over description
- ✅ Show, don't tell
- ❌ No clichés or marketing speak
- ❌ No excessive adjectives
- ❌ No trying too hard

## Technical Implementation

### HTML Structure
```html
<article class="perfume-story-card">
  <div class="perfume-story-image">
    <img>
    <span class="stock-indicator">
  </div>
  <div class="perfume-story-content">
    <h3 class="perfume-story-title">
    <div class="perfume-story-text">
      <p>Story paragraph 1</p>
      <p>Story paragraph 2</p>
      <p>Story paragraph 3</p>
    </div>
    <div class="perfume-story-meta">
      <p class="perfume-notes">
      <p class="perfume-price">
    </div>
  </div>
</article>
```

### CSS Approach
- **Grid layout**: Two columns on desktop
- **Stack layout**: Single column on mobile
- **Spacing**: Generous gaps (80px between cards)
- **Typography**: 
  - Title: 2rem
  - Story: 1rem, 1.8 line-height
  - Notes: 0.875rem italic

### Interaction
- **Hover effect**: Slight translateX(8px) shift
- **Image hover**: Scale(1.02) on image
- **Clickable**: Opens checkout modal (same as cases)
- **Locked cards**: No hover effect, cursor not-allowed

## Responsive Design

### Desktop (>968px)
- Two-column grid layout
- Image 400px wide
- Text fills remaining space

### Tablet (768px-968px)
- Single column stack
- Image centered, max-width 400px
- Text below image

### Mobile (<768px)
- Single column
- Image max-width 320px
- Reduced font sizes
- Reduced spacing (64px gaps)

### Small Mobile (<480px)
- Image max-width 280px
- Title 1.25rem
- Story 0.875rem
- Meta section stacks vertically

## User Experience Flow

1. User clicks "perfume" in navigation
2. View switches from cases grid to story layout
3. User scrolls through perfume stories
4. Each card tells a complete narrative
5. User clicks card → checkout modal opens
6. Modal shows product (same as cases checkout)

## Why This Approach Works

### Differentiation
- Cases are transactional → Perfumes are emotional
- Cases show product → Perfumes tell stories
- Cases are quick → Perfumes invite you to linger

### Brand Building
- Stories create connection beyond product
- Riyadh references build local identity
- Poetic language matches premium positioning
- Clean text reflects minimalist philosophy

### Conversion Psychology
- Stories create emotional investment
- Narrative sells more than features
- Personal connection increases purchase intent
- Exclusivity (Royal Oud) creates desire

## Images Still Needed

Add these SVG/PNG files to `/images/`:
- `perfume-desert-wind.svg`
- `perfume-riyadh-night.svg`
- `perfume-sand-dune.svg`
- `perfume-royal-oud.svg`

Style: Solid perfume pods (like Nord Fragrances), transparent background, consistent with SKAR minimal aesthetic.

## Files Modified

### index.html
- Replaced perfume grid with story cards
- Added complete narrative text for each perfume
- Updated class names (perfume-story-*)

### style.css  
- New `.perfume-view` section
- Story card grid layout
- Responsive breakpoints for story layout
- Hover effects and transitions

### main.js
- Added `perfumeStoryCards` selector
- Separate click handlers for story cards
- Maintained checkout modal integration

## Success Metrics

✅ Each perfume tells a complete story
✅ Text is clean, poetic, and human
✅ Layout is visually distinct from cases
✅ Responsive design works on all devices
✅ Checkout integration maintained
✅ Locked perfume has appropriate treatment
✅ Brand voice consistent throughout

## What Makes This Special

This isn't just an e-commerce page. It's a reading experience. Each perfume is a micro-story that someone might actually enjoy reading, even if they're not buying.

The text is good enough to stand on its own. The products are vehicles for stories about place, identity, and feeling.

That's the leap forward.

---

**Built with stories. Inspired by Riyadh. Written like humans.**

— SKAR Perfume Stories, 2025
