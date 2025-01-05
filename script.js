// Theme Management
const initializeThemeToggle = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = `<i class="fas fa-${newTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
    });
};

const initializeResponsiveNav = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking nav links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
};


// Scroll Animations
const initializeScrollAnimations = () => {
    // Stats counter animation
    const statsNumbers = document.querySelectorAll('.stat-number');

    const formatNumber = (number) => {
        if (number < 1000) {
            return Math.round(number);
        } else {
            return (number / 1000).toFixed(1) + 'k';
        }
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    let count = 1;
                    const duration = 3000; // 3 seconds
                    const maxCount = target === 1000000 ? 1000 : (target === 5000000 ? 3000 : target);
                    const increment = (maxCount - 1) / (duration / 16); // 60fps

                    const updateCount = () => {
                        count += increment;
                        if (count < maxCount) {
                            // Format based on the current count
                            entry.target.textContent = formatNumber(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            // Set final values
                            if (target === 1000000) {
                                entry.target.textContent = '1k';
                            } else if (target === 5000000) {
                                entry.target.textContent = '3k';
                            } else {
                                entry.target.textContent = target;
                            }
                        }
                    };
                    
                    // Start from 1
                    entry.target.textContent = '1';
                    updateCount();
                }
            });
        },
        { threshold: 0.5 }
    );
    statsNumbers.forEach(number => observer.observe(number));

    // Navbar scroll effect
    document.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        navbar.style.boxShadow = window.scrollY > 50
            ? '0 2px 20px rgba(0,0,0,0.1)'
            : 'none';
    });
};

// Interactive Elements
const initializeInteractions = () => {
    // Feature cards animation
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Download button effects
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('mouseover', () => btn.style.transform = 'scale(1.05)');
        btn.addEventListener('mouseout', () => btn.style.transform = 'scale(1)');
    });

    // Floating UI animation
    const animateDots = () => {
        document.querySelectorAll('.animation-dot').forEach(dot => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            dot.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
    };
    setInterval(animateDots, 2000);
};

// FAQ System
const initializeFAQ = () => {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function () {
            const item = this.parentElement;
            document.querySelectorAll('.faq-item')
                .forEach(otherItem => {
                    if (otherItem !== item) otherItem.classList.remove('active');
                });
            item.classList.toggle('active');
        });
    });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggle();
    initializeScrollAnimations();
    initializeInteractions();
    initializeFAQ();
    initializeResponsiveNav();
});