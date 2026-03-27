/* ============================================================
   FINWANDER v2 – script.js
   Features: Quiz, Recommendation Engine, Weather, Budget Planner,
             Reviews, Map (Leaflet), Stats Counter, Dark Mode,
             Saved Trips, Sound System, Scroll Reveal, Loader
   ============================================================ */
'use strict';

/* ══════════════════════════════════════
   DESTINATION DATASET
══════════════════════════════════════ */
const destinations = [
  {
    id: 'manali',
    name: 'Manali',
    tagline: 'Where mountains meet magic',
    image: 'assets/images/manali.jpg',
    video: 'assets/videos/manali.mp4',
    vibe: 'Adventure', climate: 'Cold', budget: 'Low',
    landscape: 'Mountains', rating: 4.7,
    lat: 32.2432, lng: 77.1892,
    desc: 'Nestled deep in the Himalayas, Manali is a snow-capped paradise for adventure seekers. From epic treks to roaring rivers, it delivers thrills and serenity in equal measure.',
    bestTime: 'March – June',
    weather: { temp: '12°C', condition: 'Cool & Pleasant', humidity: '68%', wind: '14 km/h', visibility: '10 km', uv: 'Low', icon: 'fa-snowflake' },
    costEstimates: {
      Low:    { Weekend: '₹5,000–₹8,000',   Short: '₹8,000–₹12,000',   Week: '₹15,000–₹20,000', Long: '₹22,000–₹30,000' },
      Medium: { Weekend: '₹10,000–₹15,000', Short: '₹15,000–₹22,000',  Week: '₹28,000–₹40,000', Long: '₹45,000–₹60,000' },
      Luxury: { Weekend: '₹30,000+',        Short: '₹50,000+',          Week: '₹80,000+',         Long: '₹1,20,000+' }
    },
    budgetBase: { transport: 3000, accomm: 2500, food: 1200, activities: 1000 },
    activities: ['Trekking', 'River Rafting', 'Paragliding', 'Snow Skiing', 'Mountain Biking'],
    reasons: ['Perfect for adventure lovers', 'Cool mountain climate', 'Very budget-friendly', 'World-class trekking routes', 'Stunning Himalayan scenery'],
    reviews: [
      { name: 'Arjun M.', rating: 5, text: 'Absolutely breathtaking! The trek to Rohtang was life-changing. Manali is a must for every adventurer.' },
      { name: 'Priya S.', rating: 4, text: 'Loved the cool weather and the local food. River rafting was insane!' },
      { name: 'Karan D.', rating: 5, text: 'Best budget trip I ever took. So much to do, amazing views everywhere.' }
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    tagline: 'Sun, sea & endless nights',
    image: 'assets/images/goa.jpg',
    video: 'assets/videos/goa.mp4',
    vibe: 'Party', climate: 'Warm', budget: 'Medium',
    landscape: 'Beaches', rating: 4.5,
    lat: 15.2993, lng: 74.1240,
    desc: "India's party capital with endless beaches, world-class nightlife, and laid-back Portuguese charm. The ultimate destination for sun, sea, and unforgettable nights.",
    bestTime: 'November – February',
    weather: { temp: '28°C', condition: 'Sunny & Breezy', humidity: '75%', wind: '18 km/h', visibility: '12 km', uv: 'High', icon: 'fa-sun' },
    costEstimates: {
      Low:    { Weekend: '₹4,000–₹7,000',   Short: '₹7,000–₹11,000',   Week: '₹14,000–₹20,000', Long: '₹22,000–₹32,000' },
      Medium: { Weekend: '₹10,000–₹16,000', Short: '₹16,000–₹26,000',  Week: '₹35,000–₹50,000', Long: '₹60,000–₹85,000' },
      Luxury: { Weekend: '₹28,000+',        Short: '₹48,000+',          Week: '₹75,000+',         Long: '₹1,10,000+' }
    },
    budgetBase: { transport: 4000, accomm: 3500, food: 2000, activities: 1500 },
    activities: ['Beach Parties', 'Water Sports', 'Casino Night', 'Sunset Cruises', 'Spice Plantation Tours'],
    reasons: ['Vibrant nightlife scene', 'Warm sunny beaches year-round', 'Great fusion food & culture', 'Best water sports in India'],
    reviews: [
      { name: 'Sneha R.', rating: 5, text: 'Goa never gets old! The nightlife on North Beach is absolutely electric. Loved every minute.' },
      { name: 'Vikram N.', rating: 4, text: 'Perfect mix of relaxation and party. The sunset cruise was magical.' },
      { name: 'Ananya K.', rating: 5, text: 'The food, the vibes, the people — Goa has everything. Already planning my next trip!' }
    ]
  },
  {
    id: 'bali',
    name: 'Bali',
    tagline: 'The Island of the Gods',
    image: 'assets/images/bali.jpg',
    video: 'assets/videos/bali.mp4',
    vibe: 'Relaxation', climate: 'Tropical', budget: 'Medium',
    landscape: 'Nature', rating: 4.9,
    lat: -8.3405, lng: 115.0920,
    desc: 'Lush rice terraces, sacred temples, and luxurious spas make Bali the world\'s ultimate relaxation destination. Every corner here feels like a painting.',
    bestTime: 'April – October',
    weather: { temp: '29°C', condition: 'Warm & Tropical', humidity: '82%', wind: '12 km/h', visibility: '14 km', uv: 'Very High', icon: 'fa-sun' },
    costEstimates: {
      Low:    { Weekend: '₹12,000–₹18,000', Short: '₹20,000–₹30,000',  Week: '₹40,000–₹55,000', Long: '₹65,000–₹85,000' },
      Medium: { Weekend: '₹22,000–₹35,000', Short: '₹38,000–₹55,000',  Week: '₹75,000–₹1,00,000', Long: '₹1,30,000–₹1,80,000' },
      Luxury: { Weekend: '₹60,000+',        Short: '₹1,00,000+',        Week: '₹1,80,000+',       Long: '₹3,00,000+' }
    },
    budgetBase: { transport: 8000, accomm: 6000, food: 3000, activities: 2500 },
    activities: ['Temple Visits', 'Spa & Wellness', 'Rice Terrace Walks', 'Snorkelling', 'Balinese Cooking Class'],
    reasons: ['World-renowned wellness retreats', 'Lush tropical paradise', 'Deeply spiritual atmosphere', 'Stunning natural beauty'],
    reviews: [
      { name: 'Meera P.', rating: 5, text: 'Bali is pure magic. The Ubud rice terraces took my breath away. The spa experiences were world-class.' },
      { name: 'Rohit J.', rating: 5, text: 'Everything about Bali exceeded my expectations. The food, the culture, the temples — incredible!' },
      { name: 'Divya T.', rating: 4, text: 'Perfect for couples. The sunsets at Tanah Lot are something you\'ll never forget.' }
    ]
  },
  {
    id: 'paris',
    name: 'Paris',
    tagline: 'The eternal City of Light',
    image: 'assets/images/paris.jpg',
    video: 'assets/videos/paris.mp4',
    vibe: 'Cultural', climate: 'Moderate', budget: 'Luxury',
    landscape: 'Cities', rating: 4.8,
    lat: 48.8566, lng: 2.3522,
    desc: 'The City of Light needs no introduction. Art, haute cuisine, fashion, and iconic architecture — Paris is an eternal love affair that never ends.',
    bestTime: 'April – June, Sept – Nov',
    weather: { temp: '17°C', condition: 'Mild & Sunny', humidity: '58%', wind: '16 km/h', visibility: '20 km', uv: 'Medium', icon: 'fa-cloud-sun' },
    costEstimates: {
      Low:    { Weekend: '₹45,000–₹60,000',    Short: '₹70,000–₹1,00,000',   Week: '₹1,30,000–₹1,80,000', Long: '₹2,20,000+' },
      Medium: { Weekend: '₹80,000–₹1,20,000',  Short: '₹1,50,000–₹2,50,000', Week: '₹3,00,000–₹4,50,000', Long: '₹5,50,000+' },
      Luxury: { Weekend: '₹2,00,000+',         Short: '₹4,00,000+',           Week: '₹7,00,000+',           Long: '₹12,00,000+' }
    },
    budgetBase: { transport: 35000, accomm: 28000, food: 12000, activities: 8000 },
    activities: ['Louvre Museum', 'Eiffel Tower Visit', 'Seine River Cruise', 'French Cuisine Tour', 'Versailles Day Trip'],
    reasons: ['Unparalleled art and culture', 'Comfortable moderate climate', 'Luxury shopping and dining', 'World-famous landmarks everywhere'],
    reviews: [
      { name: 'Aisha B.', rating: 5, text: 'Paris is a dream come true. The Louvre alone deserves a full day. Croissants for breakfast every day!' },
      { name: 'Sameer L.', rating: 5, text: 'The most romantic city in the world. The evening light on the Eiffel Tower is unforgettable.' },
      { name: 'Nisha V.', rating: 4, text: 'Expensive but worth every penny. The architecture and food scene are unmatched.' }
    ]
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    tagline: 'Ancient Japan, timeless beauty',
    image: 'assets/images/kyoto.jpg',
    video: 'assets/videos/kyoto.mp4',
    vibe: 'Cultural', climate: 'Moderate', budget: 'Medium',
    landscape: 'Nature', rating: 4.8,
    lat: 35.0116, lng: 135.7681,
    desc: "Japan's ancient capital, where geisha traditions, thousand-year-old temples, and breathtaking bamboo groves create an otherworldly, deeply serene experience.",
    bestTime: 'March – May, Oct – Nov',
    weather: { temp: '19°C', condition: 'Comfortable & Clear', humidity: '62%', wind: '10 km/h', visibility: '18 km', uv: 'Medium', icon: 'fa-cloud-sun' },
    costEstimates: {
      Low:    { Weekend: '₹30,000–₹45,000', Short: '₹50,000–₹75,000',   Week: '₹90,000–₹1,20,000', Long: '₹1,50,000+' },
      Medium: { Weekend: '₹55,000–₹80,000', Short: '₹90,000–₹1,40,000', Week: '₹1,80,000–₹2,50,000', Long: '₹3,20,000+' },
      Luxury: { Weekend: '₹1,50,000+',      Short: '₹2,80,000+',         Week: '₹4,50,000+',          Long: '₹7,00,000+' }
    },
    budgetBase: { transport: 22000, accomm: 18000, food: 8000, activities: 5000 },
    activities: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Tea Ceremony', 'Geisha District Walk', 'Nishiki Market'],
    reasons: ['Rich cultural immersion', 'Comfortable temperate climate', 'Exceptional food culture', 'Serene temples and zen gardens'],
    reviews: [
      { name: 'Tanvi R.', rating: 5, text: 'Kyoto is absolutely magical during cherry blossom season. The bamboo grove is surreal.' },
      { name: 'Dev S.', rating: 5, text: 'The tea ceremony experience was one of the most unique things I\'ve ever done. Highly recommend!' },
      { name: 'Laleh M.', rating: 4, text: 'Incredibly peaceful and culturally rich. Every temple has its own unique story.' }
    ]
  },
  {
    id: 'santorini',
    name: 'Santorini',
    tagline: 'Mediterranean sunsets & soul',
    image: 'assets/images/santorini.jpg',
    video: 'assets/videos/santorini.mp4',
    vibe: 'Relaxation', climate: 'Warm', budget: 'Luxury',
    landscape: 'Beaches', rating: 4.9,
    lat: 36.3932, lng: 25.4615,
    desc: 'Iconic blue-domed churches, volcanic black-sand beaches, and the most spectacular sunsets on Earth. Santorini is pure Mediterranean luxury and romance.',
    bestTime: 'May – October',
    weather: { temp: '24°C', condition: 'Sunny & Warm', humidity: '55%', wind: '22 km/h', visibility: '30 km', uv: 'High', icon: 'fa-sun' },
    costEstimates: {
      Low:    { Weekend: '₹60,000–₹80,000',     Short: '₹90,000–₹1,30,000',   Week: '₹1,60,000–₹2,20,000', Long: '₹2,80,000+' },
      Medium: { Weekend: '₹1,00,000–₹1,50,000', Short: '₹1,80,000–₹2,80,000', Week: '₹3,50,000–₹5,00,000', Long: '₹6,50,000+' },
      Luxury: { Weekend: '₹2,50,000+',           Short: '₹4,50,000+',           Week: '₹8,00,000+',           Long: '₹14,00,000+' }
    },
    budgetBase: { transport: 45000, accomm: 38000, food: 15000, activities: 10000 },
    activities: ['Caldera Sunset Cruise', 'Wine Tasting', 'Black Sand Beaches', 'Village Hiking', 'Cave House Stay'],
    reasons: ['Most romantic destination on Earth', 'Warm Mediterranean sunshine', 'Breathtaking views at every turn', 'Exceptional luxury hospitality'],
    reviews: [
      { name: 'Riya K.', rating: 5, text: 'The Oia sunset is something you have to see to believe. Every photo looked like a postcard.' },
      { name: 'Akash M.', rating: 5, text: 'Perfect honeymoon destination. The cave houses are stunning and the wine is incredible.' },
      { name: 'Fatima H.', rating: 5, text: 'Santorini is pure paradise. Worth every rupee. The caldera view from our hotel was unreal.' }
    ]
  }
];

/* ══════════════════════════════════════
   SOUND SYSTEM
══════════════════════════════════════ */
let soundEnabled = localStorage.getItem('fw_sound') !== 'off';
const sounds = {
  click:   document.getElementById('sndClick'),
  success: document.getElementById('sndSuccess'),
  whoosh:  document.getElementById('sndWhoosh'),
  pop:     document.getElementById('sndPop'),
  error:   document.getElementById('sndError'),
  ambient: document.getElementById('sndAmbient')
};

function playSound(name, volume = 0.4) {
  if (!soundEnabled) return;
  const snd = sounds[name];
  if (!snd) return;
  try {
    snd.volume = volume;
    snd.currentTime = 0;
    snd.play().catch(() => {});
  } catch(e) {}
}

const soundControl = document.getElementById('soundControl');
const soundIcon    = document.getElementById('soundIcon');

function updateSoundUI() {
  if (soundEnabled) {
    soundIcon.className = 'fas fa-volume-up';
    soundControl.classList.remove('muted');
    sounds.ambient && sounds.ambient.play().catch(() => {});
  } else {
    soundIcon.className = 'fas fa-volume-mute';
    soundControl.classList.add('muted');
    sounds.ambient && sounds.ambient.pause();
  }
}

soundControl.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  localStorage.setItem('fw_sound', soundEnabled ? 'on' : 'off');
  updateSoundUI();
  if (soundEnabled) playSound('pop', 0.3);
});
updateSoundUI();

