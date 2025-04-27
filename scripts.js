document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="loading-text">LOADING</div>';
    document.body.appendChild(loadingScreen);

    // Simulate loading time for retro feel
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);

    // Initialize mobile menu
    initMobileMenu();

    // Initialize filter buttons
    initFilters();

    // Terminal typing effect for hero text
    initTypingEffect();

    // Form submission handling
    initForms();
});

// Mobile menu functionality
function initMobileMenu() {
    // Create the menu button if it doesn't exist yet
    if (!document.querySelector('.menu-btn')) {
        const header = document.querySelector('header .container');
        const nav = document.querySelector('nav');
        
        // Create menu button element
        const menuBtn = document.createElement('div');
        menuBtn.className = 'menu-btn';
        menuBtn.innerHTML = '<span></span>';
        
        // Insert menu button after the logo
        const logo = document.querySelector('.logo');
        if (logo && header) {
            header.insertBefore(menuBtn, nav);
        }
        
        // Add click event to toggle menu
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Close menu when clicking a link (mobile)
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const menuBtn = document.querySelector('.menu-btn');
            const nav = document.querySelector('nav');
            
            // Only do this on mobile screens
            if (window.innerWidth < 768) {
                menuBtn.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // Handle resize events
    window.addEventListener('resize', function() {
        const menuBtn = document.querySelector('.menu-btn');
        const nav = document.querySelector('nav');
        
        // Remove active classes on desktop
        if (window.innerWidth >= 768) {
            if (menuBtn) menuBtn.classList.remove('active');
            if (nav) nav.classList.remove('active');
        }
    });
}

// Filter functionality for portfolio and blog items
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter items based on category
                filterItems(filterValue);
            });
        });
    }
}

function filterItems(filter) {
    const items = document.querySelectorAll('[data-category]');
    
    if (items.length) {
        items.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'grid';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 50);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    }
}

// Terminal typing effect
function initTypingEffect() {
    const heroTextElements = document.querySelectorAll('.hero-text p');
    
    if (heroTextElements.length) {
        heroTextElements.forEach((element, index) => {
            const text = element.textContent;
            element.innerHTML = '';
            element.classList.add('cursor-blink');
            
            // Stagger the typing effect for each paragraph
            setTimeout(() => {
                typeText(element, text, 0);
            }, index * 1500);
        });
    }
}

function typeText(element, text, index) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeText(element, text, index + 1), 50);
    } else {
        element.classList.remove('cursor-blink');
    }
}

// Form submission handling
function initForms() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate form submission with retro loading effect
            simulateFormSubmission(contactForm, 'MESSAGE SENT SUCCESSFULLY!');
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate form submission with retro loading effect
            simulateFormSubmission(newsletterForm, 'SUBSCRIBED SUCCESSFULLY!');
        });
    }
}

function simulateFormSubmission(form, successMessage) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Disable form and show loading text
    form.querySelectorAll('input, textarea, select, button').forEach(el => {
        el.disabled = true;
    });
    
    submitButton.textContent = 'PROCESSING...';
    
    // Simulate processing time
    setTimeout(() => {
        // Create success message
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = successMessage;
        successElement.style.padding = '20px';
        successElement.style.border = '2px solid white';
        successElement.style.marginTop = '20px';
        successElement.style.textAlign = 'center';
        
        // Replace form with success message
        form.style.opacity = '0';
        setTimeout(() => {
            form.style.display = 'none';
            form.parentNode.appendChild(successElement);
            
            // Reset form in background
            form.reset();
            submitButton.textContent = originalText;
            form.querySelectorAll('input, textarea, select, button').forEach(el => {
                el.disabled = false;
            });
        }, 500);
    }, 2000);
}

// Touch device detection
function isTouchDevice() {
    return (('ontouchstart' in window) || 
            (navigator.maxTouchPoints > 0) || 
            (navigator.msMaxTouchPoints > 0));
}

// Add pixel noise effect randomly across the site
setInterval(() => {
    // Limit the number of pixel glitches based on screen size
    const maxGlitches = window.innerWidth <= 768 ? 2 : 5;
    
    // Only create new glitches if there aren't too many already
    const currentGlitches = document.querySelectorAll('.pixel-glitch').length;
    if (currentGlitches < maxGlitches) {
        const pixelGlitch = document.createElement('div');
        pixelGlitch.className = 'pixel-glitch';
        pixelGlitch.style.position = 'fixed';
        pixelGlitch.style.width = '2px';
        pixelGlitch.style.height = '2px';
        pixelGlitch.style.backgroundColor = 'white';
        pixelGlitch.style.zIndex = '9998';
        pixelGlitch.style.opacity = Math.random() > 0.7 ? '1' : '0.5';
        pixelGlitch.style.left = Math.random() * window.innerWidth + 'px';
        pixelGlitch.style.top = Math.random() * window.innerHeight + 'px';
        
        document.body.appendChild(pixelGlitch);
        
        setTimeout(() => {
            pixelGlitch.remove();
        }, 100 + Math.random() * 200);
    }
}, 200); 