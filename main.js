// Global mouse position
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Lock body scroll initially
    document.body.classList.add('spirit-locked');
    
    // Hide loading screen after delay
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
        }
    }, 2000);
    
    // Initialize spirit portal
    initSpiritPortal();
    
    // Initialize Intersection Observer for text reveals
    initTextReveals();
    
    // Initialize smooth scrolling behavior
    initSmoothScroll();
});

// Text reveal animations
function initTextReveals() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Manifesto lines
                if (entry.target.classList.contains('manifesto-line')) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay * 1000);
                }
                
                // Chapter elements
                if (entry.target.classList.contains('chapter-title')) {
                    entry.target.classList.add('visible');
                    
                    // Reveal chapter texts sequentially
                    const texts = entry.target.parentElement.querySelectorAll('.reveal-text');
                    texts.forEach((text, index) => {
                        setTimeout(() => {
                            text.classList.add('visible');
                        }, 300 + (index * 200));
                    });
                }
                
                
                // Finale elements
                if (entry.target.classList.contains('finale-text')) {
                    entry.target.classList.add('visible');
                    const tagline = entry.target.parentElement.querySelector('.finale-tagline');
                    if (tagline) {
                        setTimeout(() => {
                            tagline.classList.add('visible');
                        }, 800);
                    }
                }
                
                
                // Whisper lines (prelude)
                if (entry.target.classList.contains('whisper')) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay * 1000);
                }
                
                
                // Diary entries
                if (entry.target.classList.contains('diary-text')) {
                    const texts = entry.target.parentElement.querySelectorAll('.diary-text');
                    texts.forEach((text, index) => {
                        setTimeout(() => {
                            text.classList.add('visible');
                        }, index * 300);
                    });
                }
                
                // Truth reveals
                if (entry.target.classList.contains('truth-reveal')) {
                    const truths = document.querySelectorAll('.truth-reveal');
                    truths.forEach((truth, index) => {
                        setTimeout(() => {
                            truth.classList.add('visible');
                        }, index * 400);
                    });
                }
                
                // Saga timeline
                if (entry.target.classList.contains('saga-item')) {
                    const items = document.querySelectorAll('.saga-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                // Revelation lines
                if (entry.target.classList.contains('reveal-line')) {
                    const lines = entry.target.parentElement.querySelectorAll('.reveal-line');
                    lines.forEach((line, index) => {
                        setTimeout(() => {
                            line.classList.add('visible');
                        }, index * 300);
                    });
                }
                
                // Revelation title
                if (entry.target.classList.contains('revelation-title')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                // Echo texts
                if (entry.target.classList.contains('echo-text')) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 500);
                }
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    document.querySelectorAll('.whisper, .chapter-title, .finale-text, .diary-text, .truth-reveal, .saga-item, .echo-text, .reveal-line, .revelation-title').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize additional interactions
    initInteractions();
    
    // Initialize horizontal saga scroll
    initSagaScroll();
}

// Horizontal Saga Scroll
function initSagaScroll() {
    const sagaTrack = document.querySelector('.saga-track');
    if (!sagaTrack) return;
    
    // Mouse wheel horizontal scroll
    sagaTrack.addEventListener('wheel', (e) => {
        e.preventDefault();
        sagaTrack.scrollLeft += e.deltaY;
    });
    
    // Touch gestures for mobile
    let isDown = false;
    let startX;
    let scrollLeft;
    
    sagaTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        sagaTrack.style.cursor = 'grabbing';
        startX = e.pageX - sagaTrack.offsetLeft;
        scrollLeft = sagaTrack.scrollLeft;
    });
    
    sagaTrack.addEventListener('mouseleave', () => {
        isDown = false;
        sagaTrack.style.cursor = 'grab';
    });
    
    sagaTrack.addEventListener('mouseup', () => {
        isDown = false;
        sagaTrack.style.cursor = 'grab';
    });
    
    sagaTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sagaTrack.offsetLeft;
        const walk = (x - startX) * 2;
        sagaTrack.scrollLeft = scrollLeft - walk;
    });
    
    // Parallax effect on cards
    sagaTrack.addEventListener('scroll', () => {
        const cards = document.querySelectorAll('.saga-card');
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const centerX = window.innerWidth / 2;
            const cardCenterX = rect.left + rect.width / 2;
            const distance = Math.abs(centerX - cardCenterX);
            const scale = 1 - (distance / window.innerWidth) * 0.2;
            const opacity = 1 - (distance / window.innerWidth) * 0.5;
            
            card.style.transform = `scale(${Math.max(0.8, scale)})`;
            card.style.opacity = Math.max(0.5, opacity);
        });
    });
    
    // Initial position
    setTimeout(() => {
        sagaTrack.scrollLeft = 0;
    }, 100);
}

