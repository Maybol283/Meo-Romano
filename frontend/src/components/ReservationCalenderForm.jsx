import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PartyListBox from "./PartyListBox";
import { Transition } from "@headlessui/react";

const ReservationCalenderForm = ({
  partySize,
  selectedPartySize,
  setSelectedPartySize,
  date,
  dateSelect,
  continueToggle,
  setContinueToggle,
  bookingInfo,
  queryDatabase,
  setAvailableTimes,
}) => {
  return (
    <Transition
      as="div"
      show={continueToggle == 0}
      enter="transition-opacity duration-300 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300 ease-in"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="absolute inset-0 flex flex-col justify-center items-center"
    >
      <div className="py-2">
        <PartyListBox
          partySize={partySize}
          selected={selectedPartySize}
          setSelected={setSelectedPartySize}
        />
      </div>
      <Calendar value={date} onClickDay={dateSelect} className="md:w-[500px]" />
      <button
        onClick={() => {
          setContinueToggle((prevToggle) => prevToggle + 1);
          setTimeout(() => {
            setContinueToggle((prevToggle) => prevToggle + 1);
          }, 1000);
          queryDatabase(bookingInfo.partySize, bookingInfo.date)
            .then((AvailabilitySlots) => {
              setAvailableTimes(AvailabilitySlots);
            })
            .catch((error) => {
              console.error(
                "Error:",
                error.response ? error.response.data : error.message
              );
            });
        }}
        type="button"
        className="my-2 cursor-default rounded-lg bg-white py-2 pl-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        Continue
      </button>
    </Transition>
  );
};

export default ReservationCalenderForm;
