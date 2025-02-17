import Web3Provider from "../utils/Web3Provider";
import Game from "../components/Game/Game";
import UI from "../utils/UI";
import HPBarUI from "../utils/HPBarUI";
import { useState } from "react";

const Home = () => {
  const [hp, setHp] = useState(100);

  return (
    <Web3Provider>
      <Game hp={hp} setHp={setHp}/>
      <HPBarUI hp={hp}/>
      <UI />
    </Web3Provider>
  );
};

export default Home;