// Spirit Portal Interaction
function initSpiritPortal() {
    const spiritRealm = document.querySelector('.spirit-realm');
    const spiritContainer = document.querySelector('.spirit-container');
    const spiritCore = document.querySelector('.spirit-core');
    
    // Magnetic attraction and glow on mouse move
    spiritRealm?.addEventListener('mousemove', (e) => {
        if (!spiritContainer || !spiritCore) return;
        
        const rect = spiritContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        
        const intensity = Math.max(0, 1 - distance / 400);
        const pullX = (e.clientX - centerX) * intensity * 0.05;
        const pullY = (e.clientY - centerY) * intensity * 0.05;
        
        spiritCore.style.filter = `blur(${30 - intensity * 15}px)`;
        spiritCore.style.transform = `scale(${1 + intensity * 0.3}) translate(${pullX}px, ${pullY}px)`;
        
        // Make wounds more visible when close
        document.querySelectorAll('.wound').forEach(wound => {
            wound.style.opacity = intensity * 0.5;
        });
    });
    
    // Enter the spirit
    spiritContainer?.addEventListener('click', () => {
        // Add entering animation
        spiritRealm.classList.add('entering');
        
        // Unlock scrolling after animation
        setTimeout(() => {
            document.body.classList.remove('spirit-locked');
            spiritRealm.style.display = 'none';
            
            // Smooth scroll to pure landing
            setTimeout(() => {
                const pureLanding = document.querySelector('.pure-landing');
                if (pureLanding) {
                    pureLanding.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 500);
        }, 2000);
    });
    
    // Add hover sound effect simulation
    let hoverSound = false;
    spiritContainer?.addEventListener('mouseenter', () => {
        if (!hoverSound) {
            hoverSound = true;
            // Add visual feedback for hover
            document.querySelectorAll('.wound').forEach((wound, index) => {
                setTimeout(() => {
                    wound.style.opacity = '0.8';
                    setTimeout(() => {
                        wound.style.opacity = '';
                    }, 500);
                }, index * 100);
            });
        }
    });
    
    spiritContainer?.addEventListener('mouseleave', () => {
        hoverSound = false;
    });
}

// Initialize smooth scrolling
function initSmoothScroll() {
    // Optional: Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll-based animations like Apple
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const windowHeight = window.innerHeight;
    
    
    // Animate product mockups based on scroll position
    document.querySelectorAll('.product-mockup').forEach((mockup, index) => {
        const rect = mockup.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        const distance = center - screenCenter;
        
        // Calculate progress (-1 to 1, where 0 is center of screen)
        const progress = distance / (windowHeight / 2);
        
        // Scale effect - larger when in center of viewport
        const scale = 1 - Math.abs(progress) * 0.08;
        mockup.style.transform = `scale(${scale})`;
        
        // Opacity for far items
        const itemOpacity = 1 - Math.abs(progress) * 0.2;
        mockup.style.opacity = Math.max(0.5, itemOpacity);
    });
    
    // Animate product text based on scroll
    document.querySelectorAll('.product').forEach((product, index) => {
        const rect = product.getBoundingClientRect();
        const text = product.querySelector('.product-text');
        const h2 = text.querySelector('h2');
        const p = text.querySelector('p');
        
        const center = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        const distance = center - screenCenter;
        const progress = distance / (windowHeight / 2);
        
        // Text animations
        if (Math.abs(progress) < 0.5) {
            h2.style.transform = `translateY(${progress * 30}px)`;
            h2.style.opacity = 1 - Math.abs(progress);
            
            p.style.transform = `translateY(${progress * 20}px)`;
            p.style.opacity = (1 - Math.abs(progress)) * 0.8;
        }
    });
    
    // Parallax for chapter numbers
    document.querySelectorAll('.chapter-number').forEach(number => {
        const rect = number.getBoundingClientRect();
        const speed = 0.5;
        const yPos = -(scrolled - rect.top) * speed;
        number.style.transform = `translateY(${yPos * 0.1}px)`;
    });
    
    
    // Spirit realm check - don't run scroll effects if spirit is active
    const spiritRealm = document.querySelector('.spirit-realm');
    if (spiritRealm && !spiritRealm.classList.contains('entering')) {
        return; // Exit early if spirit realm is still active
    }
});


// Parallax for floating silhouettes
window.addEventListener('scroll', () => {
    const silhouettes = document.querySelectorAll('.floating-silhouette');
    const scrolled = window.scrollY;
    
    silhouettes.forEach(silhouette => {
        const rect = silhouette.getBoundingClientRect();
        const speed = 0.5;
        const yPos = -(scrolled - rect.top) * speed;
        silhouette.style.transform = `translateY(${-50 + yPos * 0.1}%) translateX(${20 + Math.sin(scrolled * 0.001) * 10}px)`;
        
        // Show when in view
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            silhouette.classList.add('visible');
        }
    });
});

// Interactive elements
function initInteractions() {
    
    
    // Apple Pay button interactions
    const applePayButtons = document.querySelectorAll('.apple-pay-button');
    applePayButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.dataset.product;
            const price = this.dataset.price;
            
            // Quick scale animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
            
            // In a real implementation, this would trigger Apple Pay
            // For now, we just show visual feedback
            
            // Subtle feedback
            this.style.boxShadow = '0 1px 3px rgba(255,255,255,0.15)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 200);
        });
    });
    
}