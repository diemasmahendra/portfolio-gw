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
  setLang('id');
});

// ── Language switcher ─────────────────────────────────────────
const LANGS = {
  id: {
    code: 'IDN',
    hello: 'Halo, saya',
    role1: 'Programmer', role2: 'Pembuat Otomasi', role3: 'Trader',
    heroDesc: 'Membangun bot, sistem trading, dan alat otomasi yang benar-benar bekerja. Fokus pada kecepatan, presisi, dan menghilangkan pekerjaan manual sepenuhnya.',
    hireMe: 'REKRUT SAYA', viewProjects: 'LIHAT PROYEK',
    statProjects: 'Proyek Selesai', statUptime: 'Uptime Bot', statYears: 'Tahun Coding', statBots: 'Bot Aktif',
    navAbout: 'Tentang', navAboutDesc: 'siapa saya',
    navProjects: 'Proyek', navProjectsDesc: '10 proyek',
    navSkills: 'Keahlian', navSkillsDesc: 'stack & tools',
    navContact: 'Kontak', navContactDesc: 'hubungi saya',
    tagline: 'otomatiskan segalanya. tradingkan sisanya.',
  },
  en: {
    code: 'ENG',
    hello: 'Hello, I am',
    role1: 'Programmer', role2: 'Automation Builder', role3: 'Trader',
    heroDesc: 'Building bots, trading systems, and automation tools that actually work. Focused on speed, precision, and eliminating manual work entirely.',
    hireMe: 'HIRE ME', viewProjects: 'VIEW PROJECTS',
    statProjects: 'Projects Built', statUptime: 'Bot Uptime', statYears: 'Years Coding', statBots: 'Active Bots',
    navAbout: 'About', navAboutDesc: 'who I am',
    navProjects: 'Projects', navProjectsDesc: '10 projects',
    navSkills: 'Skills', navSkillsDesc: 'stack & tools',
    navContact: 'Contact', navContactDesc: 'reach out',
    tagline: 'automate everything. trade the rest.',
  },
  ja: {
    code: 'JPN',
    hello: 'はじめまして',
    role1: 'プログラマー', role2: '自動化エンジニア', role3: 'トレーダー',
    heroDesc: 'ボット、取引システム、自動化ツールを構築しています。スピードと精度に集中し、手作業を完全に排除します。',
    hireMe: '採用する', viewProjects: 'プロジェクトを見る',
    statProjects: 'プロジェクト数', statUptime: '稼働率', statYears: '経験年数', statBots: '稼働中ボット',
    navAbout: '自己紹介', navAboutDesc: '私について',
    navProjects: 'プロジェクト', navProjectsDesc: '10件',
    navSkills: 'スキル', navSkillsDesc: 'ツール一覧',
    navContact: '連絡先', navContactDesc: 'お問い合わせ',
    tagline: 'すべてを自動化する。残りはトレードする。',
  },
  ko: {
    code: 'KOR',
    hello: '안녕하세요, 저는',
    role1: '프로그래머', role2: '자동화 개발자', role3: '트레이더',
    heroDesc: '실제로 작동하는 봇, 트레이딩 시스템, 자동화 도구를 만듭니다. 속도와 정확성에 집중하며 수동 작업을 완전히 없앱니다.',
    hireMe: '채용하기', viewProjects: '프로젝트 보기',
    statProjects: '완료 프로젝트', statUptime: '봇 가동률', statYears: '경력 연수', statBots: '활성 봇',
    navAbout: '소개', navAboutDesc: '저에 대해',
    navProjects: '프로젝트', navProjectsDesc: '10개 프로젝트',
    navSkills: '기술', navSkillsDesc: '스택 & 툴',
    navContact: '연락처', navContactDesc: '문의하기',
    tagline: '모든 것을 자동화하라. 나머지는 트레이딩하라.',
  },
  es: {
    code: 'ESP',
    hello: 'Hola, soy',
    role1: 'Programador', role2: 'Constructor de Automatización', role3: 'Trader',
    heroDesc: 'Construyendo bots, sistemas de trading y herramientas de automatización que realmente funcionan. Enfocado en velocidad, precisión y eliminar el trabajo manual.',
    hireMe: 'CONTRÁTAME', viewProjects: 'VER PROYECTOS',
    statProjects: 'Proyectos', statUptime: 'Uptime Bot', statYears: 'Años Codificando', statBots: 'Bots Activos',
    navAbout: 'Sobre mí', navAboutDesc: 'quién soy',
    navProjects: 'Proyectos', navProjectsDesc: '10 proyectos',
    navSkills: 'Habilidades', navSkillsDesc: 'stack & tools',
    navContact: 'Contacto', navContactDesc: 'escríbeme',
    tagline: 'automatiza todo. tradea el resto.',
  },
  ar: {
    code: 'AR',
    hello: 'مرحباً، أنا',
    role1: 'مبرمج', role2: 'مطور أتمتة', role3: 'متداول',
    heroDesc: 'أبني بوتات وأنظمة تداول وأدوات أتمتة تعمل فعلاً. أركز على السرعة والدقة والتخلص من العمل اليدوي كلياً.',
    hireMe: 'وظّفني', viewProjects: 'عرض المشاريع',
    statProjects: 'المشاريع', statUptime: 'وقت التشغيل', statYears: 'سنوات البرمجة', statBots: 'البوتات النشطة',
    navAbout: 'عني', navAboutDesc: 'من أنا',
    navProjects: 'مشاريع', navProjectsDesc: '10 مشاريع',
    navSkills: 'مهارات', navSkillsDesc: 'الأدوات',
    navContact: 'تواصل', navContactDesc: 'تواصل معي',
    tagline: 'أتمتة كل شيء. تداول الباقي.',
  },
  zh: {
    code: 'CHN',
    hello: '你好，我是',
    role1: '程序员', role2: '自动化开发者', role3: '交易者',
    heroDesc: '构建真正有效的机器人、交易系统和自动化工具。专注于速度、精准度，彻底消除手动工作。',
    hireMe: '雇用我', viewProjects: '查看项目',
    statProjects: '完成项目', statUptime: '机器人运行时间', statYears: '编程年限', statBots: '活跃机器人',
    navAbout: '关于我', navAboutDesc: '了解我',
    navProjects: '项目', navProjectsDesc: '10个项目',
    navSkills: '技能', navSkillsDesc: '技术栈',
    navContact: '联系', navContactDesc: '联系我',
    tagline: '自动化一切，交易其余。',
  },
};

let currentLang = 'id';

function setLang(code) {
  const t = LANGS[code];
  if (!t) return;
  currentLang = code;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = t.code + ' \u25be';

  // RTL support for Arabic
  document.documentElement.setAttribute('lang', code);
  document.body.style.direction = code === 'ar' ? 'rtl' : 'ltr';

  closeLangMenu();
}

function toggleLangMenu() {
  const menu = document.getElementById('langMenu');
  if (menu) menu.classList.toggle('open');
}

function closeLangMenu() {
  const menu = document.getElementById('langMenu');
  if (menu) menu.classList.remove('open');
}

document.addEventListener('click', e => {
  if (!e.target.closest('#langPicker')) closeLangMenu();
});

