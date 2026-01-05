// Get Involved Page JavaScript

// Inline Form functionality
document.querySelectorAll('.open-form-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.doodle-card');
        const parentSection = card.closest('.content-wrapper, .donation-cards');
        const sectionText = parentSection?.querySelector('.section-text');
        
        // Close all other cards first
        document.querySelectorAll('.doodle-card.expanded').forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('expanded');
            }
        });
        
        // Reset all shifted text
        document.querySelectorAll('.section-text.shifted-right, .section-text.shifted-left').forEach(text => {
            text.classList.remove('shifted-right', 'shifted-left');
        });
        
        // Expand this card
        card.classList.add('expanded');
        
        // Shift the text if it exists and card has direction
        if (sectionText) {
            if (card.classList.contains('right-card')) {
                sectionText.classList.add('shifted-right');
            } else if (card.classList.contains('left-card')) {
                sectionText.classList.add('shifted-left');
            }
        }
    });
});

// Close inline form buttons
document.querySelectorAll('.close-inline-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.doodle-card');
        const parentSection = card.closest('.content-wrapper, .donation-cards');
        const sectionText = parentSection?.querySelector('.section-text');
        
        card.classList.remove('expanded');
        
        // Reset text position
        if (sectionText) {
            sectionText.classList.remove('shifted-right', 'shifted-left');
        }
        
        // Reset form
        const form = card.querySelector('.inline-form');
        if (form) {
            form.reset();
        }
    });
});

// Option buttons in hero section
document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        let targetCard;
        
        if (btn.classList.contains('volunteer-btn')) {
            targetCard = document.querySelector('[data-card="volunteer"]');
        } else if (btn.classList.contains('partner-btn')) {
            targetCard = document.querySelector('[data-card="partner"]');
        } else if (btn.classList.contains('once-off-btn')) {
            targetCard = document.querySelector('[data-card="once-off"]');
        } else if (btn.classList.contains('monthly-btn')) {
            targetCard = document.querySelector('[data-card="monthly"]');
        }
        
        if (targetCard) {
            // Scroll to the card
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // After scrolling, trigger the form open
            setTimeout(() => {
                const openBtn = targetCard.querySelector('.open-form-btn');
                if (openBtn) {
                    openBtn.click();
                }
            }, 800);
        }
    });
});

// Form submission handling with validation
document.querySelectorAll('.inline-form').forEach(form => {
    form.addEventListener('submit', (e) => {
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
            const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phoneInput.value) || phoneInput.value.length < 10) {
                isValid = false;
                phoneInput.style.borderColor = '#BD002F';
            }
        }
        
        if (!isValid) {
            alert('Please fill in all required fields correctly.');
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // Show success message
        alert('Thank you for your submission! We will be in touch soon.');
        
        // Close the form
        const card = form.closest('.doodle-card');
        const parentSection = card.closest('.content-wrapper, .donation-cards');
        const sectionText = parentSection?.querySelector('.section-text');
        
        card.classList.remove('expanded');
        if (sectionText) {
            sectionText.classList.remove('shifted-right', 'shifted-left');
        }
        
        // Reset form
        form.reset();
    });
});

// Partner Logos Carousel with auto-scroll
const partnerCarousel = document.querySelector('.partner-logos .carousel-track');
const partnerPrev = document.querySelector('.partner-logos .prev-btn');
const partnerNext = document.querySelector('.partner-logos .next-btn');

let partnerScrollPosition = 0;
let partnerAutoScrollInterval;

function scrollPartnerCarousel(direction) {
    if (!partnerCarousel) return;
    
    const cardWidth = partnerCarousel.querySelector('.partner-card')?.offsetWidth || 220;
    const gap = 20;
    const scrollAmount = cardWidth + gap;
    
    if (direction === 'next') {
        partnerScrollPosition += scrollAmount;
        
        if (partnerScrollPosition >= partnerCarousel.scrollWidth - partnerCarousel.offsetWidth) {
            partnerScrollPosition = 0;
        }
    } else {
        partnerScrollPosition -= scrollAmount;
        
        if (partnerScrollPosition < 0) {
            partnerScrollPosition = Math.max(0, partnerCarousel.scrollWidth - partnerCarousel.offsetWidth);
        }
    }
    
    partnerCarousel.scrollTo({
        left: partnerScrollPosition,
        behavior: 'smooth'
    });
}

// Auto-scroll partner carousel
function startPartnerAutoScroll() {
    partnerAutoScrollInterval = setInterval(() => {
        scrollPartnerCarousel('next');
    }, 3000);
}

function stopPartnerAutoScroll() {
    clearInterval(partnerAutoScrollInterval);
}

if (partnerCarousel) {
    startPartnerAutoScroll();
    
    // Pause on hover
    partnerCarousel.addEventListener('mouseenter', stopPartnerAutoScroll);
    partnerCarousel.addEventListener('mouseleave', startPartnerAutoScroll);
}

if (partnerNext) {
    partnerNext.addEventListener('click', () => {
        stopPartnerAutoScroll();
        scrollPartnerCarousel('next');
        startPartnerAutoScroll();
    });
}

if (partnerPrev) {
    partnerPrev.addEventListener('click', () => {
        stopPartnerAutoScroll();
        scrollPartnerCarousel('prev');
        startPartnerAutoScroll();
    });
}

// Wishlist Carousel with auto-scroll
const wishlistCarousel = document.querySelector('.wishlist-track');
const wishlistPrev = document.querySelector('.wishlist-prev');
const wishlistNext = document.querySelector('.wishlist-next');

let wishlistScrollPosition = 0;
let wishlistAutoScrollInterval;

