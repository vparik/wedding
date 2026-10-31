// ── SNOWFLAKES ──
const snowContainer = document.getElementById('snowflakes');
const snowChars = ['❄', '❄', '❄', '✦', '·'];
for (let i = 0; i < 28; i++) {
  const el = document.createElement('span');
  el.classList.add('snowflake');
  el.textContent = snowChars[Math.floor(Math.random() * snowChars.length)];
  const size = (Math.random() * 0.8 + 0.5).toFixed(2);
  el.style.cssText = `
    left: ${Math.random() * 100}%;
    font-size: ${size}rem;
    animation-duration: ${(Math.random() * 12 + 12).toFixed(1)}s;
    animation-delay: ${(-Math.random() * 20).toFixed(1)}s;
    opacity: ${(Math.random() * 0.5 + 0.3).toFixed(2)};
  `;
  if (snowContainer) snowContainer.appendChild(el);
}

// ── FALLING CHRISTMAS DECOR ON THE SIDES ──
const decorBox = document.getElementById('decor');
const baubleColors = ['#c0394d', '#c9a84c', '#2a5c40', '#8e2233'];

function hollySVG() {
  return `<svg class="decor-svg" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(40 42)">
      <g fill="#2f6b49">
        <path d="M0 0 C-8 -10, -8 -24, 0 -34 C8 -24, 8 -10, 0 0 Z" transform="rotate(-40)"/>
        <path d="M0 0 C-8 -10, -8 -24, 0 -34 C8 -24, 8 -10, 0 0 Z" transform="rotate(40)"/>
        <path d="M0 0 C-8 -10, -8 -24, 0 -34 C8 -24, 8 -10, 0 0 Z" transform="rotate(-140)"/>
        <path d="M0 0 C-8 -10, -8 -24, 0 -34 C8 -24, 8 -10, 0 0 Z" transform="rotate(140)"/>
      </g>
      <g fill="#b83a4d" stroke="#8e2233" stroke-width="1">
        <circle cx="-8" cy="2" r="6"/>
        <circle cx="8" cy="2" r="6"/>
        <circle cx="0" cy="-8" r="6"/>
      </g>
      <line x1="0" y1="0" x2="0" y2="22" stroke="#1a3d2b" stroke-width="2" stroke-linecap="round"/>
    </g>
  </svg>`;
}

if (decorBox) {
  const total = 18;
  for (let i = 0; i < total; i++) {
    const side = i % 2 === 0 ? 'left' : 'right';
    const isHolly = i % 3 !== 0;
    const el = document.createElement('span');
    el.className = 'decor-item';
    if (isHolly) {
      el.innerHTML = hollySVG();
    } else {
      el.classList.add('decor-bauble');
      el.style.setProperty('--c', baubleColors[i % baubleColors.length]);
    }
    const size = (22 + Math.random() * 20).toFixed(1);
    el.style.width = size + 'px';
    el.style.left = side === 'left' ? (Math.random() * 13).toFixed(1) + '%' : (87 + Math.random() * 13).toFixed(1) + '%';
    el.style.animationDuration = (Math.random() * 12 + 15).toFixed(1) + 's';
    el.style.animationDelay = (-Math.random() * 22).toFixed(1) + 's';
    el.style.setProperty('--decop', (Math.random() * 0.3 + 0.45).toFixed(2));
    decorBox.appendChild(el);
  }
}

