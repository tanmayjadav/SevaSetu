import { instance } from "../server";

export const fetchCustomer = async (req,res)=>{
    try {  
        const {customerId} = req.body
        const Customer =  instance.customers.fetch(customerId)
        res.status(200).json({
            success: true,
            Customer,
          });
    } catch (error) {
        console.error("Error fetching Customer:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch Customer",
          error: error.message, 
        }); 
    }
}