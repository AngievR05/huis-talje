// Get Involved Page - Complete JavaScript

// ===== INVOLVEMENT CARDS (Volunteer/Partner/Donations) =====
document.querySelectorAll('.card-trigger-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.involvement-card');
        
        // Close all other cards
        document.querySelectorAll('.involvement-card.expanded').forEach(otherCard => {
            if (otherCard !== card && !otherCard.classList.contains('submitted')) {
                otherCard.classList.remove('expanded');
            }
        });
        
        // Expand this card
        card.classList.add('expanded');
    });
});

document.querySelectorAll('.card-close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.involvement-card');
        card.classList.remove('expanded');
        card.classList.remove('submitted');
        
        // Reset form
        const form = card.querySelector('.involvement-form');
        if (form) form.reset();
    });
});

// Form submissions
document.querySelectorAll('.involvement-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation
        const requiredInputs = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#BD002F';
            } else {
                input.style.borderColor = '#e8642f';
            }
        });
        
        // Email validation
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = '#BD002F';
            }
        }
        
        // Phone validation
        const phoneInput = form.querySelector('input[type="tel"]');
        if (phoneInput && phoneInput.value) {
            const cleanPhone = phoneInput.value.replace(/\D/g, '');
            if (cleanPhone.length < 10) {
                isValid = false;
                phoneInput.style.borderColor = '#BD002F';
            }
        }
        
        if (!isValid) {
            alert('Please fill in all required fields correctly.');
            return;
        }
        
        // Hide form, show success message
        const card = form.closest('.involvement-card');
        const successOverlay = card.querySelector('.form-success-message-overlay');
        
        if (successOverlay) {
            successOverlay.style.display = 'flex';
        }
        
        // Reset form
        setTimeout(() => {
            form.reset();
        }, 100);
    });
});

// Close buttons on success overlays
document.querySelectorAll('.form-success-message-overlay .card-close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.involvement-card');
        const successOverlay = this.closest('.form-success-message-overlay');
        
        // Hide success message
        if (successOverlay) {
            successOverlay.style.display = 'none';
        }
        
        // Close card
        card.classList.remove('expanded');
    });
});

