import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteUserLocalStorage } from "@/Redux/userSlice";
import { server } from "@/main";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HeaderSlider = ({headName}) => {
  console.log(headName)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signoutHandler = async () => {
    try {
      // console.log("reached here ");
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
      toast.error("Logout Successfully");
      dispatch(deleteUserLocalStorage(null));
    }
  };
  return (
    <Menu as="div" className="ml-2 relative flex-shrink-0">
      <div>
        <Menu.Button className="bg-background rounded-full flex text-sm focus:outline-none ">
          <span className="sr-only">Open user menu</span>
          <span className="font-certi border-[1px] py-[5px] px-2 text-foreground dark:text-white hover:text-primary border-gray-300  h-8 w-8 rounded-lg">
          {headName ? headName.charAt(0).toUpperCase() : ""}
          {/* {headName} */}
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-background ring-1 ring-gray-300 ring-opacity-3 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-background" : "",
                  "block px-4 py-2 text-sm text-foreground"
                )}
              >
                Your Profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-background" : "",
                  "block px-4 py-2 text-sm text-foreground"
                )}
              >
                Settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={signoutHandler}
                className={classNames(
                  active ? "bg-background" : "",
                  "block w-full text-left px-4 py-2 text-sm text-foreground"
                )}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
      <Toaster richColors />
    </Menu>
  );
};

export default HeaderSlider;