/* ══════════════════════════════════════
   LOADER
══════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    playSound('whoosh', 0.25);
    initScrollReveal();
    initStatCounters();
  }, 2600);
});

/* ══════════════════════════════════════
   DARK MODE
══════════════════════════════════════ */
const darkToggle = document.getElementById('darkToggle');
const darkIcon   = document.getElementById('darkIcon');
let isDark = localStorage.getItem('fw_theme') === 'dark';

function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  darkIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}
applyTheme();

darkToggle.addEventListener('click', () => {
  isDark = !isDark;
  localStorage.setItem('fw_theme', isDark ? 'dark' : 'light');
  applyTheme();
  playSound('click', 0.3);
});

/* ══════════════════════════════════════
   NAVBAR
══════════════════════════════════════ */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  playSound('click', 0.2);
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => { navLinks.classList.remove('open'); });
});

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.stat-item, .dest-card, .review-card, .trip-card, .weather-widget, .budget-planner, .reviews-section'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════
   ANIMATED STAT COUNTERS
══════════════════════════════════════ */
function initStatCounters() {
  const statEls = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const dur    = 2000;
        const step   = target / (dur / 16);
        let current  = 0;
        const timer  = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current).toLocaleString('en-IN');
        }, 16);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════
   QUIZ STATE
