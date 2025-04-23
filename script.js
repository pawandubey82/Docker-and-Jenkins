// Sample product data
const products = [
  {
    id: 1,
    name: "Smartphone Pro",
    price: 58099,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    category: "electronics",
    description: "Latest smartphone with advanced camera and long battery life"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 10789,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
    category: "electronics",
    description: "Premium wireless earbuds with noise cancellation"
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 20749,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "electronics",
    description: "Fitness tracker with heart rate monitor and GPS"
  },
  {
    id: 4,
    name: "Laptop Ultra",
    price: 107899,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    category: "electronics",
    description: "High-performance laptop for professionals"
  },
  {
    id: 5,
    name: "Tablet Pro",
    price: 41499,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    category: "electronics",
    description: "Versatile tablet with stylus support"
  },
  {
    id: 6,
    name: "Organic Apples",
    price: 248,
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "grocery",
    description: "Fresh organic apples from local farms"
  },
  {
    id: 7,
    name: "Whole Grain Bread",
    price: 289,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    category: "grocery",
    description: "Artisan whole grain bread"
  },
  {
    id: 8,
    name: "Organic Milk",
    price: 414,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
    category: "grocery",
    description: "Fresh organic milk from grass-fed cows"
  },
  {
    id: 9,
    name: "Fresh Eggs",
    price: 497,
    image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc",
    category: "grocery",
    description: "Farm-fresh organic eggs"
  },
  {
    id: 10,
    name: "Organic Coffee",
    price: 1078,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "grocery",
    description: "Premium organic coffee beans"
  },
  {
    id: 11,
    name: "Leather Wallet",
    price: 4149,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    category: "accessories",
    description: "Genuine leather wallet with multiple compartments"
  },
  {
    id: 12,
    name: "Sunglasses",
    price: 7469,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666",
    category: "accessories",
    description: "UV protection sunglasses with polarized lenses"
  },
  {
    id: 13,
    name: "Smart Backpack",
    price: 6639,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    category: "accessories",
    description: "Water-resistant backpack with USB charging port"
  },
  {
    id: 14,
    name: "Wireless Charger",
    price: 2489,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90",
    category: "accessories",
    description: "Fast wireless charging pad"
  },
  {
    id: 15,
    name: "Portable Speaker",
    price: 4979,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
    category: "accessories",
    description: "Waterproof Bluetooth speaker with 12-hour battery"
  }
];

// DOM Elements
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalAmount = document.getElementById('total-amount');
const categoryButtons = document.querySelectorAll('.category-btn');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const cartModal = document.getElementById('cart-modal');
const checkoutForm = document.getElementById('checkout-form');
const orderItems = document.getElementById('order-items');
const finalTotal = document.getElementById('final-total');

// Cart state
let cart = [];
let currentCategory = 'all';

// Initialize the application
function init() {
  displayProducts();
  setupEventListeners();
  updateCart(); // Initialize cart display
}

// Toggle cart modal
function toggleCart() {
  if (cartModal.style.display === 'block') {
    cartModal.style.display = 'none';
  } else {
    cartModal.style.display = 'block';
    updateCart(); // Update cart display when opening
  }
}

// Close checkout modal
function closeCheckout() {
  checkoutModal.style.display = 'none';
}

// Display products based on current category
function displayProducts() {
  productList.innerHTML = '';
  const filteredProducts = currentCategory === 'all' 
    ? products 
    : products.filter(product => product.category === currentCategory);

  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    productList.appendChild(productCard);
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="description">${product.description}</p>
    <p class="price">Rs. ${product.price.toFixed(2)}</p>
    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  return card;
}

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  showSuccessMessage('Item added to cart!');
}

// Show success message
function showSuccessMessage(message) {
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.textContent = message;
  document.body.appendChild(successMessage);

  // Remove message after 2 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 2000);
}

// Update cart display
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
  } else {
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="item-info">
          <img src="${item.image}" alt="${item.name}">
          <div class="item-details">
            <h4>${item.name}</h4>
            <p class="item-price">Rs. ${item.price.toFixed(2)}</p>
          </div>
        </div>
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
        <div class="item-total">
          <span>Rs. ${(item.price * item.quantity).toFixed(2)}</span>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
      cartItems.appendChild(cartItem);
      total += item.price * item.quantity;
    });
  }

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  totalAmount.textContent = total.toFixed(2);
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    removeFromCart(productId);
    return;
  }

  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    updateCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Show checkout modal
function showCheckoutModal() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  // Close cart modal
  cartModal.style.display = 'none';
  
  // Show checkout modal
  checkoutModal.style.display = 'block';
  
  // Update order items
  orderItems.innerHTML = '';
  cart.forEach(item => {
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    orderItem.innerHTML = `
      <div class="order-item-details">
        <span class="order-item-name">${item.name}</span>
        <span class="order-item-quantity">x${item.quantity}</span>
      </div>
      <span class="order-item-price">Rs. ${(item.price * item.quantity).toFixed(2)}</span>
    `;
    orderItems.appendChild(orderItem);
  });

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  finalTotal.textContent = total.toFixed(2);
}

// Process order
function processOrder(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  // Validate form inputs
  if (!name || !phone || !address) {
    alert('Please fill in all fields');
    return;
  }

  // Validate phone number (basic validation)
  if (!/^\d{10}$/.test(phone)) {
    alert('Please enter a valid 10-digit phone number');
    return;
  }

  // Create order confirmation
  const orderConfirmation = document.createElement('div');
  orderConfirmation.className = 'order-confirmation';
  orderConfirmation.innerHTML = `
    <div class="confirmation-content">
      <h2>Order Confirmed!</h2>
      <p>Thank you for your purchase, ${name}!</p>
      <p>Your order will be delivered to:</p>
      <p>${address}</p>
      <p>We'll contact you at: ${phone}</p>
      <p>Total Amount: Rs. ${finalTotal.textContent}</p>
      <button onclick="closeConfirmation()" class="close-confirmation">Close</button>
    </div>
  `;
  
  // Add confirmation to body
  document.body.appendChild(orderConfirmation);
  
  // Reset cart and close modals
  cart = [];
  updateCart();
  checkoutModal.style.display = 'none';
  checkoutForm.reset();
}

// Close confirmation message
function closeConfirmation() {
  const confirmation = document.querySelector('.order-confirmation');
  if (confirmation) {
    confirmation.remove();
  }
}

// Setup event listeners
function setupEventListeners() {
  // Category filter buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentCategory = button.dataset.category;
      displayProducts();
    });
  });

  // Checkout button
  checkoutBtn.addEventListener('click', showCheckoutModal);

  // Checkout form submission
  checkoutForm.addEventListener('submit', processOrder);

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = 'none';
    }
    if (e.target === checkoutModal) {
      checkoutModal.style.display = 'none';
    }
  });
}

// Initialize the application
init();
  