// ========================================
// SKAR — Supreme-style Navigation
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
});
