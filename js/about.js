// Enhanced scroll animations for about section
document.addEventListener('DOMContentLoaded', function() {
    // Configure the intersection observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Add the 'animate' class to trigger the animation
            entry.target.classList.add('animate');
            
            // For stat items, add a counting animation
            if (entry.target.classList.contains('stat-number') && entry.target.dataset.count) {
                animateCounter(entry.target);
            }
            
            // Unobserve after animation completes
            setTimeout(() => {
                observer.unobserve(entry.target);
            }, 1000);
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Animate counter function
    function animateCounter(element) {
        const target = parseInt(element.dataset.count || '0', 10);
        const duration = 1500; // 1.5 seconds
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out function for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Observe all elements that should animate
    document.querySelectorAll('.feature-card, .stat-item, .about-text, .stat-number').forEach(el => {
        observer.observe(el);
    });

    // Card effects have been removed as requested
});
