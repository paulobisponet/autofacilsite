// Main JavaScript functionality for AutoFácil Peças

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Show loading spinner
    showLoadingSpinner();
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }
    
    // Initialize components
    initializeHeader();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeContactForm();
    initializeStatsAnimation();
    initializeCardEffects();
    initializeWhatsApp();
    initializeFormValidation();
    initializeScrollEffects();
    initializeButtonStates();
    initializeLazyLoading();
    
    // Hide loading spinner after initialization
    setTimeout(hideLoadingSpinner, 1000);
    
    console.log('🚗 AutoFácil Peças - Site inicializado com sucesso!');
    console.log('📱 WhatsApp: (81) 99160-0572');
    console.log('📧 E-mail: contato@autofacilpecas.com.br');
}

// Loading Spinner Functions
function showLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.remove('hidden');
    }
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.add('hidden');
        
        // Add fade-in animation to body
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
}

// Header Functionality
function initializeHeader() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        // Close mobile menu with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const header = document.getElementById('header');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Handler
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone') || 'Não informado';
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Create WhatsApp message
            const whatsappMessage = `🚗 *Nova mensagem do site AutoFácil Peças*

👤 *Nome:* ${name}
📧 *E-mail:* ${email}
📱 *Telefone:* ${phone}
📋 *Assunto:* ${subject}

💬 *Mensagem:*
${message}

---
Enviado através do site autofacilpecas.com.br`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Open WhatsApp
            window.open(`https://wa.me/5581991600572?text=${encodedMessage}`, '_blank');
            
            // Show success message and reset form
            showNotification('✅ Redirecionando para o WhatsApp! Sua mensagem será enviada diretamente para nossa equipe.', 'success');
            this.reset();
        });
    }
}

// Stats Counter Animation
function initializeStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            const suffix = stat.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 100;
            const duration = 2500;
            const stepTime = duration / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
        });
    };

    // Trigger stats animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
}

// Card Effects
function initializeCardEffects() {
    // Enhanced Product Cards Interaction
    document.querySelectorAll('.product-card, .feature-card, .service-card, .testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 215, 0, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// WhatsApp Integration
function initializeWhatsApp() {
    // Auto-hide WhatsApp button on scroll up for better UX
    let lastWhatsAppScrollY = window.scrollY;
    const whatsappBtn = document.querySelector('.whatsapp-float');

    if (whatsappBtn) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastWhatsAppScrollY && currentScrollY > 300) {
                whatsappBtn.style.transform = 'translateY(120px)';
            } else {
                whatsappBtn.style.transform = 'translateY(0)';
            }
            
            lastWhatsAppScrollY = currentScrollY;
        });
    }
}

// Form Validation
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    const fieldType = field.type;
    
    // Remove previous error state
    field.classList.remove('error', 'success');
    
    // Check if required field is empty
    if (isRequired && !value) {
        setFieldError(field, 'Este campo é obrigatório');
        return false;
    }
    
    // Validate email
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setFieldError(field, 'Por favor, insira um e-mail válido');
            return false;
        }
    }
    
    // Validate phone
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
        if (!phoneRegex.test(value)) {
            setFieldError(field, 'Por favor, insira um telefone válido');
            return false;
        }
    }
    
    // Field is valid
    if (value) {
        setFieldSuccess(field);
    }
    
    return true;
}

function setFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#EF4444';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    // Show error message
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.color = '#EF4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.style.display = 'block';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function setFieldSuccess(field) {
    field.classList.add('success');
    field.style.borderColor = 'var(--primary-yellow)';
    field.style.boxShadow = '0 0 0 3px rgba(255, 215, 0, 0.1)';
    
    // Remove error message
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Scroll Effects
function initializeScrollEffects() {
    // Enhanced parallax effect for hero section
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallaxSpeed = scrolled * 0.3;
                hero.style.transform = `translateY(${parallaxSpeed}px)`;
            }
        }
    }, 16));
}

// Button Loading States
function initializeButtonStates() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.type === 'submit') {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                this.style.opacity = '0.8';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                }, 3000);
            }
        });
    });
}

// Lazy Loading Implementation
function initializeLazyLoading() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all lazy-load elements
    document.querySelectorAll('.lazy-load, [data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        z-index: 10000;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    `;
    
    // Set notification styles based on type
    switch (type) {
        case 'success':
            notification.style.background = '#10B981';
            notification.style.color = '#FFFFFF';
            break;
        case 'error':
            notification.style.background = '#EF4444';
            notification.style.color = '#FFFFFF';
            break;
        case 'warning':
            notification.style.background = '#F59E0B';
            notification.style.color = '#FFFFFF';
            break;
        default:
            notification.style.background = '#003366';
            notification.style.color = '#FFFFFF';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Analytics Tracking (opcional)
function trackEvent(eventName, properties = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }
    
    // Console log para desenvolvimento
    console.log('Event tracked:', eventName, properties);
}

// Track page interactions
function initializeAnalytics() {
    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('button_click', {
                button_text: buttonText,
                button_location: this.closest('section')?.id || 'unknown'
            });
        });
    });

    // Track WhatsApp clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('whatsapp_click', {
                source: this.className || 'link'
            });
        });
    });

    // Track email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('email_click', {
                email: this.getAttribute('href').replace('mailto:', '')
            });
        });
    });

    // Track form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackEvent('form_submit', {
                form_type: 'contact'
            });
        });
    }
}

// Initialize analytics if needed
// initializeAnalytics();

// Dynamic year update in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
}

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
            
            console.log(`🚀 Performance Metrics:
                - Load Time: ${loadTime.toFixed(2)}ms
                - DOM Content Loaded: ${domContentLoaded.toFixed(2)}ms
                - Total Page Load: ${navigation.loadEventEnd - navigation.fetchStart}ms
            `);
            
            // Track performance if analytics is enabled
            trackEvent('page_performance', {
                load_time: Math.round(loadTime),
                dom_ready_time: Math.round(domContentLoaded)
            });
        });
    }
}

// Initialize performance monitoring
measurePerformance();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
    
    // Track error if analytics is enabled
    trackEvent('javascript_error', {
        error_message: e.message,
        error_filename: e.filename
    });
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    
    // Track promise rejection if analytics is enabled
    trackEvent('promise_rejection', {
        reason: e.reason?.toString() || 'Unknown'
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .error-message {
        animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Enhanced scroll behavior for sections
function enhanceScrollBehavior() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', throttle(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100));
}

// Initialize enhanced scroll behavior
enhanceScrollBehavior();

// Add active state styles for navigation
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: var(--primary-blue);
        font-weight: 700;
    }
    
    .nav-link.active:after {
        width: 100%;
    }
`;
document.head.appendChild(navStyle);

// Console welcome message
console.log(`
🚗 ======================================
   AUTOFÁCIL PEÇAS - SITE CARREGADO
======================================

📱 WhatsApp: (81) 99160-0572
📧 E-mail: contato@autofacilpecas.com.br
📍 Endereço: Rua PE-96, Jiquiá, Água Preta-PE
🕒 Horário: Seg-Sex 7h-18h | Sáb 7h-12h

✨ Recursos ativados:
• Animações AOS
• Menu responsivo
• Formulário inteligente
• WhatsApp integrado
• Validação de campos
• Analytics tracking
• Performance monitoring
• Service Worker

🎯 Rápido, Fácil e Confiável!
======================================
`);

// Export functions for potential external use
window.AutoFacil = {
    showNotification,
    trackEvent,
    validateField,
    throttle,
    debounce
};
