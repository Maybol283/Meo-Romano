import { postReservation } from "../tools/queryDatabase";

export default function InfoCardCheck({ bookingInfo, setContinueToggle }) {
  const fieldNames = {
    Date: bookingInfo.date,
    Time: bookingInfo.timeSlot,
    "First name": bookingInfo.firstName,
    "Last name": bookingInfo.lastName,
    "Phone number": bookingInfo.phoneNumber,
    "E-mail": bookingInfo.email,
    "Number of Guests": bookingInfo.partySize,
  };

  return (
    <div>
      <div className="rounded-md bg-white shadow">
        <ul
          role="list"
          className="max-h-[300px] overflow-y-auto divide-y divide-gray-200"
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
                    value={fieldName}
                    onClick={() => {
                      console.log(fieldName);
                      switch (fieldName) {
                        case "First name":
                        case "Last name":
                        case "Phone number":
                        case "E-mail":
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
          onClick={() => {
            postReservation(bookingInfo);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
