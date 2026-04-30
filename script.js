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
    let current = Array.from(slides).findIndex(s => s.classList.contains('active'));
    if (current < 0) current = 0;
    let timer = null;

    // Build indicators
    Array.from(slides).forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
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

    function startTimer() { timer = setInterval(next, 5000); }
    function stopTimer() { clearInterval(timer); }

    prevBtn && prevBtn.addEventListener('click', () => { stopTimer(); prev(); startTimer(); });
    nextBtn && nextBtn.addEventListener('click', () => { stopTimer(); next(); startTimer(); });

    track.addEventListener('mouseenter', stopTimer);
    track.addEventListener('mouseleave', startTimer);

    startTimer();
}

// ----- Featured Products -----
const featuredProducts = [
    { title_en: "Cast Iron Enamel Set", title_zh: "5件套珐琅锅", sku: "Enamel Cast Iron", size: "Customizable", tag: "Best Seller", cat: "enamel-sets", image: "products/product-enamel-set-red-5pcs.jpeg" },
    { title_en: "Granite Cookware Set", title_zh: "6件套石纹不粘锅", sku: "Ceramic Nonstick", size: "Customizable", tag: "Popular", cat: "other-cookwares", image: "products/product-granite-set-6pcs.jpeg" },
    { title_en: "Cast Iron Skillet Set", title_zh: "3件套铸铁煎锅", sku: "Pre-seasoned Cast Iron", size: "26cm", tag: "Best Seller", cat: "pre-seasoned-skillet", image: "products/product-cast-iron-skillet-3pcs.jpeg" },
    { title_en: "Enamel Dutch Oven Set", title_zh: "6件套珐琅荷兰锅", sku: "Enamel Cast Iron", size: "Customizable", tag: "Popular", cat: "enamel-sets", image: "products/product-red-enamel-set-6pcs.jpeg" },
    { title_en: "Aluminum Cookware Set", title_zh: "10件铝合金套装", sku: "Die-Cast Aluminum", size: "Customizable", tag: "", cat: "other-cookwares", image: "products/product-aluminum-set-black-10pcs.jpeg" },
    { title_en: "Teal Enamel Set", title_zh: "5件套青绿珐琅锅", sku: "Enamel Cast Iron", size: "Customizable", tag: "", cat: "enamel-sets", image: "products/product-teal-enamel-set-5pcs.jpeg" },
    { title_en: "Gray Enamel Set", title_zh: "7件套灰色珐琅锅", sku: "Enamel Cast Iron", size: "Customizable", tag: "", cat: "enamel-sets", image: "products/product-gray-enamel-set-7pcs.jpeg" },
    { title_en: "Olive Green Cookware Set", title_zh: "橄榄绿铝合金套装", sku: "Die-Cast Aluminum", size: "Customizable", tag: "", cat: "other-cookwares", image: "products/product-aluminum-olive-set.jpeg" },
];

function renderFeaturedProducts() {
    const grid = document.getElementById('featured-products');
    if (!grid) return;

    grid.innerHTML = featuredProducts.map(p => {
        const tagHtml = p.tag ? '<span class="product-tag">' + p.tag + '</span>' : '';
        const imgSrc = 'images/' + p.image;
        const imgHtml = '<img src="' + imgSrc + '" alt="' + p.title_en + '" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'inline\';">';
        return '<div class="product-card">' +
            '<div class="product-img">' + imgHtml +
            '<span class="emoji" style="display:none;">&#9632;</span>' + tagHtml + '</div>' +
            '<div class="product-body">' +
            '<h3 class="product-title">' + p.title_en + '</h3>' +
            '<p class="product-title-zh">' + p.title_zh + '</p>' +
            '<p class="product-size">Size: ' + p.size + '</p></div></div>';
    }).join('');
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
    renderFeaturedProducts();
});

function playSliceVideo(id) {
    var v = document.getElementById(id);
    var wrap = v.closest('.slice-video-wrap');
    var img = wrap.querySelector('.slice-full-img');
    var btn = wrap.querySelector('.slice-play-btn');
    if (img) img.style.display = 'none';
    if (btn) btn.style.display = 'none';
    v.style.display = 'block';
    v.play();
}