import React from "react";
import Footer from "../components/Footer";
import Providers from "./Providers";
import Routes from "./Routes";

function App() {
  return (
    <Providers>
      <Routes />
      <Footer />
    </Providers>
  );
}

export default App;
