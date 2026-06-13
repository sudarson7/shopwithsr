let cart = JSON.parse(localStorage.getItem("cart")) || [];

let container = document.getElementById("cartContainer");
let totalText = document.getElementById("total");

function loadCart() {
    container.innerHTML = "";
    let total = 0;

    cart.forEach((p, i) => {
        total += p.price;

        let div = document.createElement("div");
        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="removeItem(${i})">Remove</button>
        `;

        container.appendChild(div);
    });

    totalText.innerText = "Total ₹" + total;
}

function removeItem(i) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

loadCart();
