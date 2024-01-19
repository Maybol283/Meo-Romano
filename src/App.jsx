import React from "react";
import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Menu from "./pages/Menu";
import Header from "./pages/header";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about us" element={<AboutUs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
