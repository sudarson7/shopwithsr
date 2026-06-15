let order = JSON.parse(localStorage.getItem("lastOrder"));
let box = document.getElementById("invoiceBox");

// ---------- HTML CLEAN ----------
function cleanText(text) {
    return String(text || "")
        .replace(/&amp;/g, "and")
        .replace(/&/g, "and")
        .replace(/₹/g, "Rs ")
        .replace(/[^\w\s.,/-]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

// ---------- SHOW INVOICE ----------
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

// ---------- PDF DOWNLOAD ----------
function downloadPDF() {

    let order = JSON.parse(localStorage.getItem("lastOrder"));

    if (!order) {
        alert("No order found");
        return;
    }

    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    // FIX FONT (IMPORTANT)
    doc.setFont("courier");
    doc.setFontSize(11);

    // TITLE
    doc.text("INVOICE", 90, 10);

    // CUSTOMER INFO
    doc.text("Name: " + (order.name || ""), 10, 25);
    doc.text("Email: " + (order.email || ""), 10, 35);
    doc.text("Phone: " + (order.phone || ""), 10, 45);
    doc.text("Date: " + (order.date || ""), 10, 55);

    let y = 70;
    let total = 0;

    // ITEMS
    (order.items || []).forEach((item, i) => {

        let name = String(item.name || "").replace(/[^a-zA-Z0-9 ]/g, "");
        let qty = item.qty || 1;
        let price = Number(item.price) || 0;
        let subtotal = price * qty;

        total += subtotal;

        let line =
            (i + 1) + ". " +
            name + " - Rs " +
            price + " x " +
            qty + " = Rs " +
            subtotal;

        doc.text(line, 10, y);
        y += 10;
    });

    y += 10;

    // TOTAL
    doc.text("TOTAL: Rs " + total, 10, y);

    doc.save("invoice.pdf");
}
