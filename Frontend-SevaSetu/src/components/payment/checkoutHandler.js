import axios from "axios";

const checkoutHandler = async (OrderDetail, foundation) => {
  console.log(OrderDetail)
  console.log(foundation)
  // if (!OrderDetail.FoundationName){

  // }
  const {data: { key }} = await axios.get("/api/getkey");
  const {data:{item}} = await axios.post("/api/createItem", OrderDetail);
  const {data: { order }} = await axios.post("/api/checkout",{...OrderDetail,customerId:foundation.customerId,itemId:item.id});
  const options = {
    key,
    amount: order.amount,
    currency: "INR",
    name: foundation.foundation_name,
    description: "RazorPay Integration",
    image: "",
    order_id: order.id,
    callback_url:`/api/paymentverification?paymentDetails=${JSON.stringify(OrderDetail)}&Fid=${foundation._id}`,
    prefill: {
      name: OrderDetail.name,
      email: OrderDetail.email,
      contact: OrderDetail.phonenumber,
      pan:OrderDetail.pannumber,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "",
    },
  };

  const razor = new window.Razorpay(options);
  razor.open();
  
};

export default checkoutHandler;
