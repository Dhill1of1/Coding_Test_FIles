/* ==========================================================
   Devin Hill // portfolio
   Renders nav/footer + page content from content.js, runs the
   PS2-style boot intro (home only), and drives all site fx.
   Shared by every page. Content edits belong in content.js.
   ========================================================== */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// ---------- audio ----------

let audioCtx = null;
let sfxEnabled = localStorage.getItem("dh-sfx") !== "off";

const hoverSound = new Audio("./sounds/button-hover.mp3");
const clickSound = new Audio("./sounds/button-click.mp3");
hoverSound.volume = 0.35;
clickSound.volume = 0.5;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playSample(sample) {
  if (!sfxEnabled) return;
  sample.currentTime = 0;
  sample.play().catch(() => {});
}

/* Tiny synth helpers — every sound below is sources -> gain envelope -> speakers.
   envGain builds a gain node whose level follows [time, value] points
   (exponential ramps by default, linear when `linear` is true). */

function envGain(ctx, dest, now, points, linear = false) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(points[0][1], now + points[0][0]);
  points.slice(1).forEach(([t, v]) => {
    if (linear) g.gain.linearRampToValueAtTime(v, now + t);
    else g.gain.exponentialRampToValueAtTime(v, now + t);
  });
  g.connect(dest);
  return g;
}

function tone(ctx, dest, type, freq, t0, t1, detune = 0) {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  osc.detune.value = detune;
  osc.connect(dest);
  osc.start(t0);
  osc.stop(t1);
  return osc;
}

function noiseSrc(ctx, seconds) {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  return src;
}

// airy rising sweep used when the boot doors open
function playWhoosh(ctx, duration = 3.5) {
  const now = ctx.currentTime;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 1.2;
  filter.frequency.setValueAtTime(180, now);
  filter.frequency.exponentialRampToValueAtTime(2400, now + duration);
  const g = envGain(ctx, ctx.destination, now, [[0, 0.0001], [duration * 0.55, 0.16], [duration, 0.0001]]);
  filter.connect(g);
  const noise = noiseSrc(ctx, duration);
  noise.connect(filter);
  noise.start(now);
  noise.stop(now + duration);
}

// big shimmering chord + sub-bass boom (konami easter egg)
function playLogoChord(ctx, duration = 4.5) {
  const now = ctx.currentTime;

  // low impact "boom" under the chord
  const boomGain = envGain(ctx, ctx.destination, now, [[0, 0.55], [1.8, 0.0001]]);
  const boom = tone(ctx, boomGain, "sine", 72, now, now + 2);
  boom.frequency.exponentialRampToValueAtTime(30, now + 1.4);

  // D major-ish spread, detuned sine pairs entering one by one
  const master = envGain(ctx, ctx.destination, now, [[0, 0.0001], [0.9, 0.22], [duration, 0.0001]]);
  [146.83, 220, 293.66, 440, 587.33, 880].forEach((freq, i) => {
    [-4, 4].forEach((detune) => {
      const g = envGain(ctx, master, now, [[i * 0.12, 0], [i * 0.12 + 0.5, 0.5 / (i + 1)]], true);
      tone(ctx, g, "sine", freq, now + i * 0.12, now + duration, detune);
    });
  });
}

// short blip used for UI accents
function playBlip(freq = 880, duration = 0.08, volume = 0.08) {
  if (!sfxEnabled || !audioCtx) return;
  const now = audioCtx.currentTime;
  const g = envGain(audioCtx, audioCtx.destination, now, [[0, volume], [duration, 0.0001]]);
  tone(audioCtx, g, "square", freq, now, now + duration);
}

// short burst of filtered static for page transitions
function playStatic(duration = 0.32) {
  if (!sfxEnabled) return;
  const ctx = getAudioCtx();
  ctx.resume();
  const now = ctx.currentTime;
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 900;
  filter.connect(envGain(ctx, ctx.destination, now, [[0, 0.055], [duration, 0.0001]]));
  const noise = noiseSrc(ctx, duration);
  noise.connect(filter);
  noise.start(now);
  noise.stop(now + duration);
}

