import { getBookingInfo, deleteBooking } from "../tools/queryDatabase";
import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { useLocation } from "react-router-dom";

export default function BookingManager() {
  const [fieldNames, setFieldNames] = useState({}); // Initialize state to an empty object
  const [isLoading, setIsLoading] = useState(0);
  const location = useLocation();
  const [pin, setPin] = useState(""); // State to store the pin

  useEffect(() => {
    console.log("isLoading updated to:", isLoading);
  }, [isLoading]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pin = searchParams.get("pin"); // Get 'pin' query parameter
    setPin(pin);

    async function fetchData() {
      try {
        if (pin) {
          const data = await getBookingInfo(pin);
          console.log(data);
          setFieldNames(data);
        } else {
          console.error("PIN not provided in URL");
          setFieldNames({});
        }
      } catch (error) {
        console.error("Failed to fetch booking info:", error);
        setFieldNames({});
      } finally {
        setIsLoading(1);
      }
    }

    fetchData();
  }, []); // Empty dependency array to run only once

  // Rename fields for display purposes
  const renameFields = {
    party_size: "Number of Guests",
    time_slot: "Time",
    first_name: "Name",
    date: "Date",
  };

  // Prepare fields for mapping, excluding first_name
  const fieldsForMapping =
    Object.entries(fieldNames).length > 0
      ? Object.entries(fieldNames).reduce((acc, [key, value]) => {
          if (key !== "first_name") {
            acc[renameFields[key] || key] = value;
          }
          return acc;
        }, {})
      : {};

  if (isLoading == 0) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (!Object.keys(fieldsForMapping).length) {
    return <div>No information available</div>;
  }

  return (
    <div>
      <Transition
        as="div"
        show={isLoading == 1}
        enter="transition-opacity delay-500 duration-600 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-600 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="rounded-md bg-white shadow">
          <h1>Hello {fieldNames.first_name}</h1>
          <p className="pb-5">you can edit you're booking below</p>
          <ul
            role="list"
            className="max-h-[300px] overflow-y-auto divide-y divide-gray-200"
          >
            {Object.keys(fieldsForMapping).length > 0 ? (
              Object.entries(fieldsForMapping).map(
                ([fieldName, value], index) => (
                  <li key={fieldName + index} className="px-6 py-10 grid">
                    <span className="font-black grid grid-cols-1 justify-self-start">
                      {fieldName}:
                    </span>
                    <div className="grid grid-cols-2 items-center w-full">
                      <span className="grid justify-self-start">{value}</span>
                      <span>
                        <button value={fieldName}>edit</button>
                      </span>
                    </div>
                  </li>
                )
              )
            ) : (
              <li className="px-6 py-10 text-center">
                No booking information available.
              </li>
            )}
          </ul>
        </div>

        <div className="flex pt-5 place-content-around">
          <div>
            <button
              onClick={() => {
                setContinueToggle(5);
                postReservation(bookingInfo);
              }}
            >
              Submit
            </button>
          </div>
          <div>
            <button
              type="button"
              className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              onClick={async () => {
                await deleteBooking(pin); // Ensure this is awaited if it's async
                setIsLoading(2);
                console.log(isLoading);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Transition>
      <Transition
        as="div"
        className="h-screen flex items-center justify-center"
        show={isLoading == 2}
        enter="transition-opacity delay-500 duration-600 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-600 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <h1>Your booking has been cancelled</h1>
      </Transition>
    </div>
  );
}
