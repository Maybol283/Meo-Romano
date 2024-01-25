import { useSpring, animated } from "@react-spring/web";

export default function Gallery() {
  const galleryItems = [
    { url: "src/pictures/Drink_1.jpg", alt: "Lemon Cocktail" },
    { url: "src/pictures/Food_1.jpg", alt: "Steak Grill" },
    { url: "src/pictures/Food_2.jpg", alt: "Pizza Slice" },
    { url: "src/pictures/Food_3.jpg", alt: "Spaghetti" },
    { url: "src/pictures/Drink_2.jpg", alt: "Mimosa" },
    { url: "src/pictures/Food_4.jpg", alt: "2 Meals" },
    { url: "src/pictures/Misc_1.jpg", alt: "Condiments" },
    { url: "src/pictures/Food_5.jpg", alt: "Pizza Oven" },
    { url: "src/pictures/Food_6.jpg", alt: "Carbonara" },
    { url: "src/pictures/Food_8.jpg", alt: "Oysters" },
    { url: "src/pictures/Drink_3.jpg", alt: "Wine Rack" },
    { url: "src/pictures/Food_9.jpg", alt: "Anti-Pasti" },
    { url: "src/pictures/Drink_4.jpg", alt: "Cocktail" },
    { url: "src/pictures/Food_7.jpg", alt: "Making Spaghetti" },
    { url: "src/pictures/Food_11.jpg", alt: "Making Spaghetti" },
    { url: "src/pictures/Drink_5.jpg", alt: "Making Spaghetti" },
  ];

  return (
    <>
      <div className="flex flex-wrap place-content-center md:p-5 gap-2">
        {galleryItems.map((item, index) => {
          const props = useSpring({
            from: { opacity: 0 },
            to: { opacity: 1 },
            delay: index * 150,
          });
          return (
            <div key={index} className="h-[200px] md:h-[300px]">
              <animated.img
                style={props}
                src={item.url}
                className="h-full object-fit"
                alt={item.alt}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
