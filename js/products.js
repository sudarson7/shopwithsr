let products = JSON.parse(localStorage.getItem("products")) || [];

let container = document.getElementById("productContainer");

function load(){
    container.innerHTML = "";

    products.forEach(p=>{
        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
            <button onclick="addToWishlist(${p.id})">Wishlist</button>
        `;

        container.appendChild(div);
    });
}

function addToCart(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = products.find(p => p.id === id);

    if(!cart.find(i => i.id === id)){
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

function addToWishlist(id){
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let product = products.find(p => p.id === id);

    if(!wishlist.find(i => i.id === id)){
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
}

load();
