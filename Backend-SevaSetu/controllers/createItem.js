import { instance } from "../server.js";

export const createItem = async (req, res) => {
    const {amount,FoundationName} = req.body
    // console.log(req.body)
    // console.log(FoundationName)

    try {
      const item = await instance.items.create({
        "name": "Donation",
        "description": FoundationName,
        "amount": parseInt(amount),
        "currency": "INR"
      })
      res.status(200).json({
        success: true,
        item,
      });
    } catch (error) {
      console.error("Error creating Item:", error);
      res.status(500).json({
        success: false,
        message: error.description,
        error: error.message, 
      });
    }
  };