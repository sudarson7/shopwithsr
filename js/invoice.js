// Get last order
let order = JSON.parse(localStorage.getItem("lastOrder"));

let box = document.getElementById("invoiceBox");

if (!order) {
    box.innerHTML = "<h3>No order found</h3>";
} else {

    let itemsList = "";

    order.items.forEach(i => {
        itemsList += `${i.name} - ₹${i.price}\n`;
    });

    box.innerHTML = `
        <h3>Customer: ${order.name}</h3>
        <p>Address: ${order.address}</p>
        <p>Phone: ${order.phone}</p>
        <p>Payment: ${order.payment}</p>
        <p>Date: ${order.date}</p>
        <pre>Items:\n${itemsList}</pre>
        <h2>Total: ₹${order.total}</h2>
    `;
}

// 📄 DOWNLOAD PDF FUNCTION
function downloadPDF() {

    let order = JSON.parse(localStorage.getItem("lastOrder"));

    if (!order) {
        alert("No invoice found");
        return;
    }

    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("INVOICE", 90, 10);

    doc.text(`Name: ${order.name}`, 10, 30);
    doc.text(`Address: ${order.address}`, 10, 40);
    doc.text(`Phone: ${order.phone}`, 10, 50);
    doc.text(`Payment: ${order.payment}`, 10, 60);
    doc.text(`Date: ${order.date}`, 10, 70);

    doc.text("Items:", 10, 90);

    let y = 100;

    order.items.forEach(i => {
        doc.text(`${i.name} - ₹${i.price}`, 10, y);
        y += 10;
    });

    doc.text(`Total: ₹${order.total}`, 10, y + 10);

    doc.save("invoice.pdf");
}
