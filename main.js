// ========================================
// SKAR — Supreme-style Navigation & Checkout
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const desktopMenuItems = document.querySelectorAll('.menu-item');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    const categoryTitle = document.getElementById('categoryTitle');
    
    // Handle desktop menu clicks
    desktopMenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const category = item.getAttribute('data-category');
            
            // Update active state for desktop
            desktopMenuItems.forEach(m => m.classList.remove('active'));
            item.classList.add('active');
            
            // Sync mobile menu
            mobileMenuItems.forEach(m => {
                if (m.getAttribute('data-category') === category) {
                    m.classList.add('active');
                } else {
                    m.classList.remove('active');
                }
            });
            
            // Update category title
            if (categoryTitle) {
                categoryTitle.textContent = category;
            }
        });
    });
    
    // Handle mobile menu clicks
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const category = item.getAttribute('data-category');
            
            // Update active state for mobile
            mobileMenuItems.forEach(m => m.classList.remove('active'));
            item.classList.add('active');
            
            // Sync desktop menu
            desktopMenuItems.forEach(m => {
                if (m.getAttribute('data-category') === category) {
                    m.classList.add('active');
                } else {
                    m.classList.remove('active');
                }
            });
            
            // Update category title
            if (categoryTitle) {
                categoryTitle.textContent = category;
            }
        });
    });
    
    // ========================================
    // Checkout Modal
    // ========================================
    
    const checkoutOverlay = document.getElementById('checkoutOverlay');
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutClose = document.getElementById('checkoutClose');
    const productCards = document.querySelectorAll('.product-card:not(.locked-product)');
    
    // Product data
    const products = {
        'off-white': {
            name: 'Off White',
            price: '149',
            image: 'images/off-white.png',
            alt: 'Off White Case'
        },
        'titanium': {
            name: 'Metallic Titanium',
            price: '199',
            image: 'images/metalic-titanium.png',
            alt: 'Metallic Titanium Case'
        }
    };
    
    // Open checkout modal
    function openCheckout(productKey) {
        const product = products[productKey];
        if (!product) return;
        
        // Populate modal with product data
        document.getElementById('checkoutProductImage').src = product.image;
        document.getElementById('checkoutProductImage').alt = product.alt;
        document.getElementById('checkoutProductName').textContent = product.name;
        document.getElementById('checkoutProductPrice').textContent = product.price;
        
        // Show modal
        checkoutOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Close checkout modal
    function closeCheckout() {
        checkoutModal.classList.add('closing');
        
        setTimeout(() => {
            checkoutOverlay.classList.remove('active');
            checkoutModal.classList.remove('closing');
            document.body.style.overflow = ''; // Restore scrolling
        }, 300); // Match the animation duration
    }
    
    // Add click handlers to available product cards
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productKey = card.getAttribute('data-color');
            openCheckout(productKey);
        });
        
        // Add cursor pointer style
        card.style.cursor = 'pointer';
    });
    
    // Close modal on close button click
    checkoutClose.addEventListener('click', closeCheckout);
    
    // Close modal on overlay click (outside modal)
    checkoutOverlay.addEventListener('click', (e) => {
        if (e.target === checkoutOverlay) {
            closeCheckout();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && checkoutOverlay.classList.contains('active')) {
            closeCheckout();
        }
    });
    
    // Prevent modal content clicks from closing modal
    checkoutModal.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});
