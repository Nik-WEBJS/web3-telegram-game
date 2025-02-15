import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";


const Game = () => {
  return (
    <Canvas>
      {/* 3D-модель или объекты */}
      <OrbitControls />
    </Canvas>
  );
};

export default Game;