/* ==========================================================
   RENDERING — nav, footer, and page content from content.js
   ========================================================== */

// any image that fails to load swaps to its styled placeholder sibling
function showFallback(img) {
  if (img.tagName === "IMG" && img.nextElementSibling?.classList.contains("ph-fallback")) {
    img.style.display = "none";
    img.nextElementSibling.style.display = "flex";
  }
}

document.addEventListener("error", (e) => showFallback(e.target), true);

// catch static-HTML images that already failed before this script ran
document.querySelectorAll("img").forEach((img) => {
  if (img.complete && img.naturalWidth === 0) showFallback(img);
});

function phImage(src, alt, imgClass, label, hint) {
  return `
    <img class="${imgClass}" src="${src}" alt="${alt}" loading="lazy" />
    <div class="ph-fallback" style="display: none">
      <span>[ ${label} ]</span>
      ${hint ? `<span class="ph-hint">${hint}</span>` : ""}
    </div>`;
}

function renderNav() {
  const root = document.getElementById("nav-root");
  if (!root) return;
  const current = location.pathname.split("/").pop() || "index.html";
  const links = [
    ["index.html", "home"],
    ["about.html", "profile"],
    ["experience.html", "experience"],
    ["credentials.html", "credentials"],
    ["projects.html", "projects"],
  ]
    .map(
      ([href, label]) =>
        `<a href="./${href}" class="nav-link${current === href ? " is-active" : ""}">${label}</a>`
    )
    .join("");

  // replay only renders on home, where the intro lives
  const replay =
    current === "index.html"
      ? '<button class="nav-audio cp-btn" id="replay-intro" type="button">⟲ replay intro</button>'
      : "";

  root.outerHTML = `
    <nav class="nav" aria-label="main navigation">
      <div class="nav-brand">
        <span class="hud-diamond" aria-hidden="true"></span>
        <span>// D.Hill Design Portfolio</span>
      </div>
      <div class="nav-links">${links}</div>
      <div class="nav-toggles">
        ${replay}
        <button class="nav-audio cp-btn" id="audio-toggle" type="button">sfx: on</button>
      </div>
    </nav>`;
}

function renderFooter() {
  const root = document.getElementById("footer-root");
  if (!root) return;
  root.outerHTML = `
    <footer class="footer">
      <div class="footer-contact">
        <span class="footer-contact-label">// ready for UX/UI and product design roles</span>
        <div class="footer-links">
          <a class="about-link" href="${SITE.linkedin}" target="_blank" rel="noopener noreferrer">
            <span class="about-link-icon" aria-hidden="true">in</span><span>linkedin</span>
          </a>
          <a class="about-link" href="${SITE.github}" target="_blank" rel="noopener noreferrer">
            <span class="about-link-icon" aria-hidden="true">&lt;/&gt;</span><span>github</span>
          </a>
          <a class="about-link" href="mailto:${SITE.email}">
            <span class="about-link-icon" aria-hidden="true">@</span><span>email</span>
          </a>
        </div>
      </div>
    </footer>`;
}

function renderAboutLinks() {
  const root = document.getElementById("about-links-root");
  if (!root) return;
  root.innerHTML = `
    <a class="about-link" href="${SITE.linkedin}" target="_blank" rel="noopener noreferrer">
      <span class="about-link-icon" aria-hidden="true">in</span><span>linkedin // connect</span>
    </a>
    <a class="about-link" href="${SITE.github}" target="_blank" rel="noopener noreferrer">
      <span class="about-link-icon" aria-hidden="true">&lt;/&gt;</span><span>github // source</span>
    </a>
    <a class="about-link" href="mailto:${SITE.email}">
      <span class="about-link-icon" aria-hidden="true">@</span><span>email // direct line</span>
    </a>`;
}

