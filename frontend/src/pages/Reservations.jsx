import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import dateFormatter from "../tools/dateFormatter";
import ReservationForm from "../components/ReservationForm.jsx";

const partySize = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Reservations() {
  const [selectedPartySize, setSelectedPartySize] = useState(partySize[0]);
  const [toggle, setToggle] = useState(true);
  const [date, setDate] = useState(Date());
  const [bookingInfo, setBookingInfo] = useState({
    name: null,
    number: null,
    partySize: 1,
    email: null,
    date: dateFormatter(new Date()),
    time: "00:00",
  });

  function handleBookingInfoChange(fieldName, value) {
    setBookingInfo((prevInfo) => ({
      ...prevInfo,
      [fieldName]: value,
    }));
  }

  function dateSelect(dateValue) {
    const formattedDate = dateFormatter(dateValue); //format the data into DD/MM/YYYY before state update
    handleBookingInfoChange("date", formattedDate);
  }

  useEffect(() => {
    handleBookingInfoChange("partySize", selectedPartySize); //update partySize before sending too queryDatabase.js
  }, [selectedPartySize]);

  return (
    <div className="h-screen flex flex-col justify-center items-center overflow-hidden relative z-5">
      <h1 className="relative z-9 bottom-1/3 font-bold">Reservations</h1>
      <div className="relative w-full max-w-md ">
        <ReservationForm
          partySize={partySize}
          selectedPartySize={selectedPartySize}
          setSelectedPartySize={setSelectedPartySize}
          date={date}
          dateSelect={dateSelect}
          toggle={toggle}
          setToggle={setToggle}
          handleBookingInfoChange={handleBookingInfoChange}
          bookingInfo={bookingInfo}
        />
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
          <p>Checking Availability</p>
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
