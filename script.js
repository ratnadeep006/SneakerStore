// SneakerStore JavaScript
// --------------------------------------
// This file controls all dynamic behavior:
// - Product rendering
// - Category filters
// - Search functionality
// - Price range filter
// - Cart open/close
// - Cart item management
// - Wishlist functionality
// - Mobile menu toggle
// - Smooth scroll for Shop Now button
// --------------------------------------

// --------------------------------------
// PRODUCT DATA
// --------------------------------------
// Each product now includes a 'category'.
// Expanded with more shoes for men, women, and kids categories.
// Prices increased and converted to INR (₹) using ~83 USD to INR rate, rounded.
const products = [
  // MEN CATEGORY (Expanded: 8 total)
  {
    id: 1,
    name: "Air Max 2024",
    price: 16599,
    image: "image/m1.jpg",
    description: "Latest edition of the iconic Air Max series",
    category: "men",
  },
  {
    id: 2,
    name: "ZoomX Runner",
    price: 13299,
    image: "image/m2.jpg",
    description: "Professional running shoes with ZoomX technology",
    category: "men",
  },
  {
    id: 3,
    name: "Free Run 5.0",
    price: 10899,
    image: "image/m3.jpg",
    description: "Lightweight and flexible running experience",
    category: "men",
  },
  {
    id: 20,
    name: "Adidas Stan Smith Men",
    price: 9999,
    image: "image/m4.jpg",
    description: "Classic tennis-inspired sneakers",
    category: "men",
  },
  {
    id: 21,
    name: "Puma Clyde Men",
    price: 11999,
    image: "image/m5.jpg",
    description: "Retro basketball shoes with suede",
    category: "men",
  },
  {
    id: 22,
    name: "Reebok Club C Men",
    price: 8999,
    image: "image/m6.jpg",
    description: "Timeless comfort for everyday wear",
    category: "men",
  },
  {
    id: 23,
    name: "New Balance 574 Men",
    price: 10999,
    image: "image/m7.jpg",
    description: "Versatile running and casual shoes",
    category: "men",
  },
  {
    id: 24,
    name: "Asics Kayano Men",
    price: 14999,
    image: "image/m8.jpg",
    description: "Supportive running shoes with stability",
    category: "men",
  },

  // WOMEN CATEGORY (8 total)
  {
    id: 4,
    name: "Air Bella",
    price: 12499,
    image: "image/w1.jpg",
    description: "Comfort-focused sports shoes for women",
    category: "women",
  },
  {
    id: 5,
    name: "Flex Trainer",
    price: 11699,
    image: "image/w2.jpg",
    description: "Designed for flexible running",
    category: "women",
  },
  {
    id: 6,
    name: "Zoom Bella",
    price: 14199,
    image: "image/w3.jpg",
    description: "Women’s performance training shoes",
    category: "women",
  },
  {
    id: 10,
    name: "Ultraboost Women",
    price: 15899,
    image: "image/w4.jpg",
    description: "Energy-returning running shoes for women",
    category: "women",
  },
  {
    id: 11,
    name: "Ignite Women",
    price: 9919,
    image: "image/w5.jpg",
    description: "Cushioned and supportive for daily wear",
    category: "women",
  },
  {
    id: 12,
    name: "Nano Women",
    price: 13299,
    image: "image/w6.jpg",
    description: "Cross-training shoes with stability",
    category: "women",
  },
  {
    id: 13,
    name: "Fresh Foam Women",
    price: 14999,
    image: "image/w7.jpg",
    description: "Foam cushioning for all-day comfort",
    category: "women",
  },
  {
    id: 14,
    name: "Gel Nimbus Women",
    price: 16699,
    image: "image/w8.jpg",
    description: "Premium running shoes with gel technology",
    category: "women",
  },

  // KIDS CATEGORY (8 total)
  {
    id: 7,
    name: "Star Runner Kids",
    price: 7499,
    image: "image/k1.jpg",
    description: "Soft foam and flexible traction for kids",
    category: "kids",
  },
  {
    id: 8,
    name: "Downshifter Kids",
    price: 6599,
    image: "image/k2.jpg",
    description: "Lightweight and breathable shoes",
    category: "kids",
  },
  {
    id: 9,
    name: "Flex Runner Kids",
    price: 8299,
    image: "image/k3.jpg",
    description: "Slip-on style for kids’ easy wear",
    category: "kids",
  },
  {
    id: 15,
    name: "Predator Kids",
    price: 9099,
    image: "image/k4.jpg",
    description: "Soccer shoes with control for young players",
    category: "kids",
  },
  {
    id: 16,
    name: "Suede Kids",
    price: 5799,
    image: "image/k5.jpg",
    description: "Classic suede sneakers for kids",
    category: "kids",
  },
  {
    id: 17,
    name: " Zig Kids",
    price: 7499,
    image: "image/k6.jpg",
    description: "Retro style with modern comfort",
    category: "kids",
  },
  {
    id: 18,
    name: "All Star Kids",
    price: 4999,
    image: "image/k7.jpg",
    description: "Iconic high-tops for kids",
    category: "kids",
  },
  {
    id: 19,
    name: "Vans Old Skool Kids",
    price: 6599,
    image: "image/k8.jpg",
    description: "Skate-inspired sneakers for kids",
    category: "kids",
  },
];

