import { Transition } from "@headlessui/react";

const AvailabilityCard = ({
  Availability,
  handleBookingInfoChange,
  selectToggle,
  setSelectToggle,
}) => {
  return (
    <Transition
      as="div"
      show={selectToggle}
      enter="transition-opacity delay-500 duration-300 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300 ease-in"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <ul role="list" className="divide-y divide-gray-500">
        {Availability.map((slot, index) => (
          <li key={index} className="py-4">
            {slot}
            <button
              onClick={() => {
                setSelectToggle(!selectToggle);
                handleBookingInfoChange("timeSlot", [slot]);
              }}
              className="px-5 button-green mx-5"
            >
              Select
            </button>
          </li>
        ))}
      </ul>
    </Transition>
  );
};

export default AvailabilityCard;
