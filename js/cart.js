let cart = JSON.parse(localStorage.getItem("cart")) || [];

let box = document.getElementById("cartContainer");
let totalBox = document.getElementById("total");

function loadCart(){
    box.innerHTML = "";
    let total = 0;

    cart.forEach((p,i)=>{
        total += p.price;

        let div = document.createElement("div");
        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="remove(${i})">Remove</button>
        `;

        box.appendChild(div);
    });

    totalBox.innerText = "Total ₹" + total;
}

function remove(i){
    cart.splice(i,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

loadCart();
