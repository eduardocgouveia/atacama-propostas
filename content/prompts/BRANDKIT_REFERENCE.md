# Atacama Digital — Brand Kit & Visual Reproduction Guide

> **Purpose:** Complete brand kit for reproducing the visual identity of atacama.digital. Use this to build commercial presentations, landing pages, HTML proposals, forms, standalone pages, or any material that needs to look like Atacama Digital.
>
> **How to use:** Attach this entire `brandkit/` folder (or at minimum this `.md` file) to a Claude Code (or any AI assistant) conversation. The tokens, rules, patterns, and templates below provide full context to reproduce the aesthetic. Brand images and logo files are included alongside this document.
>
> **Folder structure:**
> ```
> brandkit/
> ├── atacama-brandkit.md          ← This file (rules, tokens, templates)
> ├── images/                      ← Brand photography (14 WebP + 1 JPG)
> │   ├── atacama-digital-canyons.webp
> │   ├── atacama-digital-deserto-areia-vento.webp
> │   ├── atacama-digital-areia-ceu.webp
> │   ├── atacama-digital-modelo-abstrato.webp
> │   ├── atacama-digital-socios.jpg
> │   └── ... (+ 10 more)
> ├── logos/
> │   ├── svg/                     ← Logo SVGs (fill="currentColor")
> │   │   ├── atacama-digital-logotipo-default.svg
> │   │   ├── atacama-digital-logotipo-horizontal.svg
> │   │   ├── atacama-digital-simbolo.svg
> │   │   ├── atacama-cosmos-simbolo.svg
> │   │   ├── atacama-orbita-simbolo.svg
> │   │   ├── atacama-compass-simbolo.svg
> │   │   └── ... (+ 2 more)
> │   ├── webp/                    ← Logo rasters (black/white, avatars)
> │   └── gif/                     ← Logo reveal animations
> ```
>
> **Tech flexibility:** Templates are written in plain HTML + CSS + SVG (zero dependencies, opens in any browser). You can also use **React + Tailwind CSS** — the tokens and patterns translate directly:
> - CSS custom properties map to Tailwind `@theme` extensions
> - Orbit draw-in animations work with Framer Motion (`motion.path` + `pathLength`)
> - The shimmer button maps to a reusable component with `conic-gradient` + CSS animations
> - Grain overlay works as a Tailwind `after:` pseudo-element utility

---

# Part I — Brand Identity

## 1. Institutional Color Palette

**3 colors only. All UI derives from these via monochromatic gray scale.**

| Name | Hex | Role |
|---|---|---|
| **Blackout** | `#000000` | Primary dark backgrounds, text on light |
| **Silver Gray** | `#DBDCDD` | Alternate section backgrounds, card surfaces |
| **Pure White** | `#FFFFFF` | Light backgrounds, primary text on dark |

### 1.1 Orange Desert — Atmospheric Only

| Hex | Allowed | Forbidden |
|---|---|---|
| `#E13F07` | Photography overlays, gradient glows, decorative SVGs, background radial accents, subtle hover glow (not color change) | Buttons, text, borders, icons, badges, tags, status indicators, form elements, any interactive/informational element |

**Rule:** Max 1-2 orange atmospheric details per screen. It creates mood, never carries information.

### 1.2 UI Gray Scale

| Token | Hex | Role |
|---|---|---|
| `gray-90` | `#1A1A1A` | Dark card backgrounds |
| `gray-80` | `#222222` | Secondary dark surfaces |
| `gray-70` | `#3A3A3A` | Dark borders, dividers |
| `gray-60` | `#6B6B6B` | Muted text on light |
| `gray-50` | `#959595` | Secondary labels |
| `gray-30` | `#C4C4C4` | Disabled text, placeholders |
| `gray-10` | `#EEEEEE` | Alternate light surfaces |

### 1.3 Semantic Color Tokens (CSS Variables)

```css
:root {
  /* Dark theme (default) */
  --background: #000000;
  --foreground: #FFFFFF;
  --card: #1A1A1A;
  --card-foreground: #FFFFFF;
  --primary: #FFFFFF;
  --primary-foreground: #000000;
  --secondary: #222222;
  --muted: #222222;
  --muted-foreground: #A0A0A0;
  --border: rgba(255, 255, 255, 0.16);
  --input: rgba(255, 255, 255, 0.20);
  --ring: rgba(255, 255, 255, 0.30);
  --destructive: #9C1F27;
}
```

Light theme overrides (applied via `.light` or `.section-light` class):

```css
.section-light {
  --background: #FFFFFF;
  --foreground: #000000;
  --card: #FFFFFF;
  --card-foreground: #000000;
  --muted: #EEEEEE;
  --muted-foreground: #6B6B6B;
  --border: rgba(0, 0, 0, 0.16);
}

.section-silver {
  --background: #DBDCDD;
  --foreground: #000000;
  --card: #FFFFFF;
  --card-foreground: #000000;
  --muted-foreground: #3A3A3A;
  --border: rgba(0, 0, 0, 0.20);
}
```

---

## 2. Sub-Brand Palettes & Atmospheres

### 2.1 COSMOS (Método COSMOS) — Nebular/Cosmic

| Token | Hex |
|---|---|
| Background | `#03070A` |
| Red | `#9C1F27` |
| Red Glow | `#FC7D8E` |
| Blue Deep | `#1B68B8` |
| Blue Mid | `#5E97E4` |
| Blue Light | `#9DB7F0` |
| Purple | `#9E8FD0` |

**Atmosphere gradient:**

```css
background:
  radial-gradient(ellipse at -15% 60%, rgba(156,31,39,0.50) 0%, rgba(120,18,25,0.22) 18%, rgba(80,10,15,0.07) 32%, transparent 50%),
  radial-gradient(ellipse at 48% 10%, rgba(27,104,184,0.48) 0%, rgba(30,75,175,0.22) 20%, rgba(15,45,120,0.07) 38%, transparent 58%),
  radial-gradient(ellipse at 82% 35%, rgba(35,75,170,0.18) 0%, rgba(20,50,120,0.05) 32%, transparent 50%),
  radial-gradient(ellipse at 15% 25%, rgba(158,143,208,0.28) 0%, rgba(94,151,228,0.10) 20%, transparent 40%),
  radial-gradient(ellipse at 95% 10%, rgba(110,75,165,0.10) 0%, transparent 28%),
  #03070A;
```

Always pair with grain overlay. Always white text.

### 2.2 ORBITA (Mentoria ORBITA) — Organic/Prosperous

| Token | Hex |
|---|---|
| Background | `#01080D` |
| Green | `#1DB954` |
| Green Deep | `#0A4A2F` |
| Teal | `#0D4D4D` |

**Atmosphere gradient:**

```css
background:
  radial-gradient(ellipse at 20% 35%, rgba(29,185,84,0.70) 0%, transparent 50%),
  radial-gradient(ellipse at 55% 55%, rgba(10,74,47,0.60) 0%, rgba(13,77,77,0.50) 40%, transparent 65%),
  #01080D;
```

Always pair with grain overlay. Always white text.

### 2.3 Compass (Atacama Compass) — Desert/Strategic

