import menu from "../assets/menuitems";

export default function Menu() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:pb-32 pb-10 justify-around gap-y-20">
      {Object.keys(menu).map((section, index, sections) => (
        <div
          key={section}
          className={`pt-5 ${
            index === sections.length - 1 ? "lg:col-span-2 text-center" : ""
          }`}
        >
          <h2 className="text-bold text-5xl space py-5">{section}</h2>
          <div className="space-y-5">
            {menu[section].map((item, itemIndex) => (
              <div key={itemIndex} className="flex flex-col gap-2">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>£{item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
