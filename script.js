/* =========================================
   CookerCool Website - JavaScript
   ========================================= */

// Featured products
const featuredProducts = [
    { title_en: "Classic Fry Pan", sku: "Pre-seasoned", size: "26cm", tag: "Best Seller", cat: "pre-seasoned-skillet", image: "Classic fry pan(26cm).jpg" },
    { title_en: "3pcs Fry Pan Set", sku: "Pre-seasoned", size: "Customizable", tag: "Best Seller", cat: "pre-seasoned-skillet", image: "3pcs Fry Pan Set.jpg" },
    { title_en: "Dutch Oven", sku: "Pre-seasoned", size: "Customizable", tag: "Popular", cat: "helan", image: "Dutch Oven.jpg" },
    { title_en: "Camping Set", sku: "Pre-seasoned", size: "Customizable", tag: "", cat: "camping", image: "Camping Set (1).jpg" },
    { title_en: "Red Casserole", sku: "Enamel", size: "24cm", tag: "Popular", cat: "enamel-casseroles", image: "Red casserole (24cm).jpg" },
    { title_en: "Blue Fry Pan", sku: "Enamel", size: "26cm", tag: "Best Seller", cat: "enamel-skillet", image: "Bule fry pan (26cm).jpg" },
    { title_en: "Red Wok", sku: "Enamel", size: "36cm", tag: "", cat: "enamel-skillet", image: "Red wok (36cm).jpg" },
    { title_en: "5pcs Red Set", sku: "Enamel", size: "Customizable", tag: "", cat: "enamel-sets", image: "5pcs red set.jpg" },
];

// ----- Featured Products -----
function renderFeaturedProducts() {
    const grid = document.getElementById('featured-products');
    if (!grid) return;

    grid.innerHTML = featuredProducts.map(p => {
        const tagHtml = p.tag ? `<span class="product-tag">${p.tag}</span>` : '';
        const imgHtml = p.image
            ? `<img src="images/${p.image}" alt="${p.title_en}" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">`
            : '';
        return `
            <div class="product-card">
                <div class="product-img">
                    ${imgHtml}
                    <span class="emoji" ${imgHtml ? 'style="display:none;"' : ''}>&#9632;</span>
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
renderFeaturedProducts();