══════════════════════════════════════ */
let currentStep = 1;
const totalSteps = 7;
let answers = { vibe: null, budget: null, climate: null, duration: null, landscape: null, travelStyle: null, activity: null };
let currentResult = null;

const progressBar = document.getElementById('progressBar');
const stepLabel   = document.getElementById('stepLabel');
const prevBtn     = document.getElementById('prevBtn');
const nextBtn     = document.getElementById('nextBtn');
const submitBtn   = document.getElementById('submitBtn');
const quizSteps   = document.querySelectorAll('.quiz-step');
const resultSection = document.getElementById('result');

/* Option card clicks */
document.querySelectorAll('.option-card').forEach(card => {
  card.addEventListener('click', () => {
    const name = card.querySelector('input').name;
    document.querySelectorAll(`input[name="${name}"]`).forEach(inp => {
      inp.closest('.option-card').classList.remove('selected');
    });
    card.classList.add('selected');
    card.querySelector('input').checked = true;
    answers[name] = card.querySelector('input').value;
    playSound('click', 0.35);
  });
});

function updateQuiz() {
  quizSteps.forEach(s => s.classList.remove('active'));
  document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
  const pct = (currentStep / totalSteps) * 100;
  progressBar.style.width = pct + '%';
  stepLabel.textContent = `Step ${currentStep} of ${totalSteps}`;
  prevBtn.style.display   = currentStep > 1 ? 'inline-flex' : 'none';
  nextBtn.style.display   = currentStep < totalSteps ? 'inline-flex' : 'none';
  submitBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
}