// --------------------------------------
// CART AND WISHLIST ARRAYS
// --------------------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// --------------------------------------
// RENDER PRODUCTS (with filters)
// --------------------------------------
function renderProducts(
  filterCategory = "all",
  maxPrice = 20000,
  searchText = ""
) {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = "";

  const filtered = products.filter((product) => {
    // CATEGORY FILTER
    const categoryCheck =
      filterCategory === "all" || product.category === filterCategory;

    // PRICE RANGE FILTER
    const priceCheck = product.price <= maxPrice;

    // SEARCH FILTER
    const searchCheck = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return categoryCheck && priceCheck && searchCheck;
  });

  // Render Each Product Card
  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="product-price">₹${product.price}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="wishlist-btn" onclick="addToWishlist(${product.id})">❤️</button>
            </div>
        `;
    productGrid.appendChild(card);
  });
}

// --------------------------------------
// FILTER CATEGORY
// --------------------------------------
function filterCategory(category) {
  renderProducts(
    category,
    document.getElementById("priceRange").value,
    document.getElementById("searchInput").value
  );
}

// --------------------------------------
// PRICE INPUT HANDLER
// --------------------------------------
function onPriceInput(event) {
  document.getElementById(
    "priceDisplay"
  ).textContent = `₹${event.target.value}`;
  const activeCategory = document.querySelector(".nav-links a.active")
    ? document.querySelector(".nav-links a.active").dataset.category
    : "all";
  renderProducts(
    activeCategory,
    event.target.value,
    document.getElementById("searchInput").value
  );
}

// --------------------------------------
// SEARCH INPUT HANDLER
// --------------------------------------
function onSearchInput(event) {
  const activeCategory = document.querySelector(".nav-links a.active")
    ? document.querySelector(".nav-links a.active").dataset.category
    : "all";
  renderProducts(
    activeCategory,
    document.getElementById("priceRange").value,
    event.target.value
  );
}

// --------------------------------------
// CLEAR FILTERS
// --------------------------------------
function clearFilters() {
  document.getElementById("priceRange").value = 20000;
  document.getElementById("priceDisplay").textContent = "₹20000";
  document.getElementById("searchInput").value = "";
  renderProducts("all");
}

// --------------------------------------
// CART SIDEBAR TOGGLE
// --------------------------------------
function toggleCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  cartSidebar.classList.toggle("open");
}

// --------------------------------------
// WISHLIST SIDEBAR TOGGLE
// --------------------------------------
function toggleWishlist() {
  const wishlistSidebar = document.getElementById("wishlistSidebar");
  wishlistSidebar.classList.toggle("open");
  renderWishlist();
}

// --------------------------------------
// ADD TO CART
// --------------------------------------
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// --------------------------------------
// ADD TO WISHLIST
// --------------------------------------
function addToWishlist(productId) {
  const product = products.find((p) => p.id === productId);
  if (!wishlist.find((item) => item.id === productId)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
  }
}

// --------------------------------------
// UPDATE CART DISPLAY
// --------------------------------------
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.querySelector(".cart-count");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  // Update Count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update Items
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price} × ${item.quantity}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2);
}

// --------------------------------------
// UPDATE WISHLIST COUNT
// --------------------------------------
function updateWishlistCount() {
  document.querySelector(".wishlist-count").textContent = wishlist.length;
}

// --------------------------------------
// RENDER WISHLIST
// --------------------------------------
function renderWishlist() {
  const wishlistItems = document.getElementById("wishlistItems");
  wishlistItems.innerHTML = "";

  wishlist.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "wishlist-item";
    div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="wishlist-controls">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
                <button onclick="removeFromWishlist(${index})">Remove</button>
            </div>
        `;
    wishlistItems.appendChild(div);
  });
}

