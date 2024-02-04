export default function AvailabilityCard({ Availability }) {
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-200">
        {Availability.map((slots) => (
          <li key={slots.id} className="py-4">
            {slots}
            <button className="px-5">Choose</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
