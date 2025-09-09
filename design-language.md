# SKAR Design Language & Brand Soul

## Core Philosophy
**"For those who wear their scars with pride."**

SKAR is not just a fragrance brand—it's a statement of silent rebellion. Born from the Arabic word سكار (Skar), modified from "scar" for style, it represents the beauty in imperfection, the strength in silence, and the power of understated defiance.

## Design Principles

### 1. **Radical Minimalism**
- **Pitch black** (#000000) only. No gradients, no grays, no compromise.
- Maximum negative space—let the void speak.
- One element at a time, nothing competing for attention.
- If you can remove it, remove it.

### 2. **Typography as Identity**
- **MADE Soulmaze**: The soul of the brand. Bold, angular, unconventional.
- Massive scale: `clamp(8rem, 20vw, 24rem)` for hero elements.
- Product numbers (001, 002, 003) are statements, not labels.
- Supporting text: Minimal, whisper-light (opacity: 0.6).

### 3. **Product Presentation**
- **Apple-inspired scroll experience**: Natural, no hijacking.
- **Three distinct forms examples**:
  - 001: Classic tall bottle - "Liquid courage"
  - 002: Solid compact - "Portable rebellion"  
  - 003: Angular modern - "Dark matter"
- Products reveal themselves through scroll, not animation.
- 3D renders are subtle, sophisticated—glass with real physics.

## Visual Language

### Color Palette
```css
--absolute-black: #000000;  /* The only background */
--pure-white: #ffffff;      /* The only foreground */
--opacity-whisper: 0.6;     /* For secondary text */
--opacity-ghost: 0.3;       /* For distant elements */
```

### Spacing System
- Sections: `min-height: 100vh` - Full viewport experiences
- Product padding: `10vh 0` - Breathing room
- Grid gaps: `8vw` - Generous separation
- Text margins: Let it breathe

### Motion Philosophy
- **Scroll-driven only**: Position dictates animation
- **No continuous movement**: Static until interacted with
- **Subtle responses**: 
  - Logo fades as you scroll: `opacity: 1 - (scrolled / heroHeight * 0.5)`
  - Products scale: `1 - Math.abs(progress) * 0.1`
  - Text parallax: `translateY(progress * 30px)`

## Interaction Patterns


### Headlines example
- Short. Provocative. No fluff.
- "Liquid courage. 100ml."
- "Solid state. Portable rebellion."
- "Dark matter. Limited edition."

### Philosophy
- We don't explain. We state.
- Every word must earn its place.
- Silence is part of the message.

## Technical Standards

### Performance First
- Three.js with `antialias: true` but `pixelRatio: Math.min(2)`
- Canvas `transition: opacity 0.6s ease` for smooth reveals
- Intersection Observer for viewport-based rendering



### Responsive Approach
- Mobile first, but desktop matters
- Stack on small screens, maintain dignity
- Text scales: `clamp()` for fluid typography
- 3D scales with viewport

## The SKAR Experience

When visitors arrive, they're not just shopping—they're entering Skar's world. The story unfolds through scroll, revealing the transformation of a man deeply wounded by love into someone who collects hearts like trophies. Each product represents a chapter in his journey:

- **001 Liquid Courage**: The first night without her, bottled
- **002 Portable Rebellion**: Carrying the weight of betrayal everywhere  
- **003 Dark Matter**: Where light dies and power is born



## Future Considerations

### What to Add
- Nothing. The power is in what we don't show.
- If you must add: Make it earn its place.
- Every element should feel inevitable.

### What to Protect
- The black void—it's not empty, it's potential
- The scale—bigness is part of the rebellion  
- The silence—don't fill it with noise
- The mystery—never explain everything

## Implementation Checklist

When building new sections:
- [ ] Is it absolutely necessary?
- [ ] Can it be simpler?
- [ ] Does it maintain the void?
- [ ] Is the typography massive enough?
- [ ] Are interactions scroll-driven?
- [ ] Have you removed everything removable?
- [ ] Does it feel like SKAR?

## The Soul

SKAR is for those who understand that:
- Scars are stories, not flaws
- Silence is louder than screaming
- Black isn't the absence of color—it's the presence of everything
- Luxury isn't about addition—it's about reduction
- True rebellion is quiet confidence

**Remember**: We're not competing with other brands. We're creating a new category. The category of those who know.
