/**
 * Kailash Khelgi - Portfolio Interactive Engine
 * Multi-accent themes, cursor spotlight, live project simulators,
 * real-time skill searching, modal architectures, and clipboard utility.
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initCursorSpotlight();
  initThemeSwitcher();
  initTypewriter();
  initNavigation();
  initProjectTabs();
  initProjectModals();
  initSimulators();
  initSkillsSearch();
  initContactActions();
  initResumeModal();
});

/* ==========================================================================
   1. AMBIENT INTERACTIVE CYBERNETIC CANVAS
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = -9999;
  let mouseY = -9999;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouseX = -9999;
    mouseY = -9999;
  });

  // Theme-aware color palette
  function getThemeRGB() {
    const theme = document.body.getAttribute('data-theme') || 'indigo';
    if (theme === 'cyan') return { primary: '56, 189, 248', secondary: '2, 132, 199' };
    if (theme === 'emerald') return { primary: '52, 211, 153', secondary: '16, 185, 129' };
    if (theme === 'amber') return { primary: '251, 191, 36', secondary: '245, 158, 11' };
    return { primary: '165, 180, 252', secondary: '99, 102, 241' };
  }

  // A. Constellation Nodes
  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 16), 85);

  class Node {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 1;
      this.vx = (Math.random() - 0.5) * 0.65;
      this.vy = (Math.random() - 0.5) * 0.65;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulse = Math.random() * Math.PI;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += this.pulseSpeed;

      // Mouse interactive slight repulsion
      const mdx = this.x - mouseX;
      const mdy = this.y - mouseY;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 140) {
        const force = (140 - mdist) / 140;
        this.x += (mdx / mdist) * force * 2.5;
        this.y += (mdy / mdist) * force * 2.5;
      }

      if (this.x < 0) this.x = width;
      else if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      else if (this.y > height) this.y = 0;
    }

    draw(rgb) {
      const currentAlpha = 0.35 + Math.sin(this.pulse) * 0.3;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb.primary}, ${currentAlpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${rgb.secondary}, 0.5)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Node());
  }

  // B. Floating Tech Glyphs & Coding Elements
  const codeSymbols = ['{ }', '</>', 'λ', '01', 'Java', 'SQL', '⚛️', 'REST', '0xFF', '/* */'];
  const glyphs = [];
  const glyphCount = 14;

  class FloatingGlyph {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 30;
      this.text = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
      this.size = Math.random() * 5 + 11;
      this.vy = -(Math.random() * 0.35 + 0.15);
      this.vx = (Math.random() - 0.5) * 0.2;
      this.alpha = Math.random() * 0.18 + 0.08;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.008;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotSpeed;

      if (this.y < -40 || this.x < -40 || this.x > width + 40) {
        this.reset(false);
      }
    }

    draw(rgb) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.font = `500 ${this.size}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(${rgb.primary}, ${this.alpha})`;
      ctx.fillText(this.text, 0, 0);
      ctx.restore();
    }
  }

  for (let i = 0; i < glyphCount; i++) {
    glyphs.push(new FloatingGlyph());
  }

  // C. Floating Geometric Wireframes (Hexagons / Diamonds)
  const geometries = [];
  for (let i = 0; i < 6; i++) {
    geometries.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 35 + 25,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      angle: Math.random() * Math.PI * 2,
      speed: (Math.random() - 0.5) * 0.005,
      sides: Math.random() > 0.5 ? 6 : 4
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    const rgb = getThemeRGB();

    // 1. Draw Geometric Wireframes
    geometries.forEach((g) => {
      g.x += g.vx;
      g.y += g.vy;
      g.angle += g.speed;

      if (g.x < -50) g.x = width + 50;
      else if (g.x > width + 50) g.x = -50;
      if (g.y < -50) g.y = height + 50;
      else if (g.y > height + 50) g.y = -50;

      ctx.save();
      ctx.translate(g.x, g.y);
      ctx.rotate(g.angle);
      ctx.beginPath();
      for (let i = 0; i < g.sides; i++) {
        const rad = (i * 2 * Math.PI) / g.sides;
        const gx = Math.cos(rad) * g.size;
        const gy = Math.sin(rad) * g.size;
        if (i === 0) ctx.moveTo(gx, gy);
        else ctx.lineTo(gx, gy);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${rgb.secondary}, 0.08)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    });

    // 2. Draw Floating Code Glyphs
    glyphs.forEach((g) => {
      g.update();
      g.draw(rgb);
    });

    // 3. Connect Constellation Nodes
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 125) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${rgb.primary}, ${0.16 * (1 - dist / 125)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      // Connect to Mouse Cursor
      if (mouseX > 0 && mouseY > 0) {
        const mdx = particles[i].x - mouseX;
        const mdy = particles[i].y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 160) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(${rgb.secondary}, ${0.28 * (1 - mdist / 160)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // 4. Update and Draw Nodes
    particles.forEach((p) => {
      p.update();
      p.draw(rgb);
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. CURSOR SPOTLIGHT FOLLOWER
   ========================================================================== */
function initCursorSpotlight() {
  const cursorGlow = document.getElementById('cursor-glow');
  if (!cursorGlow) return;

  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

/* ==========================================================================
   3. THEME ACCENT SWITCHER
   ========================================================================== */
function initThemeSwitcher() {
  const dots = document.querySelectorAll('.palette-dot');

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      dots.forEach((d) => d.classList.remove('active'));
      dot.classList.add('active');

      const color = dot.getAttribute('data-color') || 'indigo';
      document.body.setAttribute('data-theme', color);
      showToast(`Switched theme accent to ${color.toUpperCase()}!`);
    });
  });
}

/* ==========================================================================
   4. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const typedRole = document.getElementById('typed-role');
  if (!typedRole) return;

  const roles = [
    'Java Full Stack Developer',
    'Spring Boot & REST API Engineer',
    'React & Modern Frontend Crafter',
    'Computer Science Graduate (8.0 CGPA)',
    'Enterprise Solutions Builder'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 90;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      typedRole.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      speed = 45;
    } else {
      typedRole.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      speed = 85;
    }

    if (!isDeleting && charIdx === current.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ==========================================================================
   5. NAVIGATION & SCROLLSPY
   ========================================================================== */
function initNavigation() {
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMobileBtn = document.getElementById('close-mobile-btn');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbarWrapper?.classList.add('scrolled');
    } else {
      navbarWrapper?.classList.remove('scrolled');
    }

    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  function toggleMobile(open) {
    if (open) {
      mobileMenu?.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu?.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  mobileToggle?.addEventListener('click', () => toggleMobile(true));
  closeMobileBtn?.addEventListener('click', () => toggleMobile(false));

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMobile(false));
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   6. PROJECT TABS
   ========================================================================== */
function initProjectTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-showcase');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach((card) => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   7. LIVE PROJECT SIMULATORS
   ========================================================================== */
function initSimulators() {
  // A. Agri Medha Crop Recommendation Simulator
  const soilSelect = document.getElementById('soil-select');
  const seasonSelect = document.getElementById('season-select');
  const runCropBtn = document.getElementById('run-crop-advisory-btn');
  const cropIcon = document.getElementById('crop-icon');
  const cropName = document.getElementById('crop-name');
  const cropConfidence = document.getElementById('crop-confidence');
  const cropAdvice = document.getElementById('crop-advice');

  const cropKnowledge = {
    'black-kharif': {
      crop: 'Cotton & Soybean',
      score: '96%',
      icon: '🌾',
      advice: 'High moisture retention in deep black clay supports healthy cotton boll development. Recommend NPK (80:40:40 kg/ha).'
    },
    'black-rabi': {
      crop: 'Wheat & Bengal Gram (Chickpea)',
      score: '94%',
      icon: '🌱',
      advice: 'Residual post-monsoon soil moisture is optimal for Rabi pulses and high-protein wheat. Apply bio-fertilizers.'
    },
    'black-zaid': {
      crop: 'Sunflower & Watermelon',
      score: '89%',
      icon: '🌻',
      advice: 'Deep root systems leverage remaining subsoil reserves during hot summer months. Drip irrigation recommended.'
    },
    'red-kharif': {
      crop: 'Groundnut, Red Gram (Toor Dal) & Maize',
      score: '93%',
      icon: '🥜',
      advice: 'Well-drained porous red soil prevents waterlogging. Ideal for drought-resilient legumes and high-yield groundnut.'
    },
    'red-rabi': {
      crop: 'Mustard & Millets (Ragi)',
      score: '90%',
      icon: '🌾',
      advice: 'Requires moderate irrigation intervals. High potash response boosts grain quality.'
    },
    'alluvial-kharif': {
      crop: 'Paddy Rice & Sugarcane',
      score: '98%',
      icon: '🌾',
      advice: 'Fertile river silt with high organic carbon supports intensive water-loving crops with heavy tillering.'
    },
    'sandy-zaid': {
      crop: 'Cucumber, Muskmelon & Gourds',
      score: '88%',
      icon: '🍈',
      advice: 'High soil aeration permits fast root penetration. Apply organic mulch to limit evaporation losses.'
    }
  };

  runCropBtn?.addEventListener('click', () => {
    const soil = soilSelect.value;
    const season = seasonSelect.value;
    const key = `${soil}-${season}`;
    const result = cropKnowledge[key] || {
      crop: 'Millets (Jowar / Bajra) & Pulses',
      score: '91%',
      icon: '🌿',
      advice: 'Balanced micro-nutrients with adaptive sowing window ensures climate-resilient harvest.'
    };

    runCropBtn.disabled = true;
    runCropBtn.innerHTML = `<span>Computing Algorithm...</span>`;

    setTimeout(() => {
      runCropBtn.disabled = false;
      runCropBtn.innerHTML = `<span>Compute Optimal Crop Recommendation</span>`;
      cropIcon.textContent = result.icon;
      cropName.textContent = result.crop;
      cropConfidence.textContent = `Suitability Score: ${result.score}`;
      cropAdvice.textContent = result.advice;
      showToast(`Advisory updated: ${result.crop} recommended!`);
    }, 400);
  });

  // B. Organ Donation Compatibility Matcher Simulator
  const donorBloodSelect = document.getElementById('donor-blood');
  const testMatchingBtn = document.getElementById('test-matching-btn');
  const matchStatus = document.getElementById('match-status');
  const compatibleGroups = document.getElementById('compatible-groups');
  const matchLog = document.getElementById('match-log');

  const donorMatrix = {
    O_NEG: {
      recipients: 'Universal Donor (O-, O+, A-, A+, B-, B+, AB-, AB+)',
      log: 'Universal donor phenotype verified. Matches emergency critical pool immediately with 0 antigen rejection risk.'
    },
    O_POS: {
      recipients: 'O+, A+, B+, AB+',
      log: 'Compatible with all Rh-positive patient queues. Priority given to longest waiting index.'
    },
    A_POS: {
      recipients: 'A+, AB+',
      log: 'Antigen A cross-match confirmed. Filtered 4 candidates based on HLA compatibility score > 85%.'
    },
    B_POS: {
      recipients: 'B+, AB+',
      log: 'Antigen B match validated. Alert triggered for regional hospital transplant coordinator.'
    },
    AB_POS: {
      recipients: 'AB+ Only',
      log: 'Specific recipient pool match. Verification hash committed to encrypted medical ledger.'
    }
  };

  testMatchingBtn?.addEventListener('click', () => {
    const donor = donorBloodSelect.value;
    const match = donorMatrix[donor] || donorMatrix.A_POS;

    testMatchingBtn.disabled = true;
    testMatchingBtn.innerHTML = `<span>Running Matching Algorithm...</span>`;

    setTimeout(() => {
      testMatchingBtn.disabled = false;
      testMatchingBtn.innerHTML = `<span>Execute Compatibility Verification</span>`;
      matchStatus.textContent = `Compatibility Verified • Audit Passed`;
      compatibleGroups.textContent = `Eligible Pools: ${match.recipients}`;
      matchLog.textContent = match.log;
      showToast('Transplant compatibility matrix successfully computed!');
    }, 450);
  });

  // C. Weather Forecast Live Simulator
  const cityPills = document.querySelectorAll('.city-pill');
  const wCity = document.getElementById('w-city');
  const wCondition = document.getElementById('w-condition');
  const wIcon = document.getElementById('w-icon');
  const wTemp = document.getElementById('w-temp');
  const wHumidity = document.getElementById('w-humidity');
  const wWind = document.getElementById('w-wind');
  const wPressure = document.getElementById('w-pressure');
  const wVis = document.getElementById('w-vis');

  const weatherData = {
    Bangalore: {
      city: 'Bangalore, IN',
      condition: 'Partly Cloudy • Pleasant Breeze',
      icon: '⛅',
      temp: '27°C',
      humidity: '64%',
      wind: '14 km/h',
      pressure: '1013 hPa',
      vis: '10 km'
    },
    Kalaburagi: {
      city: 'Kalaburagi, IN',
      condition: 'Sunny & Clear • Warm Daylight',
      icon: '☀️',
      temp: '32°C',
      humidity: '48%',
      wind: '11 km/h',
      pressure: '1010 hPa',
      vis: '12 km'
    },
    Mumbai: {
      city: 'Mumbai, IN',
      condition: 'Humid & Overcast • Coastal Winds',
      icon: '🌦️',
      temp: '30°C',
      humidity: '78%',
      wind: '22 km/h',
      pressure: '1008 hPa',
      vis: '8 km'
    },
    London: {
      city: 'London, UK',
      condition: 'Light Showers • Cool Breeze',
      icon: '🌧️',
      temp: '16°C',
      humidity: '82%',
      wind: '19 km/h',
      pressure: '1016 hPa',
      vis: '9 km'
    }
  };

  cityPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      cityPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const cityName = pill.getAttribute('data-city') || 'Bangalore';
      const data = weatherData[cityName];
      if (!data) return;

      wCity.textContent = data.city;
      wCondition.textContent = data.condition;
      wIcon.textContent = data.icon;
      wTemp.textContent = data.temp;
      wHumidity.textContent = data.humidity;
      wWind.textContent = data.wind;
      wPressure.textContent = data.pressure;
      wVis.textContent = data.vis;

      showToast(`Weather updated for ${data.city}!`);
    });
  });
}