// ── COUNTDOWN ──
function updateCountdown() {
  const wedding = new Date('2027-01-02T16:30:00');
  const now = new Date();
  const diff = wedding - now;
  if (diff <= 0) {
    const cd = document.getElementById('countdown');
    if (cd) cd.innerHTML = '<p style="font-family:\'EB Garamond\',serif;font-style:italic;font-size:1.6rem;color:#e8cc7a">Σήμερα είναι η μέρα! ❄</p>';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const cdD = document.getElementById('cd-days');
  const cdH = document.getElementById('cd-hours');
  const cdM = document.getElementById('cd-mins');
  const cdS = document.getElementById('cd-secs');
  if (cdD) cdD.textContent = String(d).padStart(3, '0');
  if (cdH) cdH.textContent = String(h).padStart(2, '0');
  if (cdM) cdM.textContent = String(m).padStart(2, '0');
  if (cdS) cdS.textContent = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ── WEDDING PARTY ──
const partyMembers = [
  { name: 'Βασίλης', role: 'Κουμπάρος', initials: '?', photo: 'Besties/vasilis.jpg' },
  { name: 'Ελισσάβετ', role: 'Κουμπάρα', initials: '?', photo: 'Besties/elisavet.jpg' },
  { name: 'Χρύσα', role: 'Κουμπάρα', initials: '?', photo: 'Besties/chrysa.jpg' },
];
const grid = document.getElementById('party-grid');
if (grid) {
  partyMembers.forEach(member => {
    grid.innerHTML += `
      <div class="party-card">
        <div class="party-photo">${member.photo ? `<img src="${member.photo}" alt="${member.name}" loading="lazy" />` : `<span class="initials">${member.initials}</span>`}</div>
        <p class="party-name">${member.name}</p>
        <p class="party-role">${member.role}</p>
      </div>`;
  });
}

// ── RSVP ──
const RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbx0TEAk6IjOm4BzFw4byLKQTA4HaAfGMppfjaKHJlf2O-yIJaf7JYVk79wIdqvJEyYqgw/exec';
const RSVP_TOKEN = 'itsweddingtime';
const COMPANION_PLUS1 = 'Με 1 συνοδό (+1)';
const COMPANION_GROUP = 'Με περισσότερα άτομα';

function syncCompanion() {
  const picked = document.querySelector('input[name="companion"]:checked');
  const nameBox = document.getElementById('r-companion-name');
  const countBox = document.getElementById('r-group-count');
  if (!nameBox || !countBox) return;
  const withPlus1 = picked && picked.value === COMPANION_PLUS1;
  const withGroup = picked && picked.value === COMPANION_GROUP;
  nameBox.style.display = withPlus1 ? 'block' : 'none';
  countBox.style.display = withGroup ? 'block' : 'none';
  if (!withPlus1) nameBox.value = '';
  if (!withGroup) countBox.value = '';
}
document.querySelectorAll('input[name="companion"]').forEach(r => r.addEventListener('change', syncCompanion));
syncCompanion();

function submitRSVP() {
  const name = document.getElementById('r-name').value.trim();
  const attend = document.getElementById('r-attend').value;
  const msg = document.getElementById('rsvp-msg');
  if (!name || !attend) {
    msg.style.color = '#c0394d';
    msg.textContent = 'Συμπληρώστε το όνομά σας και την παρουσία σας.';
    return;
  }
  const companion = document.querySelector('input[name="companion"]:checked')?.value || '';
  const companionName = document.getElementById('r-companion-name').value.trim();
  const guestCount = document.getElementById('r-group-count').value.trim();
  if (companion === COMPANION_PLUS1 && !companionName) {
    msg.style.color = '#c0394d';
    msg.textContent = 'Συμπληρώστε το ονοματεπώνυμο του συνοδού σας.';
    return;
  }
  if (companion === COMPANION_GROUP && (!guestCount || Number(guestCount) < 3)) {
    msg.style.color = '#c0394d';
    msg.textContent = 'Συμπληρώστε τον συνολικό αριθμό ατόμων (τουλάχιστον 3).';
    return;
  }
  const payload = {
    token: RSVP_TOKEN,
    name: name,
    email: document.getElementById('r-email').value.trim(),
    attend: attend,
    companion: companion,
    companionName: companionName,
    guestCount: guestCount,
    meal: document.getElementById('r-meal').value,
    allergies: [...document.querySelectorAll('input[name="allergy"]:checked')].map(c => c.value).join(', '),
    allergyOther: document.getElementById('r-allergy-other').value.trim(),
    severity: document.getElementById('r-allergy-severity').value,
    notes: document.getElementById('r-notes').value.trim(),
    company: document.getElementById('r-company').value
  };
  if (payload.company) return;
  if (RSVP_ENDPOINT) postToEndpoint(RSVP_ENDPOINT, payload);
  msg.style.color = '#e8cc7a';
  msg.textContent = `Ευχαριστούμε, ${name}! Λάβαμε την απάντησή σας — ανυπομονούμε να γιορτάσουμε μαζί σας ❄`;
  ['r-name', 'r-email', 'r-notes', 'r-allergy-other'].forEach(id => document.getElementById(id).value = '');
  ['r-attend', 'r-meal', 'r-allergy-severity'].forEach(id => document.getElementById(id).selectedIndex = 0);
  document.getElementById('r-companion-name').value = '';
  document.getElementById('r-group-count').value = '';
  const defaultCompanion = document.querySelector('input[name="companion"][value="Μόνος/μόνη μου"]');
  if (defaultCompanion) defaultCompanion.checked = true;
  document.querySelectorAll('input[name="allergy"]').forEach(cb => cb.checked = false);
  syncCompanion();
}

let rsvpSink = null;
function postToEndpoint(url, data) {
  if (!rsvpSink) {
    rsvpSink = document.createElement('iframe');
    rsvpSink.name = 'rsvp-sink';
    rsvpSink.style.display = 'none';
    document.body.appendChild(rsvpSink);
  }
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = url;
  form.target = 'rsvp-sink';
  form.style.display = 'none';
  Object.keys(data).forEach(key => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
  setTimeout(() => form.remove(), 0);
}

// ── REVEAL / HIDE ──
document.querySelectorAll('[data-reveal-target]').forEach(btn => {
  const box = document.getElementById(btn.dataset.revealTarget);
  if (!box) return;
  btn.addEventListener('click', () => {
    const open = box.hasAttribute('hidden');
    if (open) box.removeAttribute('hidden');
    else box.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? btn.dataset.hideLabel : btn.dataset.showLabel;
  });
});

// ── IBAN copy ──
const ibanCopy = document.getElementById('iban-copy');
if (ibanCopy) {
  ibanCopy.addEventListener('click', async () => {
    const iban = document.getElementById('iban-value').textContent.trim();
    try {
      await navigator.clipboard.writeText(iban);
      ibanCopy.textContent = 'Αντιγράφηκε ✓';
      setTimeout(() => (ibanCopy.textContent = 'Αντιγραφή'), 2000);
    } catch (e) {
      const range = document.createRange();
      range.selectNodeContents(document.getElementById('iban-value'));
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      ibanCopy.textContent = 'Επιλέχθηκε — πατήστε Ctrl+C';
    }
  });
}

// ── GALLERY: auto-scrolling strip + lightbox ──
const galleryPhotos = [
  { src: 'Gallery/96c6a1db-6562-4672-b995-58b6ec42c610.jpg', alt: 'Κωνσταντίνος & Συμέλα' },
  { src: 'Gallery/48e4b828-c7d1-4ee8-b8c6-6740a845e901.jpg', alt: 'Κωνσταντίνος & Συμέλα' },
  { src: 'Gallery/0a6435ed-dbd3-48b2-9eae-0314c592c305.jpg', alt: 'Κωνσταντίνος & Συμέλα' },
  { src: 'Gallery/29e9b509-c07e-4993-9354-ef2fa29353e3.jpg', alt: 'Κωνσταντίνος & Συμέλα' },
  { src: 'Gallery/4a24f289-dafd-4633-8607-87a3a4ce3611.jpg', alt: 'Κωνσταντίνος & Συμέλα' },
  { src: 'Gallery/4797c90a-dd0f-4e97-b8f5-91ba634fb2b2.jpg', alt: 'Κωνσταντίνος & Συμέλα' },
  { src: 'Gallery/e6d38b5e-0263-4b3d-9129-054530ed3490.jpg', alt: 'Κωνσταντίνος & Συμέλα' },
  { src: 'Gallery/77be8034-ec9b-498b-bcde-40f9b2dc7899.jpg', alt: 'Κωνσταντίνος & Συμέλα' },
  { src: 'Gallery/1b6ffc2b-1847-44c2-9e0f-4dfd0b443734.jpg', alt: 'Κωνσταντίνος & Συμέλα' },
  { src: 'Gallery/baed04f3-efa4-4e43-9ecf-e715defd751a.jpg', alt: 'Κωνσταντίνος & Συμέλα' },
  { src: 'Gallery/936a9dac-9121-466c-b87c-aeef0a93ad85.jpg', alt: 'Κωνσταντίνος & Συμέλα' },
];

const galleryTrack = document.getElementById('gallery-track');
const galleryStrip = document.getElementById('gallery-strip');
if (galleryTrack && galleryStrip) {
  const makePhoto = (photo, i) => {
    const fig = document.createElement('figure');
    fig.className = 'gallery-photo';
    fig.dataset.index = i;
    fig.innerHTML = `<img src="${photo.src}" alt="${photo.alt}" loading="lazy" draggable="false" />`;
    return fig;
  };
  galleryPhotos.forEach((p, i) => galleryTrack.appendChild(makePhoto(p, i)));
  galleryPhotos.forEach((p, i) => {
    const clone = makePhoto(p, i);
    clone.setAttribute('aria-hidden', 'true');
    galleryTrack.appendChild(clone);
  });
  const setDuration = () => {
    const halfWidth = galleryTrack.scrollWidth / 2;
    if (halfWidth) galleryTrack.style.setProperty('--scroll-duration', (halfWidth / 40) + 's');
  };
  setDuration();
  window.addEventListener('resize', setDuration);
  const playPause = document.getElementById('gallery-playpause');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    galleryStrip.classList.add('paused');
  }
  const syncPlayPause = () => {
    if (!playPause) return;
    const paused = galleryStrip.classList.contains('paused');
    playPause.textContent = paused ? '▶ Αναπαραγωγή' : '⏸ Παύση';
    playPause.setAttribute('aria-pressed', String(paused));
  };
  if (playPause) playPause.addEventListener('click', () => { galleryStrip.classList.toggle('paused'); syncPlayPause(); });
  syncPlayPause();

  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCounter = document.getElementById('lightbox-counter');
  let current = 0;
  const showPhoto = i => {
    if (!lbImg || !lbCounter) return;
    current = (i + galleryPhotos.length) % galleryPhotos.length;
    lbImg.src = galleryPhotos[current].src;
    lbImg.alt = galleryPhotos[current].alt;
    lbCounter.textContent = `${current + 1} / ${galleryPhotos.length}`;
  };
  const openLightbox = i => { if (!lightbox) return; showPhoto(i); lightbox.removeAttribute('hidden'); document.body.style.overflow = 'hidden'; };
  const closeLightbox = () => { if (!lightbox) return; lightbox.setAttribute('hidden', ''); document.body.style.overflow = ''; };
  galleryTrack.addEventListener('click', e => { const fig = e.target.closest('.gallery-photo'); if (fig) openLightbox(Number(fig.dataset.index)); });
  const lbClose = document.getElementById('lightbox-close');
  const lbPrev = document.getElementById('lightbox-prev');
  const lbNext = document.getElementById('lightbox-next');
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', () => showPhoto(current - 1));
  if (lbNext) lbNext.addEventListener('click', () => showPhoto(current + 1));
  if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lightbox || lightbox.hasAttribute('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPhoto(current - 1);
    if (e.key === 'ArrowRight') showPhoto(current + 1);
  });
  let touchX = null;
  if (lightbox) {
    lightbox.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', e => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) showPhoto(current + (dx < 0 ? 1 : -1));
      touchX = null;
    }, { passive: true });
  }
}

// ── SCROLL REVEAL ──
const sections = document.querySelectorAll('section:not(#hero)');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
sections.forEach(section => observer.observe(section));
