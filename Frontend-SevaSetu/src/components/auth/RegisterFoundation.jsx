import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserLocalStorage } from "@/Redux/userSlice";
import TextArea from "./Textfield";
import InputField from "./Inputfield";
import FileUpload from "./FileUpload";


export const RegisterFoundation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoUrl, setLogoUrl] = useState("");
  const [foundationImageUrl, setFoundationImageUrl] = useState("");
  const [signatureUrl, setSignatureUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const reader = new FileReader();

  const [formData, setFormData] = useState({
    foundation_name: "",
    foundation_email: "",
    foundation_password: "",
    foundation_head_name: "",
    foundation_short_description: "",
    foundation_cause: "",
    foundation_impact: "",
    category: [""],});

  const sizeCheckboxList = ["Child wellfare","Orphans","OldAge People","Women Empowerment","Healthcare","Education"];

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevStat) => ({ ...prevStat, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signatureUrl && logoUrl && foundationImageUrl) {
      try {
        const { data } = await axios.post("/api/foundation/register", {
          ...formData,
          foundation_signature_url: signatureUrl,
          foundation_logo_url: logoUrl,
          foundation_image_url: foundationImageUrl,
        });
        // console.log(data);
        if (data.success) {
          console.log(data.userId);
          dispatch(setUserLocalStorage(data.userId));
        }
        navigate("/");
        toast.success(data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else toast.error("An error occurred while fetching data");
      }
    } else {
      toast.error("Please Submit all the details before Submiting");
    }
  };
  return (
    <section className="scroll-auto flex flex-col md:flex-row items-center h-[100vh] text-foreground">
      <div className="bg-primary py-10 dark:bg-gray-800 hidden lg:block w-full md:w-1/3 lg:w-2/3 h-screen">
        {/* <Image
        src="https://source.unsplash.com/random"
        alt=""
        className="w-full h-full object-cover"
        width="100%"
        height="100%"
      /> */}
        <div className="py-10 text-gray-200 text-4xl flex place-content-center self-center h-screen object-cover justify-center">
          {/* Ready for a new Begining  */}
        </div>
      </div>
      <div
        className="border-l-2 mt-10 md:border-0 w-full lg:max-w-full md:mx-auto md:w-2/3 xl:w-2/3 px-6 lg:px-16 xl:px-12
      flex items-center md:items-start justify-center md:justify-center"
      >
        <div>
          <div className="inline-block">
            <Link
              to="/"
              className="flex group text-blue-500 hover:text-blue-700 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 group-hover:animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="px-2">Home</span>
            </Link>
          </div>
          <h1 className="text-foreground text-xl md:text-2xl font-bold leading-tight mt-6">
            Sign Up
          </h1>
          <form className="mt-6 " method="POST" onSubmit={handleSubmit}>
            <div className="mt-6 flex flex-col md:flex-row">
              <div className="pr-6 md:border-r-2">
                <InputField
                  label="Name of the Foundation"
                  name="foundation_name"
                  type="text"
                  placeholder="Enter Username"
                  value={formData.foundation_name}
                  onChange={handleChange}
                />
                <InputField
                  label="Email Address"
                  name="foundation_email"
                  type="email"
                  placeholder="Enter Email Address"
                  value={formData.foundation_email}
                  onChange={handleChange}
                />
                <InputField
                  label="Password"
                  name="foundation_password"
                  type="password"
                  placeholder="Enter Password"
                  value={formData.foundation_password}
                  onChange={handleChange}
                />
                <InputField
                  label="Head Name"
                  name="foundation_head_name"
                  type="text"
                  placeholder="Enter Foundation Head Name"
                  value={formData.foundation_head_name}
                  onChange={handleChange}
                />
                <div className="flex truncate flex-col justify-center items-center">
                  <div className="truncate mt-4">
                    <div>
                      <label
                        className="block-inline text-foreground"
                        htmlFor="category"
                      >
                        Category
                      </label>
                      <select
                        className="border-2 mx-2 bg-slate-100"
                        id="category"
                      >
                        {sizeCheckboxList.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start">
                  <FileUpload
                    Id = "add_foundation_image"
                    ImageUrl = {foundationImageUrl}
                    label="Add Foundation Image"
                    setImageUrl={setFoundationImageUrl}
                    isUploading={isUploading}
                    setIsUploading={setIsUploading}
                  />
                </div>
              </div>
              <div className="md:pl-6">
                <TextArea
                  label="Short Description"
                  name="foundation_short_description"
                  placeholder="Enter Foundation description"
                  value={formData.foundation_short_description}
                  onChange={handleChange}
                />

                <TextArea
                  label="Cause"
                  name="foundation_cause"
                  placeholder="Enter detailed Cause your Foundation working"
                  value={formData.foundation_cause}
                  onChange={handleChange}
                />
                <TextArea
                  label="Impact"
                  name="foundation_impact"
                  placeholder="Enter details Impact created by your Foundation"
                  value={formData.foundation_impact}
                  onChange={handleChange}
                />
                <div className="flex flex-row gap-2">
                  <FileUpload
                    Id = "add_foundation_sign"
                    ImageUrl={signatureUrl}
                    label="Add Signature"
                    setImageUrl={setSignatureUrl}
                    isUploading={isUploading}
                    setIsUploading={setIsUploading}
                  />
                  <FileUpload
                    Id = "add_foundation_logo"
                    ImageUrl = {logoUrl}
                    label="Add Logo"
                    setImageUrl={setLogoUrl}
                    isUploading={isUploading}
                    setIsUploading={setIsUploading}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Button
                type="submit"
                // variant="customSignup"
                className="w-full h-4 md:w-1/4 p-5 mt-10 bg-primary text-gray-100 text-md md:text-lg "
                // className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                // px-4 py-3 mt-6"
              >
                Sign Up !
              </Button>
              <hr className="my-3 border-gray-300 w-full" />
              {/* <button
                type="button"
                className="w-full md:w-2/4 block bg-gray-100 dark:bg-gray-300 hover:bg-gray-200 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-2 border border-gray-300"
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 48 48"
                  >
                    <defs>
                      <path
                        id="a"
                        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                      />
                    </defs>
                    <clipPath id="b">
                      <use xlinkHref="#a" overflow="visible" />
                    </clipPath>
                    <path
                      clipPath="url(#b)"
                      fill="#FBBC05"
                      d="M0 37V11l17 13z"
                    />
                    <path
                      clipPath="url(#b)"
                      fill="#EA4335"
                      d="M0 11l17 13 7-6.1L48 14V0H0z"
                    />
                    <path
                      clipPath="url(#b)"
                      fill="#34A853"
                      d="M0 37l30-23 7.9 1L48 0v48H0z"
                    />
                    <path
                      clipPath="url(#b)"
                      fill="#4285F4"
                      d="M48 48L17 24l-4-3 35-10z"
                    />
                  </svg>
                  <span className="ml-4">Log in with Google</span>
                </div>
              </button> */}
            </div>
          </form>
          <div className="flex justify-center w-full">
            <p className="pt-2 pb-3 text-foreground">
              Already have a account{" "}
              <Link to="/foundation/login">
                <span className="text-blue-500 hover:text-blue-700 font-semibold">
                  Login
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toaster richColors position="bottom-left" />
    </section>
  );
};
