
const data = {
    clothing: [
        {
            id: 1,
            name: "T-Shirt",
            price: 299,
            img: "image/OIP (1).webp"
        },
        {
            id: 2,
            name: "Shirt",
            price: 599,
            img: "image/OIP (2).webp"
        }
    ],

    vegetables: [
        {
            id: 3,
            name: "Apple",
            price: 120,
            img: "image/apples-9390176_1280.jpg"
        },
        {
            id: 4,
            name: "Banana",
            price: 60,
            img: "image/ss.webp"
        }
    ],

    mobile: [
        {
            id: 5,
            name: "Charger",
            price: 499,
            img: "image/OIP.webp"
        },
        {
            id: 6,
            name: "Earbuds",
            price: 999,
            img: "image/OIP (3).webp"
        }
    ],

   home: [
    {
        id: 7,
        name: "Refrigerator",
        price: 24999,
        img: "image/eref.webp"
    },
    {
        id: 8,
        name: "Washing Machine",
        price: 18999,
        img:"image/whirlpool.jpg"
    }
]
};

// Get category from URL
const url = new URLSearchParams(window.location.search);
const category = url.get("category");

let container = document.getElementById("productContainer");

// Combine all products for cart/wishlist search
let allProducts = Object.values(data).flat();

// Load products
function load() {
    container.innerHTML = "";

    data[category].forEach(p => {
        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <img src="${p.img}" style="width:100%; height:180px; object-fit:cover;">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>

            <button onclick="addToCart(${p.id})">🛒 Cart</button>
            <button onclick="addToWishlist(${p.id})">❤️ Wishlist</button>
        `;

        container.appendChild(div);
    });
}

// Add to cart
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = allProducts.find(p => p.id === id);

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to Cart 🛒");
}

// Add to wishlist
function addToWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let product = allProducts.find(p => p.id === id);

    let exists = wishlist.find(p => p.id === id);

    if (!exists) {
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Added to Wishlist ❤️");
    } else {
        alert("Already in Wishlist");
    }
}

// Run on page load
load();
