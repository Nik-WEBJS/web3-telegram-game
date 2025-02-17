import { SetStateAction, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Background from "./Background";
import CameraController from "../Player/CameraController";
import Model from "../Player/Model";
import ModelController from "../Player/ModelController";
import ResizeHandler from "./ResizeHandler";
import HPBarUI from "../../utils/HPBarUI";
import EnemySpawner from "../Enemy/EnemySpawner";

const Game = ({ hp, setHp }: any) => {
  const [isClient, setIsClient] = useState(false);
  const [movement, setMovement] = useState(new THREE.Vector3());
  const modelRef = useRef<THREE.Object3D>(new THREE.Object3D());

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  modelRef.current.rotation.y = Math.PI;
  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <ResizeHandler />
      <CameraController target={modelRef} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Model ref={modelRef} position={[0, 0, 0]} />
      <ModelController
        modelRef={modelRef}
        onMove={(dir) => setMovement(dir.clone())}
      />
      <EnemySpawner playerRef={modelRef} setHp={setHp}/>
      <Background movement={movement} playerPos={modelRef.current.position} />
    </Canvas>
  );
};

export default Game;
