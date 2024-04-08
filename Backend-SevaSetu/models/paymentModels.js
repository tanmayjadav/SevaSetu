import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  FoundationId: {
    type: String,
    required: true,
  },
  CustomerId: {
    type: String,
    required: true,
  },
  InvoiceId: {
    type: String,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

export const Payment = mongoose.model("Payment", paymentSchema);