let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function addToWishlist(id) {
    let allProducts = Object.values(data).flat();

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

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    loadWishlist();
}

function loadWishlist() {
    let container = document.getElementById("wishlistContainer");
    container.innerHTML = "";

    wishlist.forEach((item, index) => {
        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button onclick="removeFromWishlist(${index})">Remove</button>
        `;

        container.appendChild(div);
    });
}

loadWishlist();
