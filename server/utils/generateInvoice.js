const PDFDocument = require("pdfkit");

const generateInvoice = (sale, res) => {
    const doc = new PDFDocument({ margin: 40 });

    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${sale.invoiceNumber}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // SHOP HEADER
    doc
        .fontSize(20)
        .text("ROHIT MART", { align: "center" });

    doc
        .fontSize(10)
        .text("Nagpur, Maharashtra", { align: "center" })
        .text("Phone: 9876543210", { align: "center" });

    doc.moveDown();

    doc
        .fontSize(16)
        .text("INVOICE", { align: "center" });

    doc.moveDown();

    // INVOICE DETAILS
    doc.fontSize(12);

    doc.text(`Invoice No: ${sale.invoiceNumber}`);
    doc.text(`Date: ${new Date(sale.createdAt).toLocaleDateString()}`);
    doc.text(`Customer: ${sale.customerName}`);

    doc.moveDown();

    // TABLE HEADER
    doc.text("-----------------------------------------------------------------------------");

    doc.text(
        "Product                Qty                Price                      Total"
    );

    doc.text("-----------------------------------------------------------------------------");

    // ITEMS
    sale.items.forEach((item) => {
        doc.text(
        `${item.name.padEnd(20)}        ${String(item.quantity).padEnd(8)}         ₹${String(item.price).padEnd(8)}         ₹${item.total}`
        );
    });

    doc.moveDown();

    doc.text("---------------------------------------------------------------------------");

    // TOTAL SECTION
    doc.moveDown(0.5);

    doc.text(`Subtotal: ₹${sale.subTotal}`, { align: "right" });

    const tax = sale.grandTotal - sale.subTotal;

    doc.text(`Tax: ₹${tax}`, { align: "right" });

    doc
        .fontSize(14)
        .text(`Total: ₹${sale.grandTotal}`, { align: "right" });

    doc.moveDown();

    doc
        .fontSize(12)
        .text(`Payment Method: ${sale.paymentMethod.toUpperCase()}`, {
            align: "right",
        });

    doc.moveDown(2);

    doc
        .fontSize(12)
        .text("Thank you for shopping with us!", { align: "center" });

    doc.end();
};

module.exports = generateInvoice;