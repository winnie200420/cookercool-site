/* =========================================
   CookerCool Website - JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ----- Language System -----
    const langSwitch = document.getElementById('lang-switch');
    let currentLang = localStorage.getItem('cc-lang') || 'en';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('cc-lang', lang);
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        document.getElementById('lang-label').textContent = lang === 'en' ? '中文 / EN' : 'EN / 中文';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[lang][key] !== undefined) {
                el.innerHTML = i18n[lang][key];
            }
        });

        renderProducts();
        renderWhyUs();
        renderFooterProducts();
        updateCompanyInfo();
    }

    langSwitch.addEventListener('click', () => {
        setLanguage(currentLang === 'en' ? 'zh' : 'en');
    });

    setLanguage(currentLang);


    // ----- Products Rendering -----
    function renderProducts() {
        const grid = document.getElementById('products-grid');
        if (!grid) return;

        grid.innerHTML = products.map(p => `
            <div class="product-card reveal">
                <div class="product-img">
                    <div class="img-placeholder-inner">
                        <span>🍳</span>
                        <small>${p.image ? '' : 'Product Image'}</small>
                    </div>
                    ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
                </div>
                <div class="product-body">
                    <h3 class="product-title">${currentLang === 'zh' ? p.title_zh : p.title}</h3>
                    <p class="product-desc">${currentLang === 'zh' ? p.desc_zh : p.desc}</p>
                    <div class="product-materials">
                        ${(currentLang === 'zh' ? p.materials_zh : p.materials).map(m =>
                            `<span class="material-tag">${m}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        setTimeout(initReveal, 100);
    }


    // ----- Why Us Rendering -----
    function renderWhyUs() {
        const grid = document.getElementById('why-grid');
        if (!grid) return;

        grid.innerHTML = whyItems.map(item => `
            <div class="why-card reveal">
                <div class="why-icon">${item.icon}</div>
                <h3>${currentLang === 'zh' ? item.title_zh : item.title}</h3>
                <p>${currentLang === 'zh' ? item.desc_zh : item.desc}</p>
            </div>
        `).join('');

        setTimeout(initReveal, 100);
    }


    // ----- Footer Products -----
    function renderFooterProducts() {
        const list = document.getElementById('footer-products-list');
        if (!list) return;
        list.innerHTML = products.slice(0, 6).map(p => `
            <li><a href="#products">${currentLang === 'zh' ? p.title_zh : p.title}</a></li>
        `).join('');
    }


    // ----- Company Info -----
    function updateCompanyInfo() {
        const map = [
            ['ci_company_val', companyInfo.name],
            ['ci_address_val', companyInfo.address],
            ['ci_email_val', companyInfo.email],
            ['ci_phone_val', companyInfo.phone],
            ['footer-email', companyInfo.email],
            ['footer-phone', companyInfo.phone],
            ['stat-years', companyInfo.years],
            ['stat-countries', companyInfo.countries],
            ['stat-clients', companyInfo.clients],
            ['footer-year', new Date().getFullYear()],
        ];
        map.forEach(([id, val]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        });

        const emailLink = document.querySelector('a[href^="mailto:"]');
        if (emailLink) emailLink.href = `mailto:${companyInfo.email}`;
    }


    // ----- Header Scroll Effect -----
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });


    // ----- Mobile Menu -----
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('main-nav');
    mobileBtn.addEventListener('click', () => {
        nav.querySelector('.nav-list').classList.toggle('open');
    });
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.querySelector('.nav-list').classList.remove('open');
        });
    });


    // ----- Active Nav on Scroll -----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });


    // ----- Fixed CTA -----
    const fixedCta = document.getElementById('fixed-cta');
    window.addEventListener('scroll', () => {
        fixedCta.style.display = window.scrollY > 600 ? 'block' : 'none';
    });


    // ----- Reveal on Scroll -----
    function initReveal() {
        document.querySelectorAll('.reveal').forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 80) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', initReveal);


    // ----- Form Submission -----
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = currentLang === 'zh' ? '发送中...' : 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = currentLang === 'zh' ? '已发送 ✓' : 'Sent ✓';
                btn.style.background = '#27ae60';
                form.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
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
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
