import { Transition } from "@headlessui/react";
import {
  getTimeSlot,
  updateBooking,
  deleteBooking,
} from "../../tools/queryDatabase";

export default function UpdateCard({
  bookingInfo,
  continueToggle,
  setContinueToggle,
  pin,
  setAvailableTimes,
}) {
  return (
    <div className="flex flex-col pt-10 gap-2">
      <div className="flex-none sm:flex justify-center items-center ">
        <Transition
          as="div"
          show={continueToggle == 3}
          enter="transition-opacity duration-600 ease-out delay-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-600 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="w-full sm:max-w-2xl mx-auto"
        >
          <div className="rounded-md bg-white shadow">
            <h1>Hello {bookingInfo.name}</h1>
            <p className="pb-5">you can edit your booking below</p>
            <ul
              role="list"
              className="max-h-[300px] overflow-y-auto divide-y divide-gray-200"
            >
              <div className="rounded-md bg-white shadow px-4 py-6">
                <ul className="divide-y divide-gray-200">
                  <li className="px-6 py-10 grid grid-cols-3 items-center">
                    <span className="font-black">Date:</span>
                    <span>{bookingInfo.date}</span>
                    <button onClick={() => setContinueToggle(1)}>Edit</button>
                  </li>
                  <li className="px-6 py-10 grid grid-cols-3 items-center">
                    <span className="font-black">Number of Guests:</span>
                    <span>{bookingInfo.partySize}</span>
                    <button onClick={() => setContinueToggle(1)}>Edit</button>
                  </li>
                  <li className="px-6 py-10 grid grid-cols-3 items-center">
                    <span className="font-black">Time Slot:</span>
                    <span>{bookingInfo.timeSlot}</span>
                    <button
                      onClick={async () => {
                        await getTimeSlot(
                          bookingInfo.partySize,
                          bookingInfo.date
                        )
                          .then((AvailabilitySlots) => {
                            setAvailableTimes(AvailabilitySlots);
                          })
                          .catch((error) => {
                            console.error(
                              "Error:",
                              error.response
                                ? error.response.data
                                : error.message
                            );
                          });
                        setContinueToggle(2);
                      }}
                    >
                      Edit
                    </button>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="flex justify-between py-5 w-80">
              <button
                type="button"
                onClick={async () => {
                  try {
                    await deleteBooking(pin); // Ensure this is awaited if it's async
                    setContinueToggle(5);
                  } catch (error) {
                    console.error(
                      "Error:",
                      error.response ? error.response.data : error.message
                    );
                    setContinueToggle(7);
                  }
                }}
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Delete
              </button>
              <button
                onClick={async () => {
                  try {
                    await updateBooking(bookingInfo, pin);
                    setContinueToggle(6);
                  } catch (error) {
                    console.error(
                      "Error:",
                      error.response ? error.response.data : error.message
                    );
                    setContinueToggle(7);
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
