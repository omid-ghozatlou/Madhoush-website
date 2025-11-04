// Virtual Band - Main JavaScript - RTL Support

document.addEventListener('DOMContentLoaded', function() {
    // Check if page is RTL
    const isRTL = document.documentElement.dir === 'rtl';
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Animate hamburger menu
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    // Smooth scroll for banner buttons
    const bannerButtons = document.querySelectorAll('.banner-btn');
    bannerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // If it's a hash link, enable smooth scrolling
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and fade-in elements
    const fadeElements = document.querySelectorAll('.card, .fade-in');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(element);
    });

    // Parallax effect for banner sections
    let ticking = false;

    function updateParallax() {
        const banners = document.querySelectorAll('.banner');
        const scrolled = window.pageYOffset;

        banners.forEach(banner => {
            const rect = banner.getBoundingClientRect();
            const bannerTop = rect.top + scrolled;
            const bannerHeight = banner.offsetHeight;

            // Only apply parallax if banner is in viewport
            if (scrolled + window.innerHeight > bannerTop && scrolled < bannerTop + bannerHeight) {
                const speed = 0.5;
                const yPos = -(scrolled - bannerTop) * speed;
                const content = banner.querySelector('.banner-content');
                if (content) {
                    content.style.transform = `translateY(${yPos}px)`;
                }
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Header background on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 217, 255, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Card hover sound effect (optional - can be removed if no sound files)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add glow effect to buttons on hover
    const buttons = document.querySelectorAll('.banner-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.5)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Dynamic page title based on scroll position (for index page)
    if (document.querySelector('.banner')) {
        let currentBanner = 1;

        window.addEventListener('scroll', function() {
            const banners = document.querySelectorAll('.banner');
            const scrollPosition = window.pageYOffset + (window.innerHeight / 2);

            banners.forEach((banner, index) => {
                const bannerTop = banner.offsetTop;
                const bannerBottom = bannerTop + banner.offsetHeight;

                if (scrollPosition >= bannerTop && scrollPosition < bannerBottom) {
                    if (currentBanner !== index + 1) {
                        currentBanner = index + 1;
                        // Could trigger additional effects here
                    }
                }
            });
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

        if (konamiCode.join('').includes(konamiSequence.join(''))) {
            activateEasterEgg();
            konamiCode = [];
        }
    });

    function activateEasterEgg() {
        // Add special effect when Konami code is entered
        document.body.style.animation = 'rainbow 2s linear infinite';

        // Create style for rainbow animation if it doesn't exist
        if (!document.getElementById('rainbow-style')) {
            const style = document.createElement('style');
            style.id = 'rainbow-style';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // Show message
        const message = document.createElement('div');
        // Check if page is RTL for Persian message
        const isPageRTL = document.documentElement.dir === 'rtl';
        message.textContent = isPageRTL ? '🎉 حالت مجازی فعال شد! 🎉' : '🎉 Virtual Mode Activated! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
            padding: 2rem 4rem;
            font-size: 2rem;
            font-weight: bold;
            border-radius: 10px;
            z-index: 10000;
            animation: fadeIn 0.5s ease;
            direction: ${isPageRTL ? 'rtl' : 'ltr'};
        `;
        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
            document.body.style.animation = 'none';
        }, 3000);
    }

    // Add active state to current page navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.style.color = 'var(--accent-color)';
        }
    });

    // Console messages in Persian for RTL pages
    if (isRTL) {
        console.log('🎵 وبسایت مدهوش با موفقیت بارگذاری شد 🎵');
        console.log('💫 بُعد دیجیتال را کاوش کنید...');
    } else {
        console.log('🎵 Virtual Band Website Loaded Successfully 🎵');
        console.log('💫 Explore the digital dimension...');
    }
});
