import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PartyListBox from "./PartyListBox";
import { Transition } from "@headlessui/react";
import getTimeSlot from "../tools/queryDatabase";

const ReservationCalenderForm = ({
  partySize,
  selectedPartySize,
  setSelectedPartySize,
  dateSelect,
  continueToggle,
  setContinueToggle,
  bookingInfo,
  setAvailableTimes,
}) => {
  const lastDate = new Date();
  lastDate.setMonth(lastDate.getMonth() + 3); // Add 3 months to current date
  const firstDate = new Date();
  firstDate.setDate(firstDate.getDate() + 1);

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
      <Calendar
        maxDetail={"month"}
        minDate={firstDate}
        maxDate={lastDate}
        onClickDay={dateSelect}
        className="md:w-[500px] bg-white"
      />
      <button
        onClick={() => {
          setContinueToggle((prevToggle) => prevToggle + 1);
          setTimeout(() => {
            setContinueToggle((prevToggle) => prevToggle + 1);
          }, 1000);
          getTimeSlot(bookingInfo.partySize, bookingInfo.date)
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
