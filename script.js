/* =========================================
   CookerCool Website - JavaScript
   ========================================= */

// ----- Language Data -----
const i18n = {
    en: {
        hero_badge: "Premium Cookware Manufacturer",
        hero_title: "From Our Kitchen<br>to Yours",
        hero_subtitle: "Professional manufacturer of cast iron and enamel cookware. OEM & ODM partner for global brands. One-stop light customization with fast delivery.",
        stat_years: "17+", stat_countries: "40+", stat_clients: "500+",
    },
    zh: {
        hero_badge: "专业厨具制造商",
        hero_title: "用心铸造<br>品质厨房",
        hero_subtitle: "专业生产铸铁锅、珐琅锅等厨具。为全球品牌提供OEM/ODM贴牌服务。一站式轻定制，快速交付。",
        stat_years: "17+", stat_countries: "40+", stat_clients: "500+",
    }
};

// Featured products (sample - corresponds to actual SK series)
const featuredProducts = [
    { title_en: "Cast Iron Stock Pot", title_zh: "铸铁汤锅", title: "汤锅", sku: "SK-EC1-26", size: "26cm", emoji: "🍲", tag: "Best Seller", cat: "cast-iron" },
    { title_en: "Cast Iron Dutch Oven", title_zh: "铸铁荷兰锅", title: "荷兰锅", sku: "SK-ED1-26", size: "26cm", emoji: "🫕", tag: "Popular", cat: "cast-iron" },
    { title_en: "Cast Iron Frying Pan", title_zh: "铸铁煎锅", title: "煎锅", sku: "SK-EP3-26", size: "26cm", emoji: "🍳", tag: "", cat: "cast-iron" },
    { title_en: "Cast Iron Grill Pan", title_zh: "铸铁牛排煎", title: "牛排煎", sku: "SK-EG1-28", size: "28cm", emoji: "🥩", tag: "", cat: "cast-iron" },
    { title_en: "Cast Iron Wok", title_zh: "铸铁炒锅", title: "炒锅", sku: "SK-EW1-36", size: "36cm", emoji: "🍜", tag: "", cat: "cast-iron" },
    { title_en: "Cast Iron Milk Pot", title_zh: "铸铁奶锅", title: "奶锅", sku: "SK-EM1-19", size: "19cm", emoji: "🥄", tag: "", cat: "cast-iron" },
    { title_en: "Enamel 3-Piece Set", title_zh: "珐琅3件套", title: "珐琅套装", sku: "EZ3-3", size: "3-Piece", emoji: "🩷", tag: "Best Seller", cat: "enamel-sets" },
    { title_en: "Enamel Dutch Oven Set", title_zh: "珐琅荷兰锅套装", title: "珐琅套装", sku: "EZ12-4", size: "4-Piece", emoji: "🩷", tag: "Popular", cat: "enamel-sets" },
];

// ----- Language Switch -----
let currentLang = localStorage.getItem('cc-lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('cc-lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.getElementById('lang-label').textContent = lang === 'en' ? '中文 / EN' : 'EN / 中文';

    // Update text
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang] && i18n[lang][key] !== undefined) {
            el.innerHTML = i18n[lang][key];
        }
    });

    // Update stat values
    const stats = ['stat_years', 'stat_countries', 'stat_clients'];
    stats.forEach(k => {
        const el = document.querySelector(`[data-i18n="${k}"]`);
        if (el) el.textContent = i18n[lang][k];
    });

    renderFeaturedProducts();
}

document.getElementById('lang-switch').addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'zh' : 'en');
});

// Initial render
setLanguage(currentLang);

// ----- Featured Products -----
function renderFeaturedProducts() {
    const grid = document.getElementById('featured-products');
    if (!grid) return;

    grid.innerHTML = featuredProducts.map(p => {
        const title = currentLang === 'zh' ? p.title_zh : p.title_en;
        const catLink = `products/${p.cat}.html`;
        const tagHtml = p.tag ? `<span class="product-tag">${p.tag}</span>` : '';
        const sizeLabel = currentLang === 'zh' ? '尺寸' : 'Size';
        return `
            <div class="product-card">
                <div class="product-img">
                    <span class="emoji">${p.emoji}</span>
                    ${tagHtml}
                </div>
                <div class="product-body">
                    <h3 class="product-title">${title}</h3>
                    <p class="product-title-zh">${p.title_en} · ${p.sku}</p>
                    <p class="product-size">${sizeLabel}: ${p.size}</p>
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
        btn.textContent = currentLang === 'zh' ? '发送中...' : 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = currentLang === 'zh' ? '已发送 ✓' : 'Sent ✓';
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
