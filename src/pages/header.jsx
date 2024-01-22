import { Link } from "react-router-dom";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Reservations", href: "/Reservations" },
  { name: "Gallery", href: "/Gallery" },
  { name: "About Us", href: "/About" },
  { name: "Menu", href: "/Menu" },
];

export default function header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <h2 className="h-8 w-auto text-black text-3xl pl-2">Meo Romano</h2>
        </a>
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
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href} // Change href to the corresponding route path
              className="text-xl font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
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
          enter="duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-10 ">
            <Dialog.Panel className="overflow-y-hidden fixed inset-y-0 right-0 z-10 w-full bg-white px-6 py-6 lg:max-w-md sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-end pt-1">
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="pb-6 md:text-left h-svh flex flex-col justify-around overflow-hidden">
                    {navigation.map((item, index) => (
                      <Transition.Child
                        enter="transition ease-in-out duration-500 transform"
                        enterFrom="translate-x-2/3"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-500 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-2/3"
                      >
                        <Link
                          key={item.name}
                          to={item.href} // Change href to the corresponding route path
                          className="block rounded-lg lg:text-left text-center text-3xl font-semibold leading-10 text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)} // Close the mobile menu on click
                        >
                          {item.name}
                        </Link>
                      </Transition.Child>
                    ))}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Transition>
    </header>
  );
}
