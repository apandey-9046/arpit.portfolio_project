// Sample data
const categories = [
    { id: 1, name: 'Electronics', icon: 'fa-laptop', count: 125 },
    { id: 2, name: 'Fashion', icon: 'fa-tshirt', count: 210 },
    { id: 3, name: 'Home & Kitchen', icon: 'fa-home', count: 98 },
    { id: 4, name: 'Health & Beauty', icon: 'fa-heartbeat', count: 156 },
    { id: 5, name: 'Books', icon: 'fa-book', count: 87 },
    { id: 6, name: 'Sports', icon: 'fa-football-ball', count: 64 },
    { id: 7, name: 'Toys', icon: 'fa-gamepad', count: 102 },
    { id: 8, name: 'Automotive', icon: 'fa-car', count: 45 }
];

const products = [
    { 
        id: 1, 
        name: 'Premium Wireless Headphones', 
        category: 'Electronics', 
        price: 89.99, 
        originalPrice: 119.99, 
        discount: 25, 
        image: 'https://placehold.co/200x200/4361ee/ffffff?text=HP'
    },
    { 
        id: 2, 
        name: 'Smart Fitness Watch', 
        category: 'Electronics', 
        price: 129.99, 
        originalPrice: null, 
        discount: null, 
        image: 'https://placehold.co/200x200/4cc9f0/ffffff?text=SW'
    },
    { 
        id: 3, 
        name: 'Ultra Light Running Shoes', 
        category: 'Fashion', 
        price: 79.99, 
        originalPrice: 99.99, 
        discount: 20, 
        image: 'https://placehold.co/200x200/f72585/ffffff?text=RS'
    },
    { 
        id: 4, 
        name: 'Portable Bluetooth Speaker', 
        category: 'Electronics', 
        price: 59.99, 
        originalPrice: null, 
        discount: null, 
        image: 'https://placehold.co/200x200/7209b7/ffffff?text=BS'
    },
    { 
        id: 5, 
        name: 'RGB Gaming Mouse', 
        category: 'Electronics', 
        price: 49.99, 
        originalPrice: null, 
        discount: null, 
        image: 'https://placehold.co/200x200/3a0ca3/ffffff?text=GM'
    },
    { 
        id: 6, 
        name: 'Waterproof Travel Backpack', 
        category: 'Fashion', 
        price: 39.99, 
        originalPrice: 46.99, 
        discount: 15, 
        image: 'https://placehold.co/200x200/f87171/ffffff?text=BP'
    },
    { 
        id: 7, 
        name: 'Wireless Charging Pad', 
        category: 'Electronics', 
        price: 29.99, 
        originalPrice: 39.99, 
        discount: 25, 
        image: 'https://placehold.co/200x200/4361ee/ffffff?text=CP'
    },
    { 
        id: 8, 
        name: 'Designer Sunglasses', 
        category: 'Fashion', 
        price: 149.99, 
        originalPrice: 199.99, 
        discount: 25, 
        image: 'https://placehold.co/200x200/4cc9f0/ffffff?text=SG'
    }
];

// Shopping cart
let cart = [];

// DOM Elements
const authModal = document.getElementById('authModal');
const closeModalBtn = document.getElementById('closeModal');
const authSwitch = document.getElementById('authSwitch');
const authTitle = document.getElementById('authTitle');
const authSubmit = document.getElementById('authSubmit');
const authSwitchText = document.getElementById('authSwitchText');
const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
const newsletterForm = document.getElementById('newsletterForm');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

// Page Navigation
function showPage(pageId, param) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show requested page
    document.getElementById(pageId).classList.add('active');
    
    // Special handling for category page
    if (pageId === 'category' && param) {
        document.getElementById('categoryTitle').textContent = param;
        renderCategoryProducts(param);
    }
    
    // Close auth modal if open
    authModal.classList.remove('active');
    
    // Close mobile menu if open
    document.querySelector('.nav-links').classList.remove('active');
    document.querySelector('.mobile-menu-btn i').classList.remove('fa-times');
    document.querySelector('.mobile-menu-btn i').classList.add('fa-bars');
    
    // Render page-specific content
    switch(pageId) {
        case 'home':
            renderHomeCategories();
            renderFeaturedProducts();
            break;
        case 'categories':
            renderAllCategories();
            break;
        case 'products':
            renderAllProducts();
            populateCategoryFilter();
            break;
        case 'cart':
            renderCart();
            break;
        case 'search':
            renderSearchResults('');
            break;
    }
}

