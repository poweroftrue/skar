// ========================================
// SKAR — Supreme-style Navigation
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const categoryTitle = document.getElementById('categoryTitle');
    
    // Handle menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get category from data attribute
            const category = item.getAttribute('data-category');
            
            // Update active state
            menuItems.forEach(m => m.classList.remove('active'));
            item.classList.add('active');
            
            // Update category title
            if (categoryTitle) {
                categoryTitle.textContent = category;
            }
        });
    });
});
