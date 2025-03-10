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

    // Initialize filter buttons
    initFilters();

    // Terminal typing effect for hero text
    initTypingEffect();

    // Form submission handling
    initForms();

    // FAQ Category Filters
    const categoryButtons = document.querySelectorAll('.category-btn');
    if (categoryButtons.length > 0) {
        const faqItems = document.querySelectorAll('.faq-item');
        
        // Add click event to category buttons
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const category = button.getAttribute('data-category');
                
                // Show all items if "all" category is selected
                if (category === 'all') {
                    faqItems.forEach(item => {
                        item.style.display = 'block';
                    });
                } else {
                    // Otherwise, show only items matching the selected category
                    faqItems.forEach(item => {
                        if (item.getAttribute('data-category') === category) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
        
        // FAQ Accordion functionality
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                // Check if the expanded class is present on the faq-grid
                const faqGrid = document.querySelector('.faq-grid');
                if (!faqGrid.classList.contains('expanded')) {
                    // Toggle active class for accordion effect
                    const isActive = item.classList.contains('active');
                    
                    // First, remove active class from all items
                    faqItems.forEach(faqItem => {
                        faqItem.classList.remove('active');
                    });
                    
                    // Then, add active class to clicked item (unless it was already active)
                    if (!isActive) {
                        item.classList.add('active');
                    }
                }
            });
        });
    }
});

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

// Add pixel noise effect randomly across the site
setInterval(() => {
    const pixelGlitch = document.createElement('div');
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
}, 200); 