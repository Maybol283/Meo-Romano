import { Transition } from "@headlessui/react";

const AvailabilityCard = ({
  Availability,
  handleBookingInfoChange,
  continueToggle,
  setContinueToggle,
}) => {
  return (
    <Transition
      as="div"
      show={continueToggle == 2}
      enter="transition-opacity delay-500 duration-300 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300 ease-in"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {Availability && Availability.length > 0 ? (
        <ul role="list" className="divide-y divide-gray-500">
          {Availability.map((slot, index) => (
            <li key={slot.id || index} className="py-4">
              {" "}
              {/* Assuming each slot has a unique `id` */}
              {slot}
              <button
                onClick={() => {
                  setContinueToggle(continueToggle + 1);
                  handleBookingInfoChange("timeSlot", slot);
                }}
                className="px-5 button-green mx-5"
              >
                Select
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="pb-10">
          Unfortunately, we have no availability on this day. Please select a
          different date.
        </p>
      )}

      <button
        onClick={() => {
          setContinueToggle(0);
          handleBookingInfoChange("timeSlot", []);
        }}
        type="button"
        className="my-2 cursor-default rounded-lg bg-white py-2 pl-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        Back
      </button>
    </Transition>
  );
};

export default AvailabilityCard;
