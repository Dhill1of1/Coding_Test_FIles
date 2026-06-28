# Personal Website Build Plan — ChatGPT (via Codex CLI)
**Model:** GPT-5.5 (OpenAI Codex CLI)  
**Date:** June 27, 2026  
**Source:** `consultation-prompt.txt`

---

## Build Plan

### 1. File Setup Fixes

1. Open the `PersonalWebsite` folder.
2. Confirm these files exist:
   - `index.html`
   - `styles.css`
3. Since the HTML links to `styles.css` but the folder currently has `style.css`, fix one of these:
   - **Recommended:** rename `style.css` to `styles.css`
   - Or update the HTML link to match `style.css`
4. Make sure the `<link>` in `index.html` looks like:

```html
<link rel="stylesheet" href="styles.css">
```

---

### 2. HTML Structure

Use one simple one-page layout:

1. **`header`**
   - Your name
   - Short tagline
   - Navigation links: About, Projects, Contact

2. **`section id="about"`**
   - Heading: "About Me"
   - Short paragraph about who you are
   - Optional photo using `<img>`

3. **`section id="projects"`**
   - Heading: "Projects"
   - 2 or 3 project cards
   - Each project should include:
     - Project title
     - Short description
     - Source code link
     - Live demo link

4. **`section id="contact"`**
   - Heading: "Contact"
   - Email link
   - Social links, such as GitHub or LinkedIn
   - Optional simple contact form with name, email, and message fields

5. **`footer`**
   - Copyright or short closing line

---

### 3. CSS Approach

Use beginner-friendly CSS that clearly demonstrates the course requirements.

**Include:**

- **Selectors/declarations:** Style elements like `body`, `header`, `section`, `footer`; use classes like `.project-card`, `.button`, `.contact-form`
- **Color, font, text alignment, background:** `color`, `background-color`, `font-family`, `font-size`, `text-align`
- **Box model:** `width`, `height` (if useful), `border`, `padding`, `margin`
- **Layout:** `display: flex` for nav and project cards; `position: sticky` or `position: fixed` for header; `max-width` + `margin: 0 auto` to center content

---

### 4. Simple Design Recommendation

Use a clean beginner-friendly design:

- Background: light gray or off-white
- Main text: dark gray
- Accent color: blue, green, or purple
- Header: dark background with white text
- Project cards: white background, border, padding, slight shadow
- Layout: center content with max width; stack sections vertically; project cards in a row on desktop, stacked on mobile

**Example palette:**
- Background: `#f4f6f8`
- Text: `#222222`
- Header: `#1f2937`
- Accent: `#2563eb`
- Cards: `#ffffff`

---

### 5. Build Order and Time Estimates

| Step | Task | Time |
|---|---|---|
| 1 | File setup fix | 10 min |
| 2 | Fill in HTML structure | 45–60 min |
| 3 | Add content | 30–45 min |
| 4 | Base CSS (body, header, nav, sections) | 45 min |
| 5 | Style project cards and contact area | 45–60 min |
| 6 | Responsive/mobile polish | 30–45 min |
| 7 | Final testing and cleanup | 30 min |

**Total:** ~3–5 hours

---

### 6. Pass Checklist

Before submitting, confirm:

- [ ] `index.html` correctly links to the CSS file
- [ ] About section has a short paragraph
- [ ] Projects section has at least 2 projects
- [ ] Each project has source code and demo links
- [ ] Contact section includes email, social links, or a form
- [ ] CSS includes colors, font sizes, text alignment, and backgrounds
- [ ] CSS demonstrates box model: margin, padding, border, width/height
- [ ] CSS demonstrates layout: flexbox, block layout, or positioning
- [ ] Page looks readable on desktop and mobile
- [ ] All links work or use reasonable placeholder links

---

### 7. Clarifying Questions

1. Do you want the site to feel more **professional**, **creative**, or **simple/minimal**?
2. Do you already have project names, GitHub links, and demo links?
3. Do you want to include a profile photo, or keep it text-only?
