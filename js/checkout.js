requireLogin();
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item => {
    total += item.price;
});

document.getElementById("totalAmount").innerText = "Total: ₹" + total;

function placeOrder() {

    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;

    let payment = document.querySelector('input[name="payment"]:checked').value;

    if (!name || !address || !phone) {
        alert("Please fill all details");
        return;
    }

    if (phone.length !== 10) {
        alert("Invalid phone number");
        return;
    }

    // ❗ CART CHECK
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    // 🧾 NOW THIS IS WHERE YOUR CODE GOES ↓↓↓

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

    // 🧹 clear cart after order
    localStorage.removeItem("cart");

    document.getElementById("msg").innerText =
        "🎉 Order placed successfully via " + payment.toUpperCase();
}
