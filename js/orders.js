let orders = JSON.parse(localStorage.getItem("orders")) || [];
let box = document.getElementById("ordersBox");

if (orders.length === 0) {
    box.innerHTML = "<p>No orders yet</p>";
}

orders.forEach(o => {
    let div = document.createElement("div");

    div.innerHTML = `
        <h3>Order #${o.id}</h3>
        <p>Date: ${o.date}</p>
        <p>Total: ₹${o.total}</p>
        <p>Payment: ${o.payment}</p>
        <button onclick="viewInvoice(${o.id})">View Invoice</button>
    `;

    box.appendChild(div);
});

function viewInvoice(id) {
    localStorage.setItem("viewOrderId", id);
    window.location.href = "invoice.html";
}
