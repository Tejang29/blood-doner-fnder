document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScrolling();
    initFormHandling();
    initScrollAnimations();
    initCounterAnimations();
    initMobileMenu();
    initNewsletterForm();
    initServiceCardInteractions();
    initEmergencyContactClick();
    initBloodTypeInfo();
    initDonationTypeInfo();
    initSocialMediaLinks();
    initAccessibilityFeatures();
    initLazyLoadImages();
});

// ------------------------- NAVIGATION -------------------------
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        navbar.style.background = window.scrollY > 100 ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = window.scrollY > 100 ? '0 2px 20px rgba(0,0,0,0.15)' : '0 2px 20px rgba(0,0,0,0.1)';
    });

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Highlight active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section[id]').forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === #${current});
        });
    });
}

// ------------------------- SMOOTH SCROLLING -------------------------
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
}

// ------------------------- FORM HANDLING -------------------------
function initFormHandling() {
    const donationForm = document.getElementById('donationForm');
    const contactForm = document.getElementById('contactForm');

    if (donationForm) donationForm.addEventListener('submit', handleDonationForm);
    if (contactForm) contactForm.addEventListener('submit', handleContactForm);

    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function handleDonationForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerHTML = '<span class="loading"></span> Processing...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = 'Submit';
        btn.disabled = false;
        showMessage('Thank you for scheduling your donation!', 'success');
        e.target.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
}

function handleContactForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerHTML = '<span class="loading"></span> Sending...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = 'Submit';
        btn.disabled = false;
        showMessage('Thank you for your message!', 'success');
        e.target.reset();
    }, 2000);
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const name = field.name;
    let error = '';

    if (name === 'name' && value.length < 2) error = 'Name must be at least 2 characters';
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email';
    if (name === 'phone' && !/^[+]?\d{10,15}$/.test(value.replace(/\s/g, ''))) error = 'Invalid phone';
    if (['bloodType', 'donationType', 'date', 'time'].includes(name) && !value) error = 'Required field';

    if (error) {
        field.classList.add('error');
        showFieldError(field, error);
    }
}

function showFieldError(field, message) {
    const old = field.parentNode.querySelector('.field-error');
    if (old) old.remove();

    const error = document.createElement('div');
    error.className = 'field-error';
    error.style.color = '#e74c3c';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.textContent = message;
    field.parentNode.appendChild(error);
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    const error = field.parentNode.querySelector('.field-error');
    if (error) error.remove();
}

function showMessage(msg, type = 'success') {
    document.querySelectorAll('.message').forEach(m => m.remove());
    const box = document.createElement('div');
    box.className = message ${type};
    box.textContent = msg;
    document.body.prepend(box);
    setTimeout(() => box.remove(), 5000);
}

// ------------------------- SCROLL ANIMATIONS -------------------------
function initScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.service-card, .benefit-item, .contact-item, .about-content, .donation-form-container')
        .forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
}

function initCounterAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item h3').forEach(stat => observer.observe(stat));
}

function animateCounter(el) {
    const target = parseInt(el.textContent.replace(/,/g, ''));
    let current = 0;
    const step = target / 125;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString() + '+';
    }, 16);
}

// ------------------------- OTHER FEATURES -------------------------
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', e => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                showMessage('Thank you for subscribing!', 'success');
                form.reset();
            }
        });
    }
}

function initServiceCardInteractions() {
    document.querySelectorAll('.service-card .btn-outline').forEach(btn => {
        btn.addEventListener('click', () => {
            const service = btn.closest('.service-card').querySelector('h3').textContent;
            showMessage(Learn more about ${service} - Feature coming soon!, 'success');
        });
    });
}

function initEmergencyContactClick() {
    document.querySelectorAll('.emergency-contact p').forEach(contact => {
        contact.style.cursor = 'pointer';
        contact.addEventListener('click', () => {
            const text = contact.textContent;
            if (text.includes('1-800-LIFESAVER')) showMessage('Emergency hotline: 1-800-LIFESAVER (24/7)', 'success');
            else if (text.includes('emergency@lifesaver.org')) showMessage('Emergency email: emergency@lifesaver.org', 'success');
        });
    });
}

function initBloodTypeInfo() {
    const info = {
        'A+': 'Universal recipient for A+ and AB+',
        'A-': 'Universal recipient for A- and AB-',
        'B+': 'Universal recipient for B+ and AB+',
        'B-': 'Universal recipient for B- and AB-',
        'AB+': 'Universal recipient',
        'AB-': 'Universal recipient for AB-',
        'O+': 'Universal donor for positive types',
        'O-': 'Universal donor'
    };

    const select = document.getElementById('bloodType');
    if (select) {
        select.addEventListener('change', e => {
            const type = e.target.value;
            if (info[type]) showMessage(Blood Type ${type}: ${info[type]}, 'success');
        });
    }
}

function initDonationTypeInfo() {
    const info = {
        'whole': 'Whole blood saves 3 lives. Takes 10-15 minutes.',
        'platelets': 'Helps cancer patients. Takes 2-3 hours.',
        'plasma': 'Helps burn victims. Takes 1-2 hours.'
    };

    const select = document.getElementById('donationType');
    if (select) {
        select.addEventListener('change', e => {
            const type = e.target.value;
            if (info[type]) showMessage(info[type], 'success');
        });
    }
}

function initSocialMediaLinks() {
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const platform = link.querySelector('i').className.split(' ')[1].replace('fa-', '').toUpperCase();
            showMessage(${platform} link clicked - Feature coming soon!, 'success');
        });
    });
}

function initAccessibilityFeatures() {
    // ESC closes menu
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelector('.hamburger')?.classList.remove('active');
            document.querySelector('.nav-menu')?.classList.remove('active');
        }
    });

    // Focus outline
    document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
        el.addEventListener('focus', () => {
            el.style.outline = '2px solid #e74c3c';
            el.style.outlineOffset = '2px';
        });
        el.addEventListener('blur', () => {
            el.style.outline = '';
            el.style.outlineOffset = '';
        });
    });
}

function initLazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => observer.observe(img));
}

// Performance optimization: throttle scroll
window.addEventListener('scroll', debounce(() => {
    // Future scroll-based animations
}, 16));

function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}
