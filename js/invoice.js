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
        .replace(/&amp;/g, "and")
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

    // 🧾 TITLE
    doc.setFontSize(16);
    doc.text("INVOICE", 90, 10);

    doc.setFontSize(12);

    // 🔧 CLEAN FUNCTION INSIDE (safe usage)
    function cleanText(text) {
        return String(text)
            .replace(/&amp;/g, "and")
            .replace(/&/g, "and")
            .replace(/</g, "")
            .replace(/>/g, "");
    }

    // 👤 CUSTOMER DETAILS
    doc.text(`Name: ${cleanText(order.name)}`, 10, 30);
    doc.text(`Address: ${cleanText(order.address)}`, 10, 40);
    doc.text(`Phone: ${cleanText(order.phone)}`, 10, 50);
    doc.text(`Payment: ${cleanText(order.payment)}`, 10, 60);
    doc.text(`Date: ${cleanText(order.date)}`, 10, 70);

    // 📦 ITEMS START POSITION
    let y = 90;

    doc.text("Items:", 10, y);
    y += 10;

    // 🛒 ITEMS LIST
    (order.items || []).forEach((item, index) => {
        doc.text(
            `${index + 1}. ${cleanText(item.name)} - ₹${item.price}`,
            10,
            y
        );
        y += 10;
    });

    // 💰 TOTAL (with spacing)
    y += 10;
    doc.text(`Total: ₹${order.total}`, 10, y);

    // 💾 DOWNLOAD
    doc.save("invoice.pdf");
}
