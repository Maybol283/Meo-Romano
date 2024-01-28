import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { Transition } from "@headlessui/react";
import PartyListBox from "../components/PartyListBox";

const partySize = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Reservations() {
  const [selectedPartySize, setSelectedPartySize] = useState(partySize[0]);
  const [toggle, setToggle] = useState(true);
  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    number: null,
    partySize: null,
    email: "",
    date: null,
    time: "00:00",
  });

  function handleBookingInfoChange(fieldName, value) {
    setBookingInfo((prevInfo) => ({
      ...prevInfo,
      [fieldName]: value,
    }));
  }
  console.log(bookingInfo);

  function dateSelect(dateValue) {
    const formattedDate = dateValue
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("/"); //format the data into DD/MM/YYYY before state update

    handleBookingInfoChange("date", formattedDate);
  }
  function handleContinue() {}

  return (
    <div className="h-screen flex flex-col justify-center items-center overflow-hidden relative z-5">
      <h1 className="relative z-9 bottom-1/3 font-bold">Reservations</h1>
      <div className="relative w-full max-w-md ">
        <Transition
          as="div"
          show={toggle}
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
          <Calendar onClickDay={dateSelect} className="md:w-[500px]" />
          <button
            onClick={() => {
              handleBookingInfoChange("partySize", selectedPartySize); // update bookingInfo with partySize //
              setToggle(!toggle);
            }}
            type="button"
            className="my-2 cursor-default rounded-lg bg-white py-2 pl-3  text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            Continue
          </button>
        </Transition>
        <Transition
          as="div"
          show={!toggle}
          enter="transition-opacity duration-600 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-600 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="absolute left-44 bottom-10 flex flex-col justify-center items-center h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </Transition>
      </div>
    </div>
  );
}
