
import express from "express";
import { fetchInvoice, sendInvoice } from "../controllers/fetchInvoice.js";
import { generatePDFReceipt } from "../controllers/pdfGenerate.js";
import { sendEmail } from "../controllers/sendEmail.js";
// import {fetchCustomer} from "../controllers/fetchCustomer.js"

const router = express.Router();

router.route("/fetchInvoice").post(fetchInvoice);
router.route("/sendInvoice").post(sendInvoice);
router.route("/generate/pdf").post(generatePDFReceipt)
router.route("/sendemail/pdf").post(sendEmail)
// router.route("/fetchCustomer").post(fetchCustomer);

export default router