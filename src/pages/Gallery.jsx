export default function Gallery() {
  const galleryItems = [
    { url: "src/pictures/Drink_1.avif" },
    { url: "src/pictures/Food_1.avif" },
    { url: "src/pictures/Food_2.avif" },
    { url: "src/pictures/Food_3.avif" },
    { url: "src/pictures/Drink_2.avif" },
    { url: "src/pictures/Food_4.avif" },
    { url: "src/pictures/Food_5.avif" },
    { url: "src/pictures/Food_6.avif" },
  ];

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {galleryItems.map((item, index) => (
          <div key={index} className="h-[200px]">
            <img
              src={item.url}
              className="w-full h-full object-cover"
              alt={`Gallery Item ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
