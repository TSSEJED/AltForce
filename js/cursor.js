// Custom cursor functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create cursor element
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Update card hover effect based on mouse position
    function updateCardHoverEffect(e) {
        const cards = document.querySelectorAll('.feature-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    }
    
    // Simple cursor movement
    function moveCursor(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Update mouse position for card hover effect
        updateCardHoverEffect(e);
    }
    
    // Initialize cursor position
    document.addEventListener('mousemove', moveCursor);
    
    // Add hover effect for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .btn, input, textarea, select, .feature-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            if (element.classList.contains('feature-card')) {
                element.style.setProperty('--mouse-x', '50%');
                element.style.setProperty('--mouse-y', '50%');
            }
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
    
    // Add click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-click');
    });
    
    // Hide cursor when not needed
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
        }
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
    });
    
    // Disable cursor on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
});
