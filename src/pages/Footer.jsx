export default function Footer() {
  return (
    <div className="h-dvh flex flex-col lg:flex-row justify-around lg:h-4/6">
      <div className="text-black flex flex-col justify-around">
        <h2 className="text-2xl lg:text-4xl">Contact</h2>
        <p className="text-xl">Contact@MeoRomano.co.uk</p>
        <div>
          <p>123 Avenue</p>
          <p>Somewhere Nice</p>
        </div>
      </div>
      <div className="text-4xl flex lg:items-center self-center">
        <a key="Reservation" href="">
          Reservation
        </a>
      </div>
      <div className="text-black flex flex-col justify-evenly">
        <h2 className="text-2xl lg:text-4xl">Hours</h2>
        <p>Mon - Thursday 5pm-11pm</p>
        <p>Friday - Sunday 2pm-10pm</p>
      </div>
    </div>
  );
}
