import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";

const Coin = () => {
  const { coinId } = useParams(); // Preuzimanje ID-a coina iz URL-a
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(CoinContext);

  // Funkcija za preuzimanje podataka o coinu
  const fetchCoinData = async () => {
    setLoading(true);
    try {
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "92553d994cmshf1a2382528de0d1p178498jsn2b5bc27d488a",
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
        },
      };

      const response = await fetch(
        `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
        options
      );

      const data = await response.json();
      setCoinData(data.data.coin);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coin data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, [coinId, currency]);

  // Prikaz loading poruke dok se podaci učitavaju
  if (loading) return <p>Loading...</p>;

  // Prikaz poruke ako nema podataka o coinu
  if (!coinData) return <p>No data available for this coin.</p>;

  return (
    <div className="coin">
      <div className="coin-header">
        <img src={coinData.iconUrl} alt={coinData.name} className="coin-icon" />
        <h1>{coinData.name} ({coinData.symbol})</h1>
      </div>
      <div className="coin-details">
        <p>Price: ${parseFloat(coinData.price).toFixed(2)}</p>
        <p>Market Cap: ${(coinData.marketCap / 1e9).toFixed(2)}B</p>
        <p>24h Change: <span style={{ color: coinData.change > 0 ? "green" : "red" }}>{coinData.change}%</span></p>
        <p>Rank: {coinData.rank}</p>
        <p>Volume (24h): ${parseFloat(coinData["24hVolume"] || 0).toFixed(2)}</p>
      </div>
      <div className="coin-description">
        <h2>About {coinData.name}</h2>
        <p dangerouslySetInnerHTML={{ __html: coinData.description }} />
      </div>
    </div>
  );
};

export default Coin;
