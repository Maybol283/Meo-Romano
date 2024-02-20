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
                className="mx-10 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
