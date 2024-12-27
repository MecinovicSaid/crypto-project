import React from "react";
import "./index.css";
import Navbar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import CoinProvider from "./context/CoinContext";

function App() {
  return (
    <div className="app">
      <CoinProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coin/:coinId" element={<Coin />} />
          </Routes>
        </Router>
      </CoinProvider>
    </div>
  );
}

export default App;
