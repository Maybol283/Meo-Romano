import { getBookingInfo } from "../tools/queryDatabase.js";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import UpdateCard from "../components/Reservation Components/updateCard.jsx";
import ReservationCalenderForm from "../components/Reservation Components/ReservationCalenderForm.jsx";
import { Transition } from "@headlessui/react";
import dateFormatter from "../tools/dateFormatter.js";
import AvailabilityCard from "../components/Reservation Components/AvailabilityCard.jsx";
import getTimeSlot from "../tools/queryDatabase.js";

const partySize = [1, 2, 3, 4, 5, 6, 7, 8];

export default function UpdateManager(pin, setPin) {
  const isInitialMount = useRef(true);
  const [continueToggle, setContinueToggle] = useState(0);
  const [selectedPartySize, setSelectedPartySize] = useState(partySize[0]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [date, setDate] = useState(0);
  const location = useLocation();
  const [bookingInfo, setBookingInfo] = useState({
    date: Date(),
    name: "George",
    timeSlot: "",
    partySize: 0,
  });

  useEffect(() => {
    console.log("the booking info is currently:", bookingInfo);
  }, [bookingInfo]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      handleBookingInfoChange("date", date);
      handleBookingInfoChange("partySize", selectedPartySize);
    }
  }, [bookingInfo.timeSlot]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pin = searchParams.get("pin"); // Get 'pin' query parameter
    setPin(pin);

    async function fetchData() {
      try {
        if (pin) {
          const data = await getBookingInfo(pin);
          console.log(data);
          setBookingInfo({
            date: data.date || "",
            name: data.first_name || "",
            timeSlot: data.time_slot || "",
            partySize: data.party_size,
          });
          setDate(data.date);
          setSelectedPartySize(data.party_size);
        } else {
          console.error("PIN not provided in URL");
          setBookingInfo({});
        }
      } catch (error) {
        console.error("Failed to fetch booking info:", error);
        setBookingInfo({});
      } finally {
        setContinueToggle(3);
      }
    }

    fetchData();
  }, []); // Empty dependency array to run only once

  function handleBookingInfoChange(fieldName, value) {
    setBookingInfo((prevInfo) => ({
      ...prevInfo,
      [fieldName]: value,
    }));
  }

  function dateSelect(dateValue) {
    const formattedDate = dateFormatter(dateValue); //format the data into YYYY-MM-DD  before state update
    setDate(formattedDate);
  }

  if (continueToggle == 0) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center overflow-hidden relative z-5">
      <div className="absolute inset-0 flex flex-col items-center">
        <UpdateCard
          bookingInfo={bookingInfo}
          continueToggle={continueToggle}
          setContinueToggle={setContinueToggle}
          pin={pin}
          availableTimes={availableTimes}
          setAvailableTimes={setAvailableTimes}
        />
        <Transition
          as="div"
          show={continueToggle === 1}
          enter="transition-opacity duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute -inset-y-20 flex flex-col justify-center items-center"
        >
          <ReservationCalenderForm
            bookingInfo={bookingInfo}
            setBookingInfo={setBookingInfo}
            selectedPartySize={selectedPartySize}
            setSelectedPartySize={setSelectedPartySize}
            dateSelect={dateSelect}
          />
          <div className="pt-5">
            <button
              onClick={async () => {
                setContinueToggle(0);
                await getTimeSlot(selectedPartySize, date)
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
            >
              Submit
            </button>
          </div>
        </Transition>
        <Transition
          className="absolute inset-y-28 flex flex-col items-center"
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
            setContinueToggle={setContinueToggle}
            continueToggle={continueToggle}
          />
          <div>
            <button
              onClick={() => {
                setContinueToggle(3);
              }}
              type="button"
              className="my-2 cursor-default rounded-lg bg-white py-2 pl-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
              Back
            </button>
          </div>
        </Transition>
      </div>
      <Transition
        as="div"
        show={continueToggle == 5}
        enter="transition-opacity delay-500 duration-600 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-600 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="rounded-md bg-white shadow p-4">
          <h1>Your booking has been cancelled</h1>
        </div>
      </Transition>
      <Transition
        as="div"
        show={continueToggle == 6}
        enter="transition-opacity delay-500 duration-600 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-600 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="rounded-md bg-white shadow p-4">
          <h1>Your booking has been successfully updated!</h1>
        </div>
      </Transition>
    </div>
  );
}
