let cart = JSON.parse(localStorage.getItem("cart")) || [];

let container = document.getElementById("cartContainer");
let totalText = document.getElementById("total");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<h3>Your cart is empty 🛒</h3>";
        totalText.innerText = "Total ₹0";
        return;
    }

    cart.forEach((p, i) => {

        let qty = p.qty || 1;
        let price = Number(p.price) * qty;
        total += price;

        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <img src="${p.img || ''}" style="width:100%;height:200px;object-fit:cover;">

            <h3>${p.name}</h3>
            <p>₹${p.price}</p>

            <div style="margin:10px 0;">
                <button onclick="changeQty(${i}, -1)">➖</button>
                <span style="margin:0 10px;">Qty: ${qty}</span>
                <button onclick="changeQty(${i}, 1)">➕</button>
            </div>

            <p><b>Subtotal: ₹${price}</b></p>

            <button onclick="removeItem(${i})">Remove</button>
        `;

        container.appendChild(div);
    });

    totalText.innerText = "Total ₹" + total;
}

function changeQty(index, change) {
    if (!cart[index].qty) {
        cart[index].qty = 1;
    }

    cart[index].qty += change;

    if (cart[index].qty <= 1) {
        cart[index].qty = 1;
    }

    saveCart();
    loadCart();
}

function removeItem(i) {
    cart.splice(i, 1);
    saveCart();
    loadCart();
}

loadCart();
