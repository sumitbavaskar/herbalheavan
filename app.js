// Herbal Products E-commerce App - Vanilla JavaScript
class HerbalStore {
    constructor() {
        this.products = [];
        this.cart = JSON.parse(localStorage.getItem('herbalCart')) || [];
        this.currentProduct = null;
        this.quizAnswers = {};
        this.currentQuizQuestion = 1;
        
        this.init();
    }

    async init() {
        // Show loading spinner initially (with safety check)
        const loadingSpinner = document.getElementById('loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'block';
        }
        
        // Initialize the app
        await this.loadProducts();
        this.setupEventListeners();
        this.renderProducts();
        this.updateCartDisplay();
        this.updateCartCount();
        
        // Hide loading after products load
        setTimeout(() => {
            if (loadingSpinner) {
                loadingSpinner.style.display = 'none';
            }
        }, 1000);
    }

    async loadProducts() {
        try {
            const response = await fetch('products.json');
            this.products = await response.json();
        } catch (error) {
            console.error('Error loading products:', error);
            // Fallback products if JSON file doesn't exist
            this.products = this.getFallbackProducts();
        }
    }

    getFallbackProducts() {
        return [
            {
                id: 1,
                name: "Organic Turmeric Capsules",
                price: 24.99,
                category: "supplement",
                rating: 4.8,
                popularity: 95,
                image: this.generateProductSVG("Turmeric", "#FF8C00"),
                description: "Premium organic turmeric capsules with curcumin for natural anti-inflammatory support.",
                ingredients: ["Organic Turmeric Root", "Curcumin Extract", "Black Pepper Extract"],
                benefits: ["Reduces inflammation", "Supports joint health", "Powerful antioxidant", "Boosts immune system"],
                usage: "Take 1-2 capsules daily with meals or as directed by your healthcare provider."
            },
            {
                id: 2,
                name: "Chamomile Dream Tea",
                price: 18.50,
                category: "tea",
                rating: 4.9,
                popularity: 88,
                image: this.generateProductSVG("Chamomile", "#F0E68C"),
                description: "Soothing organic chamomile tea blend for relaxation and peaceful sleep.",
                ingredients: ["Organic Chamomile Flowers", "Lavender", "Lemon Balm", "Passionflower"],
                benefits: ["Promotes relaxation", "Improves sleep quality", "Reduces anxiety", "Aids digestion"],
                usage: "Steep 1 tea bag in hot water for 5-7 minutes. Drink 30 minutes before bedtime."
            },
            {
                id: 3,
                name: "Ginseng Energy Powder",
                price: 32.75,
                category: "powder",
                rating: 4.7,
                popularity: 82,
                image: this.generateProductSVG("Ginseng", "#CD853F"),
                description: "Pure Korean red ginseng powder for natural energy and mental clarity.",
                ingredients: ["Korean Red Ginseng Root", "Panax Ginseng Extract"],
                benefits: ["Boosts energy naturally", "Enhances mental focus", "Supports immune function", "Reduces fatigue"],
                usage: "Mix 1/2 teaspoon with water, juice, or smoothie. Take once daily in the morning."
            },
            {
                id: 4,
                name: "Lavender Essential Oil",
                price: 21.99,
                category: "oil",
                rating: 4.6,
                popularity: 76,
                image: this.generateProductSVG("Lavender", "#9370DB"),
                description: "100% pure therapeutic grade lavender essential oil for aromatherapy and wellness.",
                ingredients: ["Pure Lavandula Angustifolia Oil"],
                benefits: ["Promotes relaxation", "Reduces stress", "Improves sleep", "Natural aromatherapy"],
                usage: "Add 2-3 drops to diffuser or dilute with carrier oil for topical use. For sleep, apply to pillow."
            },
            {
                id: 5,
                name: "Echinacea Immune Support",
                price: 26.40,
                category: "supplement",
                rating: 4.5,
                popularity: 73,
                image: this.generateProductSVG("Echinacea", "#FF69B4"),
                description: "Potent echinacea extract capsules to naturally boost immune system function.",
                ingredients: ["Echinacea Purpurea Extract", "Echinacea Angustifolia", "Vitamin C"],
                benefits: ["Strengthens immune system", "Reduces cold duration", "Antioxidant protection", "Supports respiratory health"],
                usage: "Take 1 capsule twice daily with food. Increase to 3 times daily during illness."
            },
            {
                id: 6,
                name: "Green Tea Detox Blend",
                price: 19.80,
                category: "tea",
                rating: 4.4,
                popularity: 69,
                image: this.generateProductSVG("Green Tea", "#90EE90"),
                description: "Organic green tea blend with detoxifying herbs for natural cleansing and metabolism support.",
                ingredients: ["Organic Green Tea", "Dandelion Root", "Milk Thistle", "Ginger Root"],
                benefits: ["Supports detoxification", "Boosts metabolism", "Rich in antioxidants", "Aids digestion"],
                usage: "Steep 1 tea bag in hot water for 3-5 minutes. Drink 2-3 cups daily between meals."
            }
        ];
    }

