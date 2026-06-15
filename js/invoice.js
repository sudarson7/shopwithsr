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

// 📄 SHOW INVOICE
if (!order) {
    box.innerHTML = "<h3>No order found</h3>";
} else {

    let itemsList = "";
    let total = 0;

    (order.items || []).forEach(i => {

        let qty = i.qty || 1;
        let price = Number(i.price) * qty;

        total += price;

        itemsList += `
${cleanText(i.name)} - ₹${i.price} x ${qty} = ₹${price}
`;
    });

    box.innerHTML = `
        <h3>Customer: ${cleanText(order.name)}</h3>
        <p>Email: ${cleanText(order.email)}</p>
        <p>Address: ${cleanText(order.address)}</p>
        <p>Phone: ${cleanText(order.phone)}</p>
        <p>Payment: ${cleanText(order.payment)}</p>
        <p>Date: ${cleanText(order.date)}</p>

        <pre>Items:\n${itemsList}</pre>

        <h2>Total: ₹${total}</h2>

    `;
}

// 📄 DOWNLOAD PDF
function downloadPDF() {

    let order = JSON.parse(localStorage.getItem("lastOrder"));

    if (!order) {
        alert("No order found");
        return;
    }

    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("INVOICE", 90, 10);

    doc.setFontSize(12);

    doc.text(`Name: ${order.name}`, 10, 30);
    doc.text(`Email: ${order.email}`, 10, 40);
    doc.text(`Phone: ${order.phone}`, 10, 50);
    doc.text(`Date: ${order.date}`, 10, 60);

    let y = 80;
    let total = 0;

    (order.items || []).forEach((item, i) => {

        let qty = item.qty || 1;
        let price = Number(item.price) * qty;

        total += price;

        doc.text(
    `${i + 1}. ${cleanText(item.name)} - Rs ${item.price} x ${qty} = Rs ${price}`,
    10,
    y
);

        y += 10;
    });

    y += 10;
    doc.text(`Total: Rs${total}`, 10, y);

    doc.save("invoice.pdf");
}
