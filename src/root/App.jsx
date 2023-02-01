import React from "react";
import Footer from "../components/Footer";
import Providers from "./Providers";
import Routes from "./Routes";
import "../App.css";

function App() {
  return (
    <Providers>
      <Routes />
      <Footer />
    </Providers>
  );
}

export default App;
