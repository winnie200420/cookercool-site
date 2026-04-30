/* =========================================
   CookerCool Website - JavaScript
   ========================================= */

// ----- Carousel -----
function initCarousel() {
    const track = document.getElementById('carousel-track');
    const indicators = document.getElementById('carousel-indicators');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    if (!track || !indicators) return;

    const slides = track.querySelectorAll('.carousel-slide');
    let current = 0;
    let timer = null;

    // Build indicators
    Array.from(slides).forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
        btn.addEventListener('click', () => goTo(i));
        indicators.appendChild(btn);
    });

    function goTo(index) {
        slides[current].classList.remove('active');
        indicators.children[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        indicators.children[current].classList.add('active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startTimer() {
        timer = setInterval(next, 5000);
    }
    function stopTimer() {
        clearInterval(timer);
    }

    prevBtn && prevBtn.addEventListener('click', () => { stopTimer(); prev(); startTimer(); });
    nextBtn && nextBtn.addEventListener('click', () => { stopTimer(); next(); startTimer(); });

    track.addEventListener('mouseenter', stopTimer);
    track.addEventListener('mouseleave', startTimer);

    startTimer();
}

// ----- Header Scroll -----
const header = document.getElementById('site-header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ----- Mobile Menu -----
const mobileBtn = document.getElementById('mobile-menu-btn');
const navList = document.getElementById('nav-list');
if (mobileBtn && navList) {
    mobileBtn.addEventListener('click', () => {
        navList.classList.toggle('open');
    });
}

// ----- Fixed CTA -----
const fixedCta = document.getElementById('fixed-cta');
if (fixedCta) {
    window.addEventListener('scroll', () => {
        fixedCta.style.display = window.scrollY > 600 ? 'block' : 'none';
    });
}

// ----- Form Submission -----
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = 'Sent';
            btn.style.background = '#27ae60';
            form.reset();
            setTimeout(() => {
                btn.textContent = orig;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// ----- Smooth Scroll -----
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});
