// Shopping Cart State
let cart = [];
let cartOpen = false;
let menuOpen = false;

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const searchToggle = document.querySelector('.search-toggle');
const cartToggle = document.querySelector('.cart-toggle');
const cartClose = document.querySelector('.cart-close');
const cartSidebar = document.getElementById('cartSidebar');
const menuSidebar = document.getElementById('menuSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.querySelector('.cart-count');
const productCards = document.querySelectorAll('.product-card');
const exclusiveButton = document.querySelector('.exclusive-button');
const checkoutButton = document.querySelector('.checkout-button');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeAnimations();
    loadCartFromStorage();
});

// Event Listeners
function initializeEventListeners() {
    // Menu Toggle
    menuToggle?.addEventListener('click', toggleMenu);
    
    // Cart Toggle
    cartToggle?.addEventListener('click', toggleCart);
    cartClose?.addEventListener('click', closeCart);
    
    // Product Cards
    productCards.forEach((card, index) => {
        card.addEventListener('click', () => handleProductClick(card, index));
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', () => {
            card.style.setProperty('--hover-delay', `${index * 0.05}s`);
        });
    });
    
    // Exclusive Button
    exclusiveButton?.addEventListener('click', handleExclusiveAccess);
    
    // Checkout Button
    checkoutButton?.addEventListener('click', handleCheckout);
    
    // Search Toggle
    searchToggle?.addEventListener('click', handleSearch);
    
    // Close sidebars on outside click
    document.addEventListener('click', (e) => {
        if (cartOpen && !cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
            closeCart();
        }
        if (menuOpen && !menuSidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Escape key to close sidebars
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (cartOpen) closeCart();
            if (menuOpen) closeMenu();
        }
    });
}

// Menu Functions
function toggleMenu() {
    menuOpen = !menuOpen;
    menuSidebar.classList.toggle('active');
    document.body.style.overflow = menuOpen ? 'hidden' : '';
}

function closeMenu() {
    menuOpen = false;
    menuSidebar.classList.remove('active');
    document.body.style.overflow = '';
}

// Cart Functions
function toggleCart() {
    cartOpen = !cartOpen;
    cartSidebar.classList.toggle('active');
    document.body.style.overflow = cartOpen ? 'hidden' : '';
}

function closeCart() {
    cartOpen = false;
    cartSidebar.classList.remove('active');
    document.body.style.overflow = '';
}

// Product Functions
function handleProductClick(card, index) {
    const productName = card.querySelector('.product-name').textContent;
    const productPrice = card.querySelector('.product-price').textContent;
    const productElement = card.dataset.element;
    
    // Add glitch effect on click
    addGlitchEffect(card);
    
    // Add to cart
    addToCart({
        id: Date.now(),
        name: productName,
        price: productPrice,
        element: productElement,
        quantity: 1
    });
    
    // Visual feedback
    const quickView = card.querySelector('.quick-view');
    quickView.textContent = 'ADDED';
    setTimeout(() => {
        quickView.textContent = 'EXPLORE';
    }, 1000);
}

// Cart Management
function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(product);
    }
    
    updateCartUI();
    saveCartToStorage();
    
    // Pulse cart icon
    cartToggle.classList.add('pulse');
    setTimeout(() => {
        cartToggle.classList.remove('pulse');
    }, 600);
}

function updateCartUI() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your collection awaits</p>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-element">${item.element}</p>
            </div>
            <div class="cart-item-details">
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <p class="cart-item-price">${item.price}</p>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            const isPlus = e.target.classList.contains('plus');
            updateQuantity(itemId, isPlus);
        });
    });
}

function updateQuantity(itemId, increase) {
    const item = cart.find(item => item.id === itemId);
    if (!item) return;
    
    if (increase) {
        item.quantity++;
    } else {
        item.quantity--;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== itemId);
        }
    }
    
    updateCartUI();
    saveCartToStorage();
}

// Storage Functions
function saveCartToStorage() {
    localStorage.setItem('skar-cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('skar-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Other Functions
function handleExclusiveAccess() {
    // Add glitch transition
    document.body.classList.add('glitch-transition');
    
    setTimeout(() => {
        document.body.classList.remove('glitch-transition');
        // In a real implementation, this would open a modal or navigate to exclusive section
        console.log('Accessing exclusive collection...');
    }, 500);
}

function handleCheckout() {
    if (cart.length === 0) return;
    
    // Add fade transition
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        // In a real implementation, this would proceed to checkout
        console.log('Proceeding to checkout:', cart);
        document.body.style.opacity = '1';
    }, 800);
}

