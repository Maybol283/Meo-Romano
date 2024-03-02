import { postReservation } from "../../tools/queryDatabase";

export default function InfoCardCheck({
  bookingInfo,
  setContinueToggle,
  handleBookingInfoChange,
}) {
  const fieldNames = {
    Date: bookingInfo.date,
    Time: bookingInfo.timeSlot,
    "First name": bookingInfo.firstName,
    "Last name": bookingInfo.lastName,
    "Phone number": bookingInfo.phoneNumber,
    Email: bookingInfo.email,
    "Number of Guests": bookingInfo.partySize,
  };

  return (
    <div>
      <div className="rounded-md bg-white shadow">
        <ul
          role="list"
          className="max-h-[300px] overflow-y-auto divide-y divide-gray-200"
          aria-label="Reservation Information"
        >
          {Object.entries(fieldNames).map(([fieldName, value], index) => (
            <li key={fieldName + index} className="px-6 py-10 grid">
              {" "}
              {/* Added flex layout for better control */}
              <span className="font-black grid grid-cols-1 justify-self-start">
                {fieldName}:
              </span>
              <div className="grid grid-cols-2 items-center w-full">
                <span className="grid justify-self-start">{value}</span>
                <span>
                  <button
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    value={fieldName}
                    onClick={() => {
                      console.log(fieldName);
                      switch (fieldName) {
                        case "First name":
                        case "Last name":
                        case "Phone number":
                        case "Email":
                          setContinueToggle(3);
                          break;
                        case "Time":
                          setContinueToggle(2);
                          break;
                        default:
                          setContinueToggle(0);
                      }
                    }}
                  >
                    edit
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-5">
        <button
          className="text-white bg-gray-800 border border-gray-600 focus:outline-none hover:bg-gray-700 focus:ring-4 focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-white dark:text-gray-800 dark:border-gray-300 dark:hover:bg-gray-100 dark:hover:border-gray-300 dark:focus:ring-gray-300"
          onClick={async () => {
            const response = await postReservation(bookingInfo);
            console.log(response);
            await handleBookingInfoChange("pin", response);
            setContinueToggle(5);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
