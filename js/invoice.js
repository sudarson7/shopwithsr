// 🧾 GET ORDER FROM STORAGE
let order = JSON.parse(localStorage.getItem("lastOrder"));

let box = document.getElementById("invoiceBox");

function cleanText(text) {
    return String(text || "")
        .replace(/&amp;/g, "and")
        .replace(/&/g, "and")
        .replace(/₹/g, "Rs")
        .replace(/</g, "")
        .replace(/>/g, "");
}

// 📄 SHOW INVOICE ON PAGE
if (!order) {
    box.innerHTML = "<h3>No order found</h3>";
} else {

    let itemsList = "";

    (order.items || []).forEach(i => {
        itemsList += `${cleanText(i.name)} - ₹${i.price}\n`;
    });

    box.innerHTML = `
        <h3>Customer: ${cleanText(order.name)}</h3>
        <p>Email: ${cleanText(order.email)}</p>
        <p>Address: ${cleanText(order.address)}</p>
        <p>Phone: ${cleanText(order.phone)}</p>
        <p>Payment: ${cleanText(order.payment)}</p>
        <p>Date: ${cleanText(order.date)}</p>

        <pre>Items:\n${itemsList}</pre>

        <h2>Total: ₹${order.total}</h2>
    `;
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

    // 👤 CUSTOMER DETAILS
    doc.text(`Name: ${cleanText(order.name)}`, 10, 30);
    doc.text(`Email: ${cleanText(order.email)}`, 10, 40);
    doc.text(`Phone: ${cleanText(order.phone)}`, 10, 50);
    doc.text(`Address: ${cleanText(order.address)}`, 10, 60);
    doc.text(`Payment: ${cleanText(order.payment)}`, 10, 70);
    doc.text(`Date: ${cleanText(order.date)}`, 10, 80);

    // 📦 ITEMS START
    let y = 100;

    doc.text("Items:", 10, y);
    y += 10;

    // 🛒 ITEMS LOOP
    (order.items || []).forEach((item, index) => {
        doc.text(
            `${index + 1}. ${cleanText(item.name)} - ${item.price}`,
            10,
            y
        );
        y += 10;
    });

    // 💰 TOTAL
    y += 10;
    doc.text(`Total: Rs${order.total}`, 10, y);

    // 💾 DOWNLOAD
    doc.save("invoice.pdf");
}
