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

// 🔧 CLEAN TEXT FUNCTION
function cleanText(text) {
    return String(text)
        .replace(/&/g, "and")
        .replace(/</g, "")
        .replace(/>/g, "");
}

// 📄 DOWNLOAD PDF FUNCTION
function downloadPDF() {

    let order = JSON.parse(localStorage.getItem("lastOrder"));

    if (!order) {
        alert("No order found");
        return;
    }

    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.text("INVOICE", 90, 10);

    let y = 80;

    // ✔ SAFE LOOP (prevents crash if items missing)
    (order.items || []).forEach((item, index) => {
        doc.text(
            `${index + 1}. ${cleanText(item.name)} - ₹${item.price}`,
            10,
            y
        );
        y += 10;
    });

    // ✔ spacing before total
    y += 10;

    doc.text(`Total: ₹${order.total}`, 10, y);

    doc.save("invoice.pdf");
}
