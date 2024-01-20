import { useState, useEffect } from "react";
import "./Home.css";
import Testimonials from "./Testimonials";

export default function Home() {
  const initialTransformValue = window.innerWidth > 800 ? 600 : 300;
  const [transformValue, setTransformValue] = useState(initialTransformValue);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    let scrollPercent = scrollPosition / totalScroll;
    let xPos = -initialTransformValue + scrollPercent * 600;
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
      <div className="h-2/6 md:h-2/4 overflow-hidden">
        <div
          className="w-[150%]"
          style={{
            transform: `translateX(${transformValue}px)`,
          }}
        >
          <img
            className="background-img "
            src="/src/pictures/ClinkGlass_1.png" // Adjust width and objectFit here
          />
        </div>
      </div>
      <Testimonials></Testimonials>
    </>
  );
}