function handleSearch() {
    // Add search functionality
    console.log('Opening search...');
}

// Animation Functions
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animations
    document.querySelectorAll('.product-card, .collection-header, .exclusive-content').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Glitch Effect
function addGlitchEffect(element) {
    element.classList.add('glitch-active');
    
    setTimeout(() => {
        element.classList.remove('glitch-active');
    }, 300);
}

// Enhanced Smoke Parallax
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Smooth parallax animation
function animateSmoke() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;
    
    const smokeLayers = document.querySelectorAll('.smoke-layer');
    smokeLayers.forEach((layer, index) => {
        const speed = (index + 1) * 10;
        const x = currentX * speed;
        const y = currentY * speed;
        
        layer.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    requestAnimationFrame(animateSmoke);
}

animateSmoke();

// Secret Society Easter Egg
let secretCode = [];
const secretSequence = ['s', 'k', 'a', 'r'];

document.addEventListener('keydown', (e) => {
    secretCode.push(e.key.toLowerCase());
    secretCode = secretCode.slice(-4);
    
    if (secretCode.join('') === secretSequence.join('')) {
        activateSecretMode();
    }
});

function activateSecretMode() {
    document.body.classList.add('secret-mode');
    
    // Add special effects
    const symbol = document.querySelector('.secret-symbol');
    symbol.style.opacity = '0.1';
    symbol.style.animation = 'symbolRotate 10s linear infinite, pulse 2s ease-in-out infinite';
    
    setTimeout(() => {
        document.body.classList.remove('secret-mode');
        symbol.style.opacity = '0.03';
        symbol.style.animation = 'symbolRotate 300s linear infinite';
    }, 5000);
}

// Add CSS for cart items dynamically
const style = document.createElement('style');
style.textContent = `
    .cart-item {
        padding: 1.5rem 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .cart-item:last-child {
        border-bottom: none;
    }
    
    .cart-item-name {
        font-family: var(--serif);
        font-size: 1.125rem;
        font-weight: 400;
        margin-bottom: 0.25rem;
    }
    
    .cart-item-element {
        font-size: 0.75rem;
        color: var(--gray-muted);
        text-transform: capitalize;
    }
    
    .cart-item-details {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    
    .cart-item-quantity {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .quantity-btn {
        background: none;
        border: 1px solid rgba(255,255,255,0.2);
        color: var(--white-pure);
        width: 24px;
        height: 24px;
        font-size: 0.875rem;
        cursor: pointer;
        transition: var(--transition-fast);
    }
    
    .quantity-btn:hover {
        border-color: var(--white-pure);
        background: rgba(255,255,255,0.1);
    }
    
    .cart-item-price {
        font-weight: 300;
        letter-spacing: 0.05em;
    }
    
    .pulse {
        animation: pulse 0.6s ease;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .glitch-active {
        animation: glitchActive 0.3s ease;
    }
    
    @keyframes glitchActive {
        0%, 100% { 
            transform: translate(0, 0);
            filter: none;
        }
        20% { 
            transform: translate(-2px, 2px);
            filter: hue-rotate(90deg);
        }
        40% { 
            transform: translate(2px, -2px);
            filter: hue-rotate(180deg);
        }
        60% { 
            transform: translate(-1px, 1px);
            filter: hue-rotate(270deg);
        }
        80% { 
            transform: translate(1px, -1px);
            filter: hue-rotate(360deg);
        }
    }
    
    .glitch-transition {
        animation: glitchTransition 0.5s ease;
    }
    
    @keyframes glitchTransition {
        0%, 100% { 
            filter: none;
            opacity: 1;
        }
        25% { 
            filter: contrast(2) brightness(2);
            opacity: 0.9;
        }
        50% { 
            filter: contrast(0.5) brightness(0.5);
            opacity: 0.7;
        }
        75% { 
            filter: contrast(1.5) brightness(1.5) hue-rotate(180deg);
            opacity: 0.8;
        }
    }
    
    .secret-mode {
        animation: secretReveal 5s ease;
    }
    
    @keyframes secretReveal {
        0%, 100% { filter: none; }
        50% { filter: invert(1) hue-rotate(180deg); }
    }
`;

document.head.appendChild(style);