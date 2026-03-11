const PDFDocument = require("pdfkit");

const generateInvoice = (sale, res) => {
    const doc = new PDFDocument({ margin: 40 });

    //response headers (download PDF)
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${sale.invoiceNumber}.pdf`
    );
    res.setHeader("Content-Type", "apllication/pdf");

    doc.pipe(res);

    //header

    doc
        .fontSize(20)
        .text("INVOICE", { align: "center" });

    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Invoice No: ${sale.invoiceNumber}`);
    doc.text(`Date: ${new Date(sale.createdAT).toLocaleDateString()}`);
    doc.text(`Customer: ${sale.customerName}`);

    doc.moveDown();

    //table header

    doc.text("-----------------------------------------------------------");

    doc.text(
        "Product            Qty        Price        Total"
    );

    doc.text("-----------------------------------------------------------");

    // items
    sale.items.forEach((item) => {
        doc.text(
            `${item.name}        ${item.quantity}        ₹${item.price}        ₹${item.total}`
        );
    });

    doc.moveDown();

    doc.text("-----------------------------------------------------------");

    // total

    doc.fontSize(14).text(
        `Total Amount: ₹${sale.totalAmount}`,
        {align: "right"} 
    );

    doc.moveDown();

    doc.fontSize(12).text(
        `Payment Method: ${sale.paymentMethod}`,
        {align: "right"}
    );

    doc.moveDown(2);

    doc.text("Thank you for your purchase!", {
        align: "center",
    });

    doc.end();
}

module.exports = generateInvoice;

