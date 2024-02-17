import React from "react";
import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Reservations from "./pages/Reservations";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import UpdateManager from "./pages/UpdateManager.jsx";
import BookingManager from "./pages/BookingManager.jsx";
import SignIn from "./pages/SignIn.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/update-manager" element={<UpdateManager />} />
        <Route path="/booking-manager" element={<BookingManager />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
