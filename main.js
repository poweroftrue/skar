// ========================================
// SKAR — Supreme-style Navigation & Checkout with URL Routing
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const desktopMenuItems = document.querySelectorAll('.menu-item');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    const categoryTitle = document.getElementById('categoryTitle');
    const headerLocation = document.querySelector('.header-location');
    
    // Get all views
    const shopView = document.getElementById('shopView');
    const perfumeView = document.getElementById('perfumeView');
    const archiveView = document.getElementById('archiveView');
    const cartView = document.getElementById('cartView');
    
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
        '/archive': 'archive',
        '/cart': 'cart'
    };
    
    // Function to hide all views
    function hideAllViews() {
        if (shopView) shopView.classList.add('hidden');
        if (perfumeView) perfumeView.classList.add('hidden');
        if (archiveView) archiveView.classList.add('hidden');
        if (cartView) cartView.classList.add('hidden');
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
            case 'cart':
                if (cartView) cartView.classList.remove('hidden');
                updateActiveMenu('cart');
                updateCartView();
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
            'archive': '/archive',
            'cart': '/cart'
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
    
    // ========================================
    // Cart State Management
    // ========================================
    
    // Cart state
    let cart = JSON.parse(localStorage.getItem('skar-cart')) || {};
    
    // Cart functions
    function addToCart(productKey, quantity = 1) {
        console.log('addToCart called with:', productKey, quantity);
        console.log('products[productKey]:', products[productKey]);
        
        if (!products[productKey]) {
            console.log('Product not found:', productKey);
            return;
        }
        
        if (cart[productKey]) {
            cart[productKey] += quantity;
        } else {
            cart[productKey] = quantity;
        }
        
        console.log('Cart after adding:', cart);
        
        saveCart();
        updateCartCount();
        
        // Show success feedback
        showCartFeedback('added to cart');
    }
    
    function removeFromCart(productKey) {
        if (cart[productKey]) {
            delete cart[productKey];
            saveCart();
            updateCartCount();
            updateCartView();
        }
    }
    
    function emptyCart() {
        cart = {};
        saveCart();
        updateCartCount();
        updateCartView();
        showCartFeedback('cart emptied');
    }
    
    function updateCartQuantity(productKey, quantity) {
        if (quantity <= 0) {
            removeFromCart(productKey);
            return;
        }
        
        if (cart[productKey]) {
            cart[productKey] = quantity;
            saveCart();
            updateCartCount();
            updateCartView();
        }
    }
    
    function saveCart() {
        localStorage.setItem('skar-cart', JSON.stringify(cart));
    }
    
    function getCartItemCount() {
        const count = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
        console.log('getCartItemCount called, cart:', cart, 'count:', count);
        return count;
    }
    
    function getCartTotal() {
        return Object.entries(cart).reduce((total, [productKey, quantity]) => {
            const product = products[productKey];
            return total + (product ? parseInt(product.price) * quantity : 0);
        }, 0);
    }
    
    function updateCartCount() {
        const count = getCartItemCount();
        const desktopCount = document.getElementById('desktopCartCount');
        const mobileCount = document.getElementById('mobileCartCount');
        const desktopCartItem = document.querySelector('.sidebar .cart-menu-item');
        const mobileCartItem = document.querySelector('.mobile-nav .cart-menu-item');
        
        console.log('updateCartCount called, count:', count);
        console.log('desktopCount element:', desktopCount);
        console.log('mobileCount element:', mobileCount);
        console.log('desktopCartItem element:', desktopCartItem);
        console.log('mobileCartItem element:', mobileCartItem);
        
        if (desktopCount) desktopCount.textContent = count;
        if (mobileCount) mobileCount.textContent = count;
        
        // Show/hide cart menu items based on cart content
        if (desktopCartItem) {
            desktopCartItem.style.display = count > 0 ? 'flex' : 'none';
        }
        if (mobileCartItem) {
            mobileCartItem.style.display = count > 0 ? 'flex' : 'none';
        }
    }
    
    function updateCartView() {
        const cartItems = document.getElementById('cartItems');
        const cartSubtitle = document.getElementById('cartSubtitle');
        const cartTotalAmount = document.getElementById('cartTotalAmount');
        const cartSummary = document.getElementById('cartSummary');
        const cartActions = document.getElementById('cartActions');
        
        if (!cartItems) return;
        
        const cartEntries = Object.entries(cart);
        
        if (cartEntries.length === 0) {
            // Empty cart state
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <h3 class="cart-empty-title">your cart is empty</h3>
                    <p class="cart-empty-text">add some items to get started</p>
                    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                        <button class="cart-empty-btn" onclick="navigateTo('/cases')">browse cases</button>
                        <button class="cart-empty-btn" onclick="navigateTo('/perfume')">browse perfume</button>
                    </div>
                </div>
            `;
            cartSubtitle.textContent = 'empty';
            cartTotalAmount.textContent = '0';
            cartSummary.style.display = 'none';
            cartActions.style.display = 'none';
        } else {
            // Populate cart items
            cartItems.innerHTML = cartEntries.map(([productKey, quantity]) => {
                const product = products[productKey];
                if (!product) return '';
                
                return `
                    <div class="cart-item" data-product="${productKey}">
                        <div class="cart-item-image">
                            <img src="${product.image}" alt="${product.alt}">
                        </div>
                        <div class="cart-item-info">
                            <h3 class="cart-item-name">${product.name}</h3>
                            <p class="cart-item-price">
                                <span class="price-amount">${product.price}</span>
                                <img src="/Saudi_Riyal_Symbol.svg" alt="SAR" class="sar-symbol">
                            </p>
                        </div>
                        <div class="cart-item-controls">
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="updateCartQuantity('${productKey}', ${quantity - 1})" ${quantity <= 1 ? 'disabled' : ''}>−</button>
                                <span class="quantity-display">${quantity}</span>
                                <button class="quantity-btn" onclick="updateCartQuantity('${productKey}', ${quantity + 1})">+</button>
                            </div>
                            <button class="remove-item-btn" onclick="removeFromCart('${productKey}')">remove</button>
                        </div>
                    </div>
                `;
            }).join('');
            
            cartSubtitle.textContent = `${cartEntries.length} item${cartEntries.length !== 1 ? 's' : ''}`;
            cartTotalAmount.textContent = getCartTotal();
            cartSummary.style.display = 'block';
            cartActions.style.display = 'block';
            
            // Add empty cart button to actions
            cartActions.innerHTML = `
                <div style="display: flex; gap: 12px;">
                    <button class="cart-btn secondary" onclick="emptyCart()">empty cart</button>
                    <button class="cart-btn primary" id="checkoutBtn">checkout</button>
                </div>
            `;
        }
    }
    
    function showCartFeedback(message) {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: var(--color-black);
            color: var(--color-white);
            padding: 12px 24px;
            border-radius: 4px;
            font-size: 0.875rem;
            font-weight: var(--font-weight-medium);
            letter-spacing: 0.02em;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        feedback.textContent = message;
        document.body.appendChild(feedback);
        
        // Animate in
        setTimeout(() => {
            feedback.style.opacity = '1';
        }, 10);
        
        // Animate out and remove
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 1500);
    }
    
    // Initialize cart count and view on page load
    updateCartCount();
    updateCartView();
    
    
    // Expose cart functions globally for onclick handlers
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateCartQuantity = updateCartQuantity;
    window.emptyCart = emptyCart;
    window.navigateTo = navigateTo;
    
    // Add item directly to cart or show checkout modal if cart is empty
    function addToCartDirect(productKey) {
        const product = products[productKey];
        if (!product) return;
        
        const cartEntries = Object.entries(cart);
        
        // If cart is empty, show checkout modal
        if (cartEntries.length === 0) {
            openCheckout(productKey);
        } else {
            // If cart has items, add directly
            addToCart(productKey);
            showCartFeedback(`${product.name} added to cart`);
        }
    }
    
    // Open checkout modal
    function openCheckout(productKey) {
        const product = products[productKey];
        if (!product) return;
        
        // Complete reset of overlay state
        checkoutOverlay.style.display = '';
        checkoutOverlay.style.opacity = '';
        checkoutOverlay.style.pointerEvents = '';
        checkoutOverlay.style.visibility = '';
        checkoutModal.classList.remove('closing');
        
        // Force layout recalculation
        checkoutOverlay.offsetHeight;
        
        // Populate modal with product data
        document.getElementById('checkoutProductImage').src = product.image;
        document.getElementById('checkoutProductImage').alt = product.alt;
        document.getElementById('checkoutProductName').textContent = product.name;
        document.getElementById('checkoutProductPrice').textContent = product.price;
        
        // Update add to cart button to use the correct product key
        const addToCartBtn = checkoutModal.querySelector('.checkout-btn:not(.primary)');
        if (addToCartBtn) {
            addToCartBtn.onclick = () => {
                addToCart(productKey);
                closeCheckout();
            };
        }
        
        // Update buy now button
        const buyNowBtn = checkoutModal.querySelector('.checkout-btn.primary');
        if (buyNowBtn) {
            buyNowBtn.onclick = () => {
                addToCart(productKey);
                closeCheckout();
                // Navigate to cart for immediate checkout
                navigateTo('/cart');
            };
        }
        
        // Small delay to ensure clean state before showing
        setTimeout(() => {
            checkoutOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }, 10);
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
            
            // Comprehensive fix for mobile overlay issues
            checkoutOverlay.style.display = 'none';
            checkoutOverlay.style.opacity = '0';
            checkoutOverlay.style.pointerEvents = 'none';
            checkoutOverlay.style.visibility = 'hidden';
            
            // Force repaint
            checkoutOverlay.offsetHeight;
            
            // Reset after a short delay
            setTimeout(() => {
                checkoutOverlay.style.display = '';
                checkoutOverlay.style.opacity = '';
                checkoutOverlay.style.pointerEvents = '';
                checkoutOverlay.style.visibility = '';
            }, 50);
        }, 300); // Match the animation duration
    }
    
    // Add click handlers to available product cards (cases)
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productKey = card.getAttribute('data-color');
            addToCartDirect(productKey);
        });
        
        // Add cursor pointer style
        card.style.cursor = 'pointer';
    });
    
    // Handle perfume story buttons
    const perfumeButtons = document.querySelectorAll('.perfume-btn');
    perfumeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click
            
            // Check if it's a story button or cart button
            const storyKey = button.getAttribute('data-story');
            const perfumeKey = button.getAttribute('data-perfume');
            
            if (storyKey) {
                // Navigate to story page
                const storyMap = {
                    'mayassa': '/perfume/mayassa',
                    'desert-wind': '/perfume/desert-wind',
                    'sand-dune': '/perfume/sand-dune'
                };
                navigateTo(storyMap[storyKey]);
            } else if (perfumeKey) {
                // Add directly to cart
                addToCartDirect(perfumeKey);
            }
        });
    });
    
    // Handle logo click to navigate home
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('/');
        });
    }
    
    // Handle story CTA button clicks (trigger checkout)
    const storyCTAButtons = document.querySelectorAll('.story-cta-button');
    storyCTAButtons.forEach(button => {
        button.addEventListener('click', () => {
            const perfumeKey = button.getAttribute('data-perfume');
            addToCartDirect(perfumeKey);
        });
    });
    
    // Handle quick buy button clicks (trigger checkout)
    const quickBuyButtons = document.querySelectorAll('.quick-buy-button');
    quickBuyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const perfumeKey = button.getAttribute('data-perfume');
            addToCartDirect(perfumeKey);
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
    
    // Add touch event handling for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    checkoutModal.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    checkoutModal.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        
        // If swiped down more than 50px, close the modal
        if (touchStartY - touchEndY < -50) {
            closeCheckout();
        }
    }, { passive: true });
    
    // Prevent default touch behavior on overlay to avoid issues
    checkoutOverlay.addEventListener('touchmove', (e) => {
        if (e.target === checkoutOverlay) {
            e.preventDefault();
        }
    }, { passive: false });
    
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
    
    // ========================================
    // Cart Checkout
    // ========================================
    
    // Handle cart checkout button (use event delegation for dynamic buttons)
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'checkoutBtn') {
            const cartEntries = Object.entries(cart);
            if (cartEntries.length === 0) return;
            
            // Show checkout confirmation
            showCheckoutConfirmation();
        }
    });
    
    function showCheckoutConfirmation() {
        const total = getCartTotal();
        const itemCount = getCartItemCount();
        
        // Create checkout confirmation modal
        const confirmationModal = document.createElement('div');
        confirmationModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;
        
        confirmationModal.innerHTML = `
            <div style="
                background-color: var(--color-white);
                max-width: 400px;
                width: 100%;
                padding: 40px;
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 0.1);
            ">
                <h2 style="
                    font-size: 1.5rem;
                    font-weight: var(--font-weight-medium);
                    letter-spacing: 0.02em;
                    margin-bottom: 24px;
                    text-transform: lowercase;
                ">checkout</h2>
                
                <div style="
                    margin-bottom: 32px;
                    color: var(--color-gray-medium);
                    font-size: 0.875rem;
                    line-height: 1.6;
                ">
                    <p>${itemCount} item${itemCount !== 1 ? 's' : ''} • ${total} SAR</p>
                    <p style="margin-top: 8px;">ready to complete your order?</p>
                </div>
                
                <div style="
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                ">
                    <button id="confirmCheckout" style="
                        width: 100%;
                        padding: 16px 24px;
                        background-color: var(--color-black);
                        color: var(--color-white);
                        border: 2px solid var(--color-black);
                        font-size: 0.875rem;
                        font-weight: var(--font-weight-medium);
                        letter-spacing: 0.02em;
                        cursor: pointer;
                        transition: all var(--transition);
                    ">complete order</button>
                    
                    <button id="cancelCheckout" style="
                        width: 100%;
                        padding: 16px 24px;
                        background-color: transparent;
                        color: var(--color-black);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        font-size: 0.875rem;
                        font-weight: var(--font-weight-medium);
                        letter-spacing: 0.02em;
                        cursor: pointer;
                        transition: all var(--transition);
                    ">continue shopping</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(confirmationModal);
        document.body.style.overflow = 'hidden';
        
        // Handle confirmation
        const confirmBtn = confirmationModal.querySelector('#confirmCheckout');
        const cancelBtn = confirmationModal.querySelector('#cancelCheckout');
        
        confirmBtn.addEventListener('click', () => {
            // Clear cart and show success message
            cart = {};
            saveCart();
            updateCartCount();
            updateCartView();
            
            document.body.removeChild(confirmationModal);
            document.body.style.overflow = '';
            
            // Show success message
            showCartFeedback('order completed');
            
            // Navigate back to cases
            setTimeout(() => {
                navigateTo('/cases');
            }, 1500);
        });
        
        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(confirmationModal);
            document.body.style.overflow = '';
        });
        
        // Close on overlay click
        confirmationModal.addEventListener('click', (e) => {
            if (e.target === confirmationModal) {
                document.body.removeChild(confirmationModal);
                document.body.style.overflow = '';
            }
        });
        
        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(confirmationModal);
                document.body.style.overflow = '';
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }
    
    // Failsafe mechanism for mobile overlay issues
    setInterval(() => {
        // Check if overlay is visible but doesn't have active class
        if (checkoutOverlay && 
            !checkoutOverlay.classList.contains('active') && 
            (getComputedStyle(checkoutOverlay).display !== 'none' || 
             getComputedStyle(checkoutOverlay).opacity !== '0')) {
            // Force hide the overlay
            checkoutOverlay.style.display = 'none';
            checkoutOverlay.style.opacity = '0';
            checkoutOverlay.style.visibility = 'hidden';
            checkoutOverlay.style.pointerEvents = 'none';
            document.body.style.overflow = '';
        }
    }, 500); // Check every 500ms
});
