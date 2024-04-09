import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSelector } from "react-redux";
import { server } from "@/main";

const PaymentSuccess = () => {
  const [invoice, setInvoice] = useState(null);
  const [datapdf, setdatapdf] = useState(null);
  const { foundation } = useSelector((state) => state.foundation);
  const navigate = useNavigate();
  const {Pid,name,email} = useParams(); 

  const emailButtonHandler = async () => {
    const { data } = await axios.post(`${server}/api/sendemail/pdf`,{Pid,email,name:foundation.foundation_name});
    console.log(data);
  };
  const SMSButtonHandler = async () => {
    // const {
    //   data: { msg },
    // } = await axios.post("/api/sendInvoice", { InvoiceId, medium: "sms" });
    // console.log(msg);
  };

  return foundation ? (
    <>
      <div className="flex mt-16 flex-col md:flex-row my-2 py-8 gap-5 md:gap-10 justify-center items-center md:items-center">
        <div className="left w-full md:w-1/3 flex flex-col items-center">
          <h1 className="p-2 border-b text-center text-primary *:scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
            Payment Successful
            <br />
          </h1>
          <p>{Pid}</p>
          <div className="p-4 text-center">
            <p className="text-sm md:text-md text-card-foreground">
              Thank you for your generous donation!
            </p>
            <p className="py-1 text-sm md:text-md text-card-foreground">
              Here is your Donation Certificate
            </p>
          </div>
        </div>
        <div className="right w-full md:w-1/2 h-full flex flex-col justify-center items-center pt-10 md:pt-0">
          <Card className=" flex flex-col items-center bg-slate-50">
            <CardHeader className="pt-8 px-4 flex flex-col items-center">
              <CardDescription>
                Many lives will cherish with your Charity
              </CardDescription>
              <CardTitle className="py-2 font-certi border-b border-t text-gray-800 text-3xl md:text-5xl text-center">
                Donation Certificate
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="text-s md:text-md text-muted-foreground">
                This is to Certify that
              </p>
              <p className="text-gray-800 py-2 text-3xl md:text-5xl text-card-foreground font-new-certi">
                {name}
              </p>
              <p className="px-6 py-2 md:py-3 text-sm md:text-md text-muted-foreground flex text-center">
                Has successfully donated to the "
                {foundation.foundation_name}" Foundation. On behalf of all of
                us, we thank you for your donation and assitance'
              </p>
              <div className="py-4 md:py-8 flex flex-row gap-12 md:gap-32 items-center">
                <div className="px-6 flex flex-col text-center justify-center items-center">
                  {/* <img src=`${foundation.head.signature}` alt="" /> */}
                  <p className="px-6 flex flex-col text-center">
                    <img
                      src={`https://www.freepnglogos.com/uploads/signature-png/nguy-ecnh-nguyen-van-binh-signature-png-5.png`}
                      width="70px"
                      height="30px"
                      alt="Signature"
                    />
                  </p>
                  {/* <p className="px-6 text-sm md:text-md text-muted-foreground flex text-center">
                  ${foundation?.headName}
                </p> */}
                  <p className="text-sm md:text-md text-muted-foreground flex text-center">
                    Head of Foundation <br />
                  </p>
                  <p className="text-sm md:text-md text-muted-foreground flex text-center">
                    {foundation.foundation_head_name}
                  </p>
                </div>
                <div className="px-6 flex flex-col text-center justify-center items-center">
                  {/* <img src=`${foundation.head.signature}` alt="" /> */}
                  {/* <p className="px-6 text-sm md:text-md text-muted-foreground flex text-center">
                  ${foundation?.presidentName}
                </p> */}
                  <p className="px-6 flex flex-col text-center">
                    <img
                      src={`data:image/png;base64,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`}
                      width="70px"
                      height="30px"
                      alt="Signature"
                    />
                  </p>
                  <p className="px-6 text-sm md:text-md text-muted-foreground flex text-center">
                    Head of Seva-Setu
                  </p>
                  <p className="px-6 text-sm md:text-md text-muted-foreground flex text-center">
                    Sarah Williams
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col sm:flex-row m-2 py-4 px-8 sm:gap-8 justify-center items-center">
            <Button onClick={emailButtonHandler}>Send Invoice as Email</Button>
            <br />
            <Button onClick={SMSButtonHandler}>Send Invoice as SMS</Button>
          </div>
        </div>
      </div>

      {/* <p className="p-2">Reference No. {referenceNum}</p> */}
      {/* <p className="p-2">Invoice Detail. {invoice?.customer_id}</p> */}
      {/* <br /> */}
      {/* <Button onClick={getImageHandler}>Get Image</Button> */}
      {/* {datapdf && ( */}
      {/* <iframe className="z-50" src={datapdf} width="100%" height="600px"></iframe> */}
      {/* ) */}
      {/* } */}
    </>
  ) : (
    <>{navigate("/NotFound")}</>
  );
};
export default PaymentSuccess;