// Render home categories
function renderHomeCategories() {
    const container = document.getElementById('homeCategories');
    container.innerHTML = '';
    
    categories.slice(0, 4).forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <div class="category-img">
                <i class="fas ${category.icon}"></i>
            </div>
            <div class="category-info">
                <h3>${category.name}</h3>
                <p>${category.count} Products</p>
            </div>
        `;
        categoryCard.addEventListener('click', () => showPage('category', category.name));
        container.appendChild(categoryCard);
    });
}

// Render all categories
function renderAllCategories() {
    const container = document.getElementById('allCategories');
    container.innerHTML = '';
    
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <div class="category-img">
                <i class="fas ${category.icon}"></i>
            </div>
            <div class="category-info">
                <h3>${category.name}</h3>
                <p>${category.count} Products</p>
            </div>
        `;
        categoryCard.addEventListener('click', () => showPage('category', category.name));
        container.appendChild(categoryCard);
    });
}

// Render featured products
function renderFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    container.innerHTML = '';
    
    products.slice(0, 4).forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Render all products
function renderAllProducts() {
    const container = document.getElementById('allProducts');
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Render products for a specific category
function renderCategoryProducts(categoryName) {
    const container = document.getElementById('categoryProducts');
    container.innerHTML = '';
    
    const filteredProducts = products.filter(product => product.category === categoryName);
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    let badgeHtml = '';
    if (product.discount) {
        badgeHtml = `<span class="product-badge">${product.discount}% OFF</span>`;
    } else if (product.new) {
        badgeHtml = `<span class="product-badge">New</span>`;
    }
    
    let priceHtml = '';
    if (product.originalPrice) {
        priceHtml = `
            <div class="product-price">
                <span class="current-price">$${product.price.toFixed(2)}</span>
                <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
            </div>
        `;
    } else {
        priceHtml = `<div class="product-price"><span class="current-price">$${product.price.toFixed(2)}</span></div>`;
    }
    
    productCard.innerHTML = `
        <div class="product-img">
            <img src="${product.image}" alt="${product.name}">
            ${badgeHtml}
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            ${priceHtml}
            <div class="product-actions">
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <div class="wishlist" data-id="${product.id}">
                    <i class="far fa-heart"></i>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    productCard.querySelector('.add-to-cart').addEventListener('click', (e) => {
        addToCart(parseInt(e.currentTarget.dataset.id));
    });
    
    productCard.querySelector('.wishlist').addEventListener('click', (e) => {
        toggleWishlist(parseInt(e.currentTarget.dataset.id));
    });
    
    return productCard;
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    renderCart();
    
    // Show feedback
    const button = event.currentTarget;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.style.backgroundColor = '#4ade80';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.backgroundColor = '';
    }, 2000);
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count::after');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').setAttribute('data-count', totalItems);
    
    // Update the cart count element
    const countElement = document.querySelector('.cart-count');
    if (countElement) {
        countElement.innerHTML = `<i class="fas fa-shopping-cart"></i>`;
        if (totalItems > 0) {
            const countBadge = document.createElement('span');
            countBadge.textContent = totalItems;
            countBadge.style.position = 'absolute';
            countBadge.style.top = '-10px';
            countBadge.style.right = '-10px';
            countBadge.style.background = '#f87171';
            countBadge.style.color = 'white';
            countBadge.style.fontSize = '0.7rem';
            countBadge.style.width = '18px';
            countBadge.style.height = '18px';
            countBadge.style.borderRadius = '50%';
            countBadge.style.display = 'flex';
            countBadge.style.justifyContent = 'center';
            countBadge.style.alignItems = 'center';
            countElement.appendChild(countBadge);
        }
    }
}

// Render cart
function renderCart() {
    const container = document.getElementById('cartItems');
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty. <a href="#" onclick="showPage(\'products\')">Continue shopping</a></p>';
        updateCartSummary();
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <div class="quantity-btn decrease" data-id="${item.id}">-</div>
                    <div class="quantity">${item.quantity}</div>
                    <div class="quantity-btn increase" data-id="${item.id}">+</div>
                </div>
                <div class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
        `;
        container.appendChild(cartItem);
    });
    
    // Add event listeners for quantity controls
    document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            updateQuantity(id, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            updateQuantity(id, 1);
        });
    });
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            removeFromCart(id);
        });
    });
    
    updateCartSummary();
}

