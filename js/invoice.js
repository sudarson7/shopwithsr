let order = JSON.parse(localStorage.getItem("lastOrder"));
let box = document.getElementById("invoiceBox");

function cleanText(text) {
    return String(text || "")
        .replace(/&amp;/g, "and")
        .replace(/&/g, "and")
        .replace(/₹/g, "Rs ")
        .replace(/[^\w\s.,/-]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

// 📄 SHOW INVOICE
if (!order) {
    box.innerHTML = "<h3>No order found</h3>";
} else {

    let itemsList = "";
    let total = 0;

    (order.items || []).forEach((i) => {

        let name = cleanText(i.name);
        let qty = i.qty || 1;
        let price = Number(i.price) || 0;
        let subtotal = price * qty;

        total += subtotal;

        itemsList += `
${name} - Rs ${price} x ${qty} = Rs ${subtotal}
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

        <h2>Total: Rs ${total}</h2>

        <button onclick="downloadPDF()">⬇ Download PDF</button>
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

    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text("INVOICE", 90, 10);

    doc.setFontSize(12);

    doc.text(`Name: ${cleanText(order.name)}`, 10, 30);
    doc.text(`Email: ${cleanText(order.email)}`, 10, 40);
    doc.text(`Phone: ${cleanText(order.phone)}`, 10, 50);
    doc.text(`Date: ${cleanText(order.date)}`, 10, 60);

    let y = 80;
    let total = 0;

    (order.items || []).forEach((item, i) => {

        let name = cleanText(item.name);
        let qty = item.qty || 1;
        let price = Number(item.price) || 0;
        let subtotal = price * qty;

        total += subtotal;

        doc.text(
            `${i + 1}. ${name} - Rs ${price} x ${qty} = Rs ${subtotal}`,
            10,
            y
        );

        y += 10;
    });

    y += 10;
    doc.text(`Total: Rs ${total}`, 10, y);

    doc.save("invoice.pdf");
}
