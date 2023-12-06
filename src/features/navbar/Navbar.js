import React from "react";
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedinUser } from "../auth/authSlice";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Process", href: "/process", current: false },
  { name: "Product", href: "/Product-page", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ children }) {
  const [isSticky, setIsSticky] = useState(false);
  const user = useSelector(selectLoggedinUser);
  const location = useLocation();
  const [currentNavigation, setNavigation] = useState(navigation);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const threshold = 10; // Adjust this threshold as needed
      setIsSticky(offset > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updatedNavigation = currentNavigation.map((item) => ({
      ...item,
      current: item.href === location.pathname,
    }));
    setNavigation(updatedNavigation);
  }, [location]);

  return (
    <>
      <Disclosure
        as="nav"
        className={`md:sticky md:top-0 bg-[#1D2430]  ${
          isSticky ? "md:bg-opacity-95  border-b-1 border-gray-100" : ""
        }`}
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-24 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center  ">
                    <img
                      className="h-20 w-20"
                      src="https://github.com/jitujiten/DOM_all/assets/120164938/883bede5-6ea5-405e-8b9b-b8b53c1c0b0d"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {currentNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? " bg-gray-900 text-white"
                              : " text-gray-300 hover:bg-gray-700 hover:text-white",
                            "agbalumo rounded-md px-3 py-2 text-md font-medium mt-5"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                      {user?.role === "admin" && (
                        <Link
                          to="/admin-product"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white agbalumo rounded-md px-3 py-2 text-md font-medium mt-5"
                        >
                          Admin Product
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                {!user && (
                  <div className="absolute inset-y-0 right-0 flex justify-between pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0  px-7 mt-8 md:mt-0">
                    <Link
                      to="/login"
                      className="h-7 md:h-auto px-4 md:px-6 -py-1 md:py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-400"
                    >
                      Login
                    </Link>
                  </div>
                )}
                {user && (
                  <div className="hidden md:block absolute inset-y-0 right-0 flex justify-between pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0  px-7 mt-8 md:mt-0">
                    <Link
                      to="/logout"
                      className="h-7 md:h-auto px-4 md:px-6 -py-1 md:py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-400 mt-1"
                    >
                      Logout
                    </Link>
                  </div>
                )}
                {user && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                    {/* Profile dropdown */}
                    <Link to="/my-profile">
                      <div
                        className={classNames(
                          location.pathname === "/my-profile"
                            ? " bg-white p-1 rounded-full"
                            : " ",
                          "  inline-block "
                        )}
                      >
                        <img
                          className="h-8 w-8 rounded-full"
                          src={
                            user?.profilePic
                              ? user?.profilePic
                              : "https://www.pikpng.com/pngl/m/16-168770_user-iconset-no-profile-picture-icon-circle-clipart.png"
                          }
                          alt="profile pic"
                        />
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 ">
                {currentNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "agbalumo block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                {user?.role === "admin" && (
                  <Link to="/admin-product">
                    <Disclosure.Button
                      as="a"
                      className="agbalumo block rounded-md px-3 py-2  text-gray-300"
                    >
                      Admin product
                    </Disclosure.Button>
                  </Link>
                )}
                {user && (
                  <Link to="/logout">
                    <Disclosure.Button
                      as="a"
                      className="agbalumo block rounded-md px-3 py-2  text-gray-300"
                    >
                      Logout
                    </Disclosure.Button>
                  </Link>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {children}
    </>
  );
}