// Update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartShipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}

// Toggle wishlist
function toggleWishlist(productId) {
    const wishlistIcon = event.currentTarget.querySelector('i');
    
    if (wishlistIcon.classList.contains('far')) {
        wishlistIcon.className = 'fas fa-heart';
        event.currentTarget.style.color = '#f87171';
    } else {
        wishlistIcon.className = 'far fa-heart';
        event.currentTarget.style.color = '';
    }
}

// Populate category filter
function populateCategoryFilter() {
    const filter = document.getElementById('categoryFilter');
    filter.innerHTML = '<option value="all">All Categories</option>';
    
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filter.appendChild(option);
    });
}

// Auth Modal
function openAuthModal() {
    authModal.classList.add('active');
    showSignIn();
}

function closeAuthModal() {
    authModal.classList.remove('active');
}

function showSignIn() {
    authTitle.textContent = 'Sign In';
    authSubmit.textContent = 'Sign In';
    authSwitchText.innerHTML = "Don't have an account? <a href='#' id='authSwitch'>Sign Up</a>";
    confirmPasswordGroup.style.display = 'none';
    document.getElementById('confirmPassword').value = '';
}

function showSignUp() {
    authTitle.textContent = 'Sign Up';
    authSubmit.textContent = 'Sign Up';
    authSwitchText.innerHTML = "Already have an account? <a href='#' id='authSwitch'>Sign In</a>";
    confirmPasswordGroup.style.display = 'block';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the page
    showPage('home');
    updateCartCount();
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });
    
    // Auth Modal
    const openAuthBtn = document.querySelector('.nav-icons .fa-user').closest('a');
    
    openAuthBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal();
    });
    
    closeModalBtn.addEventListener('click', closeAuthModal);
    
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            closeAuthModal();
        }
    });
    
    // Switch between sign in and sign up
    document.addEventListener('click', (e) => {
        if (e.target.id === 'authSwitch') {
            e.preventDefault();
            if (authTitle.textContent === 'Sign In') {
                showSignUp();
            } else {
                showSignIn();
            }
        }
    });
    
    // Auth form submission
    document.getElementById('authSubmit').addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        if (authTitle.textContent === 'Sign Up') {
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
        }
        
        // Simulate authentication
        alert(`${authTitle.textContent} successful!`);
        closeAuthModal();
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
    });
    
    // Newsletter Form Submission
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input');
        const email = emailInput.value;
        
        if (email) {
            // Show success message
            const originalContent = this.innerHTML;
            this.innerHTML = '<p style="color: #4ade80; font-weight: 600;">Thank you for subscribing!</p>';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.innerHTML = originalContent;
                emailInput.value = '';
            }, 3000);
        }
    });
    
    // Contact Form
    sendMessageBtn.addEventListener('click', function() {
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate sending message
        alert('Message sent successfully!');
        document.getElementById('contactName').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactSubject').value = '';
        document.getElementById('contactMessage').value = '';
    });
    
    // Checkout
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Simulate checkout
        alert('Order placed successfully!');
        cart = [];
        updateCartCount();
        renderCart();
        showPage('home');
    });
    
    // Search
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            renderSearchResults(query);
        }
    });
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                renderSearchResults(query);
            }
        }
    });
    
    // Product filters
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('priceFilter').addEventListener('change', filterProducts);
    document.getElementById('sortFilter').addEventListener('change', filterProducts);
});

// Filter products
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    let filteredProducts = [...products];
    
    // Apply category filter
    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    // Apply price filter
    if (priceFilter !== 'all') {
        switch(priceFilter) {
            case '0-50':
                filteredProducts = filteredProducts.filter(product => product.price <= 50);
                break;
            case '50-100':
                filteredProducts = filteredProducts.filter(product => product.price > 50 && product.price <= 100);
                break;
            case '100-200':
                filteredProducts = filteredProducts.filter(product => product.price > 100 && product.price <= 200);
                break;
            case '200+':
                filteredProducts = filteredProducts.filter(product => product.price > 200);
                break;
        }
    }
    
    // Apply sorting
    switch(sortFilter) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    // Render filtered products
    const container = document.getElementById('allProducts');
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p>No products found matching your criteria.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Render search results
function renderSearchResults(query) {
    const container = document.getElementById('searchResults');
    container.innerHTML = '';
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p>No products found matching your search.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}