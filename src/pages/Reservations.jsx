import Calendar from "react-calendar";
import { useState } from "react";
import { Listbox } from "@headlessui/react";

const freeTime = [{ time: "18:30" }];

export default function Reservations() {
  const [value, setValue] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(freeTime[0]);

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <div className="h-screen mx-auto mt-5">
      <Calendar onChange={onChange} value={value} className="sm:text-xl" />
      <Listbox value={selectedTime} onChange={setSelectedTime}>
        <Listbox.Button>{selectedTime.time}</Listbox.Button>
        <Listbox.Options>
          {freeTime.map((e) => (
            <Listbox.Option key={e.time} value={e.time} disabled={e.time}>
              {e.time}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
