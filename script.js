/* =========================================
   CookerCool Website - JavaScript
   ========================================= */

// Featured products
const featuredProducts = [
    { title_en: "Cast Iron Stock Pot", sku: "SK-EC1-26", size: "26cm", tag: "Best Seller", cat: "cast-iron" },
    { title_en: "Cast Iron Dutch Oven", sku: "SK-ED1-26", size: "26cm", tag: "Popular", cat: "cast-iron" },
    { title_en: "Cast Iron Frying Pan", sku: "SK-EP3-26", size: "26cm", tag: "", cat: "cast-iron" },
    { title_en: "Cast Iron Grill Pan", sku: "SK-EG1-28", size: "28cm", tag: "", cat: "cast-iron" },
    { title_en: "Cast Iron Wok", sku: "SK-EW1-36", size: "36cm", tag: "", cat: "cast-iron" },
    { title_en: "Cast Iron Milk Pot", sku: "SK-EM1-19", size: "19cm", tag: "", cat: "cast-iron" },
    { title_en: "Enamel 3-Piece Set", sku: "EZ3-3", size: "3-Piece", tag: "Best Seller", cat: "enamel-sets" },
    { title_en: "Enamel Dutch Oven Set", sku: "EZ12-4", size: "4-Piece", tag: "Popular", cat: "enamel-sets" },
];

// ----- Featured Products -----
function renderFeaturedProducts() {
    const grid = document.getElementById('featured-products');
    if (!grid) return;

    grid.innerHTML = featuredProducts.map(p => {
        const tagHtml = p.tag ? `<span class="product-tag">${p.tag}</span>` : '';
        return `
            <div class="product-card">
                <div class="product-img">
                    <span class="emoji">${p.cat === 'enamel-sets' ? '🩷' : '🍲'}</span>
                    ${tagHtml}
                </div>
                <div class="product-body">
                    <h3 class="product-title">${p.title_en}</h3>
                    <p class="product-title-zh">${p.sku}</p>
                    <p class="product-size">Size: ${p.size}</p>
                </div>
            </div>
        `;
    }).join('');
}

// ----- Header Scroll -----
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ----- Mobile Menu -----
const mobileBtn = document.getElementById('mobile-menu-btn');
const navList = document.getElementById('nav-list');
mobileBtn.addEventListener('click', () => {
    navList.classList.toggle('open');
});

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
            btn.textContent = 'Sent ✓';
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
renderFeaturedProducts();
