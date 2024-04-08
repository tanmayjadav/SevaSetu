import { instance } from "../server.js";

export const fetchInvoice = async (req,res)=>{
    try {  
        const {InvoiceId} = req.body
        // console.log(InvoiceId)
        const invoice = await instance.invoices.fetch(InvoiceId)
        res.status(200).json({
            success: true,
            invoice,
          });
    // console.log(invoice)
    } catch (error) {
        console.error("Error fetching Invoice:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch Invoice",
          error: error.message, 
        }); 
    }
}

export const sendInvoice = async (req,res)=>{
    try {  
        const {InvoiceId,medium} = req.body
        await instance.invoices.notifyBy(InvoiceId,medium)
        res.status(200).json({
            success: true,
          });
    } catch (error) {
        console.error("Error fetching Invoice:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch Invoice",
          error: error.message, 
        }); 
    }
}