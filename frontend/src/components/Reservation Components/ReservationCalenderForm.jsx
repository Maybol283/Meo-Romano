import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PartyListBox from "./PartyListBox";

const ReservationCalenderForm = ({
  partySize,
  selectedPartySize,
  setSelectedPartySize,
  dateSelect,
}) => {
  const lastDate = new Date();
  lastDate.setMonth(lastDate.getMonth() + 3); // Add 3 months to current date
  const firstDate = new Date();
  firstDate.setDate(firstDate.getDate() + 1);

  return (
    <div className="flex flex-col justify-center items-center">
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
    </div>
  );
};

export default ReservationCalenderForm;
