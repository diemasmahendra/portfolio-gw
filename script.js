/* ============================================================
   PORTFOLIO GW — script.js
   ============================================================ */

// ── Boot sequence ────────────────────────────────────────────
const BOOT_LINES = [
  { status: '[  OK  ]', text: 'Loading kernel modules...', cls: 'ok', delay: 120 },
  { status: '[  OK  ]', text: 'Initializing memory subsystem', cls: 'ok', delay: 140 },
  { status: '[  OK  ]', text: 'Mounting filesystems', cls: 'ok', delay: 100 },
  { status: '[  OK  ]', text: 'Starting network interfaces', cls: 'ok', delay: 160 },
  { status: '[  OK  ]', text: 'Configuring environment variables', cls: 'ok', delay: 110 },
  { status: '[  OK  ]', text: 'Connecting to automation services', cls: 'ok', delay: 180 },
  { status: '[  OK  ]', text: 'Loading trading engine modules', cls: 'ok', delay: 130 },
  { status: '[  OK  ]', text: 'Spinning up bot runtimes', cls: 'ok', delay: 150 },
  { status: '[  OK  ]', text: 'Portfolio OS ready', cls: 'ok', delay: 200 },
];

function runBoot() {
  const screen  = document.getElementById('bootScreen');
  const lineWrap = document.getElementById('bootLines');
  const desktop  = document.getElementById('mainDesktop');
  if (!screen || !lineWrap || !desktop) return;

  let total = 0;

  BOOT_LINES.forEach((item, i) => {
    total += item.delay + i * 60;
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = `boot-line ${item.cls}`;
      div.innerHTML = `<span class="bl-status">${item.status}</span>${item.text}`;
      lineWrap.appendChild(div);
    }, total);
  });

  // Fade out boot screen
  setTimeout(() => {
    screen.classList.add('fade-out');
    desktop.classList.add('visible');
    setTimeout(() => screen.classList.add('hidden'), 550);
  }, total + 600);
}

// ── Clock ────────────────────────────────────────────────────
function updateClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  el.textContent = `${h}:${m}:${s}`;
}

// ── Window management ─────────────────────────────────────────
let activeBackdrop = null;

function openWindow(id) {
  const win = document.getElementById('win-' + id);
  if (!win) return;

  // Close any open window first
  closeAllWindows();

  // Create backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'win-backdrop';
  backdrop.addEventListener('click', closeAllWindows);
  document.body.appendChild(backdrop);
  activeBackdrop = backdrop;

  win.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeWindow(id) {
  const win = document.getElementById('win-' + id);
  if (win) win.classList.remove('active');
  removeBackdrop();
  document.body.style.overflow = '';
}

function closeAllWindows() {
  document.querySelectorAll('.window.active').forEach(w => w.classList.remove('active'));
  removeBackdrop();
  document.body.style.overflow = '';
}

function removeBackdrop() {
  if (activeBackdrop) {
    activeBackdrop.remove();
    activeBackdrop = null;
  }
}

// ── Contact form ──────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const form   = e.target;
  const status = document.getElementById('form-status');
  const btn    = form.querySelector('.form-submit');

  btn.textContent = 'TRANSMITTING...';
  btn.disabled = true;

  setTimeout(() => {
    if (status) {
      status.textContent = '> Message transmitted. I\'ll reply soon.';
    }
    form.reset();
    btn.textContent = 'TRANSMIT';
    btn.disabled = false;
  }, 1200);
}

// ── Keyboard shortcut: Escape closes windows ─────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllWindows();
});

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  runBoot();
  updateClock();
  setInterval(updateClock, 1000);
});

