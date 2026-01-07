// Inside Huis Talje Page JavaScript

// ===== DAY PROGRAM SCHEDULE =====
const daySchedule = [
    { start: '07:00', end: '08:30', tasks: ['PORRIDGE AND MEDICATION WITH SUPERVISION'] },
    { start: '08:30', end: '10:00', tasks: ['LIQUID INTAKE WITH SUPERVISION', '(HOUSEMOTHERS TEA BREAK 09:45 - 10:00)'] },
    { start: '10:00', end: '11:30', tasks: ['STIMULATION TIME FOR THE CHILDREN', 'NAPPY CHANGING', '(NURSE AND ALL PERSONEL - TEA BREAK 10:00 - 10:15)'] },
    { start: '11:30', end: '13:00', tasks: ['CHILDREN\'S LUNCH WITH SUPERVISION', 'LIQUID INTAKE WITH SUPERVISION', '(SUPERVISOR LUNCH 11:00 - 12:00)', '(HOUSEMOTHER LUNCH 12:00 - 13:00)'] },
    { start: '13:00', end: '14:00', tasks: ['NAPPY CHANGING WITH SUPERVISION', '(NURSE AND ALL PERSONNEL - LUNCH 13:00 - 14:00)'] },
    { start: '14:00', end: '15:30', tasks: ['LIQUID INTAKE WITH SUPERVISION', 'BATH TIME FOR BOYS AND GIRLS (ALTERNATIVE DAYS)', 'BED BATH BOYS AND GIRLS (ALTERNATIVE DAYS)', '2 CAREGIVERS & 2 CHILDREN WITH SUPERVISION'] },
    { start: '15:30', end: '16:30', tasks: ['SNACK TIME WITH SUPERVISION'] },
    { start: '18:00', end: '19:00', tasks: ['KNOCK OFF / SHIFT CHANGE'] },
    { start: '19:00', end: '', tasks: ['SUPPER FOR THE CHILDREN - FULL PORTION - WITH SUPERVISION'] }
];

// ===== NIGHT PROGRAM SCHEDULE =====
const nightSchedule = [
    { start: '18:00', end: '19:30', tasks: ['LIQUID INTAKE WITH SUPERVISION'] },
    { start: '19:30', end: '22:00', tasks: ['SUPPER FOR THE CHILDREN - FULL PORTION - WITH SUPERVISION', 'LIQUID INTAKE WITH SUPERVISION'] },
    { start: '22:00', end: '22:30', tasks: ['NAPPY CHANGING WITH SUPERVISION'] },
    { start: '22:30', end: '23:00', tasks: ['TEA BREAK FOR HOUSEMOTHER AND NURSE'] },
    { start: '23:00', end: '23:30', tasks: ['TEA BREAK FOR CAREGIVERS'] },
    { start: '23:00', end: '01:00', tasks: ['VEGETABLE PROCESSING UNTIL 02:00 IN THERAPY ROOM'] },
    { start: '01:00', end: '01:30', tasks: ['TEA BREAK FOR HOUSEMOTHER AND NURSE'] },
    { start: '01:30', end: '03:30', tasks: ['TEA BREAK FOR CAREGIVERS'] },
    { start: '03:00', end: '', tasks: ['BEDBATH IN WINTER (CHILDREN STAY IN BED)', 'CHILDREN TAKE BATH AND BE PUT IN CHAIRS IN SUMMER'] }
];

// Render Day Schedule
function renderDaySchedule() {
    const container = document.getElementById('day-schedule');
    if (!container) return;
    
    container.innerHTML = '';
    
    daySchedule.forEach(item => {
        const row = document.createElement('div');
        row.className = 'schedule-row';
        
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.innerHTML = `
            <span class="start-time">${item.start}</span>
            ${item.end ? `<span class="end-time">${item.end}</span>` : ''}
        `;
        
        const taskDesc = document.createElement('div');
        taskDesc.className = 'task-description';
        
        const taskHTML = item.tasks.map(task => {
            // Check if task is in parentheses (detail)
            if (task.startsWith('(') && task.endsWith(')')) {
                return `<div class="task-detail">${task}</div>`;
            }
            return `<div class="task-title">${task}</div>`;
        }).join('');
        
        taskDesc.innerHTML = taskHTML;
        
        row.appendChild(timeSlot);
        row.appendChild(taskDesc);
        container.appendChild(row);
    });
}

// Render Night Schedule
function renderNightSchedule() {
    const container = document.getElementById('night-schedule');
    if (!container) return;
    
    container.innerHTML = '';
    
    nightSchedule.forEach(item => {
        const row = document.createElement('div');
        row.className = 'schedule-row';
        
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.innerHTML = `
            <span class="start-time">${item.start}</span>
            ${item.end ? `<span class="end-time">${item.end}</span>` : ''}
        `;
        
        const taskDesc = document.createElement('div');
        taskDesc.className = 'task-description';
        
        const taskHTML = item.tasks.map(task => {
            if (task.startsWith('(') && task.endsWith(')')) {
                return `<div class="task-detail">${task}</div>`;
            }
            return `<div class="task-title">${task}</div>`;
        }).join('');
        
        taskDesc.innerHTML = taskHTML;
        
        row.appendChild(timeSlot);
        row.appendChild(taskDesc);
        container.appendChild(row);
    });
}

// Initialize schedules
renderDaySchedule();
renderNightSchedule();

// ===== MEET THE TEAM CAROUSEL =====
const teamMembers = [
    { front: 'ProfileCard1Front.svg', back: 'ProfileCard1Back.svg' },
    { front: 'ProfileCard2Front.svg', back: 'ProfileCard2Back.svg' },
    { front: 'ProfileCard3Front.svg', back: 'ProfileCard3Back.svg' },
    { front: 'ProfileCard4Front.svg', back: 'ProfileCard4Back.svg' },
    { front: 'ProfileCard5Front.svg', back: 'ProfileCard5Back.svg' }
];

let teamIndex = 0;

function renderTeamCarousel() {
    const carousel = document.querySelector('.team-carousel');
    if (!carousel) return;
    
    carousel.innerHTML = '';
    
    // Show 3 cards at a time
    for (let i = 0; i < 3; i++) {
        const idx = (teamIndex + i) % teamMembers.length;
        const member = teamMembers[idx];
        
        const container = document.createElement('div');
        container.className = 'profile-card-container';
        
        container.innerHTML = `
            <div class="profile-card">
                <div class="profile-card-front">
                    <img src="../images/inside-talje/${member.front}" alt="Team Member">
                </div>
                <div class="profile-card-back">
                    <img src="../images/inside-talje/${member.back}" alt="Team Member Details">
                </div>
            </div>
        `;
        
        carousel.appendChild(container);
    }
}

document.querySelector('.next-team')?.addEventListener('click', () => {
    teamIndex = (teamIndex + 1) % teamMembers.length;
    renderTeamCarousel();
});

document.querySelector('.prev-team')?.addEventListener('click', () => {
    teamIndex = (teamIndex - 1 + teamMembers.length) % teamMembers.length;
    renderTeamCarousel();
});

renderTeamCarousel();

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