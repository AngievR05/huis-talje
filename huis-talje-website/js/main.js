/* ==========================================
   HUIS TALJE - MAIN JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // HEADER SCROLL BEHAVIOR
    // ==========================================
    const header = document.getElementById('main-header');
    const backToTopBtn = document.getElementById('backToTop');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Header scroll behavior
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button - show after washing line
        if (currentScroll > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        lastScroll = currentScroll;
    });

    // Back to top button click
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // ACCORDION FUNCTIONALITY (Original Behavior)
    // ==========================================
    const accordionCards = document.querySelectorAll('.accordion-card');
    
    accordionCards.forEach(card => {
        card.addEventListener('click', function() {
            // If this card is already active, close it
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                // Close all other cards
                accordionCards.forEach(c => c.classList.remove('active'));
                // Open this card
                this.classList.add('active');
            }
        });
    });

    // Close accordion when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.accordion-card') && !e.target.closest('.story-cards')) {
            accordionCards.forEach(card => card.classList.remove('active'));
        }
    });

// ==========================================
// PUZZLE PIECE INTERACTION (STABLE GRID SWAP)
// ==========================================
const puzzleStage = document.getElementById('puzzleStage');
const handSlot = document.getElementById('handSlot');

const puzzleButtons = Array.from(document.querySelectorAll('.puzzle-container'));
const puzzleDescription = document.getElementById('puzzle-description');

const puzzleTexts = {
  current: {
    text: "Discover Huis Talje's journey of care and growth, from our current projects building brighter futures, to the past projects that shaped our home, and the success stories that celebrate the children's incredible resilience and achievements.",
    color: "orange"
  },
  past: {
    text: "Over the years, Huis Talje has completed many meaningful projects that continue to shape our home today. From renovated spaces to successful community initiatives, these projects reflect the dedication, teamwork, and compassion that keep Huis Talje growing stronger each year.",
    color: "pink"
  },
  success: {
    text: "Every child at Huis Talje has a unique journey, and our success stories celebrate their growth, resilience, and achievements. From milestones in learning and literacy to personal triumphs, these stories show the lasting impact of care, support, and community involvement.",
    color: "purple"
  }
};

let heldBtn = null;

function getCenter(el) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function moveImgToCenter(img, targetCenter) {
  const from = getCenter(img);
  const dx = targetCenter.x - from.x;
  const dy = targetCenter.y - from.y;
  img.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
}

function hardResetToGridPositions() {
  // Turn off transitions so reset is instant and measurable
  puzzleButtons.forEach(btn => {
    const img = btn.querySelector('.puzzle-piece');
    img.classList.remove('is-held');
    img.style.transition = 'none';
    img.style.transform = 'translate3d(0,0,0)';
  });

  // Force layout flush (critical)
  void puzzleStage.offsetHeight;

  // Restore transitions
  puzzleButtons.forEach(btn => {
    const img = btn.querySelector('.puzzle-piece');
    img.style.transition = '';
  });
}

function applyLayout(selectedBtn) {
  if (!handSlot) return;

  // 1) Hard reset so DOMRects are stable
  hardResetToGridPositions();

  // 2) Capture the 3 grid slot centers (where puzzles should sit when not held)
  const slotCenters = puzzleButtons.map(btn => {
    const img = btn.querySelector('.puzzle-piece');
    return getCenter(img);
  });

  // 3) Selected puzzle goes into the hand
  const selectedImg = selectedBtn.querySelector('.puzzle-piece');
  selectedImg.classList.add('is-held');
  moveImgToCenter(selectedImg, getCenter(handSlot));

  // 4) Remaining puzzles compact left into slots 0 and 1
  const remaining = puzzleButtons.filter(b => b !== selectedBtn);

  remaining.forEach((btn, idx) => {
    const img = btn.querySelector('.puzzle-piece');
    moveImgToCenter(img, slotCenters[idx]); // idx 0 -> slot0, idx 1 -> slot1
  });

  puzzleStage?.classList.add('is-active');
}

function setDescription(type) {
  const cfg = puzzleTexts[type];
  if (!cfg || !puzzleDescription) return;

  puzzleDescription.hidden = false;
  puzzleDescription.textContent = cfg.text;
  puzzleDescription.className = `puzzle-description ${cfg.color}`;
}

function clearState() {
  puzzleButtons.forEach(b => b.setAttribute('aria-expanded', 'false'));

  puzzleStage?.classList.remove('is-active');

  if (puzzleDescription) {
    puzzleDescription.hidden = true;
    puzzleDescription.textContent = '';
    puzzleDescription.className = 'puzzle-description';
  }

  heldBtn = null;

  // reset visual positions
  hardResetToGridPositions();
}

// Start: no hand + no text + puzzles in grid
clearState();

puzzleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.puzzle;
    if (!type) return;

    // clicking same held puzzle: do nothing (your spec)
    if (heldBtn === btn) return;

    puzzleButtons.forEach(b => b.setAttribute('aria-expanded', 'false'));
    btn.setAttribute('aria-expanded', 'true');

    applyLayout(btn);
    setDescription(type);

    heldBtn = btn;
  });
});

// Re-align after resize (keep it pinned to the hand)
window.addEventListener('resize', () => {
  if (!heldBtn) return;
  applyLayout(heldBtn);
});

    // ==========================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // DROPDOWN MENU (Hover)
    // ==========================================
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // On mobile, allow click to toggle
    if (dropdown && dropdownMenu && window.innerWidth <= 768) {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }

    // ==========================================
    // NEWSLETTER FORM HANDLING
    // ==========================================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                alert('Thank you for subscribing! We will keep you updated with our latest news.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ==========================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ==========================================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveNavLink();

    // ==========================================
    // BUTTON CLICK HANDLERS
    // ==========================================
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            
            if (text === 'Get Involved') {
                window.location.href = 'pages/get-involved.html';
            } else if (text === 'Step Inside') {
                window.location.href = 'pages/inside-talje.html';
            } else if (text === 'Learn More') {
                window.location.href = 'pages/projects.html';
            }
        });
    });

    // ==========================================
    // KEYBOARD ACCESSIBILITY
    // ==========================================
    accordionCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', 'false');
        
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Update aria-expanded
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    const isActive = card.classList.contains('active');
                    card.setAttribute('aria-expanded', isActive);
                }
            });
        });

        observer.observe(card, { attributes: true });
    });

    // ==========================================
    // CONSOLE WELCOME MESSAGE
    // ==========================================
    console.log('%c🏡 Huis Talje Website', 'font-size: 20px; color: #e8642f; font-weight: bold;');
    console.log('%cFor severely intellectually and physically handicapped children.', 'font-size: 14px; color: #874fff;');
    console.log('%cDeveloped with ❤️', 'font-size: 12px; color: #0074EF;');
});