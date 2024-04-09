import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import checkoutHandler from "./checkoutHandler";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFoundation } from "@/Redux/foundationSlice";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { server } from "@/main";

export const AddPaymentDetail = () => {
  const foundation = useSelector((state) => state.foundation);

  const { foundationId } = useParams();
  const [foundationstate, setFoundationstate] = useState(foundation);
  const dispatch = useDispatch();
  const [customerId, setCustomerId] = useState(null);

  const [formState, setFormState] = useState({
    amount: "",
    name: "",
    phonenumber: "",
    email: "",
    pannumber: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  const HandleFetchCustomer = async () => {
    const {
      data: { customer },
    } = await axios.post(`${server}/api/createCustomer`, formState);
    if (customer) {
      setCustomerId(customer.customerId);
    }
  };

  const setFoundationstates = (data, callback) => {
    setFoundationstate(data);
    callback();
  };

  const handleSubmit = async () => {
    if (foundationId === foundation._id) {
      await HandleFetchCustomer();
      checkoutHandler(formState, { ...foundationstate, customerId });
    } else {
      try {
        const response = await fetch(`${server}/api/foundation/details/${foundationId}`);
        if (response.status === 404) {
          toast.error("Data not found. Please retry from another foundation");
          throw new Error("Data not found");
        } else {
          const data = await response.json();
          await HandleFetchCustomer();
          setFoundationstates(data, () => {
            console.log(data);
            checkoutHandler(formState, { ...data, customerId });
          });
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data.error &&
          error.response.data.error.error.description
        )
          toast.error(error.response.data.error.error.description);
        else if (error.response && error.response.data.message)
          toast.error(error.response.data.message);
        else toast.error(error.message);
        console.error("Error fetching foundation data:", error);
      }
      setFormState({
        amount: "",
        name: "",
        phonenumber: "",
        email: "",
        pannumber: "",
      });
    }
  };

  const BeforehandleSubmit = async () => {
    try {
      const { name, amount, email, phonenumber } = formState;
      if (!amount) toast.error("please Re-Enter amount");
      if (!phonenumber) toast.error("please Re-Enter Number");
      if (!email) toast.error("please Re-Enter Email");
      if (!name) toast.error("Please re-enter Name");
      if (name && amount && email && phonenumber) handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex mt-16 flex-col md:flex-row m-2 p-8 gap-5 md:gap-10 justify-center items-center">
      <div className="left w-full md:w-1/2">
        <h2 className="text-xl font-bold cursor-pointer text-primary">
          {/* Thanking You for Donating at <br /> {foundationstate.foundation.foundation_name} */}
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          We are deeply grateful for your generous donation and support. Your
          kindness and generosity will make a significant difference in
          [describe the impact or cause of the donation, e.g., supporting our
          cause, helping those in need, making a positive impact on the
          community, etc.].
          <br />
          <br />
          Your contribution will have a lasting impact, and we are truly
          grateful for your support. Once again, thank you for your generosity
          and kindness. Together, we can create positive change and make a
          difference in the lives of others. With heartfelt gratitude,
        </p>
      </div>
      <div className="right w-full   md:w-1/2 h-full flex justify-center items-center pt-10 md:pt-0">
        <Card className="w-[420px] dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Payment details</CardTitle>
            <CardDescription>
              This details will be used in Invoice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid  w-full items-center gap-4">
                <div className="flex  flex-col h-10 space-y-1.5">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Amount"
                    name="amount"
                    pattern="[0-9]"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col h-10 mt-4 space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    onChange={handleChange}
                    pattern="[A-Za-z ]+"
                    required
                  />
                </div>
                <div className="flex flex-col h-10 mt-4 space-y-1.5">
                  <Label htmlFor="Email">Email</Label>
                  <Input
                    id="Email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col h-10 mt-4 space-y-1.5">
                  <Label htmlFor="phonenumber">Phone Number</Label>
                  <Input
                    id="phonenumber"
                    placeholder="Number"
                    name="phonenumber"
                    onChange={handleChange}
                    // pattern="[0-9+-]+"
                    required
                  />
                </div>
                <div className="flex flex-col h-10 my-4 space-y-1.5">
                  <Label htmlFor="pannumber">PAN Number</Label>
                  <Input
                    id="pannumber"
                    placeholder="Pan Number"
                    name="pannumber"
                    onChange={handleChange}
                    pattern="[A-Z0-9]+"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button onClick={BeforehandleSubmit}>Donate </Button>
          </CardFooter>
        </Card>
      </div>
      <Toaster richColors position="bottom-left" />
    </div>
  );
};
