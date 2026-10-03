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
      title: 'Built by students. Connected to the startup ecosystem.',
      description: 'Between is a student club at Prince Sultan University helping ambitious students explore startups, build ideas, and connect with founders and investors beyond the classroom.',
      primaryCta: 'Stay Connected',
      secondaryCta: 'Discover Between',
      photoAlt: 'Between club members gathered together at Prince Sultan University',
    },
    about: {
      eyebrow: 'About Between',
      title: 'The space between an idea and what it can become.',
      body: 'Between is a student club at Prince Sultan University focused on startups and entrepreneurship. Through programs, events, competitions, and workshops, we connect students directly with founders, investors, and the people building companies across Saudi Arabia.',
      body2: 'Our belief is simple: ambition is common, but access isn’t. Between exists to close that gap by turning curiosity into firsthand experiences, meaningful connections, and real opportunities to take part in the startup ecosystem.',
      focusLabel: 'Between focus areas',
      focus: ['Startups', 'Entrepreneurship', 'Investing', 'Business'],
    },
    events: {
      eyebrow: 'Events',
      title: 'What’s coming this semester?',
      upcoming: 'Upcoming',
      ongoing: 'Ongoing',
    },
    ecosystem: {
      eyebrow: 'Connections',
      title: 'Our ecosystem.',
      partnersCaption: 'Success partners',
      networkCaption: 'The success network',
      partnersAlt: "Logos of Between's success partners",
      networkAlt: "Portraits of people in Between's success network",
      partnersLink: 'View success partners image at full size',
      networkLink: 'View success network image at full size',
    },
    gallery: {
      eyebrow: 'Gallery',
      title: 'In Between.',
      story: 'A year in motion—shaped by the people, conversations, and moments that brought Between to life.',
      collageAlt: 'Collage of Between events, speakers, founders, students, and community moments',
      label: 'Between club gallery',
      captions: ['The Team', 'Entrepreneurial Talks', '252 Be a Founder — Winners', 'Be a Founder', 'Between Founders'],
    },
    join: {
      eyebrow: 'Stay Connected',
      title: 'Follow what comes next.',
      body: 'Registration is closed for this semester. Follow us for updates on future opportunities to join.',
      registrationLabel: 'Registration',
      registrationAction: 'Closed for this semester',
      services: ['Instagram', 'TikTok', 'Email'],
      contacts: ['@betweenpsu', '@betweenpsu', 'betweenclub@psu.edu.sa'],
    },
    footer: {
      brand: 'Between · Prince Sultan University',
      location: 'Riyadh, Saudi Arabia',
    },
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
      eyebrow: 'بقيادة الطلاب · جامعة الأمير سلطان',
      title: 'بين الطموح والفرصة.',
      description: 'بين, هو نادٍ طلابي في جامعة الأمير سلطان، يساعد الطلاب الطموحين على استكشاف عالم الشركات الناشئة، وتطوير أفكارهم، ويوفر فرص التواصل مع المؤسسين والمستثمرين خارج حدود القاعة الدراسية.',
      primaryCta: 'ابقَ على تواصل',
      secondaryCta: 'اكتشف بين',
      photoAlt: 'أعضاء نادي بين مجتمعون في جامعة الأمير سلطان',
    },
    about: {
      eyebrow: 'عن بين',
      title: 'المساحة بين الفكرة وما يمكن أن تصبح عليه.',
      body: 'بين نادٍ طلابي في جامعة الأمير سلطان يركّز على الشركات الناشئة وريادة الأعمال. من خلال البرامج والفعاليات والمسابقات وورش العمل، نربط الطلاب مباشرة بالمؤسسين والمستثمرين وصنّاع الشركات في المملكة.',
      body2: 'نؤمن بشيء بسيط: الطموح موجود لدى الكثير، لكن الوصول إلى الفرص ليس كذلك. وُجد بين لتقليص هذه الفجوة، وتحويل الفضول إلى تجارب حقيقية، وعلاقات مؤثرة، وفرص فعلية للمشاركة في منظومة الشركات الناشئة.',
      focusLabel: 'مجالات تركيز نادي بين',
      focus: ['الشركات الناشئة', 'ريادة الأعمال', 'الاستثمار', 'الأعمال'],
    },
    events: {
      eyebrow: 'الفعاليات',
      title: 'ما القادم هذا الفصل؟',
      upcoming: 'قريبًا',
      ongoing: 'مستمر',
    },
    ecosystem: {
      eyebrow: 'روابطنا',
      title: 'منظومتنا.',
      partnersCaption: 'شركاء النجاح',
      networkCaption: 'شبكة النجاح',
      partnersAlt: 'شعارات شركاء النجاح في بين',
      networkAlt: 'صور أشخاص من شبكة النجاح في بين',
      partnersLink: 'عرض صورة شركاء النجاح بالحجم الكامل',
      networkLink: 'عرض صورة شبكة النجاح بالحجم الكامل',
    },
    gallery: {
      eyebrow: 'لحظاتنا',
      title: 'لحظات من بين.',
      story: 'عامٌ صنعه الأشخاص والحوارات واللحظات التي أعطت «بين» معناه.',
      collageAlt: 'مجموعة صور لفعاليات بين والمتحدثين والمؤسسين والطلاب ولحظات المجتمع',
      label: 'معرض صور نادي بين',
      captions: ['الفريق', 'Entrepreneurial Talks', 'الفائزون في 252 Be a Founder', 'كن مؤسس', 'بين المؤسسين'],
    },
    join: {
      eyebrow: 'ابقَ على تواصل',
      title: 'تابع ما هو قادم.',
      body: 'التسجيل مغلق لهذا الفصل الدراسي. تابعنا لمعرفة آخر المستجدات حول فرص الانضمام القادمة.',
      registrationLabel: 'التسجيل',
      registrationAction: 'مغلق لهذا الفصل الدراسي',
      services: ['Instagram', 'TikTok', 'البريد الإلكتروني'],
      contacts: ['@betweenpsu', '@betweenpsu', 'betweenclub@psu.edu.sa'],
    },
    footer: {
      brand: 'بين · جامعة الأمير سلطان',
      location: 'الرياض، المملكة العربية السعودية',
    },
  },
});

