import { getBookingInfo, deleteBooking } from "../tools/queryDatabase";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UpdateCard from "../components/Reservation Components/updateCard.jsx";
import ReservationCalenderForm from "../components/Reservation Components/ReservationCalenderForm.jsx";
const partySize = [1, 2, 3, 4, 5, 6, 7, 8];

export default function BookingManager() {
  const [isLoading, setIsLoading] = useState(0);
  const [selectedPartySize, setSelectedPartySize] = useState(partySize[0]);
  const location = useLocation();
  const [pin, setPin] = useState(""); // State to store the pin
  const [bookingInfo, setBookingInfo] = useState({
    date: Date(),
    name: "",
    time: "",
    partySize: 0,
  });
  useEffect(() => {
    console.log("isLoading updated to:", isLoading);
  }, [isLoading]);

  function handleBookingInfoChange(fieldName, value) {
    setBookingInfo((prevInfo) => ({
      ...prevInfo,
      [fieldName]: value,
    }));
  }

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
            time: data.time_slot || "",
            partySize: data.party_size,
          });
        } else {
          console.error("PIN not provided in URL");
          setFieldNames({});
        }
      } catch (error) {
        console.error("Failed to fetch booking info:", error);
        setFieldNames({});
      } finally {
        setIsLoading(1);
      }
    }

    fetchData();
  }, []); // Empty dependency array to run only once

  if (isLoading == 0) {
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
    <div>
      <UpdateCard
        bookingInfo={bookingInfo}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <ReservationCalenderForm />
    </div>
  );
}