function renderSkills() {
  const root = document.getElementById("skills-root");
  if (!root) return;
  root.innerHTML = SKILLS.map(
    (skill) => `
    <div class="skill-card cp-frame cp-frame--corners">
      <div class="skill-head">
        <div class="skill-photo">
          ${phImage(skill.image, skill.name + " logo", "skill-photo-img", skill.image.split("/").pop())}
        </div>
        <h3 class="skill-name">${skill.name}</h3>
      </div>
      <ul class="skill-points">
        ${skill.points.map((p) => `<li>${p}</li>`).join("")}
      </ul>
    </div>`
  ).join("");
}

function renderInterests() {
  const root = document.getElementById("interest-root");
  if (!root) return;
  root.innerHTML = INTERESTS.map(
    (item) => `
    <figure class="interest-card cp-frame cp-frame--corners">
      ${phImage(item.image, item.title, "interest-img", item.image.split("/").pop(), "drop photo in /images")}
      <figcaption>
        <div class="interest-title">${item.title}</div>
        <p class="interest-note">${item.caption}</p>
      </figcaption>
    </figure>`
  ).join("");
}

function renderExperience() {
  const root = document.getElementById("timeline-root");
  if (!root) return;
  root.innerHTML = EXPERIENCE.map(
    (job) => `
    <article class="timeline-node">
      <div class="timeline-marker" aria-hidden="true"></div>
      <div class="timeline-card cp-frame cp-frame--corners">
        <div class="timeline-body">
          <div class="timeline-photo">
            ${phImage(job.image, job.org + " logo", "timeline-photo-img", job.image.split("/").pop(), "drop logo in /images")}
          </div>
          <div class="timeline-info">
            <div class="timeline-date">${job.dates}</div>
            <h3 class="timeline-role">${job.role}</h3>
            <div class="timeline-org">${job.org}</div>
            <ul class="timeline-points">
              ${job.points.map((p) => `<li>${p}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    </article>`
  ).join("");
}

function renderCredentials() {
  const root = document.getElementById("cred-root");
  if (!root) return;
  root.innerHTML = CREDENTIALS.map(
    (column) => `
    <div class="cred-column">
      <h3 class="cred-heading"><span class="cred-heading-tick" aria-hidden="true"></span>${column.heading}</h3>
      ${column.items
        .map(
          (item) => `
        <div class="cred-card cp-frame">
          <div class="cred-photo">
            ${phImage(item.image, item.issuer, "cred-photo-img", item.image.split("/").pop())}
          </div>
          <div class="cred-name">${item.name}</div>
          <div class="cred-issuer">${item.issuer}</div>
          <div class="cred-year">${item.year}</div>
        </div>`
        )
        .join("")}
    </div>`
  ).join("");
}

function renderProjects() {
  const root = document.getElementById("project-root");
  if (!root) return;
  root.innerHTML = PROJECTS.map(
    (proj) => `
    <article class="project cp-frame cp-frame--corners">
      <header class="project-header">
        <div class="project-title-block">
          <div class="project-logo">
            ${phImage(proj.logo, proj.name + " logo", "project-logo-img", "logo")}
          </div>
          <h3 class="project-name">${proj.name}</h3>
        </div>
        <span class="project-status">status: ${proj.status}</span>
      </header>

      <div class="project-shot">
        ${phImage(proj.screenshot, proj.name + " screenshot", "project-shot-img", proj.screenshot.split("/").pop(), "drop a screenshot in /images")}
      </div>

      <div class="project-meta">
        <a class="project-link" href="${proj.demo}" target="_blank" rel="noopener noreferrer">prototype ↗</a>
        <a class="project-link" href="${proj.github}" target="_blank" rel="noopener noreferrer">source ↗</a>
        <span class="project-shipped">format: ${proj.shipped}</span>
      </div>

      <div class="project-stack">
        ${proj.stack.map((tech) => `<span class="stack-chip">${tech}</span>`).join("")}
      </div>

      <details class="project-story">
        <summary>case study notes</summary>
        <div class="project-story-body">
          <p><strong>Concept.</strong> ${proj.story.concept}</p>
          <p><strong>Build.</strong> ${proj.story.build}</p>
          <p><strong>Completion.</strong> ${proj.story.completion}</p>
        </div>
      </details>
    </article>`
  ).join("");
}

renderNav();
renderFooter();
renderAboutLinks();
renderSkills();
renderInterests();
renderExperience();
renderCredentials();
renderProjects();

/* ==========================================================
   BOOT INTRO + SITE FX
   ========================================================== */

// ---------- hero typing effect (home page only) ----------
// declared before the boot code, which may call startHeroTyping immediately
// when the intro is skipped on a repeat visit

const typedEl = document.getElementById("hero-typed");
let typingStarted = false;

function startHeroTyping() {
  if (typingStarted || !typedEl) return;
  typingStarted = true;
  const roles = SITE.roles;

  if (prefersReducedMotion) {
    typedEl.textContent = roles[0];
    return;
  }

  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const word = roles[roleIdx];
    if (!deleting) {
      charIdx++;
      if (charIdx === word.length) {
        deleting = true;
        setTimeout(tick, 2000);
        typedEl.textContent = word.slice(0, charIdx);
        return;
      }
    } else {
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    typedEl.textContent = word.slice(0, charIdx);
    setTimeout(tick, deleting ? 45 : 90);
  }
  tick();
}

// ---------- boot intro (only exists on index.html) ----------

const bootEl = document.getElementById("boot");
const site = document.getElementById("site");
let bootDone = !bootEl;

if (bootEl) {
  const stagePress = document.getElementById("boot-press");
  const stageLoad = document.getElementById("boot-load");
  const skipBtn = document.getElementById("boot-skip");

  let bootTimeouts = [];

  function after(ms, fn) {
    bootTimeouts.push(setTimeout(fn, ms));
  }

  // the boot screen splits open like doors to reveal the site
  function endBoot() {
    if (bootDone) return;
    bootDone = true;
    sessionStorage.setItem("dh-booted", "yes");
    bootTimeouts.forEach(clearTimeout);
    document.body.classList.remove("is-booting");
    site.classList.add("is-live");
    startHeroTyping();
    bootEl.classList.add("is-opening");
    if (sfxEnabled && audioCtx) playWhoosh(audioCtx, 1.2);
    setTimeout(() => bootEl.remove(), 1100);
  }

  const loadStatuses = [
    [0, "preparing portfolio…"],
    [42, "loading work…"],
    [78, "opening site…"],
  ];

  function runLoadingBar() {
    const fill = document.getElementById("boot-load-fill");
    const pct = document.getElementById("boot-load-pct");
    const status = document.getElementById("boot-load-status");
    const granted = document.getElementById("boot-load-granted");
    let progress = 0;
    let statusIdx = 0;
    let lastBlip = 0;

    // clearTimeout also clears intervals, so this is safe in bootTimeouts
    const timer = setInterval(() => {
      // measured stall-and-surge: short enough for recruiters, slow enough to feel intentional
      const r = Math.random();
      progress += r < 0.18 ? 0 : r > 0.92 ? 9 : 1.2 + Math.random() * 3.2;
      progress = Math.min(progress, 100);

      fill.style.width = progress + "%";
      pct.textContent = Math.floor(progress) + "%";

      if (statusIdx < loadStatuses.length && progress >= loadStatuses[statusIdx][0]) {
        status.textContent = loadStatuses[statusIdx][1];
        playBlip(700 + statusIdx * 160, 0.06, 0.05);
        statusIdx++;
      } else if (progress - lastBlip >= 10) {
        lastBlip = progress;
        playBlip(1250, 0.03, 0.02);
      }

      if (progress >= 100) {
        clearInterval(timer);
        status.textContent = "ready";
        granted.classList.add("is-on");
        playBlip(1568, 0.3, 0.09);
        bootTimeouts.push(setTimeout(endBoot, 1050));
      }
    }, 58);
    bootTimeouts.push(timer);
  }

  function runBootSequence() {
    getAudioCtx().resume();
    stagePress.classList.remove("is-active");
    skipBtn.classList.add("is-visible");

    // title card dissolves into a short opening reel, then the doors open
    after(480, () => {
      stageLoad.classList.add("is-active");
      runLoadingBar();
    });
  }

  // play the intro once per session; skip it entirely for users
  // who prefer reduced motion
  if (sessionStorage.getItem("dh-booted") === "yes" || prefersReducedMotion) {
    bootEl.remove();
    bootDone = true;
    site.classList.add("is-live");
    startHeroTyping();
  } else {
    document.body.classList.add("is-booting");
    stagePress.classList.add("is-active");
    stagePress.addEventListener("click", runBootSequence, { once: true });
    skipBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      endBoot();
    });
  }
}

// ---------- hero glitch pulses (home page only) ----------

const glitchEl = document.querySelector(".glitch");
if (glitchEl && !prefersReducedMotion) {
  setInterval(() => {
    if (bootDone) {
      glitchEl.classList.add("is-glitching");
      setTimeout(() => glitchEl.classList.remove("is-glitching"), 560);
    }
  }, 6500);
}

// ---------- UI sounds ----------

document.querySelectorAll("a, button, summary").forEach((el) => {
  el.addEventListener("mouseenter", () => playSample(hoverSound));
  el.addEventListener("click", () => playSample(clickSound));
});

// ---------- page transition glitch ----------

const glitchOverlay = document.createElement("div");
glitchOverlay.className = "page-glitch";
glitchOverlay.setAttribute("aria-hidden", "true");
document.body.appendChild(glitchOverlay);

// glitch out, then navigate (immediately under reduced motion)
document.querySelectorAll('a[href$=".html"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const dest = link.getAttribute("href");
    if (prefersReducedMotion) {
      location.href = dest;
      return;
    }
    playStatic();
    document.body.classList.add("is-glitching-out");
    setTimeout(() => {
      location.href = dest;
    }, 420);
  });
});

// pages restored from the back/forward cache keep their classes,
// so clear the glitch-out state or the page would come back distorted
window.addEventListener("pageshow", () => {
  document.body.classList.remove("is-glitching-out");
});

// glitch in on arrival (skipped while the boot intro owns the screen)
if (!document.body.classList.contains("is-booting") && !prefersReducedMotion) {
  document.body.classList.add("is-glitching-in");
  setTimeout(() => document.body.classList.remove("is-glitching-in"), 540);
}

// ---------- replay intro (home page only) ----------

const replayBtn = document.getElementById("replay-intro");
if (replayBtn) {
  replayBtn.addEventListener("click", () => {
    sessionStorage.removeItem("dh-booted");
    location.reload();
  });
}

// ---------- sfx toggle (persists across pages) ----------

const audioToggle = document.getElementById("audio-toggle");
audioToggle.textContent = `sfx: ${sfxEnabled ? "on" : "off"}`;
audioToggle.addEventListener("click", () => {
  sfxEnabled = !sfxEnabled;
  localStorage.setItem("dh-sfx", sfxEnabled ? "on" : "off");
  audioToggle.textContent = `sfx: ${sfxEnabled ? "on" : "off"}`;
});

// ---------- konami code easter egg ----------

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];
let konamiIdx = 0;

document.addEventListener("keydown", (e) => {
  konamiIdx = e.key === KONAMI[konamiIdx] ? konamiIdx + 1 : 0;
  if (konamiIdx !== KONAMI.length) return;
  konamiIdx = 0;

  const msg = document.createElement("div");
  msg.className = "konami-msg";
  msg.textContent = "// cheat code accepted — unlimited ambition mode";
  document.body.appendChild(msg);
  document.body.classList.add("is-konami");
  if (sfxEnabled) playLogoChord(getAudioCtx(), 3);
  setTimeout(() => {
    document.body.classList.remove("is-konami");
    msg.remove();
  }, 4000);
});
