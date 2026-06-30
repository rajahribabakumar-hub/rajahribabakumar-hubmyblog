// Raja AI Tech - Main JavaScript
// Dynamic content loading from products.json

let siteData = null;

// Category colors for article placeholders
const categoryColors = {
    'Artificial Intelligence': '#3B82F6',
    'Machine Learning': '#10B981',
    'Digital Marketing': '#F59E0B',
    'AI Tools': '#8B5CF6',
    'SEO': '#EF4444',
    'Technology': '#06B6D4',
    'Computer Vision': '#EC4899',
    'AI Art': '#F97316',
    'IoT': '#14B8A6',
    'NLP': '#6366F1',
    'Robotics': '#78716C',
    'Cybersecurity': '#DC2626',
    'Education': '#0EA5E9',
    'Data Analytics': '#84CC16',
    'AI Ethics': '#A855F7'
};

// Load site data from JSON
async function loadSiteData() {
    try {
        const response = await fetch('data/products.json');
        siteData = await response.json();

        // Render all sections
        renderAnnouncements();
        renderProducts();
        renderLinks();
        renderArticles();

        return siteData;
    } catch (error) {
        console.error('Error loading site data:', error);
        return null;
    }
}

// Render announcements
function renderAnnouncements() {
    if (!siteData || !siteData.announcements) return;

    const container = document.getElementById('announcement-content');
    if (!container) return;

    const activeAnnouncements = siteData.announcements.filter(a => a.active);

    if (activeAnnouncements.length === 0) {
        document.getElementById('announcements')?.classList.add('hidden');
        return;
    }

    container.innerHTML = activeAnnouncements.map(announcement => `
        <div class="announcement-banner">
            <span class="announcement-icon">${getAnnouncementIcon()}</span>
            <p>${announcement.text}</p>
            ${announcement.link ? `<a href="${announcement.link}" class="announcement-link">Learn More</a>` : ''}
        </div>
    `).join('');
}

function getAnnouncementIcon() {
    return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>`;
}

// Render products grid
function renderProducts() {
    if (!siteData || !siteData.products) return;

    const container = document.getElementById('products-grid');
    if (!container) return;

    container.innerHTML = siteData.products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                ${product.featured ? '<span class="featured-badge">Featured</span>' : ''}
            </div>
            <div class="product-content">
                <span class="category">${product.category}</span>
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <div class="product-footer">
                    <span class="price">${product.price}</span>
                    <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="btn btn-sm">
                        Visit Site
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Render links grid
function renderLinks() {
    if (!siteData || !siteData.links) return;

    const container = document.getElementById('links-grid');
    if (!container) return;

    container.innerHTML = siteData.links.map(link => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-card">
            <div class="link-icon">
                ${getLinkIcon(link.category)}
            </div>
            <div class="link-content">
                <h3>${link.title}</h3>
                <p>${link.description}</p>
                <span class="link-category">${link.category}</span>
            </div>
            <svg class="link-arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
        </a>
    `).join('');
}

function getLinkIcon(category) {
    const icons = {
        'Resources': '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        'Blog': '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
        'Learning': '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
        'Developer Tools': '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'
    };
    return icons[category] || icons['Resources'];
}

// Render articles grid - Main function for blog feed
function renderArticles() {
    if (!siteData || !siteData.articles) return;

    const container = document.getElementById('articles-grid');
    if (!container) return;

    // Sort articles by date (newest first)
    const sortedArticles = [...siteData.articles].sort((a, b) => {
        const dateA = new Date(a.date.replace(',', ''));
        const dateB = new Date(b.date.replace(',', ''));
        return dateB - dateA;
    });

    container.innerHTML = sortedArticles.map(article => {
        const color = categoryColors[article.category] || '#3B82F6';

        return `
            <article class="article-card">
                <div class="article-image">
                    <div class="placeholder-image" style="background: linear-gradient(135deg, ${color}, ${adjustColor(color, -30)})">
                        <span>${article.image || article.category.substring(0, 2).toUpperCase()}</span>
                    </div>
                </div>
                <div class="article-content">
                    <span class="category" style="background-color: ${color}15; color: ${color}">${article.category}</span>
                    <h3><a href="${article.url}">${article.title}</a></h3>
                    <p>${article.description}</p>
                    <span class="date">${article.date}</span>
                </div>
            </article>
        `;
    }).join('');

    // Update article count
    const countEl = document.getElementById('articles-count');
    if (countEl) {
        countEl.textContent = `Showing ${sortedArticles.length} articles`;
    }
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// Premium Search functionality
const searchInput = document.getElementById('global-search');
const searchClear = document.getElementById('search-clear');
const searchResults = document.getElementById('search-results');
const searchResultsContent = document.getElementById('search-results-content');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';
let searchTimeout;

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => performSearch(e.target.value), 200);
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length > 0) {
            searchResults.classList.add('active');
        }
    });
}

