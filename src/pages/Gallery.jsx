export default function Gallery() {
  const galleryItems = [
    { url: "src/pictures/Drink_1.avif", alt: "Lemon Cocktail" },
    { url: "src/pictures/Food_1.avif", alt: "Steak Grill" },
    { url: "src/pictures/Food_2.avif", alt: "Pizza Slice" },
    { url: "src/pictures/Food_3.avif", alt: "Spaghetti" },
    { url: "src/pictures/Drink_2.avif", alt: "Mimosa" },
    { url: "src/pictures/Food_4.avif", alt: "2 Meals" },
    { url: "src/pictures/Misc_1.avif", alt: "Condiments" },
    { url: "src/pictures/Food_5.avif", alt: "Pizza Oven" },
    { url: "src/pictures/Food_6.avif", alt: "Carbonara" },
    { url: "src/pictures/Food_7.avif", alt: "Making Spaghetti" },
    { url: "src/pictures/Food_8.avif", alt: "Oysters" },
    { url: "src/pictures/Drink_3.avif", alt: "Wine Rack" },
    { url: "src/pictures/Food_9.avif", alt: "Anti-Pasti" },
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
