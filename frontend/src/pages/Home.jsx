import { useState, useEffect } from "react";
import "./Home.css";
import Testimonials from "./Testimonials";
import pictures from "../pictures/Pictures_URLS";

export default function Home() {
  //inital transform value calculated based on innerWidth for responsiveness
  const initialTransformValue =
    window.innerWidth > 800 ? 400 : window.innerWidth > 600 ? 300 : 175;
  const [transformValue, setTransformValue] = useState(initialTransformValue);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    let scrollPercent = scrollPosition / totalScroll;
    let dampeningFactor = 0.5; // Adjust this value to control the speed

    let xPos = -initialTransformValue + scrollPercent * 600 * dampeningFactor;

    setTransformValue(xPos);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="background-white h-screen pb-20 gap-y-5 flex flex-col justify-center items-center">
        <h2 className="text-5xl sm:text-7xl md:text-9xl">Meo Romano</h2>
        <p className="text-xl">more than just a meal</p>
      </div>
      <div className="h-2/6 md:h-3/6 lg:h-4/6 overflow-hidden">
        <div
          className="w-[150%]"
          style={{
            transform: `translateX(${transformValue}px)`,
          }}
        >
          <img
            className="background-img overflow-hidden"
            src={pictures.home[0].url}
            alt={pictures.home[0].alt} // Adjust width and objectFit here
          />
        </div>
      </div>
      <Testimonials></Testimonials>
    </>
  );
}
