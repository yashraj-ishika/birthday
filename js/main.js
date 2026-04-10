'use strict';

// ── Photo data ────────────────────────────────
const photos = [
  {
    src: 'images/photo1.jpg',
    caption: 'Kissing you feels like time pauses for a second and nothing else matters except that moment. Btw you taste heavenly delicious. 😋'
  },
  {
    src: 'images/photo2.jpg',
    caption: 'When I first saw you, everything felt a little softer, And you stayed with me long after that moment ended. And somehow, without even trying, you became my favorite thought. 🌸'
  },
  {
    src: 'images/photo3.jpg',
    caption: 'The first time I held your hand and somehow, I never wanted to let go of it. 🫶🏻'
  },
  {
    src: 'images/photo4.jpg',
    caption: 'I like admiring you when you\'re not looking at me and I only think that how can someone be this cuteeeee 💋'
  }
];

// ── State ─────────────────────────────────────
let heartOpened = false;
let musicPlaying = false;
let audio = null;

// ── DOM refs ──────────────────────────────────
const $landing         = document.getElementById('landing');
const $birthdaySection = document.getElementById('birthdaySection');
const $surpriseSection = document.getElementById('surpriseSection');
const $mainHeart       = document.getElementById('mainHeart');
const $photoModal      = document.getElementById('photoModal');
const $modalImg        = document.getElementById('modalImg');
const $modalCaption    = document.getElementById('modalCaption');
const $surpriseBtn     = document.getElementById('surpriseBtn');
const $surpriseMessage = document.getElementById('surpriseMessage');
const $surpriseHearts  = document.getElementById('surpriseHearts');
const $musicControl    = document.getElementById('musicControl');
const $musicIcon       = document.getElementById('musicIcon');
const $musicLabel      = document.getElementById('musicLabel');

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  injectSVGClipPath();
  spawnParticles();
  spawnFloatingTexts();
  initAudio();
  addSVGClipToCollage();
});

// =============================================
// SVG HEART CLIP PATH
// =============================================
function injectSVGClipPath() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.innerHTML = `
    <defs>
      <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
        <path d="M0.5,0.9 C0.5,0.9 0.05,0.55 0.05,0.3
                 C0.05,0.13 0.18,0.05 0.3,0.05
                 C0.38,0.05 0.46,0.1 0.5,0.18
                 C0.54,0.1 0.62,0.05 0.7,0.05
                 C0.82,0.05 0.95,0.13 0.95,0.3
                 C0.95,0.55 0.5,0.9 0.5,0.9 Z"/>
      </clipPath>
    </defs>`;
  document.body.prepend(svg);
}

function addSVGClipToCollage() {
  const collage = document.getElementById('heartCollage');
  if (collage) collage.style.clipPath = 'url(#heartClip)';
}

// =============================================
// PARTICLES
// =============================================
const particleEmojis = ['💕', '🌸', '✨', '💗', '💖'];

function spawnParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 10) + 's';
    container.appendChild(p);
  }
}

// =============================================
// FLOATING TEXT
// =============================================
const loveTexts = ['I love you', 'Forever', 'My Ishika ❤️'];

function spawnFloatingTexts() {
  const container = document.getElementById('floating-texts');
  if (!container) return;

  for (let i = 0; i < 6; i++) {
    const t = document.createElement('div');
    t.className = 'float-text';
    t.textContent = loveTexts[Math.floor(Math.random() * loveTexts.length)];
    t.style.left = Math.random() * 100 + '%';
    container.appendChild(t);
  }
}

// =============================================
// AUDIO
// =============================================
function initAudio() {
  audio = document.getElementById('bgMusic');
  if (!audio) return;
  audio.volume = 0.4;
}

function toggleMusic() {
  if (!audio) return;

  if (musicPlaying) {
    audio.pause();
  } else {
    audio.play().catch(() => {});
  }

  musicPlaying = !musicPlaying;
  $musicLabel.textContent = musicPlaying ? 'Pause' : 'Play Music';
}

// =============================================
// OPEN HEART (FIXED)
// =============================================
function openHeart() {
  if (heartOpened) return;
  heartOpened = true;

  if ($mainHeart) $mainHeart.classList.add('opening');

  if (audio) audio.play().catch(() => {});

  setTimeout(() => {
    if ($landing) $landing.classList.add('hidden');
    if ($birthdaySection) $birthdaySection.classList.remove('hidden');

    // ✅ FIX: ensure surprise section shows
    if ($surpriseSection) $surpriseSection.classList.remove('hidden');

    $birthdaySection.scrollIntoView({ behavior: 'smooth' });

    observeSections();
  }, 900);
}

// =============================================
// OBSERVER (FIXED)
// =============================================
function observeSections() {
  const sections = [$birthdaySection, $surpriseSection];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  sections.forEach(s => {
    if (!s) return;
    s.style.opacity = '0';
    s.style.transform = 'translateY(40px)';
    s.style.transition = '0.8s';
    observer.observe(s);
  });
}

// =============================================
// PHOTO MODAL
// =============================================
function openPhotoModal(index) {
  const photo = photos[index];
  if (!photo) return;

  $modalImg.src = photo.src;
  $modalCaption.textContent = photo.caption;

  $photoModal.classList.remove('hidden');
}

function closePhotoModal(e) {
  if (e.target === $photoModal) {
    $photoModal.classList.add('hidden');
  }
}

// =============================================
// SURPRISE
// =============================================
function triggerSurprise() {
  if ($surpriseBtn) $surpriseBtn.classList.add('hidden');
  if ($surpriseMessage) $surpriseMessage.classList.remove('hidden');

  launchSurpriseHearts();
}

function launchSurpriseHearts() {
  const emojis = ['❤️', '💕', '💖', '✨'];

  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const h = document.createElement('div');
      h.className = 's-heart';
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      h.style.left = Math.random() * 100 + '%';
      h.style.fontSize = (16 + Math.random() * 20) + 'px';
      $surpriseHearts.appendChild(h);

      setTimeout(() => h.remove(), 3000);
    }, i * 80);
  }
}