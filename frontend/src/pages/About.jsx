import pictures from "../pictures/Pictures_URLS";

export default function About() {
  return (
    <>
      <div className="h-screen pb-20 flex justify-center items-center">
        <h2 className="text-5xl sm:text-7xl md:text-9xl">Our Story</h2>
      </div>
      <div className="my-10 mx-4 pb-20 md:mx-24 gap-y-10 md:gap-y-48 md:space-y-0 lg:mx-48 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="max-w-80 place-self-center">
          <p className="text-xl md:text-2xl lg:text-3xl text-wrap">
            At Meo Romano, we believe in celebrating the essence of Italian
            cuisine through a blend of contemporary techniques and traditional
            flavors.
          </p>
        </div>
        <div className="mb-32 overflow-hidden place-self-center">
          <img
            src={pictures.about[0].url}
            className="w-80 md:w-9/12  h-auto custom-radius"
            alt={pictures.about[0].url}
          />
        </div>
        <div className="max-w-80 place-self-center md:order-last ">
          <p className="text-xl md:text-2xl lg:text-3xl text-wrap">
            From intimate dinners to special celebrations, Meo Romano is more
            than just a meal; it’s a journey through the art of fine dining.
          </p>
        </div>
        <div className="overflow-hidden place-self-center ">
          <img
            src={pictures.about[1].url}
            className="w-80 md:w-9/12  h-auto custom-radius-2"
            alt={pictures.about[1].alt}
          />
        </div>
      </div>
    </>
  );
}
