// Get Involved Page JavaScript

// ===== DOODLE CARD FORMS =====
document.querySelectorAll('.open-form-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.doodle-card');
        
        // Close all other cards
        document.querySelectorAll('.doodle-card.expanded').forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('expanded');
            }
        });
        
        // Toggle this card
        card.classList.toggle('expanded');
    });
});

document.querySelectorAll('.close-form-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.doodle-card');
        card.classList.remove('expanded');
        
        // Reset form
        const form = card.querySelector('.card-form');
        if (form) form.reset();
    });
});

// Hero option buttons scroll to sections
document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        let targetSelector;
        
        if (this.classList.contains('volunteer-btn')) {
            targetSelector = '[data-card="volunteer"]';
        } else if (this.classList.contains('partner-btn')) {
            targetSelector = '[data-card="partner"]';
        } else if (this.classList.contains('once-off-btn')) {
            targetSelector = '[data-card="once-off"]';
        } else if (this.classList.contains('monthly-btn')) {
            targetSelector = '[data-card="monthly"]';
        }
        
        const targetCard = document.querySelector(targetSelector);
        if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                const btn = targetCard.querySelector('.open-form-btn');
                if (btn) btn.click();
            }, 800);
        }
    });
});

// Form submissions
document.querySelectorAll('.card-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
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
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phoneInput.value) || phoneInput.value.replace(/\D/g, '').length < 10) {
                isValid = false;
                phoneInput.style.borderColor = '#BD002F';
            }
        }
        
        if (!isValid) {
            alert('Please fill in all required fields correctly.');
            return;
        }
        
        // Success
        alert('Thank you! We will be in touch soon.');
        
        // Close card
        const card = form.closest('.doodle-card');
        if (card) {
            card.classList.remove('expanded');
        }
        
        form.reset();
    });
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

function renderPartners() {
    const container = document.querySelector('.partners-carousel');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const idx = (partnersIndex + i) % partnersData.length;
        const partner = partnersData[idx];
        
        const card = document.createElement('div');
        card.className = 'partner-logo-card';
        card.innerHTML = `
            <div class="partner-logo">
                <img src="../images/get-involved/${partner.img}" alt="${partner.name}">
            </div>
            <h3>${partner.name}</h3>
            <p>${partner.desc}</p>
        `;
        container.appendChild(card);
    }
}

const partnersNextBtn = document.querySelector('.partners-carousel-section .next-arrow');
const partnersPrevBtn = document.querySelector('.partners-carousel-section .prev-arrow');

if (partnersNextBtn) {
    partnersNextBtn.addEventListener('click', () => {
        partnersIndex = (partnersIndex + 1) % partnersData.length;
        renderPartners();
    });
}

if (partnersPrevBtn) {
    partnersPrevBtn.addEventListener('click', () => {
        partnersIndex = (partnersIndex - 1 + partnersData.length) % partnersData.length;
        renderPartners();
    });
}

// Auto-scroll partners
let partnersInterval = setInterval(() => {
    partnersIndex = (partnersIndex + 1) % partnersData.length;
    renderPartners();
}, 3000);

const partnersCarousel = document.querySelector('.partners-carousel');
if (partnersCarousel) {
    partnersCarousel.addEventListener('mouseenter', () => clearInterval(partnersInterval));
    partnersCarousel.addEventListener('mouseleave', () => {
        partnersInterval = setInterval(() => {
            partnersIndex = (partnersIndex + 1) % partnersData.length;
            renderPartners();
        }, 3000);
    });
}

renderPartners();

// ===== WISHLIST CAROUSEL =====
const wishlistData = [
    { icon: 'Bedding.svg', name: 'Bedding', desc: 'Warm nights for our residents' },
    { icon: 'Soap.svg', name: 'Hygiene Packs', desc: 'Everyday care essentials' },
    { icon: 'Pencil.svg', name: 'Stationery', desc: 'Tools for learning & growth' },
    { icon: 'Spray.svg', name: 'Cleaning Products', desc: 'Keep our spaces fresh' },
    { icon: 'Shirt.svg', name: 'Clothing & Shoes', desc: 'Comfort for every season' },
    { icon: 'Books.png', name: 'Books', desc: 'Stories that inspire minds' },
    { icon: 'Teddy.svg', name: 'Toys & Games', desc: 'Joy through play' },
    { icon: 'Pan.svg', name: 'Kitchen Equipment', desc: 'Gear for daily meals' },
    { icon: 'Garden.svg', name: 'Garden Supplies', desc: 'Grow, learn & nurture' },
    { icon: 'Fan.svg', name: 'Cooling Systems', desc: 'Stay cool in summer heat' }
];

let wishlistIndex = 0;

