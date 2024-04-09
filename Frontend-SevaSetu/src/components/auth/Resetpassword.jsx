import React, { useEffect } from 'react'
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Toaster, toast } from "sonner";


const Resetpassword = () => {

    const {token,ex} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      if (ex < Date.now()) navigate("/NotFound")
    }, []);

    const [formData, setFormData] = useState({
        foundation_password: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevStat) => ({ ...prevStat, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${server}/api/foundation/login/resetpassword`, {...formData,token});
          
          
          if(response.data.success){
            toast.success('Password changed successfully. You will be redirected in 3 seconds.');
            setTimeout(() => {
              navigate('/foundation/login');
            }, 3000); 
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An error occurred while fetching data");
          }
        }
      };

  return (
    <>
      <div>
        <section className="flex flex-col md:flex-row h-screen items-center">
          <div className="bg-primary dark:bg-gray-800 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
            {/* <Image src="https://source.unsplash.com/random" alt="" className="w-full h-full object-cover" width="100" height="100"/> */}
          </div>

          <div
            className="bg-background  w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
          >
            <div className="w-full h-100">
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
              <h1 className="text-xl md:text-2xl font-bold dark:text-white leading-tight mt-12">
                Reset Password
              </h1>

              <form className="mt-6" method="POST" onSubmit={handleSubmit}>
                <div>
                  {/* <label className="block text-gray-700 dark:text-white">
                    Password
                  </label> */}
                  <input
                    type="password"
                    name="foundation_password"
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-background mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    required
                    onChange={handleChange}
                  />
                </div>

                <Button className=" md:text-lg w-full p-6 mt-6 bg-primary dark:text-white">
                  Verify and Change
                </Button>
              </form>
              <hr className="my-6 border-gray-300 w-full" />
              
            </div>
          </div>
        </section>
        <Toaster richColors position="bottom-left" />
      </div>
    </>
  )
}

export default Resetpassword
