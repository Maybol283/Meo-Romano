import { useSpring, animated } from "@react-spring/web";
import pictures from "../pictures/Pictures_URLS";

export default function Gallery() {
  return (
    <>
      <div className="flex flex-wrap place-content-center md:p-5 gap-2">
        {pictures.gallery.map((item, index) => {
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