function stepHasAnswer() {
  const names = ['vibe','budget','climate','duration','landscape','travelStyle','activity'];
  return !!document.querySelector(`input[name="${names[currentStep-1]}"]:checked`);
}

prevBtn.addEventListener('click', () => {
  if (currentStep > 1) { currentStep--; updateQuiz(); playSound('whoosh', 0.2); }
});
nextBtn.addEventListener('click', () => {
  if (!stepHasAnswer()) { showToast('Please pick an option to continue!', 'error'); playSound('error', 0.3); return; }
  if (currentStep < totalSteps) { currentStep++; updateQuiz(); playSound('whoosh', 0.25); }
});
submitBtn.addEventListener('click', () => {
  if (!stepHasAnswer()) { showToast('Please pick an option to continue!', 'error'); playSound('error', 0.3); return; }
  generateResult();
});

/* ══════════════════════════════════════
   RECOMMENDATION ENGINE
══════════════════════════════════════ */
function scoreDestination(dest) {
  let score = 0;
  if (dest.vibe      === answers.vibe)        score += 4;
  if (dest.budget    === answers.budget)       score += 3;
  if (dest.climate   === answers.climate)      score += 2;
  if (dest.landscape === answers.landscape)    score += 2;
  // vibe/activity soft match
  if (answers.activity === 'Sports'    && dest.vibe === 'Adventure')   score += 2;
  if (answers.activity === 'Nightlife' && dest.vibe === 'Party')       score += 2;
  if (answers.activity === 'Culture'   && dest.vibe === 'Cultural')    score += 2;
  if (answers.activity === 'Food'      && (dest.vibe === 'Cultural' || dest.vibe === 'Relaxation')) score += 1;
  return score;
}

