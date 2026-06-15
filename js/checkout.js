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

function placeOrder() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;

    let payment = document.querySelector('input[name="payment"]:checked').value;

    if (!name || !email || !address || !phone) {
        alert("Please fill all details");
        return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        alert("Invalid phone number");
        return;
    }

    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    if (payment === "card") {
        let card = document.getElementById("cardNumber").value;
        let expiry = document.getElementById("expiry").value;
        let cvv = document.getElementById("cvv").value;

        if (!card || !expiry || !cvv) {
            alert("Enter complete card details");
            return;
        }

        alert("Card payment successful 💳");
    } else {
        alert("Cash on Delivery selected 🏠");
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
        payment: payment,
        date: new Date().toLocaleString()
    };

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("lastOrder", JSON.stringify(order));

    localStorage.removeItem("cart");
    cart = [];

    document.getElementById("msg").innerText =
        "🎉 Order placed successfully via " + payment.toUpperCase();

    document.getElementById("totalAmount").innerText = "Total: ₹0";
    window.location.href = "invoice.html";
}
