import { useState } from "react";

const UI = () => {
  const [balance, setBalance] = useState(0);

  return (
    <div style={{ position: "absolute", top: 0, right: 0, padding: 10 }}>
      <p>Баланс: {balance} ETH</p>
      <button onClick={() => alert("Войти в игру")}>Войти</button>
    </div>
  );
};

export default UI;
