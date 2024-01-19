import { useState, useEffect } from "react";
import "./Home.css";
import Testimonials from "./Testimonials";

export default function Home() {
  const [backgroundPosition, setBackgroundPosition] = useState("left");

  const handleScroll = () => {
    console.log("Scroll handler called");
    const scrollPosition = window.scrollY;
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    console.log("Y position " + scrollPosition);
    let scrollPercent = scrollPosition / totalScroll;
    let xPos = -200 + scrollPercent * 200;
    setBackgroundPosition(`${xPos}px center`);
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
      <div
        className="background-img h-3/6 md:h-4/6"
        style={{ backgroundPosition }}
      ></div>
      <Testimonials></Testimonials>
    </>
  );
}
