import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Background from "./Background";
import CameraController from "./CameraController";
import Model from "./Model";
import ModelController from "./ModelController";
import ResizeHandler from "./ResizeHandler";

const Game = () => {
  const [isClient, setIsClient] = useState(false);
  const [movement, setMovement] = useState(new THREE.Vector3());
  const modelRef = useRef<THREE.Object3D>(new THREE.Object3D());

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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
      <Background movement={movement} playerPos={modelRef.current.position} />
    </Canvas>
  );
};

export default Game;
