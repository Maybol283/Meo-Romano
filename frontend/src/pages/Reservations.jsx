import Calendar from "react-calendar";
import { Fragment, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { Transition } from "@headlessui/react";
import PartyListBox from "../components/PartyListBox";

export default function Reservations() {
  const [value, setValue] = useState(new Date());
  const [toggle, setToggle] = useState(true);
  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    number: "",
    email: "",
    date: null,
    time: "00:00",
  });

  function onChange(dateValue) {
    const formattedDate = dateValue
      .toISOString()
      .split("T")[0] // Takes the string up until the "T" character
      .split("-")
      .reverse()
      .join("/"); // Change the separator to "/", date now in DD/MM/YYYY format

    setValue(dateValue); // Update the calendar's value

    setBookingInfo((prevInfo) => ({
      ...prevInfo,
      date: formattedDate, // Use nextValue, which is the selected date
    }));

    setToggle(!toggle);
  }

  return (
    <div className="h-screen flex justify-center items-center overflow-hidden relative z-5">
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
            <PartyListBox />
          </div>
          <Calendar
            onClickDay={onChange}
            value={value}
            className="md:w-[500px]"
          />
        </Transition>
        <button
          type="button"
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Button text
        </button>
      </div>
    </div>
  );
}
