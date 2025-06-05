// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links with data-scroll attribute
    document.querySelectorAll('a[href^="#"][data-scroll]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate the target position with offset for fixed header
                const headerOffset = 80; // Adjust this value based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Smooth scroll to the target
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update URL hash without scrolling
    window.addEventListener('scroll', function() {
        // This prevents the default behavior of jumping to the hash
        if (window.location.hash) {
            const hash = window.location.hash;
            if (document.querySelector(hash)) {
                history.replaceState(null, null, ' ' + hash);
            }
        }
    }, false);
});
