// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-nav-menu');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const closeMenuBtn = document.querySelector('.mobile-close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        
        // Toggle menu button animation
        const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
        if (menuIcon) {
            menuIcon.classList.toggle('active');
        }
    }
    
    // Close mobile menu when clicking outside
    function closeMenuOnClickOutside(e) {
        if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            toggleMobileMenu();
        }
    }
    
    // Close menu when clicking on a link
    function closeMenuOnLinkClick() {
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
    
    // Event listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', toggleMobileMenu);
        document.addEventListener('click', closeMenuOnClickOutside);
    }
    
    // Close menu when clicking on mobile links
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenuOnLinkClick);
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Close menu when window is resized to desktop
    function handleResize() {
        if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
    
    window.addEventListener('resize', handleResize);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});
