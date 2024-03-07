import { useSpring, animated } from "@react-spring/web";
import pictures from "../pictures/Pictures_URLS";
import { useState, useEffect } from "react";

export default function Gallery() {
  const [currentGallery, setCurrentGallery] = useState(pictures.gallery);

  useEffect(() => {
    // A function to check the viewport width and update the gallery
    const updateGallery = () => {
      const isMobile = window.innerWidth <= 768; // Define your mobile breakpoint
      setCurrentGallery(isMobile ? pictures.gallery_mobile : pictures.gallery);
    };

    // Call the function on component mount
    updateGallery();

    // Add a resize event listener to update the gallery on window resize
    window.addEventListener("resize", updateGallery);

    // Clean up the event listener
    return () => window.removeEventListener("resize", updateGallery);
  }, []);
  return (
    <>
      <div
        aria-label="Gallery Images"
        className="flex flex-wrap place-content-center md:p-5 gap-2"
      >
        {currentGallery.map((item, index) => {
          const props = useSpring({
            from: { opacity: 0 },
            to: { opacity: 1 },
            delay: index * 150,
          });
          return (
            <div key={index}>
              <animated.img
                style={props}
                src={item.url}
                className="h-[200px] md:h-[300px]"
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
