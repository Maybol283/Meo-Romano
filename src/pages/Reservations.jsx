import Calendar from "react-calendar";
import { useState } from "react";
import { Listbox } from "@headlessui/react";

export default function Reservations() {
  const [value, setValue] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(freeTime[0]);

  const freeTime = {
    time: "18:30",
  };

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <div className="h-screen mx-auto mt-5">
      <Calendar onChange={onChange} value={value} className="sm:text-xl" />
      <Listbox value={selectedTime} onChange={setSelectedTime}>
        <Listbox.Button>{selectedTime.time}</Listbox.Button>
        <Listbox.Options>
          {people.map((person) => (
            <Listbox.Option
              key={person.id}
              value={person}
              disabled={person.unavailable}
            >
              {person.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