// --------------------------------------
// UPDATE QUANTITY BUTTONS
// --------------------------------------
function updateQuantity(index, change) {
  const item = cart[index];

  item.quantity += change;

  if (item.quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// --------------------------------------
// REMOVE ITEM FROM CART
// --------------------------------------
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// --------------------------------------
// REMOVE ITEM FROM WISHLIST
// --------------------------------------
function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
  renderWishlist();
}

// --------------------------------------
// MOBILE MENU TOGGLE
// --------------------------------------
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("show");
}

// --------------------------------------
// DARK MODE TOGGLE
// --------------------------------------
function toggleDarkMode(button) {
  document.body.classList.toggle("dark");
  button.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

// --------------------------------------
// SMOOTH SCROLL TO PRODUCTS
// --------------------------------------
function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

// --------------------------------------
// SIGNIN MODAL HANDLERS (hardcoded demo credentials)
// --------------------------------------
function openSignin() {
  const modal = document.getElementById('signinModal');
  modal.setAttribute('aria-hidden', 'false');
}

function closeSignin() {
  const modal = document.getElementById('signinModal');
  modal.setAttribute('aria-hidden', 'true');
}

function handleSignin(event) {
  event.preventDefault();
  const user = document.getElementById('signinUser').value.trim();
  const pass = document.getElementById('signinPass').value;

  // Hardcoded demo credentials
  const demoUser = 'demo@user.com';
  const demoPass = 'demo123';

  if (user === demoUser && pass === demoPass) {
    // Persist signed-in user
    const userObj = { id: demoUser, name: 'Demo User' };
    localStorage.setItem('signedInUser', JSON.stringify(userObj));

    // Update UI
    applySignedInState(userObj);
    alert('Signed in successfully as ' + userObj.name);
    closeSignin();
  } else {
    alert('Invalid credentials. Use demo@user.com / demo123');
  }
}

function checkout() {
  const signed = JSON.parse(localStorage.getItem('signedInUser'));
  if (!signed) {
    openSignin();
    return;
  }
  alert('Checkout is not implemented in this demo. Proceeding as ' + (signed.name || signed.id));
}

function applySignedInState(userObj) {
  // hide sign in button
  const signinBtn = document.getElementById('signinBtn');
  const userContainer = document.getElementById('userContainer');
  const userName = document.getElementById('userName');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const loginCheckoutBtn = document.getElementById('loginCheckoutBtn');
  if (signinBtn) signinBtn.classList.add('hidden');
  if (userContainer) {
    userContainer.classList.remove('hidden');
    userContainer.setAttribute('aria-hidden', 'false');
    userName.textContent = userObj.name || userObj.id;
  }
  if (checkoutBtn) checkoutBtn.classList.remove('hidden');
  if (loginCheckoutBtn) loginCheckoutBtn.classList.add('hidden');
}

function applySignedOutState() {
  const signinBtn = document.getElementById('signinBtn');
  const userContainer = document.getElementById('userContainer');
  const userMenu = document.getElementById('userMenu');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const loginCheckoutBtn = document.getElementById('loginCheckoutBtn');
  if (signinBtn) signinBtn.classList.remove('hidden');
  if (userContainer) {
    userContainer.classList.add('hidden');
    userContainer.setAttribute('aria-hidden', 'true');
  }
  if (userMenu) {
    userMenu.setAttribute('aria-hidden', 'true');
    document.getElementById('userAvatar').setAttribute('aria-expanded', 'false');
  }
  if (checkoutBtn) checkoutBtn.classList.add('hidden');
  if (loginCheckoutBtn) loginCheckoutBtn.classList.remove('hidden');
}

function toggleUserMenu() {
  const userMenu = document.getElementById('userMenu');
  const avatar = document.getElementById('userAvatar');
  if (!userMenu) return;
  const isHidden = userMenu.getAttribute('aria-hidden') === 'true';
  userMenu.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
  avatar.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
}

function logout() {
  localStorage.removeItem('signedInUser');
  applySignedOutState();
  alert('You have been logged out');
}

// --------------------------------------
// INITIAL LOAD
// --------------------------------------
window.onload = () => {
  renderProducts();
  updateCart();
  updateWishlistCount();

  const signed = JSON.parse(localStorage.getItem('signedInUser'));
  if (signed) {
    applySignedInState(signed);
  } else {
    applySignedOutState();
  }
};
