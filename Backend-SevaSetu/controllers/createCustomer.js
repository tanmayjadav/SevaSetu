import { Customers } from "../models/customersModel.js";
import { instance } from "../server.js";

const createCustomer = async (req, res) => {
    const {name,phonenumber,email} = req.body
    // console.log(req.body)
    if (!email) {
      res.status(500).json({
        success: false,
        message: "Please Re-enter Values", 
      });
    }
    try {
      let customer = await Customers.findOne({ email });
      // console.log(customer,"")
      if (customer){ 
      res.status(200).json({
        success: true,
        customer,
      });
      }
      else{
        console.log(name,phonenumber,email)
        const customer = await instance.customers.create({
          name,
          contact: parseInt(phonenumber),
          email,
          fail_existing: 0,
          notes: {
            notes_key_1: "",
            notes_key_2: "",
          },
        });
        await Customers.create({
          name,
          email,
          number:phonenumber,
          customerId:customer.id
        })
        res.status(200).json({
          success: true,
          customer,
        });
      }
      } catch (error) {
        console.error("Error creating Customer:", error);
        res.status(500).json({
          success: false,
          error: error, 
        });
      }
    };
    
export default createCustomer