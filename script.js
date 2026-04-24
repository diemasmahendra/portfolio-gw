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
  el.textContent = `${h}:${m}`;
}
updateClock();
setInterval(updateClock, 10000);

// ── Window management ────────────────────────────────────────
let backdrop = null;

function createBackdrop() {
  if (backdrop) return;
  backdrop = document.createElement('div');
  backdrop.className = 'win-backdrop';
  backdrop.addEventListener('click', closeAllWindows);
  document.body.appendChild(backdrop);
}

function removeBackdrop() {
  if (backdrop) {
    backdrop.remove();
    backdrop = null;
  }
}

function openWindow(id) {
  // Close any open window first
  closeAllWindows(null, false);

  const win = document.getElementById(`win-${id}`);
  if (!win) return;

  createBackdrop();
  win.classList.add('active');

  // Re-trigger skill bar animation when skills window opens
  if (id === 'skills') {
    win.querySelectorAll('.skill-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { bar.style.width = w; });
      });
    });
  }
}

function closeWindow(id) {
  const win = document.getElementById(`win-${id}`);
  if (win) win.classList.remove('active');
  // Remove backdrop only if no other window is open
  const anyOpen = document.querySelector('.window.active');
  if (!anyOpen) removeBackdrop();
}

function closeAllWindows(e, removeBack = true) {
  document.querySelectorAll('.window.active').forEach(w => w.classList.remove('active'));
  if (removeBack) removeBackdrop();
}

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllWindows();
});

// ── Contact form ─────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const status = document.getElementById('form-status');
  const form = e.target;

  status.style.color = 'var(--text-dim)';
  status.textContent = '[SYS] transmitting...';

  // Simulate send delay (replace with real fetch/FormSubmit/EmailJS call)
  setTimeout(() => {
    status.style.color = 'var(--accent-green)';
    status.textContent = '[OK] transmission received. I\'ll get back to you soon.';
    form.reset();
  }, 1200);
}

// ── Glitch title on hover ─────────────────────────────────────
document.querySelectorAll('.glitch').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.animation = 'none';
    void el.offsetWidth; // reflow
    el.style.animation = '';
  });
});

// ── Terminal typewriter for intro ────────────────────────────
(function typewriterEffect() {
  const intro = document.querySelector('.intro');
  if (!intro) return;

  const paragraphs = intro.querySelectorAll('p');
  let delay = 200;

  paragraphs.forEach((p, i) => {
    p.style.opacity = '0';
    p.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
      p.style.opacity = '1';
    }, delay + i * 150);
  });
})();
