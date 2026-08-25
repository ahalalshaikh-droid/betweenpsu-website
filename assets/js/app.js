export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = Object.freeze(['en', 'ar']);

const STORAGE_KEY = 'between-language';

const copy = Object.freeze({
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      events: 'Events',
      gallery: 'Gallery',
      join: 'Connect',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      switchLanguage: 'Switch language to Arabic',
    },
    hero: {
      eyebrow: 'Student-led · Prince Sultan University',
      title: 'Built by students. Connected to the ecosystem.',
      description: 'Between is a university-based startup studio helping ambitious students explore, build, and venture beyond the classroom. We bridge the gap between youth and the venture ecosystem.',
      primaryCta: 'Join us',
      secondaryCta: 'Discover the club',
      photoAlt: 'Between club members gathered together at Prince Sultan University',
    },
    about: {
      eyebrow: 'About Between',
      title: 'The space between an idea and what it can become.',
      body: 'Between is a student club based at Prince Sultan University, focused on startups and entrepreneurship. We create programs, events, competitions, and workshops that connect students directly with founders, investors, and the people building companies in Saudi Arabia.',
      body2: 'Our belief is simple: ambition is common, but access isn’t. Between exists to close that gap, turning curiosity into real exposure, real networks, and real opportunities to build, invest, and take part in the startup ecosystem.',
      focusLabel: 'Between focus areas',
      focus: ['Startups', 'Entrepreneurship', 'Venture Capital', 'Business'],
    },
    events: {
      eyebrow: 'Events',
      title: 'What’s waiting for us this semester?',
      upcoming: 'Upcoming',
      ongoing: 'Ongoing',
    },
    gallery: {
      eyebrow: 'Gallery',
      title: 'In Between.',
      label: 'Between club gallery',
      captions: ['The team', 'Entrepreneurial Talks', '252 Be a Founder Winners', 'Be a Founder', 'Between Founders'],
    },
    join: {
      eyebrow: 'Stay Connected',
      title: 'Follow what happens next.',
      body: 'Registration is currently closed. Follow Between for new events, opportunities, and the next application window.',
      registrationLabel: 'Registration',
      registrationClosed: 'Currently closed',
      services: ['Instagram', 'TikTok', 'Email'],
      contacts: ['@betweenpsu', '@betweenpsu', 'betweenclub@psu.edu.sa'],
    },
    footer: { location: 'Riyadh, Saudi Arabia' },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'عن بين',
      events: 'الفعاليات',
      gallery: 'الصور',
      join: 'تواصل',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
      switchLanguage: 'تغيير اللغة إلى الإنجليزية',
    },
    hero: {
      eyebrow: 'نادي طلابي · جامعة الأمير سلطان',
      title: 'بُني بأيدي الطلاب. متصل بالمنظومة.',
      description: 'بين استوديو شركات ناشئة جامعي يساعد الطلاب الطموحين على الاستكشاف والبناء والانطلاق إلى ما بعد قاعات الدراسة. نحن نصل بين الشباب ومنظومة رأس المال الجريء.',
      primaryCta: 'انضم إلينا',
      secondaryCta: 'تعرّف على النادي',
      photoAlt: 'أعضاء نادي بين مجتمعون في جامعة الأمير سلطان',
    },
    about: {
      eyebrow: 'عن بين',
      title: 'المساحة بين الفكرة وما يمكن أن تصبح عليه.',
      body: 'بين نادٍ طلابي مقره جامعة الأمير سلطان، يركز على الشركات الناشئة وريادة الأعمال. نصنع برامج وفعاليات ومسابقات وورش عمل تربط الطلاب مباشرة بالمؤسسين والمستثمرين والأشخاص الذين يبنون الشركات في المملكة العربية السعودية.',
      body2: 'إيماننا بسيط: الطموح موجود بكثرة، لكن الوصول إلى الفرص ليس كذلك. وُجد بين لتقليص هذه الفجوة، وتحويل الفضول إلى احتكاك حقيقي، وشبكات حقيقية، وفرص حقيقية للبناء والاستثمار والمشاركة في منظومة الشركات الناشئة.',
      focusLabel: 'مجالات تركيز نادي بين',
      focus: ['الشركات الناشئة', 'ريادة الأعمال', 'رأس المال الجريء', 'الأعمال'],
    },
    events: {
      eyebrow: 'الفعاليات',
      title: 'ماذا ينتظرنا هذا الفصل؟',
      upcoming: 'قريباً',
      ongoing: 'مستمر',
    },
    gallery: {
      eyebrow: 'الصور',
      title: 'داخل بين.',
      label: 'معرض صور نادي بين',
      captions: ['فريق بين', 'حوارات ريادية', 'الفائزون في كن مؤسس 252', 'كن مؤسس', 'بين المؤسسين'],
    },
    join: {
      eyebrow: 'ابقَ على تواصل',
      title: 'تابع كل ما هو قادم.',
      body: 'التسجيل مغلق حالياً. تابع بين لمعرفة الفعاليات والفرص القادمة وموعد فتح التسجيل القادم.',
      registrationLabel: 'التسجيل',
      registrationClosed: 'مغلق حالياً',
      services: ['إنستغرام', 'تيك توك', 'البريد'],
      contacts: ['@betweenpsu', '@betweenpsu', 'betweenclub@psu.edu.sa'],
    },
    footer: { location: 'الرياض، المملكة العربية السعودية' },
  },
});

