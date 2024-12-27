import React, { createContext, useState, useEffect } from "react";
import './CoinContext.css'
export const CoinContext = createContext();

const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch("https://coinranking1.p.rapidapi.com/coins", {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "92553d994cmshf1a2382528de0d1p178498jsn2b5bc27d488a",
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com"
          }
        });
        const data = await response.json();
        // Postavljanje samo prvih 10 coina
        setCoins(data.data.coins.slice(0, 15));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coins:", error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return (
    <CoinContext.Provider value={{ coins, loading }}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinProvider;

