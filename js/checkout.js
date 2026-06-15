let user = JSON.parse(localStorage.getItem("loggedUser"));

if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function calculateTotalAmount() {
    let total = 0;

    cart.forEach(item => {
        total += Number(item.price || 0);
    });

    return total;
}

document.getElementById("totalAmount").innerText =
    "Total: ₹" + calculateTotalAmount();

let paymentRadios = document.getElementsByName("payment");
let cardBox = document.getElementById("cardBox");

paymentRadios.forEach(radio => {
    radio.addEventListener("change", function () {
        if (this.value === "card") {
            cardBox.style.display = "block";
        } else {
            cardBox.style.display = "none";
        }
    });
});

function placeOrder(event) {

    if (event) event.preventDefault();

    if (window.__orderPlaced) return;
    window.__orderPlaced = true;

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;

    let payment = document.querySelector('input[name="payment"]:checked').value;

    if (!name || !email || !address || !phone) {
        alert("Please fill all details");
        window.__orderPlaced = false;
        return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        alert("Invalid phone number");
        window.__orderPlaced = false;
        return;
    }

    if (cart.length === 0) {
        alert("Cart is empty");
        window.__orderPlaced = false;
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let order = {
        id: Date.now(),
        name,
        email,
        address,
        phone,
        items: cart,
        total: calculateTotalAmount(),
        payment,
        date: new Date().toLocaleString()
    };

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("lastOrder", JSON.stringify(order));

    localStorage.removeItem("cart");
    cart = [];

    window.location.href = "invoice.html";
}
