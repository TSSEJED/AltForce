// Prevent right-click and context menu with multiple event listeners
const preventContextMenu = function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
};

// Add multiple event listeners for context menu
['contextmenu', 'mousedown', 'mouseup', 'click'].forEach(event => {
    document.addEventListener(event, preventContextMenu, true);
    window.addEventListener(event, preventContextMenu, true);
    document.documentElement.addEventListener(event, preventContextMenu, true);
    if (window.frames) {
        for (let i = 0; i < window.frames.length; i++) {
            try {
                window.frames[i].document.addEventListener(event, preventContextMenu, true);
            } catch (e) {}
        }
    }
});

// Prevent keyboard shortcuts
const preventShortcuts = function(e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C, etc.
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) ||
        (e.ctrlKey && ['U', 'u', 'S', 's', 'P', 'p'].includes(e.key)) ||
        (e.altKey && e.key === 'F4')
    ) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    }
};

// Add multiple event listeners for keyboard shortcuts
['keydown', 'keyup', 'keypress'].forEach(event => {
    document.addEventListener(event, preventShortcuts, true);
    window.addEventListener(event, preventShortcuts, true);
    document.documentElement.addEventListener(event, preventShortcuts, true);
});

// Prevent drag and drop
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
}, true);

// Prevent selection
document.onselectstart = function() { return false; };
document.onmousedown = function() { return false; };

// Track cursor position for Discord button hover effect
function updateButtonHoverEffect(e) {
    const buttons = document.querySelectorAll('.btn-discord, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        button.style.setProperty('--mouse-x', `${x}px`);
        button.style.setProperty('--mouse-y', `${y}px`);
    });
}

// Add hover effect to all buttons
document.addEventListener('mousemove', updateButtonHoverEffect);

// Create floating particles for purchase section
function createParticles() {
    const section = document.getElementById('pricing');
    if (!section) return;
    
    // Clear any existing particles
    const existingParticles = document.querySelectorAll('.particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Create new particles
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 4px and 10px
        const size = Math.random() * 6 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position within section
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration between 15s and 30s
        const duration = Math.random() * 15 + 15;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay up to 10s
        const delay = Math.random() * 10;
        particle.style.animationDelay = `-${delay}s`;
        
        // Random opacity between 0.2 and 0.8
        const opacity = Math.random() * 0.6 + 0.2;
        particle.style.opacity = opacity;
        
        section.appendChild(particle);
    }
}

// Initialize particles on load and window resize
window.addEventListener('resize', createParticles);

document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles
    createParticles();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Animation on scroll (excluding feature cards which have their own animations)
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.pricing-card, .faq-item, .guideline-item, .service-item, .shop-category');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Guidelines Tab Functionality
    const initTabs = function() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        if (tabBtns.length > 0 && tabPanes.length > 0) {
            // Set first tab as active by default
            if (!document.querySelector('.tab-btn.active')) {
                tabBtns[0].classList.add('active');
                tabPanes[0].classList.add('active');
            }
            
            tabBtns.forEach((btn) => {
                btn.addEventListener('click', function() {
                    // Get the tab ID from data-tab attribute
                    const tabId = this.getAttribute('data-tab');
                    
                    // Remove active class from all buttons and panes
                    tabBtns.forEach(b => b.classList.remove('active'));
                    tabPanes.forEach(p => p.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Find and activate the corresponding tab pane
                    const targetPane = document.getElementById(tabId);
                    if (targetPane) {
                        targetPane.classList.add('active');
                    }
                });
            });
        }
    };
    
    // Run animation check on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Initialize tabs for Guidelines section
    initTabs();

});
