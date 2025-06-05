// Enhanced security measures for the coming-soon page
document.addEventListener('DOMContentLoaded', function() {
    // Block right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    }, false);

    // Block keyboard shortcuts
    const blockedKeys = [
        123, // F12
        17,  // Ctrl
        18,  // Alt
        16,  // Shift
        73,  // I
        74,  // J
        67,  // C
        83,  // S
        85,  // U
        80,  // P
        27,  // Esc
        91,  // Windows key
        93,  // Windows menu key
        224  // Command (Mac)
    ];


    document.addEventListener('keydown', function(e) {
        // Block F1-F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, etc.
        if (e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
            (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
            (e.ctrlKey && e.keyCode === 83) || // Ctrl+S
            (e.ctrlKey && e.keyCode === 80) || // Ctrl+P
            (e.altKey && e.keyCode === 115) || // Alt+F4
            (e.metaKey && e.altKey && e.keyCode === 73) || // Cmd+Opt+I (Mac)
            blockedKeys.includes(e.keyCode)) {
            e.preventDefault();
            e.returnValue = false;
            return false;
        }
    }, true);

    // Disable text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    }, false);

    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    }, false);

    // Disable images context menu
    document.addEventListener('contextmenu', function(e) {
        if (e.target.nodeName === 'IMG') {
            e.preventDefault();
            return false;
        }
    }, false);

    // Prevent opening developer tools
    (function() {
        function blockDevTools() {
            const devtools = /./;
            devtools.toString = function() {
                document.body.innerHTML = '<h1>Access Denied</h1><p>Developer tools are disabled on this page.</p>';
                return '';
            };
            console.log(devtools);
        }
        
        // Check for devtools opening
        setInterval(function() {
            const before = new Date().getTime();
            debugger;
            const after = new Date().getTime();
            if (after - before > 100) { // If dev tools is open
                document.body.innerHTML = '<h1>Access Denied</h1><p>Developer tools are disabled on this page.</p>';
                window.location.href = 'about:blank';
            }
        }, 1000);
    })();

    // Disable print screen
    document.addEventListener('keyup', function(e) {
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText('');
            alert('Print Screen is disabled');
        }
    });

    // Prevent saving the page
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey && e.key === 's') || (e.metaKey && e.key === 's')) {
            e.preventDefault();
            return false;
        }
    });

    // Disable view source
    document.onkeydown = function(e) {
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
            return false;
        }
    };

    // Disable right-click menu
    document.oncontextmenu = function() {
        return false;
    };

    // Disable text selection
    document.onselectstart = function() {
        return false;
    };

    // Prevent dragging images
    document.ondragstart = function() {
        return false;
    };

    // Prevent image dragging
    const images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        images[i].setAttribute('draggable', 'false');
    }

    // Prevent opening developer tools with F12 or right-click inspect
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.key === 'U') ||
            (e.metaKey && e.altKey && e.key === 'I')) {
            e.preventDefault();
            return false;
        }
    });
});
