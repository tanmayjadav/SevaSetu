import { Disclosure} from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import {MenuIcon, XIcon } from "@heroicons/react/outline";
import logoImage from "../../assets/Logo.png";
import { ModeToggle } from "../ModeToggle";
import HeaderSlider from "./HeaderSlider";
import { Button } from "../ui/button";
import HeaderSliderMobile from "./HeaderSliderMobile";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function HeaderNew() {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.userId);
  const [userdata, setUserdata] = useState({});
  useEffect(() => {
    const fetchFoundation = async () => {
      try {
        const response = await fetch(`/api/foundation/details/${userId}`);
        if (!response.ok) {
          const errorMessage = await response.text();
          toast.error(errorMessage || "Data not found");
        } else {
          const data = await response.json();
          setUserdata({
            headName: data.foundation_head_name,
            email: data.foundation_email,
          });
        }
      } catch (error) {
        console.error("Error fetching foundation data:", error);
      }
    };
    if (userId) fetchFoundation();
  }, [userId]);

  const loginHandler = async () => {
    if (userId) toast.error("You are already logged");
    else navigate("/foundation/login");
  };
  return (
    <Disclosure
      as="nav"
      className="top-0 fixed z-50 bg-background shadow-[0_17px_17px_-25px_rgba(0,0,0,0.3)] dark:shadow-[0_17px_17px_-25px_rgba(255,255,255,0.4)] w-screen"
    >
      {({ open }) => (
        <>
          <div className="max-w-screen mx-4 px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex px-2 lg:px-0">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <img
                    className="block h-8 w-auto"
                    src={logoImage}
                    alt="Logo"
                  />
                  <span className="text-2xl font-bold text-primary hidden lg:block h-8 w-auto">
                    SevaSetu
                  </span>
                </Link>
                {userId ? (
                  <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                    <Link
                      to="/Dashboard"
                      className="border-transparent  text-foreground inline-flex hover:border-gray-300 hover:text-gray-500 items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/"
                      className="border-transparent text-foreground/100 hover:border-gray-300 hover:text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Team
                    </Link>
                    <Link
                      to={`/foundation/details/${userId}`}
                      className="border-transparent text-foreground/100 hover:border-gray-300 hover:text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      My Foundation
                    </Link>
                  </div>
                ) : (
                  <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                    <Link
                      to="/"
                      className="border-primary text-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Home
                    </Link>
                    <Link
                      to="/explore"
                      className="border-transparent text-foreground/100 hover:border-gray-300 hover:text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Explore
                    </Link>
                    <Link
                      to="/Aboutus"
                      className="border-transparent text-foreground/100 hover:border-gray-300 hover:text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      About us
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="text-foreground max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400 "
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border border-foreground/20 rounded-md leading-5 bg-white dark:bg-foreground/20 placeholder-gray-500 dark:placeholder-foreground/80 focus:outline-none focus:placeholder-foreground focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-foreground  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                {userId ? (
                  <HeaderSlider headName={userdata.headName} />
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={loginHandler}
                      variant="headerButton"
                      size="responsive"
                    >
                      Log in
                    </Button>
                    <Button
                      onClick={() => navigate("/foundation/register")}
                      variant="headerButton"
                      size="responsive"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
                <span className="ml-4 relative flex-shrink-0">
                  <ModeToggle className="bg-foreground" />
                </span>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            {userId ? (
              <div className="pt-2 pb-3 space-y-1">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
                <Disclosure.Button
                  as="a"
                  to="#"
                  className="bg-background border-primary text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Dashboard
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  to="#"
                  className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Team
                </Disclosure.Button>
              </div>
            ) : (
              <div className="pt-2 pb-3 space-y-1">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
                <Disclosure.Button className="bg-background border-primary text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  <Link to="/"> Home</Link>
                </Disclosure.Button>
                <Disclosure.Button className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  <Link to="/explore">Explore</Link>
                </Disclosure.Button>
                <Disclosure.Button className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  <Link to="/aboutus">About Us</Link>
                </Disclosure.Button>
              </div>
            )}

            {userId ? (
              <HeaderSliderMobile
                email={userdata.email}
                headName={userdata.headName}
                userId={userId}
              />
            ) : (
              <div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    // onClick={signoutHandler}
                    onClick={loginHandler}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Log In
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    // onClick={signoutHandler}
                    onClick={() => navigate("/foundation/register")}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Register
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