- Background: Desert canyon photography with gradient overlay
- Color tones: Orange photography tones (natural, not #E13F07)
- Atmosphere: Photo texture, **no grain**
- Always white text on photo backgrounds

---

## 3. Typography

### 3.1 Font Families

| Font | Role | Never use for |
|---|---|---|
| **Inter Tight** | ALL functional UI: body, headings, nav, forms, buttons, labels, captions | — |
| **Cormorant Unicase** | Hero taglines, brand slogans, section titles (h2/h3) in editorial layouts | Buttons, navigation, labels, body text, app headings |

**Google Fonts import:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Unicase:wght@500;600;700&family=Inter+Tight:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 3.2 Cormorant Unicase Rules

```css
font-family: 'Cormorant Unicase', Georgia, serif;
font-weight: 600; /* Medium 500, SemiBold 600, Bold 700 */
letter-spacing: -0.025em;
line-height: 0.9;
```

### 3.3 Type Scale

| Token | Size | Weight | Usage |
|---|---|---|---|
| `display-xl` | 96px | 800 | Impact numbers (+250, +10M) |
| `display-lg` | 72px | 800 | Hero headlines |
| `heading-editorial` | 56px | 600 (Cormorant) | Taglines ("Welcome to Clarity.") |
| `heading-1` | 48px | 800 | Page titles |
| `heading-2` | 36px | 700 | Section subtitles |
| `heading-3` | 24px | 600 | Card titles |
| `eyebrow` | 11px | 400 | Tracked uppercase labels (`letter-spacing: 0.25em`) |
| `body-lg` | 18px | 400 | Lead paragraphs |
| `body-md` | 16px | 400 | Default body text |
| `body-sm` | 14px | 400 | Secondary text, captions |
| `label-coord` | 10px | 400 | Geographic coordinates |
| `price` | 40px | 400 | Monetary values |

### 3.4 Fluid Sizing (recommended for headings)

```css
font-size: clamp(2.5rem, 6vw, 4.5rem);  /* hero tagline */
font-size: clamp(2rem, 5vw, 3.5rem);    /* section titles */
font-size: clamp(1.5rem, 3vw, 2rem);    /* sub-headings */
```

---

## 4. Logo System

### 4.1 Logo Variants

| Asset | Description | ViewBox |
|---|---|---|
| `atacama-digital-logotipo-default.svg` | Stacked: ATACAMA + DIGITAL below | `0 0 7440 1990` |
| `atacama-digital-logotipo-horizontal.svg` | Single-line (product compositions) | `0 0 10180 1240` |
| `atacama-digital-logotipo-atcma.svg` | Reduced: ATCMA only | `0 0 5443.95 1240` |
| `atacama-digital-simbolo.svg` | Symbol A submark | `0 0 1700 1240` |
| `atacama-cosmos-simbolo.svg` | COSMOS starburst | `0 0 1211 1250` |
| `atacama-orbita-simbolo.svg` | ORBITA double-A | `0 0 432 624` |
| `atacama-compass-simbolo.svg` | COMPASS compass-rose | `0 0 738 627` |

All SVGs use `fill="currentColor"` — color controlled via CSS `color` on parent element.

### 4.2 Logo Usage Rules

- **Never** reproduce the logo typographically — always use official SVG/image assets
- **Never** tilt, distort, stretch, add effects (shadows/outlines/gradients), or alter symbol independently
- **Never** place on busy backgrounds without sufficient contrast
- **Minimum size:** 14px height (digital), 5mm (print)
- **Protection zone:** Width of letter "A" on all sides (no graphic intrusion)
- **Dark/light:** Use CSS `color` inheritance or CSS alternation (`dark:hidden` / `hidden dark:block`). Never use `useTheme()` for image src (hydration mismatch)

### 4.3 Product Logo Composition

Pattern: `[Symbol] PRODUCT NAME ^(by ATACAMA DIGITAL)`

The "by" + horizontal logotype sits as a **superscript** (like x²), aligned to the top of the product name.

```html
<div style="display: flex; align-items: center; gap: 12px; color: #fff;">
  <!-- Symbol SVG (adjust height for context) -->
  <svg style="height: 28px; width: auto;" viewBox="..." fill="currentColor">...</svg>
  <!-- Name + by cluster -->
  <span style="display: flex; align-items: flex-start;">
    <span style="font-family: 'Inter Tight', sans-serif; font-weight: 400; font-size: 28px; letter-spacing: 0.05em; line-height: 1;">COSMOS</span>
    <span style="margin-left: 6px; margin-top: 2px; display: flex; align-items: center; gap: 4px;">
      <span style="font-size: 10px; opacity: 0.6;">by</span>
      <svg style="height: 10px; width: auto; opacity: 0.8;" viewBox="0 0 10180 1240" fill="currentColor"><!-- logotipo horizontal paths --></svg>
    </span>
  </span>
</div>
```

### 4.4 Logo Reveal Animation

- `atacama-digital-logo-reveal-white.gif` — white on black (dark contexts)
- `atacama-digital-logo-reveal-black.gif` — black on white (light contexts)
- One-shot effect. Never loop, crop, speed up, or overlay.

---

## 5. Brand Taglines

| Tagline | Context |
|---|---|
| "Welcome to Clarity." | Main slogan |
| "Lead the Way. Shape the Future." | Corporate positioning |
| "Reshaping the Digital Future." | Tech proposition |
| "You Set the Vision. We Bring the Light." | OOH / campaigns |
| "Own the Game. Rewrite the Rules." | Digital/web |
| "The one and only." | Google Partner Premier |

---

## 6. Fixed Brand Elements

Present on every hero/composition:

- **Coordinates:** `8°02'36.6" S` (bottom-left) / `34°53'53.5" W` (bottom-right)
- **Brand label:** `ATACAMA.DIGITAL` (uppercase, Inter Tight, 10px, subtle opacity)
- On client-specific materials, coordinates may be omitted.

---

## 7. Brand Photography

### 7.1 Usage Rules

- Always used as **background textures** with dark overlay, never standalone content
- Opacity: `opacity: 0.30` to `opacity: 0.40` — image creates texture, doesn't compete with content
- Always add gradient overlay to guarantee **WCAG 4.5:1 contrast** with white text
- `loading="lazy"` for below-fold; `priority` only for Hero
- `alt=""` for decorative backgrounds (accessibility)
- All images are pre-optimized WebP

### 7.2 Photography Direction

- Desert landscapes with warm orange tones
- Human subjects: introspective poses, clean backgrounds, mandatory orange accents (backlighting, glow, device reflections)
- Color cohesion: all photography curated around Orange Desert (#E13F07) warmth

### 7.3 Current Image Assignments

| Image | Section | Priority | Opacity |
|---|---|---|---|
| `atacama-digital-canyons.webp` | Hero | priority, parallax | 40% |
| `atacama-digital-deserto-areia-vento.webp` | CTA | lazy, static | 30% |
| `atacama-digital-modelo-abstrato.webp` | About | lazy, editorial bleed | 65% |
| `atacama-digital-areia-ceu.webp` | About Hero | priority, gradient overlay | 35% |
| `atacama-digital-socios.jpg` | About Leadership | lazy | **standalone** (exception) |

---

## 8. Composition Grid System

Asymmetric marketing grid for hero compositions and branded layouts. Left column has diagonal, center has inscribed ellipse, right has arc.

### 8.1 Structural Lines

4 lines define a 3-column grid (~20% | ~60% | ~20%):

```
Top horizontal:    y = 7.6%  (full width)
Bottom horizontal: y = 93.0% (full width)
Left vertical:     x = 19.8% (full height)
Right vertical:    x = 80.2% (full height)
```

### 8.2 Geometric Elements

- **Central ellipse:** Center at 50%, 50.3%. rx = 30.2% of width, ry = 42.7% of height. Tangent to all 4 structural lines.
- **Right arc:** Half-ellipse centered at right edge (100%, 50%). Concave opening rightward.
- **Diagonal:** From top-left corner (0%, 7.6%) to left-vertical/bottom-horizontal intersection (19.8%, 93.0%).
- **8 anchor dots** (8px): At every structural intersection.

### 8.3 Content Placement

| Element | Position |
|---|---|
| Logo/wordmark | Center of ellipse |
| Brand tagline | Right column, vertically centered (Cormorant Unicase) |
| `ATACAMA.DIGITAL` label | Top-left |
| Coordinates | Bottom-right |
| Photography | Left column triangles (formed by diagonal) |
| Atmospheric glows | Right column arc area |

### 8.4 Line Styling

- Dark theme: `rgba(255,255,255,0.18)` stroke 1px, dots `#FFFFFF`
- Light theme: `rgba(0,0,0,0.12)` stroke 1px, dots `#000000`

### 8.5 Responsive Behavior

- **Desktop (1024px+):** Full grid (all lines, ellipse, arc, diagonal, 8 dots)
- **Tablet (768px+):** Simplified (structural lines + ellipse + dots; no diagonal/arc)
- **Mobile (<768px):** Grid hidden entirely; brand conveyed through colors/typography

---

## 9. Spacing & Layout

### 9.1 Spacing Scale (8px base)

```
4px | 8px | 16px | 24px | 32px | 48px | 64px | 96px | 128px
```

### 9.2 Container

```css
max-width: 1280px;
margin: 0 auto;
padding: 0 32px;
```

### 9.3 Border Radius

| Token | Value | Usage |
|---|---|---|
| `sm` | 4px | Inputs, small badges |
| `md` | 8px | Cards, containers |
| `lg` | 16px | Large cards, featured panels |
| `pill` | 9999px | Buttons, tags |
| `circle` | 50% | Avatars, icons |

---

## 10. Glass, Shadows & Effects

### 10.1 Liquid Glass

| Context | Background | Blur |
|---|---|---|
| Navigation (scrolled) | `rgba(0,0,0,0.75)` | `backdrop-blur: 12px` |
| Cards | `rgba(var(--card),0.95)` | `backdrop-blur: 4px` |
| Modals/Dropdowns | `rgba(0,0,0,0.90)` | `backdrop-blur: 12px` |
| Marketing overlays | `rgba(0,0,0,0.60)` | `backdrop-blur: 16px` |

**Rule:** Glass enhances, doesn't define. If removing blur still looks good, the design is correct.

### 10.2 Shadows

| Token | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Buttons, inputs |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards, dropdowns |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.10)` | Modals, popovers |
| `shadow-glow` | `0 0 20px rgba(255,255,255,0.15)` | Decorative hover glow |

**Rule:** Shadows are affordance, not decoration. In dark themes, prefer border-based elevation.

### 10.3 Grain Overlay

Film grain texture for sub-brand sections (COSMOS, ORBITA):

```css
.grain-overlay { position: relative; }
.grain-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
  opacity: 0.12;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

---

## 11. Dark/Light Mode

Full dual-theme support:

- **Default** = Dark theme (`:root`)
- **Light** = `.light` or `.section-light` class
- **Silver** = `.section-silver` class
- Sub-brand gradients are inherently dark; light mode affects surrounding UI only
- Every context should have designed light AND dark variants
- Toggle via `next-themes` (React) or CSS class (HTML)

---

## 12. Accessibility & Performance

### 12.1 Accessibility (WCAG 2.1 AA)

- Minimum contrast: **4.5:1** text, **3:1** UI components
- Semantic HTML, keyboard navigation
- Decorative images: `alt=""`
- Functional images: descriptive `alt` text

### 12.2 Performance (Non-Negotiable)

| Metric | Target |
|---|---|
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |

- Hero MUST render without JS (CSS-only animations)
- **Only animate `transform` and `opacity`** — never width, height, top, left
- Images: WebP, explicit dimensions, lazy load below fold
- Fonts: `font-display: swap`, preload Inter Tight 400

---

## 13. Team

- **Eduardo Gouveia** — CEO
- **João Xavier** — CTO
- Only 2 partners. No other names should appear in team/leadership sections.

---

# Part II — Visual Patterns

## 14. Atmospheric Gradients

### 14.1 Orange Desert Radials (institutional dark sections)

```css
/* Hero */
background:
  radial-gradient(ellipse at 20% 80%, rgba(225,63,7,0.12) 0%, transparent 50%),
  radial-gradient(ellipse at 80% 20%, rgba(225,63,7,0.06) 0%, transparent 40%),
  #000000;

/* CTA / generic */
background:
  radial-gradient(ellipse at 30% 70%, rgba(225,63,7,0.10) 0%, transparent 50%),
  radial-gradient(ellipse at 70% 30%, rgba(225,63,7,0.05) 0%, transparent 40%),
  #000000;
```

### 14.2 Photo Background Pattern

```css
.photo-bg { position: relative; overflow: hidden; }
.photo-bg img {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; opacity: 0.30;
}
.photo-bg .overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, #000 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%);
}
.photo-bg .content { position: relative; z-index: 10; }
```

### 14.3 Shimmer Button

Primary CTA — white with animated shimmer sweep:

```css
.shimmer-btn {
  position: relative; z-index: 0;
  display: inline-flex; align-items: center; justify-content: center;
  overflow: hidden; padding: 12px 24px;
  font-family: 'Inter Tight', sans-serif; font-size: 14px; font-weight: 500;
  color: #000; background: #fff;
  border: 1px solid rgba(0,0,0,0.10); border-radius: 6px;
  cursor: pointer; text-decoration: none;
  transition: all 0.3s ease;
}
.shimmer-btn:hover {
  transform: scale(1.04);
  box-shadow: 0 0 28px rgba(255,255,255,0.45);
}
.shimmer-btn::before {
  content: ''; position: absolute; inset: 0; z-index: -1;
  background: conic-gradient(from 270deg, transparent 0deg, #000 90deg, transparent 90deg);
  animation: shimmer-spin 6s linear infinite; filter: blur(2px);
}
.shimmer-btn::after {
  content: ''; position: absolute; inset: 0.05em; z-index: -1;
  background: #fff; border-radius: 6px;
}
@keyframes shimmer-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

### 14.4 CSS-Only Entrance Animations

```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in-up  { animation: fade-in-up 0.8s ease-out both; }
.delay-100   { animation-delay: 0.1s; }
.delay-200   { animation-delay: 0.2s; }
.delay-300   { animation-delay: 0.3s; }
.delay-500   { animation-delay: 0.5s; }
.delay-1000  { animation-delay: 1.0s; }
```

---

# Part III — SVG Brand Assets (Inline)

All SVGs below use `fill="currentColor"`. Set `color` on parent to control fill.

## 15. Symbol A (Submark)

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1700 1240" fill="currentColor">
  <path d="M1682.36 1220 1188.62 20H951.77v.02H748.23l.01-.02H511.38L17.64 1220h247.7L737.38 46.96v1173.02h225.25V46.96L1434.66 1220Zm0 0"/>
</svg>
```

## 16. Logotipo (Default — Stacked)

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7440 1990" fill="currentColor">
  <path d="m2005.83 38.68-307.87 1154h217.33L2217.95 58.23l302.65 1134.45h217.34l-307.87-1154ZM333.85 38.68l-307.87 1154h217.34L545.97 58.23l302.66 1134.45h217.33L758.1 38.68ZM4201.22 38.68l-307.87 1154h217.34L4413.34 58.23 4716 1192.68h217.34l-307.88-1154ZM1789.08 38.68H986.93V233h292.17v959.67h216.6V233.01h293.38ZM6686.55 38.68l-307.87 1154h217.34L6898.68 58.23l302.65 1134.45h217.34l-307.87-1154ZM5666.44 669.03 5490.98 38.7l-424.07-.03v1154h216.61V76.19l170.24 611.58h425.36l170.24-611.58v1116.49h216.6v-1154l-424.06.03ZM3524.06 969.29c-57.57 37.2-122.85 54.25-184.81 54.25-70.32 0-135.16-17.8-192.72-52.89-118.62-72.31-186.66-201.97-186.66-355.72 0-217.76 130.5-319.58 186.6-353.25 57.61-34.59 122.47-52.12 192.78-52.12 6.32 0 98.34.97 184.8 52.06 117.68 69.54 140.24 189.95 140.24 189.95h216.55c0-.02-8.62-118.66-96.5-230.45-102.2-130-264.43-204.57-445.1-204.57-108.53 0-208.94 26.43-298.4 78.57-85.13 49.6-156.39 120.44-206.07 204.88-54.76 93.06-82.53 199.02-82.53 314.93 0 220.57 107.87 415.8 288.55 522.21 89.45 52.7 189.87 79.41 298.46 79.41 177.7 0 341.62-77.36 443.55-210.35 87.52-114.2 101.64-240.9 101.64-240.9h-218.88s-21.46 126.43-141.5 203.99"/>
  <path d="M5012.48 1887.38h-75.22v-346.3h77.6c144.03 0 156.54 111.7 156.54 172.81 0 164.66-109.64 173.5-158.92 173.5m7.8-425.6h-174.51v504.88h171.45c227.25 0 244.65-191.38 244.65-252.78 0-130.66-67.39-252.1-241.6-252.1M5339.53 1966.67h91.49V1461.8h-91.5ZM5752.3 1774.21h119.48c-.28 29.05-15.86 117.24-128.28 117.24-38.57 0-142.66-16.75-142.66-177.56 0-112.15 59.46-176.87 142.66-176.87 69.86 0 109.38 42.84 121.64 86.07h92.84c-10.4-67.22-72.64-168.07-215.84-168.07-77.48 0-233.12 45.2-233.12 259.9 0 75.01 35.51 258.53 233.8 258.53 62.3 0 108.1-23.47 144-65.74h2.38l6.78 58.96h65.73v-263.96h-209.4ZM6041.07 1966.67h91.48V1461.8h-91.48ZM6603.62 1461.8h-402.55v76.58h156.2v428.3h90.48v-428.3h155.87ZM6742.38 1768.79l68-203.3h4.07l68.34 203.3Zm14.12-307-178.23 504.88h97.93l41.7-124.69h189.49l41.91 124.7h97.59l-177.9-504.88ZM7196.05 1890.1v-428.3h-91.49v504.87h314.1v-76.58Zm0 0"/>
</svg>
```

## 17. Logotipo Horizontal (single-line)

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10180 1240" fill="currentColor">
  <path d="m2005.83 42.13-307.87 1154h217.33L2217.95 61.68l302.65 1134.45h217.34l-307.87-1154ZM333.85 42.13l-307.87 1154h217.34L545.97 61.68l302.66 1134.45h217.33L758.1 42.13ZM4201.22 42.13l-307.87 1154h217.34L4413.34 61.68 4716 1196.13h217.34l-307.88-1154ZM1789.08 42.13H986.93v194.33h292.17v959.67h216.6V236.46h293.38ZM6686.55 42.13l-307.87 1154h217.34L6898.68 61.68l302.65 1134.45h217.34l-307.87-1154ZM5666.44 672.48 5490.98 42.16l-424.07-.03v1154h216.61V79.64l170.24 611.58h425.36l170.24-611.58v1116.49h216.6v-1154l-424.06.03ZM3524.06 972.73c-57.57 37.2-122.85 54.25-184.81 54.25-70.32 0-135.16-17.8-192.72-52.88-118.62-72.31-186.66-201.97-186.66-355.72 0-217.76 130.5-319.58 186.6-353.25 57.61-34.59 122.47-52.12 192.78-52.12 6.32 0 98.34.96 184.8 52.06 117.68 69.54 140.24 189.95 140.24 189.95h216.55c0-.02-8.62-118.66-96.5-230.45C3682.14 94.57 3519.91 20 3339.24 20c-108.53 0-208.94 26.43-298.4 78.57-85.13 49.6-156.39 120.44-206.07 204.88-54.76 93.06-82.53 199.02-82.53 314.93 0 220.57 107.87 415.8 288.55 522.21 89.45 52.7 189.87 79.41 298.46 79.41 177.7 0 341.62-77.36 443.55-210.36 87.52-114.2 101.64-240.9 101.64-240.9h-218.88s-21.46 126.44-141.5 204"/>
  <path d="M7747.83 467.71h-75.22v-346.3h77.6c144.03 0 156.54 111.7 156.54 172.81 0 164.66-109.64 173.5-158.92 173.5m7.8-425.6h-174.5V547h171.45c227.24 0 244.64-191.38 244.64-252.78 0-130.66-67.38-252.1-241.6-252.1M8074.88 547h91.49V42.13h-91.49ZM8487.66 354.54h119.47c-.28 29.05-15.86 117.24-128.28 117.24-38.56 0-142.65-16.75-142.65-177.56 0-112.15 59.46-176.87 142.65-176.87 69.87 0 109.38 42.84 121.65 86.06h92.84c-10.4-67.21-72.65-168.06-215.84-168.06-77.49 0-233.13 45.2-233.13 259.9 0 75 35.52 258.53 233.8 258.53 62.3 0 108.1-23.46 144.01-65.74h2.37l6.78 58.96h65.74V283.04h-209.41ZM8776.42 547h91.49V42.13h-91.49ZM9338.97 42.13h-402.54v76.57h156.2V547h90.47V118.7h155.87ZM9477.73 349.12l68-203.3h4.07l68.34 203.3Zm14.13-307L9313.62 547h97.93l41.7-124.7h189.5l41.9 124.7h97.6l-177.9-504.87ZM9931.4 470.42V42.12h-91.49V547h314.11v-76.58Zm0 0"/>
</svg>
```

## 18. COSMOS Symbol

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1211 1250" fill="currentColor">
  <path d="M731.04 750.75H474.85l-186.77 453.94h93.7l178.57-443.74v443.73h85.2V760.95l178.57 443.74h93.7z"/>
  <path d="M731.05 494.56v89.6l.01-.01v77h-.01v89.6L1185 937.53v-93.71L741.25 665.26h443.74v-85.21H741.25L1185 401.48v-93.7z"/>
  <path d="M474.86 494.56h89.6v-.01h77v.01h89.59L917.83 40.62h-93.7L645.56 484.36V40.62h-85.21v443.74L381.79 40.62h-93.7zM474.85 750.75V494.56L20.91 307.78v93.7l443.74 178.57H20.91v85.21h443.74L20.91 843.82v93.7z"/>
</svg>
```

## 19. ORBITA Symbol

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 624" fill="currentColor">
  <path d="M431.85 311.61 303.77 0H128.08L0 311.61h64.26L186.7 7.01v304.6h58.43V7L367.6 311.6zM431.85 623.61 303.77 312H128.08L0 623.61h64.26l122.45-304.6v304.6h58.43V319L367.6 623.6z"/>
</svg>
```

## 20. COMPASS Symbol

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 738 627" fill="currentColor">
  <path d="M584.43 625.2 456.35 313.6H280.67L152.58 625.2h64.26L339.3 320.6v304.6h58.44V320.6l122.45 304.6zM152.58 1.6l128.09 311.6h175.68L584.43 1.6h-64.25L397.72 306.2V1.6H339.3v304.6L216.84 1.6z"/>
  <path d="m154.9 626.8 244.94-231.33-22.04-57.36-18.95-49.28-22.03-57.36L0 223.7l23.05 59.98 328.26 5.04L66.98 397.97l20.96 54.55 284.33-109.27-240.41 223.57zM582.11 0 337.18 231.34l22.04 57.35 18.94 49.29 22.04 57.35 336.82 7.78-23.05-59.98-328.27-5.04 284.34-109.26-20.96-54.55-284.34 109.27L605.17 59.98z"/>
</svg>
```

---

# Part IV — Templates

## 21. Template: Hero Section

Full-viewport hero with background texture, atmospheric gradient, brand tagline, and coordinates.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atacama Digital</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Unicase:wght@500;600;700&family=Inter+Tight:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter Tight', sans-serif;
      background: #000; color: #fff;
      -webkit-font-smoothing: antialiased;
    }

    .hero {
      position: relative; overflow: hidden; height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center;
      background:
        radial-gradient(ellipse at 20% 80%, rgba(225,63,7,0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(225,63,7,0.06) 0%, transparent 40%),
        #000;
    }
    .hero-bg {
      position: absolute; inset: -35% 0; z-index: 0;
    }
    .hero-bg img {
      width: 100%; height: 100%; object-fit: cover; opacity: 0.40;
    }
    .hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, #000 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%);
      z-index: 1;
    }
    .hero-content {
      position: relative; z-index: 10; max-width: 768px; padding: 0 24px;
    }
    .hero-symbol { width: clamp(32px, 4vw, 48px); height: auto; opacity: 0.8; margin-bottom: 32px; }
    .hero-tagline {
      font-family: 'Cormorant Unicase', Georgia, serif;
      font-weight: 600; font-size: clamp(2.5rem, 6vw, 4.5rem);
      letter-spacing: -0.025em; line-height: 0.9; white-space: pre-line;
    }
    .hero-heading {
      margin-top: 16px; font-size: clamp(1rem, 2vw, 1.5rem);
      font-weight: 500; opacity: 0.9; max-width: 640px;
    }
    .hero-cta { margin-top: 40px; }
    .coord {
      position: absolute; bottom: 24px; font-size: 10px;
      font-weight: 400; letter-spacing: 0.05em; opacity: 0.5; z-index: 10;
    }
    .coord-left  { left: 32px; }
    .coord-right { right: 32px; }

    /* Shimmer button */
    .shimmer-btn {
      position: relative; z-index: 0; display: inline-flex; align-items: center;
      justify-content: center; overflow: hidden; padding: 12px 24px;
      font-family: 'Inter Tight', sans-serif; font-size: 14px; font-weight: 500;
      color: #000; background: #fff; border: 1px solid rgba(0,0,0,0.10);
      border-radius: 6px; cursor: pointer; text-decoration: none; transition: all 0.3s ease;
    }
    .shimmer-btn:hover { transform: scale(1.04); box-shadow: 0 0 28px rgba(255,255,255,0.45); }
    .shimmer-btn::before {
      content: ''; position: absolute; inset: 0; z-index: -1;
      background: conic-gradient(from 270deg, transparent 0deg, #000 90deg, transparent 90deg);
      animation: shimmer-spin 6s linear infinite; filter: blur(2px);
    }
    .shimmer-btn::after {
      content: ''; position: absolute; inset: 0.05em; z-index: -1;
      background: #fff; border-radius: 6px;
    }
    @keyframes shimmer-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    /* Entrance animations */
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-in-up  { animation: fade-in-up 0.8s ease-out both; }
    .delay-200   { animation-delay: 0.2s; }
    .delay-500   { animation-delay: 0.5s; }
    .delay-1000  { animation-delay: 1.0s; }
  </style>
</head>
<body>

<section class="hero">
  <div class="hero-bg">
    <img src="images/atacama-digital-canyons.webp" alt="">
  </div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="fade-in-up">
      <svg class="hero-symbol" viewBox="0 0 1700 1240" fill="currentColor">
        <path d="M1682.36 1220 1188.62 20H951.77v.02H748.23l.01-.02H511.38L17.64 1220h247.7L737.38 46.96v1173.02h225.25V46.96L1434.66 1220Zm0 0"/>
      </svg>
    </div>
    <p class="hero-tagline fade-in-up delay-200">Lead the Way.
Shape the Future.</p>
    <h1 class="hero-heading fade-in-up delay-500">
      Seu marketing gera dados. O nosso gera decisões.
    </h1>
    <div class="hero-cta fade-in-up delay-1000">
      <a href="#contato" class="shimmer-btn">Tenha clareza dos seus números</a>
    </div>
  </div>
  <span class="coord coord-left">8°02'36.6" S</span>
  <span class="coord coord-right">34°53'53.5" W</span>
</section>

</body>
</html>
```

---

## 22. Template: Service Cards (Silver Section)

```html
<section style="background: #DBDCDD; color: #000; padding: 96px 0;">
  <div style="max-width: 1280px; margin: 0 auto; padding: 0 32px;">
    <span style="font-size: 11px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.25em; color: #6B6B6B;">
      O que fazemos
    </span>
    <h2 style="margin-top: 12px; font-family: 'Cormorant Unicase', Georgia, serif; font-weight: 600; font-size: clamp(2rem, 5vw, 3.5rem); letter-spacing: -0.025em; line-height: 0.9; color: #000;">
      O que entregamos.
    </h2>
    <div style="margin-top: 56px; display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">

      <!-- Card (repeat for each service) -->
      <a href="#" style="display: flex; flex-direction: column; gap: 16px; padding: 32px; border-radius: 16px; background: #fff; color: #000; text-decoration: none; transition: all 0.2s ease;"
         onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(0,0,0,0.1)'"
         onmouseleave="this.style.transform=''; this.style.boxShadow=''">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <svg style="width: 24px; height: 24px; color: #6B6B6B;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
          <span style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #6B6B6B; background: rgba(0,0,0,0.05); padding: 2px 10px; border-radius: 9999px;">Pilar</span>
        </div>
        <h3 style="font-size: 18px; font-weight: 700; letter-spacing: -0.01em;">Nome do Serviço</h3>
        <p style="font-size: 16px; color: #6B6B6B; line-height: 1.5;">Descrição curta do serviço.</p>
        <span style="margin-top: auto; font-size: 14px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">Saiba mais →</span>
      </a>

    </div>
  </div>
</section>
```

---

## 23. Template: CTA Section

```html
<section style="position: relative; overflow: hidden; padding: 96px 0; background: #000; color: #fff;">
  <img src="images/atacama-digital-deserto-areia-vento.webp" alt=""
    style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.30;">
  <div style="position: absolute; inset: 0; background: linear-gradient(to top, #000 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%);"></div>
  <div style="position: absolute; inset: 0; background:
    radial-gradient(ellipse at 30% 70%, rgba(225,63,7,0.10) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 30%, rgba(225,63,7,0.05) 0%, transparent 40%);"></div>
  <div style="position: relative; z-index: 10; max-width: 768px; margin: 0 auto; padding: 0 24px; text-align: center;">
    <p style="font-family: 'Cormorant Unicase', Georgia, serif; font-weight: 600; font-size: clamp(2rem, 5vw, 3.5rem); letter-spacing: -0.025em; line-height: 0.9; white-space: pre-wrap;">Lead the Way.
Shape the Future.</p>
    <h2 style="margin-top: 24px; font-size: clamp(1.5rem, 3vw, 1.875rem); font-weight: 700;">O que podemos resolver pra você?</h2>
    <p style="margin-top: 24px; font-size: 18px; color: #A0A0A0;">Diagnóstico em 48h. Sem compromisso. Sem enrolação.</p>
    <div style="margin-top: 32px;"><a href="#contato" class="shimmer-btn">Mostre seus números</a></div>
  </div>
</section>
```

---

## 24. Template: COSMOS Orbital Visual

Self-contained SVG with 5 concentric orbit ellipses, planet nodes, labels, connection path, and animated beam. Uses CSS `@keyframes` + native SVG `<animate>`.

### 24.1 Geometry Reference

Centered on COSMOS "star" at **(180, 600)** within **1440×720** viewBox. Five planets on rotated ellipses forming ascending staircase bottom-left → top-right.

| Step | rx | ry | rotation | angle | Label |
|---|---|---|---|---|---|
| 01 | 220 | 160 | -18° | 350° | Imersão e Diagnóstico |
| 02 | 370 | 270 | -14° | 325° | Mapeamento de Oportunidades |
| 03 | 520 | 390 | -10° | 352° | Execução Criativa e Técnica |
| 04 | 780 | 500 | -6° | 325° | Monitoramento e Otimização Contínua |
| 05 | 1100 | 680 | -3° | 315° | Escalonamento Estratégico |

### 24.2 JavaScript Helpers for Path Generation

Use these to compute exact orbit paths and planet positions:

```javascript
/** Full ellipse path centered on (SX, SY) with radii (rx, ry) rotated by rotDeg. */
function orbitPath(SX, SY, rx, ry, rotDeg, segments = 72) {
  const rot = (rotDeg * Math.PI) / 180;
  const parts = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * 2 * Math.PI;
    const x = SX + rx * Math.cos(t) * Math.cos(rot) - ry * Math.sin(t) * Math.sin(rot);
    const y = SY + rx * Math.cos(t) * Math.sin(rot) + ry * Math.sin(t) * Math.cos(rot);
    parts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return parts.join(" ") + " Z";
}

/** Planet position on a rotated ellipse. */
function pointOn(SX, SY, rx, ry, rotDeg, angleDeg) {
  const t = (angleDeg * Math.PI) / 180;
  const r = (rotDeg * Math.PI) / 180;
  return {
    x: Math.round(SX + rx * Math.cos(t) * Math.cos(r) - ry * Math.sin(t) * Math.sin(r)),
    y: Math.round(SY + rx * Math.cos(t) * Math.sin(r) + ry * Math.sin(t) * Math.cos(r)),
  };
}

// COSMOS configuration
const SX = 180, SY = 600;
const steps = [
  { rx: 220,  ry: 160, rot: -18, angle: 350 },
  { rx: 370,  ry: 270, rot: -14, angle: 325 },
  { rx: 520,  ry: 390, rot: -10, angle: 352 },
  { rx: 780,  ry: 500, rot:  -6, angle: 325 },
  { rx: 1100, ry: 680, rot:  -3, angle: 315 },
];

steps.forEach((s, i) => {
  console.log(`Orbit ${i+1}:`, orbitPath(SX, SY, s.rx, s.ry, s.rot));
  console.log(`Planet ${i+1}:`, pointOn(SX, SY, s.rx, s.ry, s.rot, s.angle));
});
```

### 24.3 Complete Orbital SVG

The orbit ring paths below are computed using the helper above. Each ring is a dashed, rotated ellipse that draws in with CSS animation. Planets fade in sequentially, and the beam travels along the connection path using native SVG `<animate>`.

```html
<style>
  @keyframes draw-orbit { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }

  .orbit-ring { fill: none; stroke-width: 1; stroke-dasharray: 6 10; opacity: 0; }
  .orbit-ring path { stroke-dasharray: 1; stroke-dashoffset: 1; }

  .orbit-1      { animation: fade-in 0.4s 0.20s both; }
  .orbit-1 path { animation: draw-orbit 1.4s cubic-bezier(0.22,1,0.36,1) 0.20s both; }
  .orbit-2      { animation: fade-in 0.4s 0.35s both; }
  .orbit-2 path { animation: draw-orbit 1.4s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
  .orbit-3      { animation: fade-in 0.4s 0.50s both; }
  .orbit-3 path { animation: draw-orbit 1.4s cubic-bezier(0.22,1,0.36,1) 0.50s both; }
  .orbit-4      { animation: fade-in 0.4s 0.65s both; }
  .orbit-4 path { animation: draw-orbit 1.4s cubic-bezier(0.22,1,0.36,1) 0.65s both; }
  .orbit-5      { animation: fade-in 0.4s 0.80s both; }
  .orbit-5 path { animation: draw-orbit 1.4s cubic-bezier(0.22,1,0.36,1) 0.80s both; }

  .connection { fill: none; stroke: rgba(255,255,255,0.18); stroke-width: 1;
    stroke-dasharray: 1; stroke-dashoffset: 1;
    animation: draw-orbit 1.2s cubic-bezier(0.22,1,0.36,1) 1.0s both; }

  .planet { opacity: 0; }
  .planet-1 { animation: fade-in 0.4s 1.32s both; }
  .planet-2 { animation: fade-in 0.4s 1.44s both; }
  .planet-3 { animation: fade-in 0.4s 1.56s both; }
  .planet-4 { animation: fade-in 0.4s 1.68s both; }
  .planet-5 { animation: fade-in 0.4s 1.80s both; }

  .label { opacity: 0; }
  .label-1 { animation: fade-in 0.5s 1.62s both; }
  .label-2 { animation: fade-in 0.5s 1.74s both; }
  .label-3 { animation: fade-in 0.5s 1.86s both; }
  .label-4 { animation: fade-in 0.5s 1.98s both; }
  .label-5 { animation: fade-in 0.5s 2.10s both; }

  .cosmos-logo { opacity: 0; animation: fade-in 0.6s 0.1s both; }
</style>

<svg viewBox="0 0 1440 720" overflow="visible" style="width:100%; height:auto;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- ORBIT RINGS — Generate paths using orbitPath() helper above.
       Each <g> wraps a <path> with the computed ellipse `d` attribute.
       stroke color uses the step's opacity value from the geometry table. -->

  <!-- Orbit 1: rx=220, ry=160, rot=-18° -->
  <g class="orbit-ring orbit-1">
    <path pathLength="1" stroke="rgba(255,255,255,0.10)"
      d="[COMPUTED_PATH_FROM_orbitPath(180,600,220,160,-18)]"/>
  </g>
  <!-- Orbit 2: rx=370, ry=270, rot=-14° -->
  <g class="orbit-ring orbit-2">
    <path pathLength="1" stroke="rgba(255,255,255,0.08)"
      d="[COMPUTED_PATH_FROM_orbitPath(180,600,370,270,-14)]"/>
  </g>
  <!-- Orbit 3: rx=520, ry=390, rot=-10° -->
  <g class="orbit-ring orbit-3">
    <path pathLength="1" stroke="rgba(255,255,255,0.07)"
      d="[COMPUTED_PATH_FROM_orbitPath(180,600,520,390,-10)]"/>
  </g>
  <!-- Orbit 4: rx=780, ry=500, rot=-6° -->
  <g class="orbit-ring orbit-4">
    <path pathLength="1" stroke="rgba(255,255,255,0.06)"
      d="[COMPUTED_PATH_FROM_orbitPath(180,600,780,500,-6)]"/>
  </g>
  <!-- Orbit 5: rx=1100, ry=680, rot=-3° -->
  <g class="orbit-ring orbit-5">
    <path pathLength="1" stroke="rgba(255,255,255,0.05)"
      d="[COMPUTED_PATH_FROM_orbitPath(180,600,1100,680,-3)]"/>
  </g>

  <!-- CONNECTION PATH (constellation line between planets) -->
  <!-- Planet positions computed from pointOn(): ~(395,478) (453,326) (693,266) (748,117) (928,-33) -->
  <path class="connection" pathLength="1"
    d="M395,478 L453,326 L693,266 L748,117 L928,-33"/>

  <!-- BEAM (travels along connection path) -->
  <path d="M395,478 L453,326 L693,266 L748,117 L928,-33"
    fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1"
    pathLength="1" stroke-dasharray="0.08 3.14" stroke-linecap="round" filter="url(#glow)">
    <animate attributeName="stroke-dashoffset" from="1.08" to="-2.14" dur="2.2s" repeatCount="indefinite"/>
  </path>
  <path d="M395,478 L453,326 L693,266 L748,117 L928,-33"
    fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2"
    pathLength="1" stroke-dasharray="0.16 3.06" stroke-linecap="round">
    <animate attributeName="stroke-dashoffset" from="1.16" to="-2.06" dur="2.2s" repeatCount="indefinite"/>
  </path>

  <!-- PLANET NODES -->
  <g class="planet planet-1">
    <circle cx="395" cy="478" r="10" fill="rgba(255,255,255,0.05)"/>
    <circle cx="395" cy="478" r="5" fill="white" filter="url(#glow)"/>
  </g>
  <g class="planet planet-2">
    <circle cx="453" cy="326" r="10" fill="rgba(255,255,255,0.05)"/>
    <circle cx="453" cy="326" r="5" fill="white" filter="url(#glow)"/>
  </g>
  <g class="planet planet-3">
    <circle cx="693" cy="266" r="10" fill="rgba(255,255,255,0.05)"/>
    <circle cx="693" cy="266" r="5" fill="white" filter="url(#glow)"/>
  </g>
  <g class="planet planet-4">
    <circle cx="748" cy="117" r="10" fill="rgba(255,255,255,0.05)"/>
    <circle cx="748" cy="117" r="5" fill="white" filter="url(#glow)"/>
  </g>
  <g class="planet planet-5">
    <circle cx="928" cy="-33" r="10" fill="rgba(255,255,255,0.05)"/>
    <circle cx="928" cy="-33" r="5" fill="white" filter="url(#glow)"/>
  </g>

  <!-- LABELS -->
  <g class="label label-1">
    <text x="413" y="470" fill="white" font-size="14" font-family="'Inter Tight',sans-serif" font-weight="400" letter-spacing="0.02em" opacity="0.6">01.</text>
    <text x="413" y="490" fill="white" font-size="16" font-family="'Inter Tight',sans-serif" font-weight="700" letter-spacing="0.02em">
      <tspan x="413" dy="0">IMERSÃO E</tspan><tspan x="413" dy="20">DIAGNÓSTICO</tspan>
    </text>
  </g>
  <g class="label label-2">
    <text x="471" y="318" fill="white" font-size="14" font-family="'Inter Tight',sans-serif" font-weight="400" letter-spacing="0.02em" opacity="0.6">02.</text>
    <text x="471" y="338" fill="white" font-size="16" font-family="'Inter Tight',sans-serif" font-weight="700" letter-spacing="0.02em">
      <tspan x="471" dy="0">MAPEAMENTO DE</tspan><tspan x="471" dy="20">OPORTUNIDADES</tspan>
    </text>
  </g>
  <g class="label label-3">
    <text x="711" y="258" fill="white" font-size="14" font-family="'Inter Tight',sans-serif" font-weight="400" letter-spacing="0.02em" opacity="0.6">03.</text>
    <text x="711" y="278" fill="white" font-size="16" font-family="'Inter Tight',sans-serif" font-weight="700" letter-spacing="0.02em">
      <tspan x="711" dy="0">EXECUÇÃO CRIATIVA</tspan><tspan x="711" dy="20">E TÉCNICA</tspan>
    </text>
  </g>
  <g class="label label-4">
    <text x="766" y="109" fill="white" font-size="14" font-family="'Inter Tight',sans-serif" font-weight="400" letter-spacing="0.02em" opacity="0.6">04.</text>
    <text x="766" y="129" fill="white" font-size="16" font-family="'Inter Tight',sans-serif" font-weight="700" letter-spacing="0.02em">
      <tspan x="766" dy="0">MONITORAMENTO</tspan><tspan x="766" dy="20">E OTIMIZAÇÃO</tspan><tspan x="766" dy="20">CONTÍNUA</tspan>
    </text>
  </g>
  <g class="label label-5">
    <text x="946" y="-41" fill="white" font-size="14" font-family="'Inter Tight',sans-serif" font-weight="400" letter-spacing="0.02em" opacity="0.6">05.</text>
    <text x="946" y="-21" fill="white" font-size="16" font-family="'Inter Tight',sans-serif" font-weight="700" letter-spacing="0.02em">
      <tspan x="946" dy="0">ESCALONAMENTO</tspan><tspan x="946" dy="20">ESTRATÉGICO</tspan>
    </text>
  </g>

  <!-- COSMOS PRODUCT LOGO -->
  <g class="cosmos-logo">
    <foreignObject x="105" y="576" width="320" height="50">
      <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex; align-items:center; gap:12px; color:#fff;">
        <svg style="height:28px; width:auto;" viewBox="0 0 1211 1250" fill="currentColor">
          <path d="M731.04 750.75H474.85l-186.77 453.94h93.7l178.57-443.74v443.73h85.2V760.95l178.57 443.74h93.7z"/>
          <path d="M731.05 494.56v89.6l.01-.01v77h-.01v89.6L1185 937.53v-93.71L741.25 665.26h443.74v-85.21H741.25L1185 401.48v-93.7z"/>
          <path d="M474.86 494.56h89.6v-.01h77v.01h89.59L917.83 40.62h-93.7L645.56 484.36V40.62h-85.21v443.74L381.79 40.62h-93.7zM474.85 750.75V494.56L20.91 307.78v93.7l443.74 178.57H20.91v85.21h443.74L20.91 843.82v93.7z"/>
        </svg>
        <span style="font-family:'Inter Tight',sans-serif; font-weight:400; font-size:28px; letter-spacing:0.05em; line-height:1; color:white;">COSMOS</span>
      </div>
    </foreignObject>
  </g>
</svg>
```

**Note:** The orbit ring `d` attributes marked as `[COMPUTED_PATH_FROM_...]` should be generated using the `orbitPath()` JavaScript helper from Section 24.2. Run the helper once, paste the output paths, and the SVG becomes fully static.

---

## 25. Template: COSMOS Complete Section

Combines nebular atmosphere + grain + orbital + CTA.

```html
<section style="position: relative; overflow: hidden; min-height: 100vh; background: #000;">
  <!-- Layer 1: Nebular gradient -->
  <div style="position: absolute; inset: -15% 0; background:
    radial-gradient(ellipse at -15% 60%, rgba(156,31,39,0.50) 0%, rgba(120,18,25,0.22) 18%, rgba(80,10,15,0.07) 32%, transparent 50%),
    radial-gradient(ellipse at 48% 10%, rgba(27,104,184,0.48) 0%, rgba(30,75,175,0.22) 20%, rgba(15,45,120,0.07) 38%, transparent 58%),
    radial-gradient(ellipse at 82% 35%, rgba(35,75,170,0.18) 0%, rgba(20,50,120,0.05) 32%, transparent 50%),
    radial-gradient(ellipse at 15% 25%, rgba(158,143,208,0.28) 0%, rgba(94,151,228,0.10) 20%, transparent 40%),
    radial-gradient(ellipse at 95% 10%, rgba(110,75,165,0.10) 0%, transparent 28%),
    #03070A;"></div>

  <!-- Layer 2: Grain -->
  <div class="grain-overlay" style="position: absolute; inset: 0; pointer-events: none;"></div>

  <!-- Layer 3: Content -->
  <div style="position: relative; z-index: 10;">
    <div style="max-width: 1280px; margin: 0 auto; padding: 96px 32px 0; text-align: center;">
      <span style="font-size: 14px; color: rgba(255,255,255,0.7);">Da imersão ao escalonamento</span>
      <h2 style="margin-top: 12px; font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; color: #fff;">Método COSMOS</h2>
    </div>
    <div style="max-width: 1152px; margin: -16px auto 0;">
      <!-- Paste orbital SVG from Section 24.3 here -->
    </div>
    <div style="max-width: 640px; margin: 48px auto 96px; text-align: center; padding: 0 24px;">
      <p style="font-family: 'Cormorant Unicase', Georgia, serif; font-weight: 600; font-size: clamp(2rem, 4vw, 3rem); letter-spacing: -0.025em; line-height: 0.9; color: #fff; margin-bottom: 24px;">
        Cinco etapas.<br>Nenhuma adivinhação.
      </p>
      <p style="font-size: 18px; color: rgba(255,255,255,0.7); margin-bottom: 32px;">
        O COSMOS transforma diagnóstico em receita previsível.
      </p>
      <a href="#contato" class="shimmer-btn">Conheça o Método COSMOS</a>
    </div>
  </div>
</section>
```

---

# Part V — Adaptation Guide

## 26. Content Substitution

- **Taglines:** Replace text in `font-family: 'Cormorant Unicase'` elements. Use only approved taglines (Section 5).
- **Background images:** Replace `src`. Use dark, textural images. Keep `opacity: 0.30–0.40` + gradient overlay.
- **Coordinates:** Keep on brand pages. Omit on client-specific materials.

## 27. Adapting for ORBITA

1. Replace COSMOS gradient with ORBITA gradient (Section 2.2)
2. Replace COSMOS symbol SVG with ORBITA symbol (Section 19)
3. Replace product name "COSMOS" → "ORBITA"
4. Keep grain overlay, adjust labels/steps as needed

## 28. Reparametrizing the Orbital

The orbital geometry is fully parameterized. To create a different method:

1. Change step labels and count
2. Adjust `SX`, `SY` (star position) and each step's `rx`, `ry`, `rot`, `angle`
3. Regenerate paths using the JavaScript helper (Section 24.2)
4. Update connection path `d` to connect new planet positions

## 29. Adding GSAP Scroll Animation (Optional)

For scroll-driven cinematic sequences:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.cosmos-section',
      pin: true,
      start: 'top top',
      end: '+=400%',
      scrub: true,
    }
  });
  tl.fromTo('.cosmos-gradient', { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0);
  tl.to('.cosmos-logo', { opacity: 0, duration: 0.06 }, 0.18);
  tl.fromTo('.cosmos-content', { opacity: 0 }, { opacity: 1, duration: 0.11 }, 0.33);
  tl.to('.cosmos-content', { opacity: 0, duration: 0.05 }, 0.66);
  tl.fromTo('.cosmos-cta', { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.77);
</script>
```

**Rules:** Only animate `opacity` + `transform`. Use `gsap.matchMedia()` to disable pinning on mobile. Set `min-height: 100vh` on pinned sections.

## 30. Responsive Considerations

- All templates use `clamp()` for fluid typography
- Service cards use `auto-fill, minmax(320px, 1fr)` for automatic responsive columns
- On mobile (< 768px): hide orbital SVG, show simple vertical timeline
- Coordinates: hide right coordinate below 640px
- Composition grid: hide below 768px (brand conveyed through color/type only)
