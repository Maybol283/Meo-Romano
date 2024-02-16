import { useState } from "react";
import { getBookingInfo, UpdateBooking } from "../tools/queryDatabase";
import SignIn from "../components/Reservation Components/SignIn";
import { useNavigate } from "react-router-dom";

export default function BookingManager() {
  const [pin, setPin] = useState("");
  const navigation = useNavigate;

  const handleSignIn = async () => {
    if (pin != "000000") {
      updateSignIn = await getBookingInfo(pin);
      if (updateSignIn) {
        navigation();
      }
    }
  };

  const handleChange = (e) => {
    setPin(e.target.value); // Correctly updates the pin state with the new value
  };

  return (
    <>
      <SignIn
        handleChange={handleChange}
        handleSignIn={handleSignIn}
        pin={pin}
        setPin={setPin}
      />
    </>
  );
}