function getBestMatch() {
  return destinations.reduce((best, d) => {
    return scoreDestination(d) > scoreDestination(best) ? d : best;
  }, destinations[0]);
}

function getCostEstimate(dest, budgetOverride) {
  const budget   = budgetOverride || answers.budget || 'Medium';
  const duration = answers.duration || 'Short';
  const row = dest.costEstimates[budget];
  return (row && row[duration]) ? row[duration] : (row && row['Short']) || '—';
}

function generateResult(forcedDest = null) {
  const dest = forcedDest || getBestMatch();
  if (!dest) return;
  currentResult = dest;

  // Basic fields
  document.getElementById('resultImg').src          = dest.image;
  document.getElementById('resultImg').alt          = dest.name;
  document.getElementById('resultName').textContent = dest.name;
  document.getElementById('resultDesc').textContent = dest.desc;
  document.getElementById('resultVibe').textContent = dest.vibe;
  document.getElementById('resultRatingBadge').textContent = `⭐ ${dest.rating}`;
  document.getElementById('resultBestTime').textContent    = dest.bestTime;
  document.getElementById('resultCost').textContent        = getCostEstimate(dest);
  document.getElementById('resultTemp').textContent        = dest.weather.temp;

  // Why reasons
  document.getElementById('resultReasons').innerHTML =
    dest.reasons.map(r => `<li>${r}</li>`).join('');

  // Activities
  document.getElementById('resultActivities').innerHTML =
    dest.activities.map(a => `<span class="activity-tag">${a}</span>`).join('');

  // Video
  const vsrc = document.getElementById('resultVideoSrc');
  vsrc.src = dest.video;
  document.getElementById('resultVideo').load();

  // Weather
  renderWeather(dest);

  // Budget sliders — seed from dest base values
  document.getElementById('sliderTransport').value  = dest.budgetBase.transport;
  document.getElementById('sliderAccomm').value     = dest.budgetBase.accomm;
  document.getElementById('sliderFood').value       = dest.budgetBase.food;
  document.getElementById('sliderActivities').value = dest.budgetBase.activities;
  updateBudget();

  // Reviews
  renderReviews(dest.reviews);

  // Show section
  resultSection.style.display = 'block';
  setTimeout(() => resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  playSound('success', 0.5);
  showToast(`✈️ Perfect match: ${dest.name}!`, 'success');

  // Re-trigger scroll reveal for new elements
  setTimeout(initScrollReveal, 200);
}

/* ══════════════════════════════════════
   WEATHER
══════════════════════════════════════ */
function renderWeather(dest) {
  const w = dest.weather;
  document.getElementById('weatherCity').textContent     = `Weather in ${dest.name}`;
  document.getElementById('weatherCondition').textContent = w.condition;
  document.getElementById('weatherTemp').textContent     = w.temp;
  document.getElementById('weatherHumidity').textContent = w.humidity;
  document.getElementById('weatherWind').textContent     = w.wind;
  document.getElementById('weatherVis').textContent      = w.visibility;
  document.getElementById('weatherUV').textContent       = w.uv;
  document.getElementById('weatherSeason').textContent   = dest.bestTime;
  const wi = document.getElementById('weatherIcon');
  wi.className = `fas ${w.icon} weather-main-icon`;
}

/* ══════════════════════════════════════
   BUDGET PLANNER
══════════════════════════════════════ */
const donutColors = ['#0d9488','#d4a843','#ef4444','#8b5cf6'];
const donutLabels = ['Transport','Accommodation','Food','Activities'];

function formatINR(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

function updateBudget() {
  const t  = parseInt(document.getElementById('sliderTransport').value);
  const a  = parseInt(document.getElementById('sliderAccomm').value);
  const f  = parseInt(document.getElementById('sliderFood').value);
  const ac = parseInt(document.getElementById('sliderActivities').value);
  const total = t + a + f + ac;

  document.getElementById('valTransport').textContent  = formatINR(t);
  document.getElementById('valAccomm').textContent     = formatINR(a);
  document.getElementById('valFood').textContent       = formatINR(f);
  document.getElementById('valActivities').textContent = formatINR(ac);
  document.getElementById('budgetTotal').textContent   = formatINR(total);

  // Per-day estimate
  const days = { Weekend: 2, Short: 4, Week: 7, Long: 14 };
  const d = days[answers.duration] || 4;
  document.getElementById('budgetPerDay').textContent = `~${formatINR(total/d)} per day`;

  // Donut label items
  const vals = [t, a, f, ac];
  document.getElementById('budgetDonutLabels').innerHTML = donutLabels.map((lbl,i) => `
    <div class="donut-label-item">
      <span class="donut-dot" style="background:${donutColors[i]}"></span>
      <span>${lbl}</span>
      <span style="margin-left:auto;font-weight:700">${formatINR(vals[i])}</span>
    </div>
  `).join('');
}

['sliderTransport','sliderAccomm','sliderFood','sliderActivities'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    updateBudget();
    playSound('click', 0.1);
  });
});

