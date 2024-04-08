import { instance } from "../server.js";

export const createInvoice = async (req, res) => {
    
    const { Cid,Iid } = req.params;
    const options = {
      type: "invoice",
      customer_id: Cid,
      date:  1589994898,
      line_items: [
        {
          "item_id": Iid
        }
      ],
      "sms_notify": 0,
      "email_notify": 0
    }
    try{
      const invoice = instance.invoices.create(options);
      res.status(200).json({  
        success: true,
        invoice,
      });
    }catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create order",
        error: error.message,   
      });
    }
}