import { instance } from "../server.js";

export const CreateSubmerchant = async (req,res) =>{
    try {
        const options = {
            "email": "gauriagain.kumar@example.org",
            "phone": "9000090000",
            "legal_business_name": "Acme Corp",
            "business_type": "partnership",
            "customer_facing_business_name": "Example",
            "profile": {
              "category": "healthcare",
              "subcategory": "clinic",
              "description": "Healthcare E-commerce platform",
              "addresses": {
                "operation": {
                  "street1": "507, Koramangala 6th block",
                  "street2": "Kormanagala",
                  "city": "Bengaluru",
                  "state": "Karnataka",
                  "postal_code": 560047,
                  "country": "IN"
                },
                "registered": {
                  "street1": "507, Koramangala 1st block",
                  "street2": "MG Road",
                  "city": "Bengaluru",
                  "state": "Karnataka",
                  "postal_code": 560034,
                  "country": "IN"
                }
              },
              "business_model": "Online Clothing ( men, women, ethnic, modern ) fashion and lifestyle, accessories, t-shirt, shirt, track pant, shoes."
            },
            "legal_info": {
              "pan": "AAACL1234C",
              "gst": "18AABCU9603R1ZM"
            },
            "brand": {
              "color": "FFFFFF"
            },
            "notes": {
              "internal_ref_id": "123123"
            },
            "contact_name": "Gaurav Kumar",
            "contact_info": {
              "chargeback": {
                "email": "cb@example.org"
              },
              "refund": {
                "email": "cb@example.org"
              },
              "support": {
                "email": "support@example.org",
                "phone": "9999999998",
                "policy_url": "https://www.google.com"
              }
            },
            "apps": {
              "websites": [
                "https://www.example.org"
              ],
              "android": [
                {
                  "url": "playstore.example.org",
                  "name": "Example"
                }
              ],
              "ios": [
                {
                  "url": "appstore.example.org",
                  "name": "Example"
                }
              ]
            }
          }
const acountDetail = await instance.accounts.create(options)
  res.status(200).json({
    success: true,
    acountDetail,
});
}catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message, // Send error message back to client
    });
  }
}
