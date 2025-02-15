import { useState } from "react";

const UI = () => {
  const [balance, setBalance] = useState(0);

  return (
    <div className="absolute top-0 left-0 p-4">
      <p>Баланс: {balance} ETH</p>
      <button onClick={() => alert("Войти в игру")}>Войти</button>
    </div>
  );
};

export default UI;
