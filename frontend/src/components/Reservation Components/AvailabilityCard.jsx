const AvailabilityCard = ({
  Availability,
  handleBookingInfoChange,
  continueToggle,
  setContinueToggle,
}) => {
  return (
    <div>
      {Availability && Availability.length > 0 ? (
        <ul role="list" className="divide-y divide-gray-500">
          {Availability.map((slot, index) => (
            <li key={slot.id || index} className="py-4">
              {" "}
              {/* Assuming each slot has a unique `id` */}
              {slot}
              <button
                onClick={() => {
                  setContinueToggle(continueToggle + 1);
                  handleBookingInfoChange("timeSlot", slot);
                }}
                className="px-5 button-green mx-5"
              >
                Select
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="pb-10">
          Unfortunately, we have no availability on this day. Please select a
          different date.
        </p>
      )}
    </div>
  );
};

export default AvailabilityCard;
