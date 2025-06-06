// Loading Screen Handler
document.addEventListener('DOMContentLoaded', function() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (!loadingOverlay) return;
    
    // Show loading overlay
    loadingOverlay.style.display = 'flex';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    // Hide after 1 second
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        
        // Re-enable scrolling and clean up
        function cleanup() {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.classList.add('loaded');
            
            // Animate content sections
            const sections = document.querySelectorAll('main > *');
            sections.forEach((section, index) => {
                section.style.transitionDelay = `${0.1 * (index + 1)}s`;
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
        }
        
        // Remove from DOM after fade out
        loadingOverlay.addEventListener('transitionend', function handler() {
            if (loadingOverlay.parentNode) {
                loadingOverlay.removeEventListener('transitionend', handler);
                loadingOverlay.parentNode.removeChild(loadingOverlay);
            }
            cleanup();
        });
        
        // Fallback in case transitionend doesn't fire
        setTimeout(cleanup, 1500);
    }, 1000);
});
