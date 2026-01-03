/* ==========================================
   HUIS TALJE - MAIN JAVASCRIPT
   ========================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // HEADER SCROLL BEHAVIOR
    // ==========================================
    const header = document.getElementById('main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ==========================================
    // ACCORDION FUNCTIONALITY WITH HAND ANIMATION
    // ==========================================
    const accordionCards = document.querySelectorAll('.accordion-card');
    const handPointer = document.getElementById('hand-pointer');
    
    accordionCards.forEach(card => {
        card.addEventListener('click', function() {
            const textId = this.getAttribute('data-text');
            const allTexts = document.querySelectorAll('.description-text');
            
            // If this card is already active, close it
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                handPointer.classList.remove('show');
                allTexts.forEach(text => {
                    text.style.display = 'none';
                    text.classList.remove('show');
                });
            } else {
                // Close all other cards
                accordionCards.forEach(c => c.classList.remove('active'));
                
                // Show hand pointer
                const cardRect = this.getBoundingClientRect();
                handPointer.style.left = (cardRect.left - 100) + 'px';
                handPointer.style.top = (cardRect.top + window.scrollY) + 'px';
                handPointer.classList.add('show');
                
                // Open this card
                setTimeout(() => {
                    this.classList.add('active');
                }, 200);
                
                // Show corresponding text
                allTexts.forEach(text => {
                    text.style.display = 'none';
                    text.classList.remove('show');
                });
                
                const targetText = document.getElementById(textId);
                if (targetText) {
                    setTimeout(() => {
                        targetText.style.display = 'block';
                        setTimeout(() => targetText.classList.add('show'), 50);
                    }, 400);
                }
            }
        });
    });

    // Close accordion when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.accordion-card') && !e.target.closest('.story-cards')) {
            accordionCards.forEach(card => card.classList.remove('active'));
            handPointer.classList.remove('show');
        }
    });

    // ==========================================
    // PUZZLE PIECE INTERACTION WITH HAND
    // ==========================================
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    const puzzleHand = document.getElementById('puzzle-hand');
    const puzzleTexts = {
        'current': document.getElementById('current-text'),
        'past': document.getElementById('past-text'),
        'success': document.getElementById('success-text')
    };
    
    puzzlePieces.forEach(piece => {
        piece.addEventListener('click', function() {
            const puzzleType = this.getAttribute('data-puzzle');
            
            // If this piece is already active, close it
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                puzzleHand.classList.remove('show');
                
                // Show default text
                Object.values(puzzleTexts).forEach(text => text.style.display = 'none');
                puzzleTexts['current'].style.display = 'block';
            } else {
                // Close all other pieces
                puzzlePieces.forEach(p => p.classList.remove('active'));
                
                // Show hand pointer
                const pieceRect = this.getBoundingClientRect();
                puzzleHand.style.left = (pieceRect.left - 80) + 'px';
                puzzleHand.style.top = (pieceRect.top + window.scrollY - 50) + 'px';
                puzzleHand.classList.add('show');
                
                // Activate this piece
                setTimeout(() => {
                    this.classList.add('active');
                }, 200);
                
                // Show corresponding text
                Object.values(puzzleTexts).forEach(text => text.style.display = 'none');
                if (puzzleTexts[puzzleType]) {
                    setTimeout(() => {
                        puzzleTexts[puzzleType].style.display = 'block';
                    }, 400);
                }
            }
        });
    });

    // ==========================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#" (for dropdown toggle)
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
    // DROPDOWN MENU FOR CONTACT
    // ==========================================
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdown && dropdownToggle && dropdownMenu) {
        // Toggle dropdown on click (for mobile)
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdownMenu.style.display = '';
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
            
            // Basic email validation
            if (validateEmail(email)) {
                // Here you would typically send the email to your backend
                alert('Thank you for subscribing! We will keep you updated with our latest news.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Email validation helper function
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
    const getInvolvedBtns = document.querySelectorAll('.btn-orange');
    const learnMoreBtns = document.querySelectorAll('.btn-green');

    getInvolvedBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Check button text to determine action
            if (this.textContent.trim() === 'Get Involved') {
                window.location.href = 'pages/get-involved.html';
            } else if (this.textContent.trim() === 'Step Inside') {
                window.location.href = 'pages/inside-talje.html';
            }
        });
    });

    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'pages/projects.html';
        });
    });

    // ==========================================
    // SCROLL TO TOP BUTTON (Optional Enhancement)
    // ==========================================
    function createScrollToTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #e8642f;
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            display: none;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: all 0.3s;
        `;
        
        document.body.appendChild(scrollBtn);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });

        // Scroll to top when clicked
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        scrollBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = '#f07540';
        });

        scrollBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = '#e8642f';
        });
    }

    // Uncomment to enable scroll to top button
    // createScrollToTopButton();

    // ==========================================
    // LAZY LOADING FOR IMAGES (Performance)
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ==========================================
    // KEYBOARD ACCESSIBILITY
    // ==========================================
    // Allow Enter key to activate accordion cards
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

        // Update aria-expanded when accordion opens/closes
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