function renderWishlist() {
    const container = document.querySelector('.wishlist-carousel');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const idx = (wishlistIndex + i) % wishlistData.length;
        const item = wishlistData[idx];
        
        const card = document.createElement('div');
        card.className = 'wishlist-item-card';
        card.innerHTML = `
            <img src="../images/get-involved/${item.icon}" alt="${item.name}" class="wishlist-icon">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
        `;
        container.appendChild(card);
    }
}

const wishlistNextBtn = document.querySelector('.wishlist-next');
const wishlistPrevBtn = document.querySelector('.wishlist-prev');

if (wishlistNextBtn) {
    wishlistNextBtn.addEventListener('click', () => {
        wishlistIndex = (wishlistIndex + 1) % wishlistData.length;
        renderWishlist();
    });
}

if (wishlistPrevBtn) {
    wishlistPrevBtn.addEventListener('click', () => {
        wishlistIndex = (wishlistIndex - 1 + wishlistData.length) % wishlistData.length;
        renderWishlist();
    });
}

// Auto-scroll wishlist
let wishlistInterval = setInterval(() => {
    wishlistIndex = (wishlistIndex + 1) % wishlistData.length;
    renderWishlist();
}, 3500);

const wishlistCarousel = document.querySelector('.wishlist-carousel');
if (wishlistCarousel) {
    wishlistCarousel.addEventListener('mouseenter', () => clearInterval(wishlistInterval));
    wishlistCarousel.addEventListener('mouseleave', () => {
        wishlistInterval = setInterval(() => {
            wishlistIndex = (wishlistIndex + 1) % wishlistData.length;
            renderWishlist();
        }, 3500);
    });
}

renderWishlist();

// ===== BUDGET CARDS =====
const budgetData = {
    '2020': `
        <p><strong>Subsidy Received:</strong> R24,530</p>
        <p><strong>Stationery:</strong> R3,709</p>
        <p><strong>Accounting Fees:</strong> R8,046</p>
        <p><strong>Food:</strong> R6,324</p>
        <p><strong>Telephone:</strong> R2,536</p>
        <p><strong>Insurance:</strong> R3,681</p>
    `,
    '2021': `
        <p><strong>Subsidy Received:</strong> R28,167</p>
        <p><strong>Stationery:</strong> R3,532</p>
        <p><strong>Accounting Fees:</strong> R7,663</p>
        <p><strong>Food:</strong> R7,125</p>
        <p><strong>Telephone:</strong> R2,414</p>
        <p><strong>Insurance:</strong> R3,406</p>
    `,
    '2022': `
        <p><strong>Subsidy Received:</strong> R24,330</p>
        <p><strong>Stationery:</strong> R3,709</p>
        <p><strong>Accounting Fees:</strong> R5,046</p>
        <p><strong>Food:</strong> R6,998</p>
        <p><strong>Telephone:</strong> R2,526</p>
        <p><strong>Insurance:</strong> R3,261</p>
    `,
    '2023': `
        <p><strong>Subsidy Received:</strong> R29,547</p>
        <p><strong>Stationery:</strong> R3,895</p>
        <p><strong>Accounting Fees:</strong> R8,149</p>
        <p><strong>Food:</strong> R7,442</p>
        <p><strong>Telephone:</strong> R2,663</p>
        <p><strong>Insurance:</strong> R3,760</p>
    `,
    '2024': `
        <p><strong>Subsidy Received:</strong> R26,819</p>
        <p><strong>Stationery:</strong> R4,089</p>
        <p><strong>Accounting Fees:</strong> R8,871</p>
        <p><strong>Food:</strong> R7,709</p>
        <p><strong>Telephone:</strong> R2,706</p>
        <p><strong>Insurance:</strong> R4,398</p>
    `,
    '2025': `
        <p><strong>Subsidy Received:</strong> R28,105</p>
        <p><strong>Stationery:</strong> R4,292</p>
        <p><strong>Accounting Fees:</strong> R9,314</p>
        <p><strong>Food:</strong> R8,095</p>
        <p><strong>Telephone:</strong> R2,840</p>
        <p><strong>Insurance:</strong> R4,145</p>
    `
};

document.querySelectorAll('.budget-card').forEach(card => {
    card.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        
        // Close all
        document.querySelectorAll('.budget-card').forEach(c => c.classList.remove('active'));
        
        // Toggle this one
        if (!isActive) {
            this.classList.add('active');
            
            // Add details if not present
            if (!this.querySelector('.budget-details')) {
                const year = this.dataset.year;
                const details = document.createElement('div');
                details.className = 'budget-details';
                details.innerHTML = budgetData[year] || '<p>No data available</p>';
                this.appendChild(details);
            }
        }
    });
});

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