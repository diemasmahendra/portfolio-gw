/* ============================================================
   PORTFOLIO GW — script.js
   ============================================================ */



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
  updateClock();
  setInterval(updateClock, 1000);
});

