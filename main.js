// ========================================
// SKAR — Supreme-style Navigation & Checkout with URL Routing
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const desktopMenuItems = document.querySelectorAll('.menu-item');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    const categoryTitle = document.getElementById('categoryTitle');
    
    // Get all views
    const shopView = document.getElementById('shopView');
    const perfumeView = document.getElementById('perfumeView');
    const archiveView = document.getElementById('archiveView');
    
    // Get all story pages
    const mayassaStory = document.getElementById('mayassaStory');
    const desertWindStory = document.getElementById('desertWindStory');
    const sandDuneStory = document.getElementById('sandDuneStory');
    
    // Route mapping
    const routes = {
        '/': 'cases',
        '/cases': 'cases',
        '/perfume': 'perfume',
        '/perfume/mayassa': 'mayassaStory',
        '/perfume/riyadh-night': 'mayassaStory',
        '/perfume/desert-wind': 'desertWindStory',
        '/perfume/sand-dune': 'sandDuneStory',
        '/archive': 'archive'
    };
    
    // Function to hide all views
    function hideAllViews() {
        if (shopView) shopView.classList.add('hidden');
        if (perfumeView) perfumeView.classList.add('hidden');
        if (archiveView) archiveView.classList.add('hidden');
        if (mayassaStory) mayassaStory.classList.add('hidden');
        if (desertWindStory) desertWindStory.classList.add('hidden');
        if (sandDuneStory) sandDuneStory.classList.add('hidden');
    }
    
    // Function to navigate to a route
    function navigateTo(path, pushState = true) {
        const route = routes[path] || 'cases';
        
        hideAllViews();
        
        // Show the appropriate view
        switch(route) {
            case 'cases':
                if (shopView) shopView.classList.remove('hidden');
                updateActiveMenu('cases');
                break;
            case 'perfume':
                if (perfumeView) perfumeView.classList.remove('hidden');
                updateActiveMenu('perfume');
                break;
            case 'archive':
                if (archiveView) archiveView.classList.remove('hidden');
                updateActiveMenu('archive');
                break;
            case 'mayassaStory':
                if (mayassaStory) mayassaStory.classList.remove('hidden');
                updateActiveMenu('perfume');
                window.scrollTo(0, 0);
                break;
            case 'desertWindStory':
                if (desertWindStory) desertWindStory.classList.remove('hidden');
                updateActiveMenu('perfume');
                window.scrollTo(0, 0);
                break;
            case 'sandDuneStory':
                if (sandDuneStory) sandDuneStory.classList.remove('hidden');
                updateActiveMenu('perfume');
                window.scrollTo(0, 0);
                break;
        }
        
        // Update browser history
        if (pushState) {
            history.pushState({ path }, '', path);
        }
    }
    
    // Function to update active menu state
    function updateActiveMenu(category) {
        desktopMenuItems.forEach(m => {
            if (m.getAttribute('data-category') === category) {
                m.classList.add('active');
            } else {
                m.classList.remove('active');
            }
        });
        
        mobileMenuItems.forEach(m => {
            if (m.getAttribute('data-category') === category) {
                m.classList.add('active');
            } else {
                m.classList.remove('active');
            }
        });
    }
    
    // Function to switch views (legacy support)
    function switchView(category) {
        const pathMap = {
            'cases': '/cases',
            'perfume': '/perfume',
            'archive': '/archive'
        };
        navigateTo(pathMap[category] || '/cases');
    }
    
    // Function to show individual story page (legacy support)
    function showStoryPage(storyId) {
        const storyPathMap = {
            'mayassaStory': '/perfume/mayassa',
            'desertWindStory': '/perfume/desert-wind',
            'sandDuneStory': '/perfume/sand-dune'
        };
        navigateTo(storyPathMap[storyId]);
    }
    
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
            
            // Switch view
            switchView(category);
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
            
            // Switch view
            switchView(category);
        });
    });
    
    // ========================================
    // Checkout Modal
    // ========================================
    
    const checkoutOverlay = document.getElementById('checkoutOverlay');
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutClose = document.getElementById('checkoutClose');
    const productCards = document.querySelectorAll('.product-card:not(.locked-product)');
    const perfumeStoryCards = document.querySelectorAll('.perfume-story-card:not(.locked-perfume)');
    
    // Product data
    const products = {
        // Cases
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
        },
        // Perfumes
        'desert-wind': {
            name: 'Desert Wind',
            price: '89',
            image: 'images/perfume-desert-wind.svg',
            alt: 'Desert Wind Perfume Pod'
        },
        'riyadh-night': {
            name: 'Riyadh Night',
            price: '89',
            image: 'images/perfume-riyadh-night.svg',
            alt: 'Riyadh Night Perfume Pod'
        },
        'sand-dune': {
            name: 'Sand Dune',
            price: '89',
            image: 'images/perfume-sand-dune.svg',
            alt: 'Sand Dune Perfume Pod'
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
        // Don't close if already closing
        if (checkoutModal.classList.contains('closing')) {
            return;
        }
        
        checkoutModal.classList.add('closing');
        
        setTimeout(() => {
            checkoutOverlay.classList.remove('active');
            checkoutModal.classList.remove('closing');
            document.body.style.overflow = ''; // Restore scrolling
        }, 300); // Match the animation duration
    }
    
    // Add click handlers to available product cards (cases)
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productKey = card.getAttribute('data-color');
            openCheckout(productKey);
        });
        
        // Add cursor pointer style
        card.style.cursor = 'pointer';
    });
    
    // Add click handlers to perfume story cards (navigate to story page)
    perfumeStoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const perfumeKey = card.getAttribute('data-perfume');
            
            // Map perfume keys to story page IDs
            const storyMap = {
                'riyadh-night': 'mayassaStory',
                'desert-wind': 'desertWindStory',
                'sand-dune': 'sandDuneStory'
            };
            
            const storyId = storyMap[perfumeKey];
            if (storyId) {
                showStoryPage(storyId);
            }
        });
        
        // Add cursor pointer style
        card.style.cursor = 'pointer';
    });
    
    // Handle breadcrumb back navigation
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb-link');
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const backTo = link.getAttribute('data-back');
            
            if (backTo === 'perfume') {
                switchView('perfume');
                
                // Update active menu states
                desktopMenuItems.forEach(m => {
                    if (m.getAttribute('data-category') === 'perfume') {
                        m.classList.add('active');
                    } else {
                        m.classList.remove('active');
                    }
                });
                
                mobileMenuItems.forEach(m => {
                    if (m.getAttribute('data-category') === 'perfume') {
                        m.classList.add('active');
                    } else {
                        m.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Handle story CTA button clicks (trigger checkout)
    const storyCTAButtons = document.querySelectorAll('.story-cta-button');
    storyCTAButtons.forEach(button => {
        button.addEventListener('click', () => {
            const perfumeKey = button.getAttribute('data-perfume');
            openCheckout(perfumeKey);
        });
    });
    
    // Handle quick buy button clicks (trigger checkout)
    const quickBuyButtons = document.querySelectorAll('.quick-buy-button');
    quickBuyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const perfumeKey = button.getAttribute('data-perfume');
            openCheckout(perfumeKey);
        });
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
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        const path = e.state?.path || window.location.pathname;
        navigateTo(path, false);
    });
    
    // Handle initial page load
    const initialPath = window.location.pathname;
    navigateTo(initialPath, false);
});
