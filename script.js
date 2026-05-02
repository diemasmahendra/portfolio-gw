/* ============================================================
   PORTFOLIO GW — script.js  v2 (i18n-windows)
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
  setLang('ja');
  initCursor();
});

// ── Custom cursor ─────────────────────────────────────────────
function initCursor() {
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  const trail = document.createElement('div');
  trail.id = 'cursor-trail';
  document.body.appendChild(cursor);
  document.body.appendChild(trail);

  let mx = -100, my = -100, tx = -100, ty = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  });

  // Trail follows with lag
  function animateTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.transform = `translate(${tx - 16}px, ${ty - 16}px)`;
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Click burst effect
  document.addEventListener('mousedown', e => {
    cursor.classList.add('clicked');
    const burst = document.createElement('div');
    burst.className = 'cursor-burst';
    burst.style.left = e.clientX + 'px';
    burst.style.top = e.clientY + 'px';
    document.body.appendChild(burst);
    burst.addEventListener('animationend', () => burst.remove());
  });
  document.addEventListener('mouseup', () => cursor.classList.remove('clicked'));

  // Hover effect on interactive elements
  document.querySelectorAll('a, button, [onclick]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
}

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
    skillCat1: 'PEMROGRAMAN', skillCat2: 'TRADING & ALGO', skillCat3: 'INFRASTRUKTUR & DEVOPS', skillCat4: 'TOOLS & STACK',
    catAutomation: 'Otomasi', catTrading: 'Alat Trading', catBot: 'Bot', catDevOps: 'DevOps', catBackend: 'Backend', catWeb: 'Web',
    projName1: 'CRYPTO TRADING BOT', projName2: 'BOT PENYARING SAHAM', projName3: 'BOT OTOMASI TELEGRAM', projName4: 'WEB SCRAPER & PIPELINE DATA', projName5: 'DASHBOARD MONITORING SERVER', projName6: 'API RATE LIMITER & PROXY ROTATOR', projName7: 'DISCORD BOT SERBAGUNA', projName8: 'GENERATOR LAPORAN OTOMATIS', projName9: 'ENGINE BACKTESTING', projName10: 'WEBSITE PORTOFOLIO',
    projDesc1: 'Bot trading kripto otomatis 24/7. Mengeksekusi order berdasarkan sinyal teknikal — MA crossover, RSI, deteksi breakout. Terhubung ke exchange via API.',
    projDesc2: 'Memindai ratusan ticker setiap hari, memfilter berdasarkan volume, tren, dan indikator teknikal. Mengirim notifikasi langsung ke Telegram.',
    projDesc3: 'Bot Telegram multi-fungsi — notifikasi harga aset, penjadwalan skrip, pemantauan server, manajemen grup. Antarmuka berbasis perintah dari ponselmu.',
    projDesc4: 'Scraper otomatis untuk mengumpulkan data pasar real-time, berita, dan sentimen aset. Diparse dan disimpan ke database sebagai input sinyal trading.',
    projDesc5: 'Pemantauan VPS/server real-time — CPU, RAM, disk, jaringan, uptime. Auto-alert ke Telegram saat lonjakan resource atau downtime layanan.',
    projDesc6: 'Rotasi proxy otomatis, manajemen sesi, retry logic, dan antrian request. Untuk scraping skala besar tanpa terblokir.',
    projDesc7: 'Discord bot lengkap — harga kripto live, kalkulator PnL, notifikasi harga, pengingat, auto-moderasi, perintah kustom. 24/7 tanpa downtime.',
    projDesc8: 'Membuat laporan otomatis — ambil data dari database/API, render ke PDF/Excel, kirim via email atau Telegram sesuai jadwal. Zero input manual.',
    projDesc9: 'Engine backtesting strategi trading — simulasi historis dengan data OHLCV, menghitung winrate, max drawdown, Sharpe ratio, dan equity curve.',
    projDesc10: 'Website ini. Portofolio bergaya neobrutalism dengan UI berbasis jendela dan desain tebal bersih. Dibuat dengan HTML, CSS, dan Vanilla JS murni.',
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
    skillCat1: 'PROGRAMMING', skillCat2: 'TRADING & ALGO', skillCat3: 'INFRASTRUCTURE & DEVOPS', skillCat4: 'TOOLS & STACK',
    catAutomation: 'Automation', catTrading: 'Trading Tool', catBot: 'Bot', catDevOps: 'DevOps', catBackend: 'Backend', catWeb: 'Web',
    projName1: 'CRYPTO TRADING BOT', projName2: 'STOCK SCREENER BOT', projName3: 'TELEGRAM AUTOMATION BOT', projName4: 'WEB SCRAPER & DATA PIPELINE', projName5: 'SERVER MONITORING DASHBOARD', projName6: 'API RATE LIMITER & PROXY ROTATOR', projName7: 'DISCORD BOT MULTI-PURPOSE', projName8: 'AUTOMATED REPORT GENERATOR', projName9: 'BACKTESTING ENGINE', projName10: 'PORTFOLIO WEBSITE',
    projDesc1: 'Automated 24/7 crypto trading bot. Executes orders based on technical signals — MA crossover, RSI, breakout detection. Connected to exchange via API.',
    projDesc2: 'Scans hundreds of tickers daily, filters by volume, trend, and technical indicators. Sends alerts directly to Telegram. No more manual chart browsing.',
    projDesc3: 'Multi-function Telegram bot — asset price notifications, script scheduling, server monitoring, group management. Command-based interface from your phone.',
    projDesc4: 'Automated scraper for collecting real-time market data, news, and asset sentiment. Parsed and stored to database, ready as trading signal input.',
    projDesc5: 'Real-time VPS/server monitoring — CPU, RAM, disk, network, uptime. Auto-alerts to Telegram on resource spikes or service downtime.',
    projDesc6: 'Automatic proxy rotation, session management, retry logic, and request queue. For large-scale scraping and data collection without getting blocked.',
    projDesc7: 'Full-featured Discord bot — live crypto prices, PnL calculator, price alerts, reminders, auto-moderation, custom commands. Runs 24/7 with no downtime.',
    projDesc8: 'Auto-generates reports — pulls data from database/API, renders to PDF/Excel, sends via email or Telegram on schedule. Zero manual input after setup.',
    projDesc9: 'Trading strategy backtesting engine — historical simulation with OHLCV data, calculates winrate, max drawdown, Sharpe ratio, and equity curve.',
    projDesc10: 'This website. Neobrutalism-styled portfolio with window-based UI and clean bold design. Built with pure HTML, CSS, and Vanilla JS.',
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
    skillCat1: 'プログラミング', skillCat2: 'トレード & アルゴ', skillCat3: 'インフラ & DevOps', skillCat4: 'ツール & スタック',
    catAutomation: '自動化', catTrading: 'トレードツール', catBot: 'Bot', catDevOps: 'DevOps', catBackend: 'バックエンド', catWeb: 'Web',
    projName1: '暗号資産トレードBot', projName2: '株式スクリーナーBot', projName3: 'Telegram自動化Bot', projName4: 'Webスクレイパー & データパイプライン', projName5: 'サーバー監視ダッシュボード', projName6: 'APIレートリミッター & プロキシローテーター', projName7: '多機能Discordボット', projName8: '自動レポートジェネレーター', projName9: 'バックテストエンジン', projName10: 'ポートフォリオサイト',
    projDesc1: '24時間稼働の自動暗号資産トレードBot。MAクロスオーバー、RSI、ブレイクアウト検出などのシグナルに基づいてオーダーを実行。API経由で取引所に接続。',
    projDesc2: '毎日数百のティッカーをスキャンし、出来高・トレンド・テクニカル指標でフィルタリング。Telegramに直接アラートを送信。手動チャート確認は不要。',
    projDesc3: '多機能TelegramBot — 資産価格通知、スクリプトスケジューリング、サーバー監視、グループ管理。スマートフォンからコマンドで操作。',
    projDesc4: 'リアルタイム市場データ、ニュース、資産センチメントを収集する自動スクレイパー。データベースに保存してトレードシグナルとして活用。',
    projDesc5: 'リアルタイムVPS/サーバー監視 — CPU、RAM、ディスク、ネットワーク、稼働時間。リソーススパイク時にTelegramへ自動通知。',
    projDesc6: '自動プロキシローテーション、セッション管理、リトライロジック、リクエストキュー。ブロックされずに大規模スクレイピングを実現。',
    projDesc7: 'フル機能のDiscordBot — リアルタイム価格、PnL計算機、価格アラート、リマインダー、自動モデレーション。24時間ダウンタイムなし。',
    projDesc8: '自動でレポートを生成 — DB/APIからデータ取得、PDF/Excelに出力、メールまたはTelegramで送信。セットアップ後は手動操作ゼロ。',
    projDesc9: 'トレード戦略バックテストエンジン — OHLCVデータで過去シミュレーション。勝率、最大ドローダウン、シャープレシオを計算。',
    projDesc10: 'このウェブサイト。ウィンドウベースUIのネオブルータリズムスタイルポートフォリオ。純粋なHTML、CSS、Vanilla JSで構築。',
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
    skillCat1: '프로그래밍', skillCat2: '트레이딩 & 알고', skillCat3: '인프라 & DevOps', skillCat4: '툴 & 스택',
    catAutomation: '자동화', catTrading: '트레이딩 툴', catBot: '봇', catDevOps: 'DevOps', catBackend: '백엔드', catWeb: 'Web',
    projName1: '암호화폐 트레이딩 봇', projName2: '주식 스크리너 봇', projName3: '텔레그램 자동화 봇', projName4: '웹 스크레이퍼 & 데이터 파이프라인', projName5: '서버 모니터링 대시보드', projName6: 'API 레이트 리미터 & 프록시 로테이터', projName7: '다목적 디스코드 봇', projName8: '자동 보고서 생성기', projName9: '백테스팅 엔진', projName10: '포트폴리오 웹사이트',
    projDesc1: '24/7 자동 암호화폐 트레이딩 봇. MA 교차, RSI, 돌파 감지 등 기술적 신호에 따라 주문 실행. API로 거래소에 연결.',
    projDesc2: '매일 수백 개 종목 스캔, 거래량·추세·기술 지표로 필터링. 텔레그램에 직접 알림 전송. 수동 차트 검색 불필요.',
    projDesc3: '다기능 텔레그램 봇 — 자산 가격 알림, 스크립트 스케줄링, 서버 모니터링, 그룹 관리. 스마트폰에서 명령어 기반 인터페이스.',
    projDesc4: '실시간 시장 데이터, 뉴스, 자산 심리 수집 자동 스크레이퍼. 파싱 후 DB에 저장하여 트레이딩 신호 입력으로 활용.',
    projDesc5: '실시간 VPS/서버 모니터링 — CPU, RAM, 디스크, 네트워크, 가동 시간. 리소스 급증이나 서비스 다운 시 텔레그램 자동 알림.',
    projDesc6: '자동 프록시 순환, 세션 관리, 재시도 로직, 요청 큐. 차단 없이 대규모 스크레이핑과 데이터 수집.',
    projDesc7: '완전한 기능의 디스코드 봇 — 실시간 가격, PnL 계산기, 가격 알림, 리마인더, 자동 중재. 다운타임 없이 24/7 운영.',
    projDesc8: '자동 보고서 생성 — DB/API에서 데이터 가져와 PDF/Excel로 렌더링, 이메일 또는 텔레그램으로 전송. 설정 후 수동 입력 없음.',
    projDesc9: '트레이딩 전략 백테스팅 엔진 — OHLCV 데이터로 과거 시뮬레이션. 승률, 최대 손실, 샤프 비율 계산.',
    projDesc10: '이 웹사이트. 창 기반 UI의 네오브루탈리즘 스타일 포트폴리오. 순수 HTML, CSS, Vanilla JS로 제작.',
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
    skillCat1: 'PROGRAMACIÓN', skillCat2: 'TRADING & ALGO', skillCat3: 'INFRAESTRUCTURA & DEVOPS', skillCat4: 'HERRAMIENTAS & STACK',
    catAutomation: 'Automatización', catTrading: 'Herramienta Trading', catBot: 'Bot', catDevOps: 'DevOps', catBackend: 'Backend', catWeb: 'Web',
    projName1: 'BOT DE TRADING CRIPTO', projName2: 'BOT FILTRADOR DE ACCIONES', projName3: 'BOT AUTOMATIZACIÓN TELEGRAM', projName4: 'SCRAPER WEB & PIPELINE DE DATOS', projName5: 'PANEL DE MONITOREO DE SERVIDOR', projName6: 'LIMITADOR API & ROTADOR DE PROXY', projName7: 'BOT DISCORD MULTIPROPÓSITO', projName8: 'GENERADOR DE INFORMES AUTOMÁTICO', projName9: 'MOTOR DE BACKTESTING', projName10: 'SITIO WEB DE PORTAFOLIO',
    projDesc1: 'Bot de trading cripto automatizado 24/7. Ejecuta órdenes según señales técnicas — cruce de MA, RSI, detección de breakout. Conectado al exchange via API.',
    projDesc2: 'Escanea cientos de tickers diariamente, filtra por volumen, tendencia e indicadores técnicos. Envía alertas directamente a Telegram.',
    projDesc3: 'Bot de Telegram multifunción — notificaciones de precios, programación de scripts, monitoreo de servidor, gestión de grupos. Interfaz por comandos.',
    projDesc4: 'Scraper automatizado para recopilar datos de mercado en tiempo real, noticias y sentimiento de activos. Almacenado en BD como entrada de señales.',
    projDesc5: 'Monitoreo en tiempo real de VPS/servidor — CPU, RAM, disco, red, uptime. Auto-alertas a Telegram en picos de recursos o caídas del servicio.',
    projDesc6: 'Rotación automática de proxies, gestión de sesiones, lógica de reintentos y cola de solicitudes. Para scraping a gran escala sin ser bloqueado.',
    projDesc7: 'Bot de Discord completo — precios cripto en vivo, calculadora PnL, alertas, recordatorios, auto-moderación, comandos personalizados. 24/7.',
    projDesc8: 'Genera informes automáticamente — extrae datos de BD/API, renderiza en PDF/Excel, envía por email o Telegram según horario. Cero entrada manual.',
    projDesc9: 'Motor de backtesting de estrategias — simulación histórica con datos OHLCV. Calcula winrate, max drawdown, ratio de Sharpe y curva de equity.',
    projDesc10: 'Este sitio web. Portafolio estilo neobrutalism con UI basada en ventanas y diseño limpio y bold. Construido con HTML, CSS y Vanilla JS puro.',
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
    skillCat1: 'البرمجة', skillCat2: 'التداول والخوارزميات', skillCat3: 'البنية التحتية والتطوير', skillCat4: 'الأدوات والتقنيات',
    catAutomation: 'أتمتة', catTrading: 'أداة تداول', catBot: 'بوت', catDevOps: 'DevOps', catBackend: 'باك اند', catWeb: 'ويب',
    projName1: 'بوت تداول العملات الرقمية', projName2: 'بوت فلترة الأسهم', projName3: 'بوت أتمتة تيليجرام', projName4: 'كاشط الويب وخط أنابيب البيانات', projName5: 'لوحة مراقبة الخادم', projName6: 'محدد معدل API ومحوّل البروكسي', projName7: 'بوت ديسكورد متعدد الأغراض', projName8: 'مولد التقارير التلقائي', projName9: 'محرك الاختبار التاريخي', projName10: 'موقع المحفظة الشخصية',
    projDesc1: 'بوت تداول عملات رقمية آلي يعمل 24/7. ينفذ الأوامر بناءً على إشارات تقنية — تقاطع MA وRSI واكتشاف الاختراق. متصل بالبورصة عبر API.',
    projDesc2: 'يفحص مئات الرموز يومياً ويصفيها حسب الحجم والاتجاه والمؤشرات التقنية. يرسل التنبيهات إلى تيليجرام. لا حاجة لتصفح الرسوم يدوياً.',
    projDesc3: 'بوت تيليجرام متعدد الوظائف — إشعارات الأسعار، جدولة السكريبتات، مراقبة الخادم، إدارة المجموعات. واجهة قائمة على الأوامر.',
    projDesc4: 'كاشط آلي لجمع بيانات السوق الفورية والأخبار ومشاعر الأصول. يُحلل ويُخزن في قاعدة البيانات جاهزاً كمدخل لإشارات التداول.',
    projDesc5: 'مراقبة فورية لـVPS/الخادم — المعالج والذاكرة والقرص والشبكة. تنبيهات تلقائية إلى تيليجرام عند ارتفاع الاستهلاك أو توقف الخدمة.',
    projDesc6: 'تدوير تلقائي للبروكسي، إدارة الجلسات، منطق إعادة المحاولة، وطابور الطلبات. للكشط واسع النطاق دون الحظر.',
    projDesc7: 'بوت ديسكورد كامل الميزات — أسعار مباشرة، حاسبة PnL، تنبيهات، تذكيرات، إشراف تلقائي، أوامر مخصصة. يعمل 24/7 بلا توقف.',
    projDesc8: 'يولد التقارير تلقائياً — يسحب البيانات من DB/API ويحولها إلى PDF/Excel ويرسلها عبر البريد أو تيليجرام. لا إدخال يدوي بعد الإعداد.',
    projDesc9: 'محرك اختبار استراتيجيات التداول تاريخياً — محاكاة ببيانات OHLCV. يحسب معدل الفوز والحد الأقصى للسحب ونسبة شارب.',
    projDesc10: 'هذا الموقع. محفظة بأسلوب نيوبروتاليزم مع واجهة قائمة على النوافذ وتصميم عريض نظيف. مبني بـHTML وCSS وVanilla JS.',
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
    skillCat1: '编程', skillCat2: '交易与算法', skillCat3: '基础设施与运维', skillCat4: '工具与技术栈',
    catAutomation: '自动化', catTrading: '交易工具', catBot: '机器人', catDevOps: 'DevOps', catBackend: '后端', catWeb: '网页',
    projName1: '加密货币交易机器人', projName2: '股票筛选机器人', projName3: 'Telegram自动化机器人', projName4: '网络爬虫与数据管道', projName5: '服务器监控仪表板', projName6: 'API限速器与代理轮换器', projName7: '多功能Discord机器人', projName8: '自动报告生成器', projName9: '回测引擎', projName10: '作品集网站',
    projDesc1: '全天候24/7自动加密货币交易机器人。根据技术信号执行订单——MA交叉、RSI、突破检测。通过API连接交易所。',
    projDesc2: '每天扫描数百个股票代码，按交易量、趋势和技术指标过滤。直接发送提醒到Telegram。无需手动浏览图表。',
    projDesc3: '多功能Telegram机器人——资产价格通知、脚本调度、服务器监控、群组管理。通过手机命令行界面操作。',
    projDesc4: '自动爬虫，收集实时市场数据、新闻和资产情绪。解析后存入数据库，可作为交易信号输入。',
    projDesc5: '实时VPS/服务器监控——CPU、内存、磁盘、网络、运行时间。资源飙升或服务停机时自动发送Telegram提醒。',
    projDesc6: '自动代理轮换、会话管理、重试逻辑和请求队列。用于大规模爬取和数据收集而不被封锁。',
    projDesc7: '功能完整的Discord机器人——实时加密货币价格、PnL计算器、价格提醒、提醒事项、自动审核、自定义命令。24/7无停机。',
    projDesc8: '自动生成报告——从DB/API拉取数据，渲染为PDF/Excel，按计划通过邮件或Telegram发送。设置后零手动输入。',
    projDesc9: '交易策略回测引擎——使用OHLCV数据进行历史模拟，计算胜率、最大回撤、夏普比率和权益曲线。',
    projDesc10: '就是这个网站。新野蛮主义风格作品集，窗口式UI，简洁粗犷设计。用纯HTML、CSS和Vanilla JS构建。',
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

