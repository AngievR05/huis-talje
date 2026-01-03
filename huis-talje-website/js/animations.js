/* ==========================================
   HUIS TALJE - ANIMATIONS & INTERACTIONS
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // FADE IN ON SCROLL ANIMATION
    // ==========================================
    function fadeInOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Add fade-in class to sections you want to animate
    const sectionsToAnimate = [
        '.hero',
        '.our-story',
        '.what-we-do',
        '.heart-section'
    ];

    sectionsToAnimate.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('fade-in');
        }
    });

    fadeInOnScroll();

    // ==========================================
    // PARALLAX EFFECT (DISABLED)
    // ==========================================
    // Parallax removed to keep doodles in place

    // ==========================================
    // FLOATING ANIMATION (DISABLED)
    // ==========================================
    // Floating animation removed - washing line stays static

    // ==========================================
    // TYPEWRITER EFFECT FOR HERO TEXT (Optional)
    // ==========================================
    function typewriterEffect(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Uncomment to enable typewriter effect on hero text
    // const heroText = document.querySelector('.hero-text');
    // if (heroText) {
    //     const originalText = heroText.textContent;
    //     typewriterEffect(heroText, originalText, 30);
    // }

    // ==========================================
    // CARD FLIP ANIMATION ON HOVER (Optional)
    // ==========================================
    function addCardFlipEffect() {
        const cards = document.querySelectorAll('.accordion-card:not(.active)');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-5px) rotateY(5deg)';
                }
            });

            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0) rotateY(0)';
                }
            });
        });
    }

    addCardFlipEffect();

    // ==========================================
    // SMOOTH COLOR TRANSITION ON SCROLL
    // ==========================================
    function headerColorTransition() {
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            
            if (scrolled > 100) {
                header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }
        });
    }

    headerColorTransition();

    // ==========================================
    // ANIMATED COUNTER FOR STATISTICS (Optional)
    // ==========================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(start);
            }
        }, 16);
    }

    // Example usage - add to elements with class 'counter'
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    entry.target.classList.add('counted');
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ==========================================
    // SOCIAL ICON WIGGLE EFFECT
    // ==========================================
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach((icon, index) => {
        // Stagger the animation
        setTimeout(() => {
            icon.style.animation = 'wiggle 0.5s ease';
        }, index * 100);

        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'wiggle 0.5s ease';
        });

        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Add wiggle keyframes to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            75% { transform: rotate(10deg); }
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // BUTTON RIPPLE EFFECT
    // ==========================================
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Add ripple effect styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ==========================================
    // LOADING ANIMATION (Optional)
    // ==========================================
    function showLoadingAnimation() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        
        const loaderStyle = document.createElement('style');
        loaderStyle.textContent = `
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #FFF9E9;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 5px solid #DAC9FF;
                border-top: 5px solid #e8642f;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(loaderStyle);
        document.body.appendChild(loader);
        
        // Hide loader when page is fully loaded
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 500);
        });
    }

    // Uncomment to enable loading animation
    // showLoadingAnimation();

});