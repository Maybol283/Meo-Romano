import "./homepage.css";

export default function Homepage() {
  return (
    <>
      <div className="background-img"></div>
      <div className="h-dvh flex flex-col md:flex-row justify-around md:h-64">
        <div className="text-black flex flex-col justify-around">
          <h2 className="text-2xl">Contact</h2>
          <p>Contact@MeoRomano.co.uk</p>
          <div>
            <p>123 Avenue</p>
            <p>Somewhere Nice</p>
          </div>
        </div>
        <div className="text-4xl flex md:items-center self-center">
          <a key="Reservation" href="">
            Reservation
          </a>
        </div>
        <div className="text-black flex flex-col justify-evenly">
          <h2 className="text-2xl">Hours</h2>
          <p>Mon - Thursday 5pm-11pm</p>
          <p>Friday - Sunday 2pm-10pm</p>
        </div>
      </div>
    </>
  );
}