/* ══════════════════════════════════════
   REVIEWS
══════════════════════════════════════ */
function renderReviews(reviews) {
  const grid = document.getElementById('reviewsGrid');
  grid.innerHTML = reviews.map(r => {
    const stars = '★'.repeat(Math.floor(r.rating)) + (r.rating % 1 ? '½' : '') + '☆'.repeat(5 - Math.ceil(r.rating));
    const initials = r.name.split(' ').map(w => w[0]).join('');
    return `
      <div class="review-card reveal">
        <div class="review-stars">${stars}</div>
        <p class="review-text">"${r.text}"</p>
        <div class="review-author">
          <div class="review-avatar">${initials}</div>
          <div>
            <div class="review-name">${r.name}</div>
            <div class="review-trip">${currentResult ? currentResult.name : ''} Traveler</div>
          </div>
        </div>
      </div>`;
  }).join('');
}

/* ══════════════════════════════════════
   RETAKE / SURPRISE
══════════════════════════════════════ */
document.getElementById('retakeBtn').addEventListener('click', () => {
  answers = { vibe:null, budget:null, climate:null, duration:null, landscape:null, travelStyle:null, activity:null };
  currentStep = 1;
  document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('input[type=radio]').forEach(r => r.checked = false);
  resultSection.style.display = 'none';
  updateQuiz();
  playSound('whoosh', 0.3);
  document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
});

