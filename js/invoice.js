let orderId = localStorage.getItem("viewOrderId");
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let order = orders.find(o => o.id == orderId) 
            || JSON.parse(localStorage.getItem("lastOrder"));

let box = document.getElementById("invoiceBox");

if (!order) {
    box.innerHTML = "No invoice found";
} else {

    let items = order.items.map(i => `${i.name} - ₹${i.price}`).join("\n");

    box.innerHTML = `
        <p>Name: ${order.name}</p>
        <p>Address: ${order.address}</p>
        <p>Phone: ${order.phone}</p>
        <p>Payment: ${order.payment}</p>
        <p>Date: ${order.date}</p>
        <pre>${items}</pre>
        <h2>Total: ₹${order.total}</h2>
    `;
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.text("INVOICE", 10, 10);
    doc.text(`Name: ${order.name}`, 10, 20);
    doc.text(`Total: ₹${order.total}`, 10, 30);
    doc.text(`Payment: ${order.payment}`, 10, 40);

    doc.save("invoice.pdf");
}
