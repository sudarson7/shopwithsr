// 🔐 ADMIN CHECK

let user = JSON.parse(localStorage.getItem("loggedUser"));

if (!user || user.email !== "admin@shopwithsr.com") {

    alert("Admin Access Only");

    window.location.href = "login.html";
}

// 📦 LOAD ORDERS

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let ordersBox = document.getElementById("ordersBox");

document.getElementById("orderCount").innerText =
    orders.length;

// 💰 TOTAL REVENUE

let revenue = 0;

orders.forEach(order => {
    revenue += Number(order.total || 0);
});

document.getElementById("revenue").innerText =
    "₹" + revenue;

// 📄 SHOW ORDERS

if (orders.length === 0) {

    ordersBox.innerHTML = "<h3>No Orders Found</h3>";

} else {

    orders.forEach((order, index) => {

        let itemsHTML = "";

        (order.items || []).forEach(item => {

            let qty = item.qty || 1;

            itemsHTML += `
                <li>
                    ${item.name}
                    - ₹${item.price}
                    x ${qty}
                </li>
            `;
        });

        let div = document.createElement("div");

        div.className = "card";

        div.innerHTML = `
            <h3>Order #${order.id}</h3>

            <p><b>Customer:</b> ${order.name}</p>

            <p><b>Email:</b> ${order.email}</p>

            <p><b>Phone:</b> ${order.phone}</p>

            <p><b>Address:</b> ${order.address}</p>

            <p><b>Payment:</b> ${order.payment}</p>

            <p><b>Date:</b> ${order.date}</p>

            <p><b>Total:</b> ₹${order.total}</p>

            <h4>Items:</h4>

            <ul>
                ${itemsHTML}
            </ul>

            <button onclick="deleteOrder(${index})">
                Delete Order
            </button>
        `;

        ordersBox.appendChild(div);
    });
}

// 🗑 DELETE ORDER

function deleteOrder(index) {

    if (!confirm("Delete this order?")) {
        return;
    }

    orders.splice(index, 1);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    location.reload();
}

// 🚪 LOGOUT

function logout() {

    localStorage.removeItem("loggedUser");

    window.location.href = "login.html";
}