function surpriseMe() {
  const rand = destinations[Math.floor(Math.random() * destinations.length)];
  answers = { vibe: rand.vibe, budget: rand.budget, climate: rand.climate, duration: 'Short', landscape: rand.landscape, travelStyle: 'Solo', activity: 'Culture' };
  playSound('whoosh', 0.35);
  generateResult(rand);
}
document.getElementById('surpriseMeHero').addEventListener('click', surpriseMe);

/* ══════════════════════════════════════
   SAVE TRIPS
══════════════════════════════════════ */
document.getElementById('saveTripBtn').addEventListener('click', () => {
  if (!currentResult) return;
  const saved = getSavedTrips();
  if (saved.find(t => t.id === currentResult.id)) {
    showToast('Trip already in your wishlist!', 'info');
    playSound('error', 0.2);
    return;
  }
  saved.push({
    id:       currentResult.id,
    name:     currentResult.name,
    vibe:     currentResult.vibe,
    cost:     getCostEstimate(currentResult),
    bestTime: currentResult.bestTime,
    rating:   currentResult.rating,
    savedAt:  new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
  });
  localStorage.setItem('fw_trips', JSON.stringify(saved));
  showToast('✅ Trip saved to My Trips!', 'success');
  playSound('success', 0.45);
  renderMyTrips();
});

function getSavedTrips() {
  try { return JSON.parse(localStorage.getItem('fw_trips')) || []; }
  catch { return []; }
}

function removeTrip(id) {
  const saved = getSavedTrips().filter(t => t.id !== id);
  localStorage.setItem('fw_trips', JSON.stringify(saved));
  playSound('pop', 0.3);
  renderMyTrips();
  showToast('Trip removed.', 'info');
}
window.removeTrip = removeTrip; // expose for inline onclick

