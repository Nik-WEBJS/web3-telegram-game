import Web3Provider from "../components/Web3Provider";
import Game from "../components/Game";
import UI from "../components/UI";

const Home = () => {
  return (
    <Web3Provider>
      <Game />
      <UI />
    </Web3Provider>
  );
};

export default Home;