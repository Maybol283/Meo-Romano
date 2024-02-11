export default function BookingManager() {
  let fieldNames = {
    time: "10:00 - 20:00",
    date: "22-01-24",
    "number of guests": 0,
  };
  return (
    <div>
      <div className="rounded-md bg-white shadow">
        <h1>Hello {fieldNames.name}</h1>
        <p className="pb-5">you can edit you're booking below</p>
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
                  <button value={fieldName}>edit</button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex pt-5 place-content-around">
        <div>
          <button
            onClick={() => {
              setContinueToggle(5);
              postReservation(bookingInfo);
            }}
          >
            Submit
          </button>
        </div>
        <div>
          <button
            type="button"
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
