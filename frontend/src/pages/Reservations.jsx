import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import dateFormatter from "../tools/dateFormatter";
import ReservationCalenderForm from "../components/ReservationCalenderForm.jsx";
import AvailabilityCard from "../components/AvailabilityCard.jsx";
import queryDatabase from "../tools/queryDatabase.js";
import ContactInfo from "../components/ContactInfo.jsx";

const partySize = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Reservations() {
  const [selectToggle, setSelectToggle] = useState(true);
  const [selectedPartySize, setSelectedPartySize] = useState(partySize[0]);
  const [continueToggle, setContinueToggle] = useState(true);
  const [date, setDate] = useState(Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookingInfo, setBookingInfo] = useState({
    firstName: null,
    lastName: null,
    number: null,
    partySize: 1,
    email: null,
    date: dateFormatter(new Date()),
    timeSlot: [],
  });

  function handleBookingInfoChange(fieldName, value) {
    setBookingInfo((prevInfo) => ({
      ...prevInfo,
      [fieldName]: value,
    }));
  }

  useEffect(() => {
    console.log(bookingInfo);
  }, [bookingInfo]);

  function dateSelect(dateValue) {
    const formattedDate = dateFormatter(dateValue); //format the data into YYYY-MM-DD  before state update
    handleBookingInfoChange("date", formattedDate);
  }

  useEffect(() => {
    handleBookingInfoChange("partySize", selectedPartySize); //update partySize before sending too queryDatabase.js
  }, [selectedPartySize]);

  return (
    <div className="h-screen flex flex-col justify-center items-center overflow-hidden relative z-5">
      <h1 className="relative z-9 sm:bottom-1/3 bottom-[40%] font-bold">
        Reservations
      </h1>
      <div className="relative w-full max-w-md sm:bottom-0 bottom-10">
        <ReservationCalenderForm
          partySize={partySize}
          selectedPartySize={selectedPartySize}
          setSelectedPartySize={setSelectedPartySize}
          date={date}
          dateSelect={dateSelect}
          continueToggle={continueToggle}
          setContinueToggle={setContinueToggle}
          handleBookingInfoChange={handleBookingInfoChange}
          bookingInfo={bookingInfo}
          setBookingInfo={setBookingInfo}
          queryDatabase={queryDatabase}
          setAvailableTimes={setAvailableTimes}
        />
        <Transition
          as="div"
          show={false}
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
        <Transition
          className="absolute inset-x-0 -inset-y-40 flex flex-col items-center"
          as="div"
          show={!continueToggle}
          enter="transition-opacity duration-600 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-600 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <AvailabilityCard
            handleBookingInfoChange={handleBookingInfoChange}
            Availability={availableTimes}
            selectToggle={selectToggle}
            setSelectToggle={setSelectToggle}
          />
        </Transition>
        <Transition
          className="absolute inset-x-0 -inset-y-48  flex flex-col items-center"
          as="div"
          show={!selectToggle}
          enter="transition-opacity delay-500 duration-600 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-600 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ContactInfo />
        </Transition>
      </div>
    </div>
  );
}
