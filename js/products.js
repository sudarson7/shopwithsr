const data = {
    clothing: [
        { id: 1, name: "T-Shirt", price: 299, img: "image/OIP (1).webp" },
        { id: 2, name: "Shirt", price: 599, img: "image/OIP (2).webp" }
    ],

    vegetables: [
        { id: 3, name: "Apple", price: 120, img: "image/apples-9390176_1280.jpg" },
        { id: 4, name: "Banana", price: 60, img: "image/ss.webp" }
    ],

    mobile: [
        { id: 5, name: "Charger", price: 499, img: "image/OIP.webp" },
        { id: 6, name: "Earbuds", price: 999, img: "image/OIP (3).webp" }
    ],

    home: [
        { id: 7, name: "Refrigerator", price: 24999, img: "image/eref.webp" },
        { id: 8, name: "Washing Machine", price: 18999, img: "image/whirlpool.jpg" }
    ]
};

const url = new URLSearchParams(window.location.search);
const category = url.get("category");

const container = document.getElementById("productContainer");

const allProducts = Object.values(data).flat();

function load() {

    let productsToShow = category ? data[category] : allProducts;

    if (!productsToShow) {
        container.innerHTML = "<h2>Please select a valid category</h2>";
        return;
    }

    container.innerHTML = "";

    productsToShow.forEach(p => {

        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <img src="${p.img}" alt="${p.name}"
                 onerror="this.src='image/default.png'"
                 style="width:220px;height:220px;object-fit:cover;">

            <h3>${p.name}</h3>
            <p>₹${p.price}</p>

            <button onclick="addToCart(${p.id})">🛒 Add to Cart</button>
            <button onclick="addToWishlist(${p.id})">❤️ Wishlist</button>
        `;

        container.appendChild(div);
    });
}

function addToCart(id) {

    let user = JSON.parse(localStorage.getItem("loggedUser"));

    if (!user) {
        alert("Login required to add items to cart");
        window.location.href = "login.html";
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = allProducts.find(p => p.id === id);

    if (!product) return;

  let exists = cart.find(item => item.id === id);

if (!exists) {
    product.qty = 1;
    cart.push(product);
} else {
    exists.qty += 1;
}
}

function addToWishlist(id) {

    let user = JSON.parse(localStorage.getItem("loggedUser"));

    if (!user) {
        alert("Login required to add wishlist items");
        window.location.href = "login.html";
        return;
    }

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let product = allProducts.find(p => p.id === id);

    if (!product) return;

    let exists = wishlist.find(item => item.id === id);

    if (!exists) {
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Added to Wishlist ❤️");
    } else {
        alert("Already in Wishlist");
    }
}

load();
