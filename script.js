const products = [
    {id: 1, name: "Cheese Burger", description: "Beef patty with cheese", price: 99, emoji: "🍔"},
    {id: 2, name: "Pepperoni Pizza", description: "Pizza with cheese and pepperoni", price: 199, emoji: "🍕"},
    {id: 3, name: "Fried Chicken", description: "Crispy chicken with rice", price: 120, emoji: "🍗"},
    {id: 4, name: "French Fries", description: "Crispy salted fries", price: 65, emoji: "🍟"},
    {id: 5, name: "Milk Tea", description: "Classic milk tea with pearls", price: 75, emoji: "🧋"},
    {id: 6, name: "Spaghetti", description: "Filipino-style spaghetti", price: 85, emoji: "🍝"},
    {id: 7, name: "Chocolate Donut", description: "Chocolate glazed donut", price: 45, emoji: "🍩"},
    {id: 8, name: "Iced Coffee", description: "Cold coffee with milk", price: 80, emoji: "☕"}
];

let cart = [];

// DISPLAY FOOD MENU
function displayMenu() {
    const menu = document.getElementById("menu");

    menu.innerHTML = products.map(product => `
        <div class="item">
            <div class="food-image">${product.emoji}</div>
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="price">₱${product.price.toFixed(2)}</p>
            <button class="add-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join("");
}

// SWITCH PAGE
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    document.getElementById("menuTab").classList.toggle("active", pageId === "menuPage");
    document.getElementById("cartTab").classList.toggle("active", pageId === "cartPage");

    if (pageId === "cartPage") {
        displayCart();
    }

    window.scrollTo(0, 0);
}

// ADD TO CART
function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCartCount();
    alert(product.name + " added to cart!");
}

// CART COUNT
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").textContent = count;
}

// CHANGE QUANTITY
function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    displayCart();
    updateCartCount();
}

// REMOVE ITEM
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    displayCart();
    updateCartCount();
}

// DISPLAY CART
function displayCart() {
    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your shopping cart is empty.</p>";
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-row">
                <div>
                    <strong>${item.emoji} ${item.name}</strong>
                    <p>₱${item.price.toFixed(2)} each</p>
                </div>

                <div class="quantity">
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    <strong>${item.quantity}</strong>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>

                <strong>₱${(item.price * item.quantity).toFixed(2)}</strong>

                <button class="remove-btn" onclick="removeItem(${item.id})">
                    Remove
                </button>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("total").textContent = total.toFixed(2);
}

// CHECKOUT
function checkout() {
    const name = document.getElementById("customerName").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const payment = document.getElementById("payment").value;

    if (cart.length === 0) {
        alert("Please add food items to your cart.");
        return;
    }

    if (!name || !address || !phone || !payment) {
        alert("Please complete all customer information.");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    alert(
        "ORDER SUCCESSFUL!\n\n" +
        "Customer: " + name + "\n" +
        "Address: " + address + "\n" +
        "Phone: " + phone + "\n" +
        "Payment: " + payment + "\n" +
        "Total: ₱" + total.toFixed(2)
    );

    cart = [];
    displayCart();
    updateCartCount();

    ["customerName", "address", "phone", "payment"].forEach(id => {
        document.getElementById(id).value = "";
    });
}

// START SYSTEM
displayMenu();
displayCart();
updateCartCount();
