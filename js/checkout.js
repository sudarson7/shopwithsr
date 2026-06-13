// 🔐 LOGIN CHECK
let user = JSON.parse(localStorage.getItem("loggedUser"));

if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
}

// 🛒 CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🧮 TOTAL CALCULATION
function calculateTotalAmount() {
    let total = 0;

    cart.forEach(item => {
        total += Number(item.price || 0);
    });

    return total;
}

// SHOW TOTAL
document.getElementById("totalAmount").innerText =
    "Total: ₹" + calculateTotalAmount();

// 💳 SHOW CARD FIELDS
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

// 🧾 PLACE ORDER
function placeOrder() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;

    let payment = document.querySelector('input[name="payment"]:checked').value;

    if (!name ||!email|| !address || !phone) {
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

    // 💳 CARD VALIDATION
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

    // 📦 SAVE ORDER
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let order = {
        id: Date.now(),
        name,
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

    // 🧹 CLEAR CART
    localStorage.removeItem("cart");
    cart = [];

    // 🎉 SUCCESS MESSAGE
    document.getElementById("msg").innerText =
        "🎉 Order placed successfully via " + payment.toUpperCase();

    document.getElementById("totalAmount").innerText = "Total: ₹0";
    window.location.href = "invoice.html";
}
