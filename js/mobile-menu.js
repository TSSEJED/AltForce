// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    // Close mobile menu when clicking outside
    function closeMenuOnClickOutside(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            toggleMobileMenu();
        }
    }
    
    // Close menu when clicking on a link
    function closeMenuOnLinkClick() {
        if (navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
    
    // Event listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking on nav links
    navLinksItems.forEach(link => {
        link.addEventListener('click', closeMenuOnLinkClick);
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Close menu when window is resized to desktop
    function handleResize() {
        if (window.innerWidth > 991 && navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Add click outside listener
    document.addEventListener('click', closeMenuOnClickOutside);
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
