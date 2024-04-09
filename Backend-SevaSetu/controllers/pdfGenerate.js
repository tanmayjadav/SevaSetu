import PDFKit from "pdfkit";
import fs from "fs";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
function convertToWords(number) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (number === 0) return 'Zero';

  let words = '';

  if (number >= 1000) {
    words += ones[Math.floor(number / 1000)] + ' Thousand ';
    number %= 1000;
  }

  if (number >= 100) {
    words += ones[Math.floor(number / 100)] + ' Hundred ';
    number %= 100;
  }

  if (number >= 20) {
    words += tens[Math.floor(number / 10)] + ' ';
    number %= 10;
  } else if (number >= 11 && number <= 19) {
    words += teens[number - 10] + ' ';
    number = 0;
  }

  if (number > 0) {
    words += ones[number] + ' ';
  }

  return words.trim();
}

export const generatePDFReceipt = async (req, res) => {
  const paymentDetail = req.body
  const response = await fetch(`${process.env.BACKEND_URL}/api/foundation/details/${paymentDetail.Fid}`);
  if (!response.ok) {
    const errorMessage = await response.text();
    console.error('Error fetching foundation details:', errorMessage);
    return res.status(500).json({ error: 'Failed to fetch foundation details' });
  }
  const data = await response.json();
  console.log('Foundation details:', data.foundation_name);

  const donorName = paymentDetail.name;
  const donationDate = formatDate(Date.now()); 
  const transactionNumber = paymentDetail.razorpay_payment_id;
  const paymentMode = "Online";
  const amountInNumbers = paymentDetail.amount;
  const amountInWords = convertToWords(amountInNumbers); 
  const foundation_name = data.foundation_name
  const foundation_sign = data.foundation_signature_url
  const foundation_logo = data.foundation_logo_url
  const logoImageData = foundation_logo.split(';base64,').pop();
  const signImageData = foundation_sign.split(';base64,').pop();
  const logoBuffer = Buffer.from(logoImageData, 'base64');
  const signBuffer = Buffer.from(signImageData, 'base64');    
  // const logo = Buffer.from(foundation_logo, 'base64');
  // const sign = Buffer.from(foundation_sign, 'base64');

  try {
    const doc = new PDFKit();
    doc.pipe(fs.createWriteStream(`./ReceiptPDF/${foundation_name}${transactionNumber}.pdf`));
    // doc.pipe(res);

    doc.font('Helvetica-Bold').fillColor('#333');

    doc.image(logoBuffer, 50, 50, { width: 100 });

    doc.fontSize(24).text(`${foundation_name}`, { align: 'center' });
    doc.fontSize(18).text('80G Certificate', { align: 'center' });
    doc.moveDown(1);

    // Donor Information
    doc.fontSize(14).text(`Date: ${donationDate}`, { align: 'right' });
    doc.moveDown(1);
    doc.fontSize(12).text('Donor Information');
    doc.text(`Name: ${donorName}`);
    // Add address lines here
    doc.text('Address:');
    // doc.text('PAN No.: CTGPK3965H');
    doc.moveDown(1);

    // Thank you message
    doc.fontSize(12).text(`Dear ${donorName},`, { align: 'left' });
    doc.text(
      `Thank you for making a contribution of Rs ${amountInNumbers} to ${foundation_name}. Please keep this written acknowledgement of your donation for your tax records.`,
      { align: 'left' }
    );
    doc.moveDown(1);

    // Authorized signatory
    doc.text(`for ${foundation_name}`, { align: 'left' });
    // Signature image
    doc.image(signBuffer, { width: 100, align: 'right' });
    doc.moveDown(1);

    // Donation Receipt
    doc.fontSize(14).text('DONATION RECEIPT', { align: 'center' });
    doc.moveDown(1);

    // Donation details table
    const table = {
      rows: [
        ['Donation Date', donationDate],
        ['Transaction Reference Number', transactionNumber],
        ['Payment Mode', paymentMode],
        ['Total Contribution Received (Numbers)', `Rs ${amountInNumbers}`],
        ['Total Contribution Received (Words)', `${amountInWords} Rupees`],
      ],
    };

    function createRow(item) {
      const [left, right] = item;
      doc.fontSize(12).text(left, 50).text(right, { align: 'right' });
    }

    table.rows.forEach((row) => createRow(row));

    // Note
    doc.moveDown(1);
    doc.fontSize(10).text(
      `Note: Donations to ${foundation_name} qualify for deduction u/s 80G(5) of Income Tax Act 1961 vide order No. CIT (E) 1 2015-16/DEL-IE25957-24042015/6248 dated April 24, 2015 until such status is cancelled/withdrawn by the Income Tax authorities. This receipt is invalid in case of non-realization of the money instrument or reversal of the credit/debit card charge or reversal of donation amount for any reason. IT PAN:`,
      50
    );
    doc.moveDown(1)
    // Footer
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // Horizontal line
    doc.end();

    doc.on("finish", () => {
      res.status(200).json({
        success: true,
        message: "PDF receipt generated successfully",
      });
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
