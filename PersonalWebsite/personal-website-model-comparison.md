# Model Comparison: Claude vs ChatGPT
**Subject:** CSS Course Final Project — Personal Website  
**Date:** June 27, 2026  
**Consultation method:** Claude Code CLI (`claude -p`) + OpenAI Codex CLI (`codex exec`)  
**Folder:** `PersonalWebsite/`

---

## Agreement (High Confidence — Use These)

| Topic | Both Agree |
|---|---|
| **Scope** | One page, three sections (About, Projects, Contact) + header/footer |
| **Files** | Fix `styles.css` vs `style.css` mismatch; use `index.html` |
| **Project count** | 2–3 projects, each with source + demo links |
| **Time** | ~3–5 hours total |
| **Build order** | Fix files → HTML → base CSS → sections → polish → test |
| **Layout** | Flexbox for nav and project cards; no need for Grid or JavaScript |
| **Positioning** | Sticky or fixed header |
| **Centering** | `max-width` + `margin: 0 auto` on content |
| **Contact** | Form + social/email links |
| **Grading** | Must explicitly hit selectors, color/font/text/background, box model, display/position |

---

## Key Differences

| Dimension | Claude | ChatGPT (GPT-5.5) | Best Take |
|---|---|---|---|
| **Rename HTML file** | Explicitly rename `PersonalWebsite.html` → `index.html` | Assumes `index.html` already exists | **Rename to `index.html`** — matches course starter |
| **Color palette** | Navy header `#1a1a2e`, accent `#4a90e2`, bg `#f5f5f5` | Gray header `#1f2937`, accent `#2563eb`, bg `#f4f6f8` | **Either works** — palettes are nearly identical; use ChatGPT's hex values |
| **Build steps** | 9 granular steps (~3–3.5 hrs) | 7 broader steps (~3–5 hrs) | **Claude's 9 steps** for day-of clarity; ChatGPT's time range for flexibility |
| **CSS detail** | Maps each course requirement to a specific property/location | Lists property categories without a table | **Claude's requirement table** — easiest to verify you pass |
| **Contact form** | Required (name, email, message, submit) | "Optional" form; email/social links also fine | **Include the form** — course explicitly mentions forms |
| **Social links markup** | `<ul>` list | Plain links | Either works; list is slightly more semantic |
| **Responsive** | Mentioned briefly (flex-wrap) | Dedicated step (30–45 min) | **One `@media` rule** is enough — don't over-invest |
| **Questions asked** | 5 (projects, photo, name, Formspree, socials) | 3 (vibe, project links, photo) | **Combine all** — see final plan |

---

## Synthesized Verdict

**Winning approach:** Claude's step-by-step build order + requirement mapping table + ChatGPT's color palette and responsive reminder.

**Why:** Claude gave the most actionable hour-by-hour plan and clearest grading checklist. ChatGPT gave a slightly cleaner color system and explicitly called out mobile testing.

See **`personal-website-plan-FINAL.md`** for the single plan to follow.