// Hero scroll buttons
document.querySelector('.volunteer-scroll-btn')?.addEventListener('click', () => {
    document.getElementById('volunteer-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => document.getElementById('volunteer-card')?.querySelector('.card-trigger-btn')?.click(), 800);
});

document.querySelector('.partner-scroll-btn')?.addEventListener('click', () => {
    document.getElementById('partner-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => document.getElementById('partner-card')?.querySelector('.card-trigger-btn')?.click(), 800);
});

document.querySelector('.once-off-scroll-btn')?.addEventListener('click', () => {
    document.querySelector('.donation-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => document.getElementById('once-off-card')?.querySelector('.card-trigger-btn')?.click(), 800);
});

document.querySelector('.monthly-scroll-btn')?.addEventListener('click', () => {
    document.querySelector('.donation-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => document.getElementById('monthly-card')?.querySelector('.card-trigger-btn')?.click(), 800);
});

// ===== PARTNERS CAROUSEL =====
const partnersData = [
    { img: 'Wool.png', name: 'Woolworths SA', desc: 'Grocery & hygiene donations' },
    { img: 'Build.png', name: 'Builders Warehouse', desc: 'Supplies for upgrades & repairs' },
    { img: 'Pick.png', name: 'Pick n Pay', desc: 'Food drives & volunteer support' },
    { img: 'Tastic.png', name: 'Tastic', desc: 'Pantry staples for daily meals' },
    { img: 'Mr.png', name: 'Mr Price', desc: 'Youth & mentorship support' },
    { img: 'Clicks.png', name: 'Clicks', desc: 'Health & hygiene essentials' },
    { img: 'Cape.png', name: 'Cape Union Mart', desc: 'Outdoor gear & warm clothing' }
];

let partnersIndex = 0;
let partnersAutoScroll = null;
let partnersManualControl = false;

function renderPartners() {
    const track = document.querySelector('.partners-carousel-track');
    if (!track) return;
    
    track.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const idx = (partnersIndex + i) % partnersData.length;
        const partner = partnersData[idx];
        
        const item = document.createElement('div');
        item.className = 'partner-item';
        item.innerHTML = `
            <div class="partner-logo-circle">
                <img src="../images/get-involved/${partner.img}" alt="${partner.name}">
            </div>
            <h3>${partner.name}</h3>
            <p>${partner.desc}</p>
        `;
        track.appendChild(item);
    }
}

function startPartnersAutoScroll() {
    if (partnersManualControl) return;
    partnersAutoScroll = setInterval(() => {
        partnersIndex = (partnersIndex + 1) % partnersData.length;
        renderPartners();
    }, 3000);
}

function stopPartnersAutoScroll() {
    if (partnersAutoScroll) {
        clearInterval(partnersAutoScroll);
        partnersAutoScroll = null;
    }
}

document.querySelector('.next-partners')?.addEventListener('click', () => {
    partnersManualControl = true;
    stopPartnersAutoScroll();
    partnersIndex = (partnersIndex + 1) % partnersData.length;
    renderPartners();
    setTimeout(() => {
        partnersManualControl = false;
        startPartnersAutoScroll();
    }, 5000);
});

document.querySelector('.prev-partners')?.addEventListener('click', () => {
    partnersManualControl = true;
    stopPartnersAutoScroll();
    partnersIndex = (partnersIndex - 1 + partnersData.length) % partnersData.length;
    renderPartners();
    setTimeout(() => {
        partnersManualControl = false;
        startPartnersAutoScroll();
    }, 5000);
});

renderPartners();
startPartnersAutoScroll();

// ===== BUDGET ACCORDION =====
const budgetYears = [
    { year: '2020', data: '<p><strong>Subsidy Received:</strong> R24,530</p><p><strong>Stationery:</strong> R3,709</p><p><strong>Accounting Fees:</strong> R8,046</p><p><strong>Food:</strong> R6,324</p><p><strong>Telephone:</strong> R2,536</p><p><strong>Insurance:</strong> R3,681</p>' },
    { year: '2021', data: '<p><strong>Subsidy Received:</strong> R28,167</p><p><strong>Stationery:</strong> R3,532</p><p><strong>Accounting Fees:</strong> R7,663</p><p><strong>Food:</strong> R7,125</p><p><strong>Telephone:</strong> R2,414</p><p><strong>Insurance:</strong> R3,406</p>' },
    { year: '2022', data: '<p><strong>Subsidy Received:</strong> R24,330</p><p><strong>Stationery:</strong> R3,709</p><p><strong>Accounting Fees:</strong> R5,046</p><p><strong>Food:</strong> R6,998</p><p><strong>Telephone:</strong> R2,526</p><p><strong>Insurance:</strong> R3,261</p>' },
    { year: '2023', data: '<p><strong>Subsidy Received:</strong> R29,547</p><p><strong>Stationery:</strong> R3,895</p><p><strong>Accounting Fees:</strong> R8,149</p><p><strong>Food:</strong> R7,442</p><p><strong>Telephone:</strong> R2,663</p><p><strong>Insurance:</strong> R3,760</p>' },
    { year: '2024', data: '<p><strong>Subsidy Received:</strong> R26,819</p><p><strong>Stationery:</strong> R4,089</p><p><strong>Accounting Fees:</strong> R8,871</p><p><strong>Food:</strong> R7,709</p><p><strong>Telephone:</strong> R2,706</p><p><strong>Insurance:</strong> R4,398</p>' },
    { year: '2025', data: '<p><strong>Subsidy Received:</strong> R28,105</p><p><strong>Stationery:</strong> R4,292</p><p><strong>Accounting Fees:</strong> R9,314</p><p><strong>Food:</strong> R8,095</p><p><strong>Telephone:</strong> R2,840</p><p><strong>Insurance:</strong> R4,145</p>' }
];

function renderBudget() {
    const container = document.querySelector('.budget-accordion-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    budgetYears.forEach(item => {
        const accordion = document.createElement('div');
        accordion.className = 'budget-accordion-item';
        accordion.innerHTML = `
            <div class="budget-year-label">${item.year}</div>
            <div class="budget-expand-arrow">→</div>
            <div class="budget-breakdown">${item.data}</div>
        `;
        
        accordion.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.budget-accordion-item').forEach(acc => {
                acc.classList.remove('active');
            });
            
            // Toggle this one
            if (!isActive) {
                this.classList.add('active');
            }
        });
        
        container.appendChild(accordion);
    });
}

