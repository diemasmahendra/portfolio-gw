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
    winAbout: 'TENTANG', winProjects: 'PROYEK', winSkills: 'KEAHLIAN', winContact: 'KONTAK',
    tagStatus: 'STATUS', tagLocation: 'LOKASI', tagRole: 'PERAN', tagContact: 'KONTAK',
    statusVal: 'Online. Selalu.', locationVal: 'Indonesia', roleVal: 'Programmer & Pembuat Otomasi',
    aboutP1: 'Saya membangun bot, sistem trading, dan alat otomasi untuk menyederhanakan alur kerja yang kompleks.',
    aboutP2: 'Bekerja di bidang kripto, saham, dan sistem backend — selalu fokus pada kecepatan dan efisiensi. Jika ada tugas berulang, saya otomatiskan.',
    aboutP3: 'Tersedia untuk komisi: bot, skrip, dan sistem berbasis web.',
    tgDesc: 'Hubungi langsung — komisi, kolaborasi, atau sekadar ngobrol.',
    emDesc: 'Untuk pertanyaan serius dan komisi proyek.',
    formName: 'NAMA', formEmail: 'EMAIL', formMsg: 'PESAN', formSend: 'KIRIM PESAN',
    formNamePh: 'Nama kamu', formMsgPh: 'Pesan kamu...',
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
    winAbout: 'ABOUT', winProjects: 'PROJECTS', winSkills: 'SKILLS', winContact: 'CONTACT',
    tagStatus: 'STATUS', tagLocation: 'LOCATION', tagRole: 'ROLE', tagContact: 'CONTACT',
    statusVal: 'Online. Always.', locationVal: 'Indonesia', roleVal: 'Programmer & Automation Builder',
    aboutP1: 'I build bots, trading systems, and automation tools to simplify complex workflows.',
    aboutP2: 'Working across crypto, stocks, and backend systems — always focused on speed and efficiency. If there is a repetitive task, I will automate it.',
    aboutP3: 'Available for commissions: bots, scripts, and web-based systems.',
    tgDesc: 'Reach out directly — commissions, collabs, or just to talk.',
    emDesc: 'For serious inquiries and project commissions.',
    formName: 'NAME', formEmail: 'EMAIL', formMsg: 'MESSAGE', formSend: 'SEND MESSAGE',
    formNamePh: 'Your name', formMsgPh: 'Your message...',
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
    winAbout: '自己紹介', winProjects: 'プロジェクト', winSkills: 'スキル', winContact: '連絡先',
    tagStatus: 'ステータス', tagLocation: '所在地', tagRole: '役割', tagContact: '連絡先',
    statusVal: 'オンライン。常に。', locationVal: 'インドネシア', roleVal: 'プログラマー & 自動化エンジニア',
    aboutP1: 'ボット、取引システム、自動化ツールを構築し、複雑なワークフローを簡略化します。',
    aboutP2: '暗号資産、株式、バックエンドシステムを横断して作業し、常にスピードと効率に集中しています。繰り返し作業があれば、自動化します。',
    aboutP3: 'ボット、スクリプト、Webシステムの受注制作を承ります。',
    tgDesc: '直接ご連絡ください — 受注、コラボ、またはただの雑談でも。',
    emDesc: '真剣なお問い合わせやプロジェクトの依頼はこちら。',
    formName: '名前', formEmail: 'メール', formMsg: 'メッセージ', formSend: '送信する',
    formNamePh: 'お名前', formMsgPh: 'メッセージ...',
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
    winAbout: '소개', winProjects: '프로젝트', winSkills: '기술', winContact: '연락처',
    tagStatus: '상태', tagLocation: '위치', tagRole: '역할', tagContact: '연락처',
    statusVal: '온라인. 항상.', locationVal: '인도네시아', roleVal: '프로그래머 & 자동화 개발자',
    aboutP1: '복잡한 워크플로우를 단순화하는 봇, 트레이딩 시스템, 자동화 도구를 만듭니다.',
    aboutP2: '암호화폐, 주식, 백엔드 시스템 전반에 걸쳐 작업하며 항상 속도와 효율에 집중합니다. 반복 작업이 있다면 자동화합니다.',
    aboutP3: '봇, 스크립트, 웹 기반 시스템 커미션을 받습니다.',
    tgDesc: '직접 연락하세요 — 커미션, 협업, 또는 그냥 대화도 환영합니다.',
    emDesc: '진지한 문의 및 프로젝트 커미션은 여기로.',
    formName: '이름', formEmail: '이메일', formMsg: '메시지', formSend: '메시지 보내기',
    formNamePh: '이름을 입력하세요', formMsgPh: '메시지를 입력하세요...',
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
    winAbout: 'SOBRE MÍ', winProjects: 'PROYECTOS', winSkills: 'HABILIDADES', winContact: 'CONTACTO',
    tagStatus: 'ESTADO', tagLocation: 'UBICACIÓN', tagRole: 'ROL', tagContact: 'CONTACTO',
    statusVal: 'En línea. Siempre.', locationVal: 'Indonesia', roleVal: 'Programador & Constructor de Automatización',
    aboutP1: 'Construyo bots, sistemas de trading y herramientas de automatización para simplificar flujos de trabajo complejos.',
    aboutP2: 'Trabajando en cripto, acciones y sistemas backend — siempre enfocado en velocidad y eficiencia. Si hay una tarea repetitiva, la automatizo.',
    aboutP3: 'Disponible para comisiones: bots, scripts y sistemas web.',
    tgDesc: 'Contáctame directamente — comisiones, colaboraciones o simplemente para hablar.',
    emDesc: 'Para consultas serias y comisiones de proyectos.',
    formName: 'NOMBRE', formEmail: 'CORREO', formMsg: 'MENSAJE', formSend: 'ENVIAR MENSAJE',
    formNamePh: 'Tu nombre', formMsgPh: 'Tu mensaje...',
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
    winAbout: 'عني', winProjects: 'المشاريع', winSkills: 'المهارات', winContact: 'تواصل',
    tagStatus: 'الحالة', tagLocation: 'الموقع', tagRole: 'الدور', tagContact: 'تواصل',
    statusVal: 'متصل. دائماً.', locationVal: 'إندونيسيا', roleVal: 'مبرمج ومطور أتمتة',
    aboutP1: 'أبني بوتات وأنظمة تداول وأدوات أتمتة لتبسيط سير العمل المعقدة.',
    aboutP2: 'أعمل عبر العملات الرقمية والأسهم والأنظمة الخلفية — دائماً مركّز على السرعة والكفاءة. إن وجدت مهمة متكررة، سأؤتمتها.',
    aboutP3: 'متاح للعمل بالعمولة: بوتات، سكريبتات، وأنظمة ويب.',
    tgDesc: 'تواصل مباشرة — عمولات، تعاون، أو مجرد حديث.',
    emDesc: 'للاستفسارات الجدية وعمولات المشاريع.',
    formName: 'الاسم', formEmail: 'البريد', formMsg: 'الرسالة', formSend: 'إرسال',
    formNamePh: 'اسمك', formMsgPh: 'رسالتك...',
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
    winAbout: '关于我', winProjects: '项目', winSkills: '技能', winContact: '联系',
    tagStatus: '状态', tagLocation: '位置', tagRole: '角色', tagContact: '联系',
    statusVal: '在线。一直在线。', locationVal: '印度尼西亚', roleVal: '程序员 & 自动化开发者',
    aboutP1: '我构建机器人、交易系统和自动化工具，简化复杂的工作流程。',
    aboutP2: '跨越加密货币、股票和后端系统工作，始终专注于速度和效率。如果有重复性任务，我会将其自动化。',
    aboutP3: '接受委托：机器人、脚本和基于Web的系统。',
    tgDesc: '直接联系 — 委托、合作，或者只是聊天。',
    emDesc: '用于认真的咨询和项目委托。',
    formName: '姓名', formEmail: '邮箱', formMsg: '消息', formSend: '发送消息',
    formNamePh: '你的名字', formMsgPh: '你的消息...',
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

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.placeholder = t[key];
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

