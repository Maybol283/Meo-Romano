import { Link } from "react-router-dom";
import { useState, Fragment } from "react";
import { Dialog, Transition, Popover, Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Reservation",
    href: "/Reservations",
    children: [
      {
        name: "Make Reservation",
        href: "/Reservations",
      },
      {
        name: "Manage Booking",
        href: "/sign-in",
      },
    ],
  },
  { name: "Gallery", href: "/Gallery" },
  { name: "About Us", href: "/About" },
  { name: "Menu", href: "/Menu" },
];

export default function header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-10">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <h2 className="h-8 w-auto text-black text-3xl pl-2">Meo Romano</h2>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 flex items-center">
          {navigation.map((item) =>
            item.children ? (
              <Popover key={item.name} className="relative">
                <Popover.Button className="text-xl font-semibold leading-6 text-gray-900 flex items-center">
                  <span className="underline-animation">{item.name}</span>
                  <ChevronDownIcon className="ml-2 h-5 w-5" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 mt-3 w-48 max-w-sm px-4 sm:px-0">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        {item.children.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="-m-3 p-3 block rounded-md hover:bg-gray-50 flex items-center"
                          >
                            <p className="text-base font-medium text-gray-900 items-center">
                              {subItem.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="text-xl font-semibold leading-6 text-gray-900 items"
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </nav>
      {/*Mobile Menu start*/}
      <Transition
        show={mobileMenuOpen}
        as={Dialog}
        className="lg:hidden"
        onClose={() => setMobileMenuOpen(false)}
      >
        {" "}
        <Transition.Child
          as={Fragment}
          enter="duration-300 transition ease-in-out duration-500 transform"
          enterFrom="opacity-0 translate-x-2/3"
          enterTo="opacity-100 translate-x-0"
          leave="duration-200 transition ease-in-out duration-500 transform"
          leaveFrom="opacity-100  translate-x-0"
          leaveTo="opacity-0 translate-x-2/3"
        >
          <div className="fixed inset-0 z-10 flex flex-col justify-around ">
            <Dialog.Panel className="overflow-x-hidden fixed inset-y-0 right-0 z-10 w-full bg-white px-6 py-6 lg:max-w-md sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-end pt-1">
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6">
                {navigation.map((item) =>
                  item.children ? (
                    <Disclosure as="div" key={item.name} className="py-2">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex justify-center items-center w-full px-4 py-2  text-4xl sm:text-7xl font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
                            {item.name}
                            <ChevronDownIcon
                              className={`${
                                open ? "transform rotate-180" : ""
                              } w-5 h-5 text-gray-500 flex align-self-center justify-end`}
                            />
                          </Disclosure.Button>
                          <Transition
                            as={Fragment}
                            enter="duration-100 transition ease-in-out duration-300 transform"
                            enterFrom="opacity-0 translate-y-2/3"
                            enterTo="opacity-100 translate-y-0"
                            leave="duration-200 transition ease-in-out duration-300 transform"
                            leaveFrom="opacity-100  translate-y-0"
                            leaveTo="opacity-0 translate-y-2/3"
                          >
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-3xl text-gray-500">
                              {item.children.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  className="block py-2 pl-4 pr-3 text-3xl  text-center rounded-lg hover:bg-gray-50"
                                  onClick={() => setMobileMenuOpen(false)} // Close the mobile menu on click
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 mt-2 text-4xl sm:text-7xl text-center font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)} // Close the mobile menu on click
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Transition>
    </header>
  );
}
