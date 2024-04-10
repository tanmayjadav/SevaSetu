import { instance } from "../server.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import axios from "axios";
import { Payment } from "../models/paymentModels.js";

export const checkout = async (req, res) => {
  const {amount} = req.body
  const options = {
    amount: Number(amount) * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "receipt#1",
  };
  try {
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message, // Send error message back to client
    });
  }
};

export const paymentverification = async (req, res) => {
  try {
    const paymentDetails = JSON.parse(req.query.paymentDetails);
    const {name,email} = paymentDetails
    const {Fid} = req.query;
    // console.log(Fid,paymentDetails)
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    // const Cid = paymentDetails.customerId
    // const Iid = paymentDetails.itemId
    // const Fid = "65e6f04c8abfeee9d5625181"
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    
      if (isAuthentic) {
        res.redirect(`${process.env.FRONTEND_URL}/paymentsuccess/${razorpay_payment_id}/${name}/${email}`)
        // const pdfData = axios.post(`${process.env.BACKEND_URL}/api/generate/pdf`, { ...paymentDetails, Fid ,razorpay_payment_id })
      //   .then().catch(error => {
      //   console.error('Error generating PDF:', error.response);
      // });
    }
    else{
      res.redirect(`${process.env.FRONTEND_URL}/paymentfail/${razorpay_payment_id}`)
    }
  } catch (error) {
    // console.error(error);
    res.status(400).json({
      success: false,
    });
  }
};

const verifyPayment = async (Cid,Iid)=>{
  try {
    const { data: { invoice } } = await axios.get(`${process.env.BACKEND_URL}/api/createInvoice/${Cid}/${Iid}`);
    const InvoiceId = invoice.id
    await Payment.create({
      FoundationId:Fid,
      CustomerId:Cid,
      InvoiceId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    return InvoiceId
  } catch (error) {
    console.log("error creating Invoice",error);
    return null
  }
}