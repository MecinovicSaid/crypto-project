import React, { useContext, useState, useEffect } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";

const Home = () => {
  const { coins, loading } = useContext(CoinContext); // Podaci iz konteksta
  const [input, setInput] = useState(""); // Stanje za unos u pretrazi
  const [filteredCoins, setFilteredCoins] = useState([]); // Stanje za filtrirane kriptovalute
  const [initialCoins, setInitialCoins] = useState([]); // Stanje za prvih 10 kriptovaluta

  // Postavljanje prvih 10 kriptovaluta prilikom učitavanja stranice
  useEffect(() => {
    if (coins.length > 0) {
      setInitialCoins(coins.slice(0, 10)); // Uzmi prvih 10 kriptovaluta
      setFilteredCoins(coins.slice(0, 10)); // Prikaz istih kao pocetne
    }
  }, [coins]);

  const inputHandler = (event) => {
    setInput(event.target.value); // Azuriranje unosa
  };

  const searchHandler = (event) => {
    event.preventDefault(); // Spreci ponovno ucitavanje stranice

    if (input.trim() === "") {
      // Ako je unos prazan, vrati pocetak
      setFilteredCoins(initialCoins);
      return;
    }

    // Filtriraj  na osnovu unosa
    const results = coins.filter((coin) =>
      coin.name.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredCoins(results); // Ažuriraj filtrirane rezultate
  };

  // Prikaz poruke dok se učitavaju podaci
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
        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            value={input}
            type="text"
            placeholder="Search crypto.."
            required
          />
          <button type="submit">Search</button>
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
            <div className="Crypto-layout" key={coin.uuid}>
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
            </div>
          ))
        ) : (
          <p>No coins match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
