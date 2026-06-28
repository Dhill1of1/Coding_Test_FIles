# Personal Website Build Plan — Claude (via CLI)
**Model:** Claude (Claude Code CLI)  
**Date:** June 27, 2026  
**Source:** `consultation-prompt.txt`

---

Good — I can see exactly where things stand. Here's your build plan:

---

## Personal Website Build Plan

### 1. File Setup Fixes (~5 min)

Two issues to fix:
- **Filename:** `PersonalWebsite.html` → rename to `index.html` (standard convention, easier to open in a browser)
- **CSS link mismatch:** HTML links to `styles.css` but the file is `style.css` — either rename the file to `styles.css` OR update the `<link>` tag to say `style.css`. Pick one and be consistent.

---

### 2. HTML Structure

Keep everything in one scrolling page with four sections inside `<main>`:

```
<header>         — name + tagline + nav links
  <nav>          — anchor links to each section (#about, #projects, #contact)

<section id="about">
  <img>          — optional photo
  <p>            — 3-4 sentence bio

<section id="projects">
  3× <div class="project-card">
       <h3> title
       <p>  description
       <a>  source code link
       <a>  demo link

<section id="contact">
  <form>         — name, email, message fields + submit button
  <ul>           — social links (GitHub, LinkedIn, email mailto:)

<footer>         — copyright line
```

---

### 3. CSS Approach (hitting every requirement)

| Requirement | Where to use it |
|---|---|
| Selectors | Element (`body`, `h1`), class (`.project-card`), ID (`#about`), pseudo-class (`a:hover`) |
| Color | Background color on header/footer, text colors throughout |
| Font / size | `font-family` on body, `font-size` on headings vs paragraphs |
| `text-align` | Center the header; left-align body text |
| `background` | Header background color; optional subtle background on project cards |
| Box model | `padding` on sections, `margin` between cards, `border` on project cards or form inputs, `width`/`height` on photo |
| `display` | `flex` on nav and project cards row |
| Positioning | `sticky` on the nav so it stays at the top while scrolling |

---

### 4. Simple Design Recommendation

**Color palette (clean, professional):**
- Background: `#f5f5f5` (light gray)
- Header/Footer: `#1a1a2e` (dark navy)
- Accent: `#4a90e2` (medium blue) — links, button, card borders
- Text: `#333333`

**Layout:**
- Max-width container (~900px) centered on the page
- Project cards in a row using flexbox (wrap on small screens)
- Sticky nav at the top

---

### 5. Build Order & Time Estimates

| Step | Task | Time |
|---|---|---|
| 1 | Fix file issues (rename, fix link) | 5 min |
| 2 | Write full HTML for all sections | 45-60 min |
| 3 | CSS base: reset, body, fonts, colors | 20 min |
| 4 | CSS header + sticky nav | 20 min |
| 5 | CSS About section (photo + text layout) | 20 min |
| 6 | CSS Project cards (flexbox) | 30 min |
| 7 | CSS Contact form + social links | 25 min |
| 8 | CSS footer + polish (hover effects, spacing) | 20 min |
| 9 | Review checklist + browser test | 15 min |
| **Total** | | **~3-3.5 hours** |

---

### 6. Pass Checklist

Before submitting, verify each box:

- [ ] About section has a paragraph (and optional photo)
- [ ] Projects section has at least 2-3 cards, each with a source code link and demo link
- [ ] Contact section has a form (name, email, message, submit) AND at least one social/email link
- [ ] CSS uses element, class, and ID selectors
- [ ] CSS sets color, font-size, font-family, and text-align somewhere
- [ ] CSS sets a background-color
- [ ] CSS uses `width`, `height`, `border`, `padding`, and `margin` (box model all four)
- [ ] CSS uses `display: flex` somewhere
- [ ] CSS uses a `position` property (e.g. `position: sticky`)
- [ ] Page looks right in a browser (open `index.html` directly in Chrome/Firefox)

---

### 7. Clarifying Questions

A few things that'll shape the content — no wrong answers:

1. **Projects:** Do you have 2-3 real projects to link to, or should we use placeholder links for now?
2. **Photo:** Do you want to include a photo of yourself, or skip it / use an avatar placeholder?
3. **Your name:** What name should appear in the header/title?
4. **Contact form:** This is a frontend-only course, so the form won't actually send anything — is that fine, or do you want to wire it up to a free service like Formspree?
5. **Social links:** Which do you want to list? (GitHub, LinkedIn, Twitter/X, email, etc.)

---

Once you answer those, I can write all the HTML and CSS in one pass. Ready when you are.
