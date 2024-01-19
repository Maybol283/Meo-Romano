export default function Gallery() {
  const galleryItems = [
    { url: "src/pictures/Drink_1.png", alt: "Lemon Cocktail" },
    { url: "src/pictures/Food_1.png", alt: "Steak Grill" },
    { url: "src/pictures/Food_2.png", alt: "Pizza Slice" },
    { url: "src/pictures/Food_3.png", alt: "Spaghetti" },
    { url: "src/pictures/Drink_2.png", alt: "Mimosa" },
    { url: "src/pictures/Food_4.png", alt: "2 Meals" },
    { url: "src/pictures/Misc_1.png", alt: "Condiments" },
    { url: "src/pictures/Food_5.png", alt: "Pizza Oven" },
    { url: "src/pictures/Food_6.png", alt: "Carbonara" },
    { url: "src/pictures/Food_7.png", alt: "Making Spaghetti" },
    { url: "src/pictures/Food_8.png", alt: "Oysters" },
    { url: "src/pictures/Drink_3.png", alt: "Wine Rack" },
    { url: "src/pictures/Food_9.png", alt: "Anti-Pasti" },
  ];

  return (
    <>
      <div className="flex flex-wrap place-content-center md:p-5 gap-2">
        {galleryItems.map((item, index) => (
          <div key={index} className="h-[200px] md:h-[300px]">
            <img src={item.url} className="h-full object-fit" alt={item.alt} />
          </div>
        ))}
      </div>
    </>
  );
}