if (searchClear) {
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchResults.classList.remove('active');
        searchClear.style.display = 'none';
    });
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
        searchResults?.classList.remove('active');
    }
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        performSearch(searchInput?.value || '');
    });
});

function performSearch(query) {
    if (!siteData) return;

    const trimmedQuery = query.toLowerCase().trim();

    if (trimmedQuery.length === 0) {
        searchResults?.classList.remove('active');
        searchClear.style.display = 'none';
        return;
    }

    searchClear.style.display = 'block';

    let results = [];

    // Search articles
    if (currentFilter === 'all' || currentFilter === 'articles') {
        const articleResults = siteData.articles.filter(article =>
            article.title.toLowerCase().includes(trimmedQuery) ||
            article.description.toLowerCase().includes(trimmedQuery) ||
            article.category.toLowerCase().includes(trimmedQuery)
        ).slice(0, 5);

        results.push(...articleResults.map(a => ({ type: 'article', ...a })));
    }

    // Search products
    if (currentFilter === 'all' || currentFilter === 'products') {
        const productResults = siteData.products.filter(product =>
            product.title.toLowerCase().includes(trimmedQuery) ||
            product.description.toLowerCase().includes(trimmedQuery) ||
            product.category.toLowerCase().includes(trimmedQuery)
        ).slice(0, 5);

        results.push(...productResults.map(p => ({ type: 'product', ...p })));
    }

    // Search links
    if (currentFilter === 'all' || currentFilter === 'links') {
        const linkResults = siteData.links.filter(link =>
            link.title.toLowerCase().includes(trimmedQuery) ||
            link.description.toLowerCase().includes(trimmedQuery) ||
            link.category.toLowerCase().includes(trimmedQuery)
        ).slice(0, 5);

        results.push(...linkResults.map(l => ({ type: 'link', ...l })));
    }

    displaySearchResults(results);
}

function displaySearchResults(results) {
    if (!searchResultsContent) return;

    if (results.length === 0) {
        searchResultsContent.innerHTML = `
            <div class="no-results">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <p>No results found</p>
            </div>
        `;
    } else {
        searchResultsContent.innerHTML = results.map(result => {
            if (result.type === 'article') {
                const color = categoryColors[result.category] || '#3B82F6';
                return `
                    <a href="${result.url}" class="search-result-item">
                        <div class="result-type article">Article</div>
                        <div class="result-content">
                            <h4>${highlightMatch(result.title, searchInput.value)}</h4>
                            <span class="result-category" style="color: ${color}">${result.category}</span>
                        </div>
                    </a>
                `;
            } else if (result.type === 'product') {
                return `
                    <a href="${result.link}" target="_blank" rel="noopener" class="search-result-item">
                        <div class="result-type product">Product</div>
                        <div class="result-content">
                            <h4>${highlightMatch(result.title, searchInput.value)}</h4>
                            <span class="result-category">${result.price}</span>
                        </div>
                    </a>
                `;
            } else {
                return `
                    <a href="${result.url}" target="_blank" rel="noopener" class="search-result-item">
                        <div class="result-type link">Resource</div>
                        <div class="result-content">
                            <h4>${highlightMatch(result.title, searchInput.value)}</h4>
                            <span class="result-category">${result.category}</span>
                        </div>
                    </a>
                `;
            }
        }).join('');
    }

    searchResults?.classList.add('active');
}

function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.trim()})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn?.classList.remove('active');
        navLinks?.classList.remove('active');
    });
});

// Back to top button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Newsletter form handler
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;

    // Show success message
    const form = event.target;
    const originalContent = form.innerHTML;

    form.innerHTML = `
        <div class="newsletter-success">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <p>Thank you for subscribing!</p>
        </div>
    `;

    setTimeout(() => {
        form.innerHTML = originalContent;
    }, 3000);

    return false;
}

// Make newsletter handler globally available
window.handleNewsletterSubmit = handleNewsletterSubmit;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    loadSiteData();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