function renderMyTrips() {
  const grid  = document.getElementById('myTripsGrid');
  const empty = document.getElementById('emptyTrips');
  const trips = getSavedTrips();
  if (trips.length === 0) {
    grid.innerHTML = '';
    grid.appendChild(empty);
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  grid.innerHTML = trips.map(t => `
    <div class="trip-card reveal">
      <div class="trip-card-header">
        <h3>${t.name}</h3>
        <button class="trip-remove" onclick="removeTrip('${t.id}')" title="Remove"><i class="fas fa-times"></i></button>
      </div>
      <div class="trip-detail"><i class="fas fa-rupee-sign"></i> ${t.cost}</div>
      <div class="trip-detail"><i class="fas fa-clock"></i> ${t.bestTime}</div>
      <div class="trip-detail"><i class="fas fa-star"></i> ${t.rating} Rating</div>
      <div class="trip-date">Saved on ${t.savedAt}</div>
      <span class="trip-vibe-tag">${t.vibe}</span>
    </div>`).join('');
}

/* ══════════════════════════════════════
   POPULAR DESTINATIONS GRID
══════════════════════════════════════ */
function renderPopular() {
  const grid = document.getElementById('destinationsGrid');
  grid.innerHTML = destinations.map(d => `
    <div class="dest-card" onclick="quickView('${d.id}')">
      <div class="dest-img-wrap">
        <img src="${d.image}" alt="${d.name}" loading="lazy"/>
        <span class="dest-vibe">${d.vibe}</span>
        <span class="dest-rating">⭐ ${d.rating}</span>
      </div>
      <div class="dest-body">
        <h3>${d.name}</h3>
        <p class="dest-tagline">${d.tagline}</p>
        <p>${d.desc.substring(0,100)}…</p>
      </div>
    </div>`).join('');
}

function quickView(id) {
  const dest = destinations.find(d => d.id === id);
  if (!dest) return;
  answers.budget   = answers.budget   || dest.budget;
  answers.duration = answers.duration || 'Short';
  playSound('click', 0.3);
  generateResult(dest);
}
window.quickView = quickView;

/* ══════════════════════════════════════
   INTERACTIVE MAP (Leaflet)
══════════════════════════════════════ */
let map = null;
let allMarkers = [];

function initMap() {
  if (map) return;
  map = L.map('destMap', { zoomControl: true, scrollWheelZoom: false }).setView([20, 50], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors', maxZoom: 18
  }).addTo(map);

  destinations.forEach(dest => {
    const markerIcon = L.divIcon({
      className: '',
      html: `<div style="
        background: #d4a843; color:#0e0e12; border-radius:50%;
        width:34px; height:34px; display:flex; align-items:center; justify-content:center;
        font-size:0.7rem; font-weight:700; box-shadow:0 4px 12px rgba(212,168,67,0.5);
        border:2px solid #fff; cursor:pointer; white-space:nowrap;
      ">${dest.name.substring(0,3).toUpperCase()}</div>`,
      iconSize: [34, 34], iconAnchor: [17, 17]
    });

    const marker = L.marker([dest.lat, dest.lng], { icon: markerIcon })
      .addTo(map)
      .bindPopup(`
        <div class="map-popup" style="min-width:180px">
          <h4>${dest.name}</h4>
          <p>${dest.tagline}</p>
          <p>⭐ ${dest.rating} &nbsp;|&nbsp; 🌡 ${dest.weather.temp}</p>
          <span class="popup-vibe">${dest.vibe}</span>
        </div>`, { maxWidth: 240 });

    marker.on('click', () => playSound('pop', 0.3));
    allMarkers.push({ dest, marker });
  });
}

// Map filter buttons
function renderMapFilters() {
  const vibes = ['All', ...new Set(destinations.map(d => d.vibe))];
  const bar = document.getElementById('mapFilterBar');
  bar.innerHTML = vibes.map(v => `
    <button class="map-filter-btn ${v==='All'?'active':''}" data-vibe="${v}">${v}</button>
  `).join('');

  bar.querySelectorAll('.map-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.map-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const vibe = btn.dataset.vibe;
      playSound('click', 0.2);
      allMarkers.forEach(({dest, marker}) => {
        if (vibe === 'All' || dest.vibe === vibe) marker.addTo(map);
        else map.removeLayer(marker);
      });
    });
  });
}

// Init map when section scrolls into view
const mapObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initMap();
      mapObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
mapObserver.observe(document.getElementById('map-section'));

/* ══════════════════════════════════════
   TOAST
══════════════════════════════════════ */
const toast = document.getElementById('toast');
let toastTimer = null;
function showToast(msg, type = 'info') {
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 3400);
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
updateQuiz();
renderPopular();
renderMyTrips();
renderMapFilters();
updateBudget();