    generateProductSVG(name, color) {
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg width="280" height="200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
                        <stop offset="100%" style="stop-color:${color};stop-opacity:0.4" />
                    </linearGradient>
                </defs>
                <rect width="280" height="200" fill="url(#grad)"/>
                <circle cx="70" cy="60" r="20" fill="${color}" opacity="0.6"/>
                <circle cx="140" cy="100" r="25" fill="${color}" opacity="0.7"/>
                <circle cx="210" cy="70" r="18" fill="${color}" opacity="0.5"/>
                <text x="140" y="160" text-anchor="middle" fill="#2E7D32" font-size="16" font-weight="bold">🌿 ${name} 🌿</text>
            </svg>
        `)}`;
    }

    setupEventListeners() {
        // Navigation (with safety checks)
        const navToggle = document.querySelector('.nav-toggle');
        const cartBtn = document.querySelector('.cart-btn');
        if (navToggle) navToggle.addEventListener('click', this.toggleMobileNav);
        if (cartBtn) cartBtn.addEventListener('click', () => this.toggleCart());
        
        // Search and filters (with safety checks)
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const sortSelect = document.getElementById('sort-select');
        const priceRange = document.getElementById('price-range');
        
        if (searchInput) searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        if (categoryFilter) categoryFilter.addEventListener('change', (e) => this.handleFilter());
        if (sortSelect) sortSelect.addEventListener('change', (e) => this.handleSort(e.target.value));
        if (priceRange) priceRange.addEventListener('input', (e) => this.handlePriceFilter(e.target.value));

        // Modal events (with safety checks)
        const productModal = document.getElementById('product-modal');
        const modalClose = document.querySelector('#product-modal .modal-close');
        if (productModal) {
            productModal.addEventListener('click', (e) => {
                if (e.target.id === 'product-modal') this.closeModal();
            });
        }
        if (modalClose) modalClose.addEventListener('click', () => this.closeModal());
        
        // Cart events (with safety checks)
        const cartClose = document.querySelector('.cart-close');
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartClose) cartClose.addEventListener('click', () => this.toggleCart());
        if (cartSidebar) {
            cartSidebar.addEventListener('click', (e) => {
                if (e.target.id === 'cart-sidebar') this.toggleCart();
            });
        }
        
        // Checkout events (with safety checks)
        const checkoutBtn = document.getElementById('checkout-btn');
        const checkoutModal = document.getElementById('checkout-modal');
        const checkoutModalClose = document.querySelector('#checkout-modal .modal-close');
        const checkoutForm = document.getElementById('checkout-form');
        
        if (checkoutBtn) checkoutBtn.addEventListener('click', () => this.openCheckout());
        if (checkoutModal) {
            checkoutModal.addEventListener('click', (e) => {
                if (e.target.id === 'checkout-modal') this.closeCheckout();
            });
        }
        if (checkoutModalClose) checkoutModalClose.addEventListener('click', () => this.closeCheckout());
        if (checkoutForm) checkoutForm.addEventListener('submit', (e) => this.handleCheckout(e));

        // Quiz events (with safety checks)
        const quizStartBtn = document.querySelector('.quiz-start-btn');
        if (quizStartBtn) quizStartBtn.addEventListener('click', () => this.startQuiz());