const events = Object.freeze([
  {
    status: 'upcoming',
    when: null,
    title: { en: 'Between Ventures', ar: 'Between Ventures' },
    description: {
      en: 'An immersive, station-based experience where students explore the startup ecosystem from both founder and investor perspectives through interactive activities, startup-building challenges, and investing simulations.',
      ar: 'تجربة تفاعلية موزعة على محطات، يستكشف فيها الطلاب منظومة الشركات الناشئة من منظور المؤسس والمستثمر، من خلال أنشطة تفاعلية، وتحديات لبناء الشركات، ومحاكاة للاستثمار.',
    },
    location: { en: 'Building 105 · Prince Sultan University', ar: 'مبنى 105 · جامعة الأمير سلطان' },
  },
  {
    status: 'upcoming',
    when: null,
    title: { en: 'Between Capital', ar: 'Between Capital' },
    description: {
      en: 'Students step into the investor’s seat, evaluate real startup pitches, score each opportunity, and compare their decisions with professional investors.',
      ar: 'يأخذ الطلاب مقعد المستثمر، ويقيّمون عروض شركات ناشئة حقيقية، ويمنحونها درجاتهم، ثم يقارنون قراراتهم بقرارات مستثمرين محترفين.',
    },
    location: { en: 'Prince Sultan University', ar: 'جامعة الأمير سلطان' },
  },
  {
    status: 'ongoing',
    when: { en: 'throughout the semester', ar: 'طوال الفصل' },
    title: { en: 'Between Visits', ar: 'Between Visits' },
    description: {
      en: 'Organized visits to companies and organizations that give members firsthand exposure to professional environments, industry leaders, and how teams operate beyond campus.',
      ar: 'زيارات منظّمة إلى الشركات والجهات المختلفة، تمنح الأعضاء فرصة للتعرّف عن قرب على بيئات العمل، وقادة القطاعات، وكيف تعمل الفرق خارج البيئة الجامعية.',
    },
    location: { en: 'Companies & organizations', ar: 'الشركات والجهات' },
  },
  {
    status: 'upcoming',
    when: null,
    title: { en: 'Between Founders', ar: 'Between Founders' },
    description: {
      en: 'An experience that brings students closer to successful founders—their journeys, the companies they built, the decisions they made, and the lessons they learned along the way.',
      ar: 'تجربة تقرّب الطلاب من مؤسسين ناجحين، ليتعرّفوا على رحلاتهم، والشركات التي بنوها، والقرارات التي اتخذوها، والدروس التي تعلّموها في الطريق.',
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