function scrollWishlistCarousel(direction) {
    if (!wishlistCarousel) return;
    
    const cardWidth = wishlistCarousel.querySelector('.wishlist-card')?.offsetWidth || 220;
    const gap = 20;
    const scrollAmount = cardWidth + gap;
    
    if (direction === 'next') {
        wishlistScrollPosition += scrollAmount;
        
        if (wishlistScrollPosition >= wishlistCarousel.scrollWidth - wishlistCarousel.offsetWidth) {
            wishlistScrollPosition = 0;
        }
    } else {
        wishlistScrollPosition -= scrollAmount;
        
        if (wishlistScrollPosition < 0) {
            wishlistScrollPosition = Math.max(0, wishlistCarousel.scrollWidth - wishlistCarousel.offsetWidth);
        }
    }
    
    wishlistCarousel.scrollTo({
        left: wishlistScrollPosition,
        behavior: 'smooth'
    });
}

// Auto-scroll wishlist carousel
function startWishlistAutoScroll() {
    wishlistAutoScrollInterval = setInterval(() => {
        scrollWishlistCarousel('next');
    }, 3500);
}

function stopWishlistAutoScroll() {
    clearInterval(wishlistAutoScrollInterval);
}

if (wishlistCarousel) {
    startWishlistAutoScroll();
    
    // Pause on hover
    wishlistCarousel.addEventListener('mouseenter', stopWishlistAutoScroll);
    wishlistCarousel.addEventListener('mouseleave', startWishlistAutoScroll);
}

if (wishlistNext) {
    wishlistNext.addEventListener('click', () => {
        stopWishlistAutoScroll();
        scrollWishlistCarousel('next');
        startWishlistAutoScroll();
    });
}

if (wishlistPrev) {
    wishlistPrev.addEventListener('click', () => {
        stopWishlistAutoScroll();
        scrollWishlistCarousel('prev');
        startWishlistAutoScroll();
    });
}

// Budget Cards Expansion
const budgetCards = document.querySelectorAll('.budget-card');

budgetCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't expand if clicking the button
        if (e.target.classList.contains('expand-btn')) {
            return;
        }
        
        const isExpanded = card.classList.contains('expanded');
        
        // Close all cards
        budgetCards.forEach(c => c.classList.remove('expanded'));
        
        // Toggle clicked card
        if (!isExpanded) {
            card.classList.add('expanded');
            
            // Add budget details if not already present
            if (!card.querySelector('.budget-details')) {
                const year = card.dataset.year;
                const details = document.createElement('div');
                details.className = 'budget-details';
                details.innerHTML = getBudgetData(year);
                card.appendChild(details);
            }
        }
    });
});

// Budget data function
function getBudgetData(year) {
    const budgetInfo = {
        '2020': `
            <p><strong>Subsidy Received:</strong> R24,530</p>
            <p><strong>Stationery:</strong> R3,709</p>
            <p><strong>Accounting Fees:</strong> R8,046</p>
            <p><strong>Food:</strong> R6,324</p>
            <p><strong>Telephone:</strong> R2,536</p>
            <p><strong>Insurance:</strong> R3,681</p>
            <p><strong>Miscellaneous:</strong> R1,264</p>
        `,
        '2021': `
            <p><strong>Subsidy Received:</strong> R28,167</p>
            <p><strong>Stationery:</strong> R3,532</p>
            <p><strong>Accounting Fees:</strong> R7,663</p>
            <p><strong>Food:</strong> R7,125</p>
            <p><strong>Telephone:</strong> R2,414</p>
            <p><strong>Insurance:</strong> R3,406</p>
            <p><strong>Miscellaneous:</strong> R1,027</p>
        `,
        '2022': `
            <p><strong>Subsidy Received:</strong> R24,330</p>
            <p><strong>Stationery:</strong> R3,709</p>
            <p><strong>Accounting Fees:</strong> R5,046</p>
            <p><strong>Food:</strong> R6,998</p>
            <p><strong>Telephone:</strong> R2,526</p>
            <p><strong>Insurance:</strong> R3,261</p>
            <p><strong>Miscellaneous:</strong> R2,790</p>
        `,
        '2023': `
            <p><strong>Subsidy Received:</strong> R29,547</p>
            <p><strong>Stationery:</strong> R3,895</p>
            <p><strong>Accounting Fees:</strong> R8,149</p>
            <p><strong>Food:</strong> R7,442</p>
            <p><strong>Telephone:</strong> R2,663</p>
            <p><strong>Insurance:</strong> R3,760</p>
            <p><strong>Miscellaneous:</strong> R3,638</p>
        `,
        '2024': `
            <p><strong>Subsidy Received:</strong> R26,819</p>
            <p><strong>Stationery:</strong> R4,089</p>
            <p><strong>Accounting Fees:</strong> R8,871</p>
            <p><strong>Food:</strong> R7,709</p>
            <p><strong>Telephone:</strong> R2,706</p>
            <p><strong>Insurance:</strong> R4,398</p>
            <p><strong>Miscellaneous:</strong> R2,046</p>
        `,
        '2025': `
            <p><strong>Subsidy Received:</strong> R28,105</p>
            <p><strong>Stationery:</strong> R4,292</p>
            <p><strong>Accounting Fees:</strong> R9,314</p>
            <p><strong>Food:</strong> R8,095</p>
            <p><strong>Telephone:</strong> R2,840</p>
            <p><strong>Insurance:</strong> R4,145</p>
            <p><strong>Miscellaneous:</strong> R1,419</p>
        `
    };
    
    return budgetInfo[year] || '<p>Budget information coming soon.</p>';
}

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Header scroll effect
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

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Here you would typically send to a server
        console.log('Newsletter subscription:', email);
        
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}