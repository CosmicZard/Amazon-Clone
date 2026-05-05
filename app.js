document.addEventListener("DOMContentLoaded", () => {
    
    // --- SEARCH BAR LOGIC ---
    const searchInput = document.querySelector(".search-input");
    const searchBtn = document.querySelector(".search-button");

    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", () => {
            const value = searchInput.value.trim();
            if (value === "") {
                alert("Please enter something!");
            } else {
                alert("Searching for: " + value);
            }
        });
    }

    // --- CAROUSEL SLIDER LOGIC ---
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".arrow.right");
    const prevBtn = document.querySelector(".arrow.left");

    let index = 0;

    // Helper function to translate the track 
    function updateSlidePosition() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    // Move Forward
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            index = (index + 1) % slides.length;
            updateSlidePosition();
        });
    }

    // Move Backward
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            index = (index - 1 + slides.length) % slides.length;
            updateSlidePosition();
        });
    }

    // Auto slide every 4 seconds
    setInterval(() => {
        index = (index + 1) % slides.length;
        updateSlidePosition();
    }, 4000);

});

// --- ADD TO CART BUTTON & BADGE LOGIC ---
    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
    const cartBadge = document.querySelector(".cart-badge");
    
    // Start cart count at 0
    let cartCount = 0; 

    addToCartBtns.forEach(button => {
        button.addEventListener("click", function() {
            
            // 1. Increment the cart count and update the badge
            cartCount++;
            cartBadge.innerText = cartCount;

            // Optional: Add a quick little bounce animation to the badge
            cartBadge.style.transform = "scale(1.3)";
            setTimeout(() => { cartBadge.style.transform = "scale(1)"; }, 200);

            // 2. Button Visual Feedback (Green "Added!")
            const originalText = this.innerText;
            this.classList.add("added");
            this.innerText = "Added!";

            // 3. Revert button back after 2 seconds
            setTimeout(() => {
                this.classList.remove("added");
                this.innerText = originalText;
            }, 2000);
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
    
    // --- CART STATE & ELEMENTS ---
    let cart = []; // Array to store our items
    
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartBadge = document.querySelector('.cart-badge'); // The top nav badge
    const navCartBtn = document.querySelector('.nav-cart');
    const closeCartBtn = document.getElementById('close-cart');

    // --- TOGGLE SIDEBAR ---
    navCartBtn.addEventListener('click', () => cartSidebar.classList.add('active'));
    closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('active'));

    // --- ADD TO CART BUTTONS ---
    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
    
    addToCartBtns.forEach(button => {
        button.addEventListener("click", function() {
            // Get product data from HTML attributes
            const id = this.getAttribute("data-id");
            const name = this.getAttribute("data-name");
            const price = parseInt(this.getAttribute("data-price"));

            // Check if item is already in cart
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            // Visual Green Button Feedback
            const originalText = this.innerText;
            this.classList.add("added");
            this.innerText = "Added!";
            setTimeout(() => {
                this.classList.remove("added");
                this.innerText = originalText;
            }, 2000);

            // Update UI and slide out cart
            renderCart();
            cartSidebar.classList.add('active');
        });
    });

    // --- RENDER CART HTML ---
    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Clear current items
        let grandTotal = 0;
        let totalItemsCount = 0;

        cart.forEach(item => {
            const rowTotal = item.price * item.quantity;
            grandTotal += rowTotal;
            totalItemsCount += item.quantity;

            // Create the item row matching the screenshot
            const div = document.createElement('div');
            div.className = 'cart-item-row';
            div.innerHTML = `
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">
                    <b>₹${item.price.toLocaleString('en-IN')} × ${item.quantity} = ₹${rowTotal.toLocaleString('en-IN')}</b>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn minus" data-id="${item.id}">−</button>
                    <span class="qty">${item.quantity}</span>
                    <button class="qty-btn plus" data-id="${item.id}">+</button>
                    <span class="remove-btn" data-id="${item.id}">Remove</span>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });

        // Update Totals and Nav Badge
        cartTotalElement.innerHTML = `<b>₹${grandTotal.toLocaleString('en-IN')}</b>`;
        if (cartBadge) cartBadge.innerText = totalItemsCount;

        // --- ATTACH EVENT LISTENERS TO NEW CART BUTTONS ---
        
        // Plus Buttons
        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                cart.find(i => i.id === id).quantity += 1;
                renderCart();
            });
        });

        // Minus Buttons
        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const product = cart.find(i => i.id === id);
                if (product.quantity > 1) {
                    product.quantity -= 1;
                } else {
                    cart = cart.filter(i => i.id !== id); // Remove if drops below 1
                }
                renderCart();
            });
        });

        // Remove Buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                cart = cart.filter(i => i.id !== id); // Delete entirely
                renderCart();
            });
        });
    }
});

// --- TOGGLE SIDEBAR & OVERLAY ---
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay'); // Grab the new overlay
    const navCartBtn = document.querySelector('.nav-cart');
    const closeCartBtn = document.getElementById('close-cart');

    // Open Cart & Show Overlay (Dim background)
    navCartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active'); 
    });

    // Close Cart & Hide Overlay (Restore background)
    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    // Pro-tip: Allow users to click the dark background itself to close the cart!
    cartOverlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    // --- SIDE NAVIGATION MENU LOGIC ---
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const openMenuBtn = document.querySelector('.menu-icon'); // The "All" button
    const closeMenuBtn = document.getElementById('close-menu');

    // Open Menu
    if (openMenuBtn) {
        openMenuBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents the <a> tag from jumping to top of page
            sideMenu.classList.add('active');
            menuOverlay.classList.add('active');
        });
    }

    // Close Menu via 'X' button
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    }

    // Close Menu by clicking the dark overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    }