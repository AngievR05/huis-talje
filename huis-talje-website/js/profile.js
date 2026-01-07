// Profile Page JavaScript

// ===== USER DATA (Demo) =====
const userData = {
    name: 'Jane',
    lastVisit: 'March 2024',
    activeEvents: 12,
    totalDonated: 10000,
    volunteerHours: 28,
    eventsAttended: 3
};

// ===== CONTRIBUTION FEED DATA =====
const contributionFeed = [
    { type: 'donation', title: 'Donation', detail: 'Corporate Gift', date: 'Oct 25, 2025', icon: 'PresentIcon.svg' },
    { type: 'volunteer', title: 'Volunteer', detail: 'Art Workshop', date: 'Oct 18, 2025', icon: 'ClockIcon.svg' },
    { type: 'donation', title: 'Donation', detail: 'Corporate Gift', date: 'Sep 30, 2025', icon: 'PresentIcon.svg' },
    { type: 'volunteer', title: 'Volunteer', detail: 'Art Workshop', date: 'Sep 16, 2025', icon: 'ClockIcon.svg' },
    { type: 'donation', title: 'Donation', detail: 'Corporate Gift', date: 'Aug 28, 2025', icon: 'PresentIcon.svg' }
];

// ===== UPCOMING EVENTS DATA =====
const upcomingEvents = [
    {
        title: 'Colour Run',
        date: 'November 12, 2025',
        time: '14:00 - 17:00',
        location: 'Hatfield-Wesrand Rugby Field',
        status: 'Upcoming'
    },
    {
        title: 'Christmas Event',
        date: 'December 20, 2025',
        time: '16:30 - 20:30',
        location: 'AFFM Klein Kariba',
        status: 'Upcoming'
    }
];

// ===== INITIALIZE PAGE =====
function initializePage() {
    updateUserInfo();
    renderContributionFeed();
    renderUpcomingEvents();
}

// Update user information
function updateUserInfo() {
    document.getElementById('user-name').textContent = `Welcome back, ${userData.name}!`;
    document.getElementById('last-visit').textContent = `Last visit: ${userData.lastVisit}`;
    document.getElementById('active-events').textContent = userData.activeEvents;
    document.getElementById('total-donated').textContent = `R${userData.totalDonated.toLocaleString()}`;
    document.getElementById('volunteer-hours').textContent = userData.volunteerHours;
    document.getElementById('events-attended').textContent = userData.eventsAttended;
}

// Render contribution feed
function renderContributionFeed() {
    const container = document.getElementById('contributions-feed');
    if (!container) return;
    
    container.innerHTML = '';
    
    contributionFeed.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = `contribution-item ${item.type}`;
        
        itemEl.innerHTML = `
            <div class="contribution-item-icon">
                <img src="../images/profile/${item.icon}" alt="${item.type}">
            </div>
            <div class="contribution-item-content">
                <div class="contribution-item-title">${item.title}</div>
                <div class="contribution-item-detail">${item.detail}</div>
            </div>
            <div class="contribution-item-date">${item.date}</div>
        `;
        
        container.appendChild(itemEl);
    });
}

// Render upcoming events
function renderUpcomingEvents() {
    const container = document.getElementById('events-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    upcomingEvents.forEach(event => {
        const eventEl = document.createElement('div');
        eventEl.className = 'event-card';
        
        eventEl.innerHTML = `
            <span class="event-badge1">${event.status}</span>
            <h4 class="event-title">${event.title}</h4>
            <div class="event-detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                ${event.date}
            </div>
            <div class="event-detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                ${event.time}
            </div>
            <div class="event-detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                ${event.location}
            </div>
        `;
        
        container.appendChild(eventEl);
    });
}

// Initialize on page load
initializePage();

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