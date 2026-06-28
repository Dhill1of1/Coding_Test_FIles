# Personal Website — Final Build Plan
**CSS Course Final Project | Devin Hill**  
**Synthesized from Claude + ChatGPT consultations**  
**Time:** ~3–4 hours

Follow these steps in order. HTML first, then CSS.

---

## Step 0: Fix Your Files (5 min)

Two fixes before anything else:

1. Rename `PersonalWebsite.html` → **`index.html`**
2. Rename `style.css` → **`styles.css`** (your HTML already links to this name)

---

## Step 1: HTML Structure (45–60 min)

Build one scrolling page with this layout:

```
header          → name, tagline, nav (About | Projects | Contact)
  main
    #about      → photo + 3–4 sentence bio
    #projects   → 2–3 project cards (title, description, code link, demo link)
    #contact    → form (name, email, message, submit) + social/email links
  footer        → copyright line
```

**Content placeholders are fine** — use `#` for links you don't have yet.

---

## Step 2: CSS — Base Styles (20 min)

Start `styles.css` with:

- A simple reset (`* { box-sizing: border-box; margin: 0; padding: 0; }`)
- Body defaults: `font-family`, `font-size`, `line-height`, `color`, `background-color`
- A `.container` class: `max-width: 900px; margin: 0 auto; padding: 0 1.5rem;`
- Link styles + `:hover` (covers pseudo-class selector)

**Palette (both models agreed on this style):**

| Role | Color |
|---|---|
| Page background | `#f4f6f8` |
| Text | `#222222` |
| Header/footer | `#1f2937` |
| Accent (links, button) | `#2563eb` |
| Cards | `#ffffff` |

---

## Step 3: CSS — Section by Section (1.5–2 hrs)

Work through each area. This table maps **course requirements → where to use them**:

| Requirement | Where |
|---|---|
| Element selectors | `body`, `header`, `section`, `footer`, `h2`, `p` |
| Class selectors | `.container`, `.project-card`, `.contact-form` |
| ID selectors | `#about`, `#projects`, `#contact` |
| Pseudo-class | `a:hover`, `button:hover` |
| Color / font / text-align | Throughout; center section headings |
| Background | Body, header, footer, cards |
| Box model | `padding` on sections/cards, `margin` between elements, `border` on cards/inputs, `width`/`height` on photo |
| Flex layout | Nav bar, about row (photo + text), project card row |
| Positioning | `position: sticky` on header nav |

### Header
- Dark background, white text, flex nav links
- Sticky so it stays visible while scrolling

### About
- Flex row: circular photo (`border-radius: 50%`, `width/height: 150px`) + text
- `border` on the photo for a nice touch

### Projects
- Flex row with `flex-wrap: wrap` and `gap`
- Each `.project-card`: white bg, `padding`, `border`, optional `box-shadow`, `border-radius`

### Contact
- Form inputs: full width, `padding`, `border`, `margin-bottom`
- Submit button: accent background color, white text, no border
- Social links below the form (GitHub, LinkedIn, `mailto:`)

### Footer
- Dark background matching header, centered muted text

---

## Step 4: Mobile Polish (15 min)

Add one media query at the bottom:

```css
@media (max-width: 600px) {
  .about-layout { flex-direction: column; text-align: center; }
  .project-card { width: 100%; }
}
```

Open the page in your browser and resize the window to check it.

---

## Step 5: Pass Checklist

Before submitting, check every box:

- [ ] About: paragraph + photo
- [ ] Projects: 2+ cards, each with **source code** and **demo** links
- [ ] Contact: form (name, email, message, button) **and** social/email links
- [ ] CSS file name matches HTML `<link>` tag
- [ ] Used element, class, and ID selectors
- [ ] Used `color`, `font-size`, `font-family`, `text-align`, `background-color`
- [ ] Used `width`, `height`, `border`, `padding`, `margin`
- [ ] Used `display: flex`
- [ ] Used `position: sticky` (or fixed)
- [ ] Page looks good in a browser

---

## Build Schedule

| Step | Task | Time |
|---|---|---|
| 0 | Fix filenames | 5 min |
| 1 | Write HTML + content | 45–60 min |
| 2 | Base CSS + colors | 20 min |
| 3 | Header, About, Projects, Contact, Footer CSS | 1.5–2 hrs |
| 4 | Mobile tweak + browser test | 15 min |
| **Total** | | **~3–4 hrs** |

---

## Questions for You (answer these and we can build it together)

1. **Vibe:** Professional, creative, or simple/minimal?
2. **Photo:** Real headshot, or placeholder for now?
3. **Projects:** Which 2–3 to feature? (GitHub URLs if you have them)
4. **Links:** GitHub, LinkedIn, and email for the contact section?
5. **Form:** Frontend-only is fine for the course — or do you want Formspree to actually send messages?

---

## Reference Files

| File | What it is |
|---|---|
| `personal-website-claude-sonnet.md` | Full Claude CLI response |
| `personal-website-chatgpt.md` | Full ChatGPT/Codex CLI response |
| `personal-website-model-comparison.md` | Side-by-side comparison |
| `consultation-prompt.txt` | Prompt sent to both models |