        // Smooth scrolling for navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Update price display (with safety checks)
        if (priceRange) {
            priceRange.addEventListener('input', (e) => {
                const priceValue = document.getElementById('price-value');
                if (priceValue) {
                    priceValue.textContent = e.target.value;
                }
            });
        }

        // Keyboard accessibility for modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeCheckout();
                this.toggleCart(false);
            }
        });
    }

    toggleMobileNav() {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (!navMenu || !navToggle) return;
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        
        // Prevent body scroll when mobile nav is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    renderProducts(productsToRender = this.products) {
        const grid = document.getElementById('products-grid');
        if (!grid) return; // Safety check
        
        if (productsToRender.length === 0) {
            grid.innerHTML = '<div class="no-products"><p>No products found matching your criteria.</p></div>';
            return;
        }

        grid.innerHTML = productsToRender.map(product => `
            <div class="product-card" data-product-id="${product.id}" onclick="herbalStore.openProductModal(${product.id})">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-category">${this.getCategoryName(product.category)}</p>
                    <div class="product-rating">
                        <span class="stars">${this.generateStars(product.rating)}</span>
                        <span class="rating-text">(${product.rating})</span>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <button class="add-to-cart" onclick="event.stopPropagation(); herbalStore.addToCart(${product.id})" aria-label="Add ${product.name} to cart">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getCategoryName(category) {
        const categories = {
            tea: 'Herbal Tea',
            supplement: 'Supplement',
            oil: 'Essential Oil',
            powder: 'Powder'
        };
        return categories[category] || category;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '★'.repeat(fullStars);
        if (hasHalfStar) stars += '☆';
        const emptyStars = 5 - Math.ceil(rating);
        stars += '☆'.repeat(emptyStars);
        return stars;
    }

    handleSearch(query) {
        const filtered = this.products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.ingredients.some(ingredient => 
                ingredient.toLowerCase().includes(query.toLowerCase())
            )
        );
        this.renderProducts(this.applySortingAndFilters(filtered));
    }

    handleFilter() {
        this.renderProducts(this.applySortingAndFilters());
    }

    handleSort(sortBy) {
        this.renderProducts(this.applySortingAndFilters());
    }

    handlePriceFilter(maxPrice) {
        this.renderProducts(this.applySortingAndFilters());
    }

    applySortingAndFilters(productsArray = this.products) {
        let filtered = [...productsArray];
        
        // Apply category filter
        const categoryFilter = document.getElementById('category-filter').value;
        if (categoryFilter) {
            filtered = filtered.filter(product => product.category === categoryFilter);
        }

        // Apply price filter
        const maxPrice = document.getElementById('price-range').value;
        filtered = filtered.filter(product => product.price <= maxPrice);

        // Apply sorting
        const sortBy = document.getElementById('sort-select').value;
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'popularity':
            default:
                filtered.sort((a, b) => b.popularity - a.popularity);
                break;
        }

        return filtered;
    }

    openProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        this.currentProduct = product;
        
        // Populate modal content
        document.getElementById('modal-title').textContent = product.name;
        document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('modal-rating').innerHTML = `
            <span class="stars">${this.generateStars(product.rating)}</span>
            <span class="rating-text">(${product.rating})</span>
        `;
        document.getElementById('modal-description').textContent = product.description;
        document.getElementById('modal-product-image').src = product.image;
        document.getElementById('modal-product-image').alt = product.name;
        
        // Populate ingredients
        document.getElementById('modal-ingredients').innerHTML = 
            product.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
        
        // Populate benefits
        document.getElementById('modal-benefits').innerHTML = 
            product.benefits.map(benefit => `<li>${benefit}</li>`).join('');
        
        // Set usage instructions
        document.getElementById('modal-usage').textContent = product.usage;
        
        // Reset quantity
        document.getElementById('modal-quantity').textContent = '1';
        
        // Setup add to cart button
        document.getElementById('modal-add-to-cart').onclick = () => {
            const quantity = parseInt(document.getElementById('modal-quantity').textContent);
            this.addToCart(productId, quantity);
        };

        // Show modal
        document.getElementById('product-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        document.getElementById('product-modal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.updateCartCount();
        this.showSuccessMessage(`${product.name} added to cart!`);
        this.animateAddToCart(productId);
    }

    animateAddToCart(productId) {
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        const cartBtn = document.querySelector('.cart-btn');
        
        if (!productCard || !cartBtn) return;

        const productRect = productCard.getBoundingClientRect();
        const cartRect = cartBtn.getBoundingClientRect();
        
        const flyingProduct = document.createElement('div');
        flyingProduct.className = 'flying-product';
        flyingProduct.innerHTML = '🌿';
        flyingProduct.style.position = 'fixed';
        flyingProduct.style.left = productRect.left + 'px';
        flyingProduct.style.top = productRect.top + 'px';
        flyingProduct.style.fontSize = '2rem';
        flyingProduct.style.zIndex = '2000';
        
        document.body.appendChild(flyingProduct);
        
        setTimeout(() => {
            flyingProduct.style.left = cartRect.left + 'px';
            flyingProduct.style.top = cartRect.top + 'px';
            flyingProduct.style.transform = 'scale(0.5)';
            flyingProduct.style.opacity = '0.5';
        }, 100);
        
        setTimeout(() => {
            flyingProduct.remove();
        }, 900);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.updateCartCount();
    }

    updateCartQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            this.saveCart();
            this.updateCartDisplay();
            this.updateCartCount();
        }
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const checkoutBtn = document.getElementById('checkout-btn');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            checkoutBtn.disabled = true;
            return;
        }

        checkoutBtn.disabled = false;
        
        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                    <div class="cart-item-controls">
                        <button class="cart-qty-btn" onclick="herbalStore.updateCartQuantity(${item.id}, -1)" aria-label="decrease quantity">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="herbalStore.updateCartQuantity(${item.id}, 1)" aria-label="increase quantity">+</button>
                        <button class="cart-remove" onclick="herbalStore.removeFromCart(${item.id})" aria-label="remove item">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');

        this.updateCartTotal();
    }

    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = count;
    }

    updateCartTotal() {
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('cart-total').textContent = total.toFixed(2);
        
        const checkoutTotal = document.getElementById('checkout-total');
        if (checkoutTotal) {
            checkoutTotal.textContent = total.toFixed(2);
        }
    }

    toggleCart(show = null) {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (show === null) {
            cartSidebar.classList.toggle('active');
        } else if (show) {
            cartSidebar.classList.add('active');
        } else {
            cartSidebar.classList.remove('active');
        }
    }

    openCheckout() {
        this.populateCheckoutSummary();
        document.getElementById('checkout-modal').classList.add('active');
        this.toggleCart(false);
    }

    closeCheckout() {
        document.getElementById('checkout-modal').classList.remove('active');
    }

    populateCheckoutSummary() {
        const checkoutItems = document.getElementById('checkout-items');
        checkoutItems.innerHTML = this.cart.map(item => `
            <div class="checkout-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
        
        this.updateCartTotal();
    }

    handleCheckout(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const orderData = {
            customer: Object.fromEntries(formData),
            items: this.cart,
            total: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            orderDate: new Date().toISOString()
        };

        // Simulate order processing
        setTimeout(() => {
            this.showSuccessMessage('Order placed successfully! Thank you for your purchase.');
            this.cart = [];
            this.saveCart();
            this.updateCartDisplay();
            this.updateCartCount();
            this.closeCheckout();
            
            // Reset form
            event.target.reset();
        }, 1000);
    }

    saveCart() {
        localStorage.setItem('herbalCart', JSON.stringify(this.cart));
    }

    showSuccessMessage(message) {
        const successMsg = document.getElementById('success-message');
        const successText = document.querySelector('.success-text');
        
        if (!successMsg || !successText) return;
        
        successText.textContent = message;
        successMsg.classList.add('show');
        
        // Add pulse effect
        successMsg.style.animation = 'pulse 0.3s ease-in-out';
        
        setTimeout(() => {
            successMsg.classList.remove('show');
            successMsg.style.animation = '';
        }, 4000);
    }

    // Quiz functionality
    startQuiz() {
        document.querySelector('.quiz-container').style.display = 'block';
        document.querySelector('.quiz-start-btn').style.display = 'none';
        this.currentQuizQuestion = 1;
        this.quizAnswers = {};
        this.showQuizQuestion(1);
    }

    showQuizQuestion(questionNumber) {
        document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
        document.querySelector(`[data-question="${questionNumber}"]`).classList.add('active');
        
        // Setup option click handlers
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.onclick = () => this.selectQuizOption(option);
        });
    }

    selectQuizOption(option) {
        const question = option.closest('.quiz-question');
        const questionNum = question.dataset.question;
        const value = option.dataset.value;
        
        this.quizAnswers[`q${questionNum}`] = value;
        
        // Visual feedback
        question.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        setTimeout(() => {
            if (this.currentQuizQuestion < 3) {
                this.currentQuizQuestion++;
                this.showQuizQuestion(this.currentQuizQuestion);
            } else {
                this.showQuizResult();
            }
        }, 500);
    }

    showQuizResult() {
        document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
        document.querySelector('.quiz-result').style.display = 'block';
        
        const recommendation = this.getProductRecommendation();
        const recommendedProduct = document.querySelector('.recommended-product');
        
        recommendedProduct.innerHTML = `
            <div class="quiz-product-card" onclick="herbalStore.openProductModal(${recommendation.id})">
                <img src="${recommendation.image}" alt="${recommendation.name}">
                <h4>${recommendation.name}</h4>
                <p>${recommendation.description}</p>
                <span class="price">$${recommendation.price.toFixed(2)}</span>
                <button class="add-to-cart" onclick="event.stopPropagation(); herbalStore.addToCart(${recommendation.id})">Add to Cart</button>
            </div>
            <button class="quiz-restart" onclick="herbalStore.restartQuiz()">Take Quiz Again</button>
        `;
    }

    getProductRecommendation() {
        const { q1: goal, q2: format, q3: experience } = this.quizAnswers;
        
        // Simple recommendation logic based on quiz answers
        let recommendedProduct = this.products[0]; // Default
        
        if (goal === 'energy') {
            recommendedProduct = this.products.find(p => p.name.includes('Ginseng')) || this.products[2];
        } else if (goal === 'stress') {
            recommendedProduct = this.products.find(p => p.name.includes('Chamomile') || p.name.includes('Lavender')) || this.products[1];
        } else if (goal === 'sleep') {
            recommendedProduct = this.products.find(p => p.name.includes('Chamomile')) || this.products[1];
        } else if (goal === 'immunity') {
            recommendedProduct = this.products.find(p => p.name.includes('Echinacea')) || this.products[4];
        }
        
        return recommendedProduct;
    }

    restartQuiz() {
        document.querySelector('.quiz-result').style.display = 'none';
        document.querySelector('.quiz-container').style.display = 'none';
        document.querySelector('.quiz-start-btn').style.display = 'block';
        this.quizAnswers = {};
        this.currentQuizQuestion = 1;
    }
}

// Global functions for modal interactions
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function increaseQuantity() {
    const quantityEl = document.getElementById('modal-quantity');
    const currentQty = parseInt(quantityEl.textContent);
    quantityEl.textContent = currentQty + 1;
}

function decreaseQuantity() {
    const quantityEl = document.getElementById('modal-quantity');
    const currentQty = parseInt(quantityEl.textContent);
    if (currentQty > 1) {
        quantityEl.textContent = currentQty - 1;
    }
}

// Enhanced scroll effects and navigation
function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Smooth reveal animations for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    setTimeout(() => {
        document.querySelectorAll('.quiz-section, .products-section, .search-filter-container').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });
    }, 100);
}

// Initialize enhanced navigation functionality
function initializeEnhancedNav() {
    // Close mobile nav when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Enhanced cart animation
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('mouseenter', () => {
            cartBtn.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        cartBtn.addEventListener('mouseleave', () => {
            cartBtn.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.herbalStore = new HerbalStore();
    initializeScrollEffects();
    initializeEnhancedNav();
});

// Add smooth scrolling for all internal links
document.addEventListener('DOMContentLoaded', () => {
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
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards for animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 100);
});