import { useEffect, useState } from "react";
import { BrowserProvider, formatEther } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const UI = () => {
  const [balance, setBalance] = useState("0");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const updateBalance = async () => {
      if (!window.ethereum) return;
      try {
        const provider = new BrowserProvider(window.ethereum);

        // Проверяем, есть ли уже подключенные аккаунты
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length === 0) {
          // Если нет подключенных аккаунтов, запрашиваем разрешение
          await provider.send("eth_requestAccounts", []);
        }

        const signer = await provider.getSigner();
        const balance = await provider.getBalance(signer.address);
        setBalance(formatEther(balance));
      } catch (error) {
        console.error("Ошибка получения баланса:", error);
      }
    };

    updateBalance();
  }, []);
  return (
    <div style={{ position: "absolute", top: 0, right: 0, padding: 10 }}>
      <p>Баланс: {balance} ETH</p>
      {isClient && !window.ethereum && (
        <button onClick={() => alert("Войти в игру")}>Войти</button>
      )}
    </div>
  );
};

export default UI;
