document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Wireless Headphones", price: 3000, img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTTdPnoP5GH9fXN36K0LppoTrpdvukNvP5MnE5zKdsGq8qfCEdZ9cVWI8fmR6B_TPnqQSVyTLX_0iImOj-oKWR-c6q-0fL6EPiubfsE3lQ", category: "electronics" },
        { id: 2, name: "Smartwatch", price: 50000, img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQcHI8GiDhLPDpTD1EPtj1gS8yfRVipCkVt79snGp6zPhKgwZM360MJnQFmVTcExSJVXWNpV542br8SjyPS5ZFjPza9KlAPxS6QLa2kyMUFS7HSOYiBAsEyKH6ubD_7gkzUXQ&usqp=CAc", category: "electronics" },
        { id: 3, name: "Shirt", price: 1500, img: "https://m.media-amazon.com/images/I/51JIlfNvLGL._AC_UL480_FMwebp_QL65_.jpg", category: "fashion" },
        { id: 4, name: "Jeans", price: 2000, img: "https://m.media-amazon.com/images/I/61gHpAoj8zL._AC_UL480_FMwebp_QL65_.jpg", category: "fashion" },
        { id: 5, name: "salt", price: 22.3, img: "https://m.media-amazon.com/images/I/614mm2hYHyL._AC_UL480_FMwebp_QL65_.jpg", category: "grocery" },
        { id: 6, name: "Cooking oil", price: 165.5, img: "https://m.media-amazon.com/images/I/81FbVYZJYyL._AC_UL480_FMwebp_QL65_.jpg", category: "grocery" },
        { id: 7, name: "Laptop", price: 50000, img: "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY327_FMwebp_QL65_.jpg", category: "electronics" },
        { id: 8, name: "Shampoo", price: 329, img: "https://m.media-amazon.com/images/I/41oHj1nTOkL._AC_UL480_FMwebp_QL65_.jpg", category: "beauty" },
        { id: 9, name: "Mixer grinder", price: 3099, img: "https://m.media-amazon.com/images/I/71+cDVETcIL._AC_UL480_QL65_.jpg", category: "home-appliances" },
        { id: 10, name: "Air fryer", price: 8199, img: "https://m.media-amazon.com/images/I/414ly0wsjYL._AC_UL480_QL65_.jpg", category: "home-appliances" },
        { id: 11, name: "Watch", price: 8000, img: "https://m.media-amazon.com/images/G/31/img21/Watches2024/Oct/Category/Premium/Tommy_M._SX564_QL85_.jpg", category: "fashion" }
    ];

    const cart = [];
    const cartItemsList = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartContainer = document.getElementById("cart-container");
    const checkoutContainer = document.getElementById("checkout-container");

    function renderProducts() {
        const categories = ["fashion", "grocery", "electronics", "home-appliances", "beauty"];
        categories.forEach(category => {
            const categoryContainer = document.getElementById(`${category}-products`);
            categoryContainer.innerHTML = "";
            products.filter(product => product.category === category).forEach(product => {
                const productBox = document.createElement("div");
                productBox.classList.add("product-container");
                productBox.innerHTML = `
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p><strong>&#8377;${product.price.toFixed(2)}</strong></p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                categoryContainer.appendChild(productBox);
            });
        });
    }

    window.addToCart = function (id) {
        const product = products.find(p => p.id === id);
        cart.push(product);
        updateCart();
    };

    function updateCart() {
        cartItemsList.innerHTML = "";
        cart.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${item.name} - &#8377;${item.price.toFixed(2)} 
                <button onclick="removeFromCart(${index})">❌</button>`;
            cartItemsList.appendChild(listItem);
        });
        cartCount.innerText = cart.length;
    }

    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        updateCart();
    };

    window.toggleCart = function () {
        cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
    };

    window.checkout = function () {
        checkoutContainer.style.display = "block";
        document.getElementById("payment-form").onsubmit = function (event) {
            event.preventDefault();
            alert("Payment Successful! 🎉 Thank you for shopping.");
            checkoutContainer.style.display = "none";
            cart.length = 0;
            updateCart();
        };
    };

    window.closeCheckout = function () {
        checkoutContainer.style.display = "none";
    };

    window.scrollToCategory = function (category) {
        document.getElementById(category).scrollIntoView({ behavior: "smooth" });
    };

    renderProducts();
});