const events = Object.freeze([
  {
    status: 'upcoming',
    when: null,
    title: { en: 'Between Ventures', ar: 'Between Ventures' },
    description: {
      en: 'An immersive, station-based experience where students explore the startup ecosystem from both the founder and investor perspectives through interactive activities, startup-building challenges, and investing simulations.',
      ar: 'تجربة تفاعلية قائمة على محطات تتيح للطلاب استكشاف منظومة الشركات الناشئة من منظور المؤسس والمستثمر عبر أنشطة عملية وتحديات لبناء الشركات ومحاكاة الاستثمار.',
    },
    location: { en: 'Building 105 · Prince Sultan University', ar: 'مبنى 105 · جامعة الأمير سلطان' },
  },
  {
    status: 'upcoming',
    when: null,
    title: { en: 'Between Capital', ar: 'Between Capital' },
    description: {
      en: 'Students experience how VCs evaluate startups by scoring real pitches and comparing their decisions with professional investors.',
      ar: 'يعيش الطلاب تجربة تقييم الشركات الناشئة مثل المستثمرين، من خلال تقييم عروض حقيقية ومقارنة قراراتهم بقرارات مستثمرين محترفين.',
    },
    location: { en: 'Prince Sultan University', ar: 'جامعة الأمير سلطان' },
  },
  {
    status: 'ongoing',
    when: { en: 'Throughout the 2026 semester', ar: 'خلال فصل 2026' },
    title: { en: 'Between Visits', ar: 'Between Visits' },
    description: {
      en: 'Organized visits to companies and organizations that give members direct exposure to professional environments, people across the business and venture ecosystem, and how work happens beyond campus.',
      ar: 'زيارات منظمة إلى شركات وجهات مختلفة تمنح الأعضاء تجربة مباشرة لبيئات العمل والتعرّف على أشخاص من منظومة الأعمال والاستثمار ورؤية العمل خارج الحرم الجامعي.',
    },
    location: { en: 'Companies & organizations', ar: 'شركات وجهات مختلفة' },
  },
  {
    status: 'upcoming',
    when: null,
    title: { en: 'Between Founders', ar: 'Between Founders' },
    description: {
      en: 'A founder-focused experience where students meet successful founders, hear the stories behind their companies, ask questions, build connections, and gain direct exposure to entrepreneurship.',
      ar: 'تجربة تركز على المؤسسين، يلتقي فيها الطلاب بمؤسسين ناجحين ويسمعون قصص شركاتهم ويطرحون الأسئلة ويبنون علاقات ويعيشون ريادة الأعمال عن قرب.',
    },
    location: { en: 'Prince Sultan University', ar: 'جامعة الأمير سلطان' },
  },
]);

export function normalizeLanguage(value) {
  return SUPPORTED_LANGUAGES.includes(value) ? value : DEFAULT_LANGUAGE;
}

export function oppositeLanguage(value) {
  return normalizeLanguage(value) === 'en' ? 'ar' : 'en';
}

export function getCopy(language) {
  return copy[normalizeLanguage(language)];
}

