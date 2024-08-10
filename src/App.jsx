import React from "react";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import "./App.css";
import Footer from "./pages/Footer";

const App = () => {
  return (
    <>
      <Header />
      <div className="base">
        <HomePage />
      </div>
      <Footer />
    </>
  );
};

export default App;
