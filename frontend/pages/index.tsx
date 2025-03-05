import Web3Provider from "../utils/Web3Provider";
import Game from "../components/Game/Game";
import Balance from "../components/UI/Balance";
import { useState } from "react";
import HPBarUI from "../components/UI/HPBarUI";

const Home = () => {
  const [hp, setHp] = useState(100);

  return (
    <Web3Provider>
      <Game hp={hp} setHp={setHp} />
      <HPBarUI hp={hp} />
      <Balance />
    </Web3Provider>
  );
};

export default Home;