function readStoredLanguage() {
  try {
    return normalizeLanguage(localStorage.getItem(STORAGE_KEY));
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

function storeLanguage(language) {
  try {
    localStorage.setItem(STORAGE_KEY, normalizeLanguage(language));
  } catch {
    // The site remains usable when storage is unavailable.
  }
}

function valueAtPath(source, path) {
  return path.split('.').reduce((value, key) => value?.[key], source);
}

function setTranslatedContent(language) {
  const text = getCopy(language);
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const value = valueAtPath(text, node.dataset.i18n);
    if (typeof value === 'string') node.textContent = value;
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((node) => {
    const value = valueAtPath(text, node.dataset.i18nAlt);
    if (typeof value === 'string') node.alt = value;
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((node) => {
    const value = valueAtPath(text, node.dataset.i18nAriaLabel);
    if (typeof value === 'string') node.setAttribute('aria-label', value);
  });

  document.querySelectorAll('[data-focus-index]').forEach((node) => {
    const value = text.about.focus[Number(node.dataset.focusIndex)];
    if (value) node.textContent = value;
  });

  document.querySelectorAll('[data-event-index]').forEach((article) => {
    const event = events[Number(article.dataset.eventIndex)];
    if (!event) return;
    const status = event.status === 'ongoing' ? text.events.ongoing : text.events.upcoming;
    const when = event.when?.[language] ?? '';
    article.querySelector('[data-event-status]').textContent = status;
    article.querySelector('[data-event-title]').textContent = event.title[language];
    article.querySelector('[data-event-description]').textContent = event.description[language];
    article.querySelector('[data-event-location]').textContent = event.location[language];
    const whenNode = article.querySelector('[data-event-when]');
    whenNode.textContent = when;
    whenNode.hidden = when.length === 0;
  });

  document.querySelectorAll('[data-gallery-caption]').forEach((node) => {
    const value = text.gallery.captions[Number(node.dataset.galleryCaption)];
    if (value) node.textContent = value;
  });

  document.querySelectorAll('[data-contact-service]').forEach((node) => {
    const value = text.join.services[Number(node.dataset.contactService)];
    if (value) node.textContent = value;
  });

  document.querySelectorAll('[data-contact-label]').forEach((node) => {
    const value = text.join.contacts[Number(node.dataset.contactLabel)];
    if (value) node.textContent = value;
  });

  const languageToggle = document.querySelector('[data-language-toggle]');
  languageToggle.textContent = language === 'en' ? 'العربية' : 'English';
  languageToggle.setAttribute('aria-label', text.nav.switchLanguage);
}

function setupRevealObserver() {
  const nodes = document.querySelectorAll('.reveal');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  nodes.forEach((node) => observer.observe(node));
}

function protectPhoto(event) {
  if (event.target instanceof Element && event.target.closest('[data-protected-photo]')) {
    event.preventDefault();
  }
}

function boot() {
  let language = readStoredLanguage();
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('[data-mobile-menu]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menuLabel = menuButton.querySelector('.sr-only');
  const desktopQuery = matchMedia('(min-width: 1024px)');

  const setMenuOpen = (open, restoreFocus = false) => {
    const nextOpen = Boolean(open) && !desktopQuery.matches;
    menu.hidden = !nextOpen;
    menuButton.setAttribute('aria-expanded', String(nextOpen));
    menuLabel.textContent = nextOpen ? getCopy(language).nav.closeMenu : getCopy(language).nav.openMenu;
    document.body.classList.toggle('menu-open', nextOpen);
    if (!nextOpen && restoreFocus && menuButton.offsetParent !== null) menuButton.focus();
  };

  setTranslatedContent(language);
  setMenuOpen(false);
  setupRevealObserver();

  document.querySelector('[data-language-toggle]').addEventListener('click', () => {
    language = oppositeLanguage(language);
    storeLanguage(language);
    setTranslatedContent(language);
    setMenuOpen(false);
  });

  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  document.querySelectorAll('[data-close-menu]').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false, true);
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (menuButton.getAttribute('aria-expanded') === 'true' && !header.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) setMenuOpen(false);
  });

  document.addEventListener('contextmenu', protectPhoto);
  document.addEventListener('dragstart', protectPhoto);
}

if (typeof document !== 'undefined') {
  document.documentElement.classList.add('js');
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}
