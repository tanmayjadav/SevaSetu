import { deleteUserLocalStorage, setUserLocalStorage } from "@/Redux/userSlice";
import { server } from "@/main";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Hmobileiflogin = ({ headName, email ,userId}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signoutHandler = async () => {
    try {
      console.log("reached here ");
      const response = await axios.get(
        `${server}/api/foundation/logout`
      );
      console.log(response);
      if (response.data.success) {
        dispatch(deleteUserLocalStorage(null));
      }
      toast.error("Logout Successfully");
      navigate("/");
    } catch (error) {
      console.log("error found", error);
      Toaster.error("Logout Successfully");
      dispatch(deleteUserLocalStorage(null));
    }
  };
  return (
    <div className="pt-4 pb-3">
      <div className="flex items-center px-4">
        <div className="flex-shrink-0">
          <span className="font-certi border-2 py-[8.5px] px-3 border-gray-500 h-10 w-10 rounded-xl">
            {headName ? headName.charAt(0).toUpperCase() : ""}
          </span>
        </div>
        <div className="ml-3">
          <div className="text-base font-medium text-foreground">
            {headName}
          </div>
          <div className="text-sm font-medium text-gray-500">{email}</div>
        </div>
        <button
          type="button"
          className="ml-auto flex-shrink-0 bg-background p-1 text-gray-400 rounded-full hover:text-gray-500 "
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-3 space-y-1">
        <Disclosure.Button
          as="a"
          href="#"
          className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
        >
          <Link to={`/foundation/details/${userId}`}>My Foundation</Link>
        </Disclosure.Button>
        {/* <Disclosure.Button
          as="a"
          href="#"
          className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
        >
          Settings
        </Disclosure.Button> */}
        <Disclosure.Button
          as="a"
          href="#"
          onClick={signoutHandler}
          className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
        >
          Sign out
        </Disclosure.Button>
      </div>
    </div>
  );
};

export default Hmobileiflogin;
