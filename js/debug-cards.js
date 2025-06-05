document.addEventListener('DOMContentLoaded', function() {
    // Function to log all event listeners on an element
    function logEventListeners(element) {
        const events = [
            'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseenter', 
            'mouseleave', 'mouseover', 'mouseout', 'touchstart', 'touchend', 'touchmove'
        ];
        
        console.log('Event listeners on:', element);
        
        events.forEach(event => {
            const listeners = getEventListeners(element)[event];
            if (listeners && listeners.length > 0) {
                console.log(`- ${event}:`, listeners.length, 'listener(s)');
                listeners.forEach((listener, i) => {
                    console.log(`  ${i + 1}.`, listener.listener.toString().split('\n')[0]);
                });
            }
        });
    }
    
    // Log event listeners on all feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    console.log(`Found ${featureCards.length} feature cards`);
    
    featureCards.forEach((card, index) => {
        console.log(`\n=== Card ${index + 1} ===`);
        logEventListeners(card);
    });
});
