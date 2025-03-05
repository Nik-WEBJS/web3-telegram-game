import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Background from "./Background";
import CameraController from "../Player/CameraController";
import Model from "../Player/Model";
import ModelController from "../Player/ModelController";
import ResizeHandler from "./ResizeHandler";
import EnemySpawner from "../Enemy/EnemySpawner";
import ShootingController from "../Bullet/ShootingController";
import { useEnemies } from "../../hooks/useEnemies";

const Game = ({ hp, setHp }: any) => {
  const [isClient, setIsClient] = useState(false);
  const [movement, setMovement] = useState(new THREE.Vector3());
  const modelRef = useRef<THREE.Object3D>(new THREE.Object3D());
  const hoverTarget = useRef<THREE.Vector3>(new THREE.Vector3());

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleHitEnemy = (enemyId: number) => {
    console.log(`Попадание по врагу с ID: ${enemyId}`);
  };

  const { enemies, damageEnemy, collidersRef } = useEnemies(modelRef);

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
        hoverTarget={hoverTarget}
      />
      <EnemySpawner
        playerRef={modelRef}
        setHp={setHp}
        onHitEnemy={handleHitEnemy}
        enemies={enemies}
        collidersRef={collidersRef}
      />
      <Background movement={movement} playerPos={modelRef.current.position} />
    </Canvas>
  );
};

export default Game;
