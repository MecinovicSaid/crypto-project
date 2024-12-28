import React, { useContext, useState, useEffect } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { coins, loading } = useContext(CoinContext); // Podaci iz konteksta
  const [input, setInput] = useState(""); // Stanje za unos u pretrazi
  const [filteredCoins, setFilteredCoins] = useState([]); // Stanje za filtrirane kriptovalute

  // Ažuriranje filtriranih kriptovaluta na osnovu unosa
  useEffect(() => {
    if (input.trim() === "") {
      // Ako je unos prazan, vrati prvih 15 coina
      setFilteredCoins(coins.slice(0, 15));
    } else {
      // Filtriraj na osnovu unosa
      const results = coins.filter((coin) =>
        coin.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCoins(results);
    }
  }, [input, coins]); 

  const inputHandler = (event) => {
    setInput(event.target.value); // Azuriranje unosa
  };

  // Prikaz poruke dok se ucitavaju podaci
  if (loading) return <p>...Loading</p>;

  return (
    <div className="Home">
      <div className="Hero">
        <h1>BITUNIX</h1>
        <p>
          Welcome to Bitunix. Sign up to start your adventure in the crypto
          world.
        </p>
        {/* Search Bar */}
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={inputHandler}
            value={input}
            type="text"
            placeholder="Search crypto.."
          />
        </form>
      </div>
      <div className="Crypto-table">
        <div className="Crypto-layout header">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24h Change</p>
          <p className="Market-Cap">Market Cap</p>
        </div>
        {/* Prikazivanje filtriranih kriptovaluta */}
        {filteredCoins.length > 0 ? (
          filteredCoins.map((coin, index) => (
            <Link to={`/coin/${coin.uuid}`}  className="Crypto-layout" key={coin.uuid}>
              <p>{index + 1}</p>
              <p>
                <img
                  src={coin.iconUrl}
                  alt={coin.name}
                  style={{ width: "20px", marginRight: "10px" }}
                />
                {coin.name}
              </p>
              <p>${parseFloat(coin.price).toFixed(2)}</p>
              <p
                style={{
                  textAlign: "center",
                  color: coin.change > 0 ? "green" : "red",
                }}
              >
                {coin.change}%
              </p>
              <p className="Market-Cap">
                ${(coin.marketCap / 1e9).toFixed(2)}B
              </p>
            </Link>
          ))
        ) : (
          <p>No coins match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
