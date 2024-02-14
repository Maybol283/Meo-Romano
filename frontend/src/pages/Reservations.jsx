import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import dateFormatter from "../tools/dateFormatter";
import ReservationCalenderForm from "../components/Reservation Components/ReservationCalenderForm.jsx";
import AvailabilityCard from "../components/Reservation Components/AvailabilityCard.jsx";
import queryDatabase from "../tools/queryDatabase.js";
import ContactInfo from "../components/Reservation Components/ContactInfo.jsx";
import InfoCardCheck from "../components/Reservation Components/InfoCheckCard.jsx";
import BookingConfirmation from "../components/Reservation Components/BookingConfirmation.jsx";
import getTimeSlot from "../tools/queryDatabase";

const partySize = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Reservations() {
  const [continueToggle, setContinueToggle] = useState(0);
  const [selectedPartySize, setSelectedPartySize] = useState(partySize[0]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookingInfo, setBookingInfo] = useState({
    firstName: null,
    lastName: null,
    phoneNumber: null,
    partySize: 1,
    email: "",
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
      <h1 className="relative z-9 sm:bottom-[43%] bottom-[40%]">
        Reservations
      </h1>
      <div className="relative w-full max-w-md sm:bottom-12 bottom-16">
        <Transition
          as="div"
          show={continueToggle === 0}
          enter="transition-opacity duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute inset-0 flex flex-col justify-center items-center"
        >
          <ReservationCalenderForm
            partySize={partySize}
            selectedPartySize={selectedPartySize}
            setSelectedPartySize={setSelectedPartySize}
            dateSelect={dateSelect}
          />

          <button
            onClick={() => {
              setContinueToggle(1);
              setTimeout(() => {
                setContinueToggle(2);
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
        <Transition
          as="div"
          show={continueToggle === 1}
          enter="transition-opacity duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute inset-0"
        >
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </Transition>

        <Transition
          className="absolute inset-x-0 -inset-y-40 flex flex-col items-center"
          as="div"
          show={continueToggle == 2}
          enter="transition-opacity duration-600 delay-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-600 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <AvailabilityCard
            handleBookingInfoChange={handleBookingInfoChange}
            Availability={availableTimes}
            continueToggle={continueToggle}
            setContinueToggle={setContinueToggle}
          />
          <div className="flex flex-row gap-5">
            <div>
              <button
                onClick={() => {
                  setContinueToggle(2);
                  handleBookingInfoChange("timeSlot", []);
                }}
                type="button"
                className="my-2 cursor-default rounded-lg bg-white py-2 pl-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              >
                Back
              </button>
            </div>
          </div>
        </Transition>
        <Transition
          className="absolute inset-x-0 -inset-y-48  flex flex-col items-center"
          as="div"
          show={continueToggle == 3}
          enter="transition-opacity delay-500 duration-600 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-600 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ContactInfo
            handleBookingInfoChange={handleBookingInfoChange}
            setContinueToggle={setContinueToggle}
          />
        </Transition>
        <Transition
          className="absolute inset-x-0 -inset-y-48  flex flex-col items-center"
          as="div"
          show={continueToggle == 4}
          enter="transition-opacity delay-500 duration-600 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-600 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <InfoCardCheck
            bookingInfo={bookingInfo}
            setContinueToggle={setContinueToggle}
          />
        </Transition>
        <Transition
          className="absolute inset-x-0 -inset-y-48  flex flex-col items-center"
          as="div"
          show={continueToggle == 5}
          enter="transition-opacity delay-500 duration-600 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-600 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <BookingConfirmation
            bookingInfo={bookingInfo}
            setContinueToggle={setContinueToggle}
          />
        </Transition>
      </div>
    </div>
  );
}