/* ==========================================================================
   8. REAL-TIME SKILLS SEARCH FILTER
   ========================================================================== */
function initSkillsSearch() {
  const searchInput = document.getElementById('skills-search-input');
  const skillRows = document.querySelectorAll('.skill-row');
  const categoryBoxes = document.querySelectorAll('.skill-category-box');

  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    skillRows.forEach((row) => {
      const skillMeta = (row.getAttribute('data-skill') || '').toLowerCase();
      const skillText = row.textContent.toLowerCase();

      if (!query || skillMeta.includes(query) || skillText.includes(query)) {
        row.style.display = 'flex';
      } else {
        row.style.display = 'none';
      }
    });

    categoryBoxes.forEach((box) => {
      const visibleRows = box.querySelectorAll('.skill-row[style="display: flex;"]');
      if (query && visibleRows.length === 0) {
        box.style.opacity = '0.35';
      } else {
        box.style.opacity = '1';
      }
    });
  });
}

/* ==========================================================================
   9. PROJECT ARCHITECTURE MODALS
   ========================================================================== */
const projectData = {
  'agri-medha': {
    title: 'Agri Medha – Smart Crop Advisory Platform',
    badge: 'Java Full Stack & Agritech',
    date: 'June 2026',
    overview:
      'Agri Medha is an intelligent agricultural decision platform built to empower farmers with data-driven crop recommendations. The system evaluates soil chemistry (NPK, pH), meteorological trends, and seasonal calendars to optimize harvest yields and minimize chemical fertilizer over-application.',
    architecture: [
      {
        layer: 'Core Processing Engine (Java)',
        desc: 'Implemented modular object-oriented algorithms in Java to compute crop compatibility scores based on agronomic thresholds.'
      },
      {
        layer: 'Interactive User Interface (React.js, HTML5, CSS3)',
        desc: 'Crafted an accessible, responsive dashboard supporting quick soil data input, intuitive comparison tables, and advisory reports.'
      },
      {
        layer: 'Relational Database (MySQL)',
        desc: 'Designed normalized schemas storing comprehensive agronomy benchmarks, soil profiles, historical advisories, and farmer accounts.'
      }
    ],
    features: [
      'Multi-factor crop suitability ranking based on soil NPK & environmental parameters',
      'Step-by-step guided advisory workflow tailored for straightforward farmer interaction',
      'Secure data storage and fast retrieval of past advisory reports',
      'Interactive crop calendar and seasonal cultivation best practices',
      'Extensible architecture ready for real-time IoT soil sensor integrations'
    ],
    techStack: ['Java', 'React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'MySQL', 'REST API', 'Git']
  },
  'organ-donation': {
    title: 'Decentralized Organ Donation Platform',
    badge: 'Database Architecture & Healthcare Tech',
    date: 'August 2024',
    overview:
      'A secure organ donation management and coordination system designed to address urgent organ allocation challenges. The platform establishes a transparent registry of verified donors and waiting recipients, executing automated compatibility matching algorithms to minimize allocation delays and ensure equitable medical distribution.',
    architecture: [
      {
        layer: 'Algorithmic Matching Engine (Python)',
        desc: 'Engineered multi-criteria logic matching blood type, human leukocyte antigen (HLA) indicators, organ urgency score, and geographic proximity.'
      },
      {
        layer: 'Relational Data Store (SQLite / MySQL)',
        desc: 'Implemented secure schemas safeguarding donor identities, recipient medical history, allocation timestamps, and audit trails.'
      },
      {
        layer: 'Modular System Design',
        desc: 'Followed clean software engineering practices with separate modules for registration, validation, matching, and logging.'
      }
    ],
    features: [
      'Automated donor-to-recipient compatibility verification algorithm',
      'Dual database support ensuring lightweight local operation (SQLite) or enterprise multi-user deployment (MySQL)',
      'Data integrity validation preventing duplicate donor or recipient registrations',
      'Comprehensive audit logs for transparency and compliance with organ transplant regulations',
      'Optimized query performance for rapid emergency matching queries'
    ],
    techStack: ['Python', 'MySQL', 'SQLite', 'Modular Architecture', 'Data Security', 'Git']
  },
  'weather-app': {
    title: 'Interactive Weather Forecasting App',
    badge: 'Frontend Engineering & API Integration',
    date: 'January 2024',
    overview:
      'A responsive web application that provides real-time meteorological forecasting and atmospheric conditions for global cities. Powered by the OpenWeather REST API, the application features reactive components, dynamic ambient animations reflecting current climate conditions, and instantaneous search capabilities.',
    architecture: [
      {
        layer: 'Client-Side Framework (React.js)',
        desc: 'Structured reusable component hierarchies (SearchBar, WeatherCard, ForecastTimeline, AtmosphericMetrics) for state predictability.'
      },
      {
        layer: 'Asynchronous API Integration',
        desc: 'Integrated OpenWeather API using modern fetch and Promise patterns with rigorous error handling and graceful fallbacks.'
      },
      {
        layer: 'Modern Styling & Node Toolchain',
        desc: 'Handcrafted responsive CSS layout with animated icons, CSS transitions, and npm-driven asset compilation.'
      }
    ],
    features: [
      'Instant global city search with real-time temperature, humidity, wind speed, and pressure metrics',
      'Dynamic visual theme switching between sunny, rainy, cloudy, and night modes',
      'Multi-day weather forecasting projections and temperature range visualizations',
      'Graceful error handling for invalid city queries and network connectivity dropouts',
      'Mobile-first responsive design adapted for smartphones, tablets, and desktop displays'
    ],
    techStack: ['React.js', 'JavaScript (ES6+)', 'OpenWeather API', 'HTML5', 'CSS3', 'Node.js', 'npm']
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalHeader = document.getElementById('modal-header');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close-btn');
  const viewBtns = document.querySelectorAll('.view-project-btn');

  function openProject(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalHeader.innerHTML = `
      <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
        <span class="tag-featured">${data.badge}</span>
        <span class="project-date">${data.date}</span>
      </div>
      <h2 style="font-family: var(--font-heading); font-size: 1.6rem; color: #fff; line-height: 1.25;">${data.title}</h2>
    `;

    modalBody.innerHTML = `
      <div style="margin-top: 18px;">
        <h4 style="color: var(--accent-secondary); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Architecture &amp; Engineering</h4>
        <p style="color: var(--text-muted); font-size: 0.96rem; line-height: 1.65; margin-bottom: 24px;">${data.overview}</p>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
          ${data.architecture
        .map(
          (arch) => `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px 16px;">
              <strong style="color: #fff; font-size: 0.92rem; display: block; margin-bottom: 4px;">${arch.layer}</strong>
              <span style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.5;">${arch.desc}</span>
            </div>
          `
        )
        .join('')}
        </div>

        <h4 style="color: var(--accent-secondary); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Key Capabilities</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; padding-left: 4px;">
          ${data.features
        .map(
          (feat) => `
            <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.9rem; color: var(--text-muted);">
              <span style="color: #34d399; font-weight: bold;">✓</span>
              <span>${feat}</span>
            </li>
          `
        )
        .join('')}
        </ul>

        <div style="display: flex; gap: 12px; border-top: 1px solid var(--border-subtle); padding-top: 18px;">
          <a href="https://github.com/kailashkhelgi" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <span>Explore on GitHub</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('project-modal').classList.remove('open'); document.body.style.overflow = '';">
            Close
          </button>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-project');
      if (pid) openProject(pid);
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   10. CONTACT ACTIONS & VALIDATION
   ========================================================================== */
function initContactActions() {
  const copyBtns = document.querySelectorAll('.copy-action-btn');
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
          const originalHTML = btn.innerHTML;
          btn.innerHTML = `<span style="color: #34d399; font-size: 13px; font-weight: bold;">✓</span>`;
          setTimeout(() => {
            btn.innerHTML = originalHTML;
          }, 2000);
        })
        .catch(() => {
          showToast('Failed to copy to clipboard.');
        });
    });
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    let isValid = true;
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (messageError) messageError.textContent = '';

    if (!nameInput.value.trim()) {
      if (nameError) nameError.textContent = 'Please provide your full name.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      if (emailError) emailError.textContent = 'Please enter a valid work email address.';
      isValid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 8) {
      if (messageError) messageError.textContent = 'Message should contain at least 8 characters.';
      isValid = false;
    }

    if (!isValid) return;

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="btn-text">Transmitting Message...</span>
      <span class="pulse-indicator"></span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      showToast('Message transmitted successfully! Kailash will respond to your email promptly.');
    }, 1200);
  });
}

/* ==========================================================================
   11. RESUME MODAL & PRINTING
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const navResumeBtn = document.getElementById('nav-resume-btn');
  const mobileResumeBtn = document.getElementById('mobile-resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const resumeCloseBtn = document.getElementById('resume-close-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openModal() {
    resumeModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    resumeModal?.classList.remove('open');
    document.body.style.overflow = '';
  }

  navResumeBtn?.addEventListener('click', openModal);
  mobileResumeBtn?.addEventListener('click', openModal);
  heroResumeBtn?.addEventListener('click', openModal);

  resumeCloseBtn?.addEventListener('click', closeModal);

  resumeModal?.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeModal();
  });

  printResumeBtn?.addEventListener('click', () => {
    window.print();
  });
}

/* ==========================================================================
   12. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="font-size: 1.1rem;">✨</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