renderBudget();

// ===== WISHLIST CAROUSEL =====
const wishlistData = [
    { icon: 'Bedding.svg', name: 'Bedding', desc: 'Warm nights for our residents' },
    { icon: 'Soap.svg', name: 'Hygiene Packs', desc: 'Everyday care essentials' },
    { icon: 'Pencil.svg', name: 'Stationery', desc: 'Tools for learning & growth' },
    { icon: 'Spray.svg', name: 'Cleaning Products', desc: 'Keep our spaces fresh' },
    { icon: 'Shirt.svg', name: 'Clothing & Shoes', desc: 'Comfort for every season' },
    { icon: 'Books.svg', name: 'Books', desc: 'Stories that inspire minds' },
    { icon: 'Teddy.svg', name: 'Toys & Games', desc: 'Joy through play' },
    { icon: 'Pan.svg', name: 'Kitchen Equipment', desc: 'Gear for daily meals' },
    { icon: 'Garden.svg', name: 'Garden Supplies', desc: 'Grow, learn & nurture' },
    { icon: 'Fan.svg', name: 'Cooling Systems', desc: 'Stay cool in summer heat' }
];

let wishlistIndex = 0;
let wishlistAutoScroll = null;
let wishlistManualControl = false;

function renderWishlist() {
    const track = document.querySelector('.wishlist-carousel-track');
    if (!track) return;
    
    track.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const idx = (wishlistIndex + i) % wishlistData.length;
        const item = wishlistData[idx];
        
        const card = document.createElement('div');
        card.className = 'wishlist-item';
        card.innerHTML = `
            <img src="../images/get-involved/${item.icon}" alt="${item.name}" class="wishlist-item-icon">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
        `;
        track.appendChild(card);
    }
}

function startWishlistAutoScroll() {
    if (wishlistManualControl) return;
    wishlistAutoScroll = setInterval(() => {
        wishlistIndex = (wishlistIndex + 1) % wishlistData.length;
        renderWishlist();
    }, 3500);
}

function stopWishlistAutoScroll() {
    if (wishlistAutoScroll) {
        clearInterval(wishlistAutoScroll);
        wishlistAutoScroll = null;
    }
}

document.querySelector('.next-wishlist')?.addEventListener('click', () => {
    wishlistManualControl = true;
    stopWishlistAutoScroll();
    wishlistIndex = (wishlistIndex + 1) % wishlistData.length;
    renderWishlist();
    setTimeout(() => {
        wishlistManualControl = false;
        startWishlistAutoScroll();
    }, 5000);
});

document.querySelector('.prev-wishlist')?.addEventListener('click', () => {
    wishlistManualControl = true;
    stopWishlistAutoScroll();
    wishlistIndex = (wishlistIndex - 1 + wishlistData.length) % wishlistData.length;
    renderWishlist();
    setTimeout(() => {
        wishlistManualControl = false;
        startWishlistAutoScroll();
    }, 5000);
});

renderWishlist();
startWishlistAutoScroll();

// ===== BACK TO TOP =====
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== HEADER SCROLL =====
const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== NEWSLETTER =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        alert('Thank you for subscribing!');
        newsletterForm.reset();
    });
}