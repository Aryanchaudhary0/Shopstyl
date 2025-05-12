document.addEventListener('DOMContentLoaded', function() {
    // Product Gallery Functionality
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const prevBtn = document.querySelector('.scroll-btn.prev');
    const nextBtn = document.querySelector('.scroll-btn.next');

    // Update main image when thumbnail is clicked
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update main image
            mainImage.src = this.dataset.image;
            mainImage.alt = this.alt;
            
            // Update active thumbnail
            document.querySelector('.thumbnail.active').classList.remove('active');
            this.classList.add('active');
        });
    });

    // Thumbnail scroll buttons
    prevBtn.addEventListener('click', () => {
        thumbnailsContainer.scrollBy({ left: -100, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        thumbnailsContainer.scrollBy({ left: 100, behavior: 'smooth' });
    });

    // Size Chart Modal
    const sizeChartBtn = document.querySelector('.size-chart-btn');
    const sizeChartModal = document.getElementById('sizeChartModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    sizeChartBtn.addEventListener('click', () => {
        sizeChartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal functions
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal(this.closest('.modal'));
        });
    });

    // Close modal when clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Close modal with ESC key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal);
            });
        }
    });

    // Color Variants
 
   // Update your color options to use the new image names
const colorOptions = document.querySelectorAll('.color-option');
const selectedColorText = document.getElementById('selectedColor');

colorOptions.forEach(option => {
  option.addEventListener('click', function() {
    // Update selected color
    document.querySelector('.color-option.active').classList.remove('active');
    this.classList.add('active');
    selectedColorText.textContent = this.dataset.color;
    
    // Update main image to corresponding p1, p2, etc.
    const colorNum = Array.from(colorOptions).indexOf(this) + 1;
    mainImage.src = `images/p${colorNum}.jpg`;
    
    // Update the active thumbnail
    document.querySelector('.thumbnail.active').classList.remove('active');
    document.querySelector(`.thumbnail[data-image="images/p${colorNum}.jpg"]`).classList.add('active');
    
    // Save to localStorage
    localStorage.setItem('selectedColor', this.dataset.color);
  });
});

    // Size Variants
    const sizeOptions = document.querySelectorAll('.size-option');
    const selectedSizeText = document.getElementById('selectedSize');

    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Update selected size
            document.querySelector('.size-option.selected')?.classList.remove('selected');
            this.classList.add('selected');
            selectedSizeText.textContent = this.textContent;
            
            // Save to localStorage
            localStorage.setItem('selectedSize', this.textContent);
        });
    });

    // Compare Colors Modal
    const compareColorsBtn = document.querySelector('.compare-colors-btn');
    const compareColorsModal = document.getElementById('compareColorsModal');
    const selectCompareBtns = document.querySelectorAll('.select-compare-btn');
    const selectedColorsContainer = document.querySelector('.selected-colors');

    compareColorsBtn.addEventListener('click', () => {
        compareColorsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Select colors to compare
    selectCompareBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const color = this.dataset.color;
            const colorClass = color.toLowerCase();
            
            // Check if color is already selected
            if (document.querySelector(`.selected-color[data-color="${color}"]`)) {
                return;
            }
            
            // Add selected color
            const selectedColor = document.createElement('div');
            selectedColor.className = 'selected-color';
            selectedColor.dataset.color = color;
            selectedColor.innerHTML = `
                <div class="selected-color-swatch ${colorClass}"></div>
                <span>${color}</span>
                <button class="remove-color-btn">&times;</button>
            `;
            
            selectedColorsContainer.appendChild(selectedColor);
            
            // Add remove functionality
            selectedColor.querySelector('.remove-color-btn').addEventListener('click', function() {
                selectedColor.remove();
            });
        });
    });

    // Pair Well With Carousel
    const pairProducts = document.querySelector('.pair-products');
    const scrollPairPrev = document.querySelector('.scroll-pair-btn.prev');
    const scrollPairNext = document.querySelector('.scroll-pair-btn.next');

    scrollPairPrev.addEventListener('click', () => {
        pairProducts.scrollBy({ left: -200, behavior: 'smooth' });
    });

    scrollPairNext.addEventListener('click', () => {
        pairProducts.scrollBy({ left: 200, behavior: 'smooth' });
    });

    // Quantity Selector
    const quantityInput = document.querySelector('.quantity-input');
    const quantityMinus = document.querySelector('.quantity-btn.minus');
    const quantityPlus = document.querySelector('.quantity-btn.plus');

    quantityMinus.addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value--;
        }
    });

    quantityPlus.addEventListener('click', () => {
        quantityInput.value++;
    });

    // Product Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active tab button
            document.querySelector('.tab-btn.active').classList.remove('active');
            this.classList.add('active');
            
            // Show corresponding pane
            const tabId = this.dataset.tab;
            document.querySelector('.tab-pane.active').classList.remove('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Add to Cart buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn, .add-bundle-btn');
    const cartBtn = document.querySelector('.cart-btn');
    let cartCount = 0;

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cartCount++;
            cartBtn.textContent = `Cart (${cartCount})`;
            
            // Show confirmation
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    });

    // Load saved selections from localStorage
    function loadSavedSelections() {
        const savedColor = localStorage.getItem('selectedColor');
        const savedSize = localStorage.getItem('selectedSize');
        
        if (savedColor) {
            const colorOption = document.querySelector(`.color-option[data-color="${savedColor}"]`);
            if (colorOption) {
                colorOption.click();
            }
        }
        
        if (savedSize) {
            const sizeOption = [...document.querySelectorAll('.size-option')].find(
                option => option.textContent === savedSize
            );
            if (sizeOption) {
                sizeOption.click();
            }
        }
    }

    loadSavedSelections();

    // Image zoom on hover (bonus feature)
    mainImage.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 768) { // Only on desktop
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width * 100;
            const y = (e.clientY - rect.top) / rect.height * 100;
            
            this.style.transformOrigin = `${x}% ${y}%`;
            this.style.transform = 'scale(2)';
        }
    });

    mainImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});