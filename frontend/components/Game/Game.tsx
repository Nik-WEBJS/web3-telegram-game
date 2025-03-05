import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Background from "./Background";
import CameraController from "../Player/CameraController";
import Model from "../Player/Model";
import ModelController from "../Player/ModelController";
import ResizeHandler from "./ResizeHandler";
import EnemySpawner from "../Enemy/EnemySpawner";
import { useEnemies } from "../../hooks/useEnemies";
import ShootingController from "../Bullet/ShootingController";

const Game = ({ hp, setHp }: any) => {
  const [isClient, setIsClient] = useState(false);
  const modelRef = useRef<THREE.Object3D>(new THREE.Object3D());
  const hoverTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const [movement, setMovement] = useState(new THREE.Vector3());

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { enemies, damageEnemy, collidersRef } = useEnemies(modelRef);

  const handleHitEnemy = (enemyId: number, damage: number) => {
    damageEnemy(enemyId, damage); // Уменьшаем HP врага
  };

  if (!isClient) return null;

  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <ResizeHandler />
      <CameraController target={modelRef} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Model ref={modelRef} position={[0, 0, 0]} />
      <ModelController
        modelRef={modelRef}
        hoverTarget={hoverTarget}
        onMove={(dir) => setMovement(dir.clone())}
      />
      <ShootingController
        modelRef={modelRef}
        hoverTarget={hoverTarget}
        enemies={enemies}
        onHitEnemy={handleHitEnemy}
      />
      <EnemySpawner
        playerRef={modelRef}
        setHp={setHp}
        onHitEnemy={handleHitEnemy}
        enemies={enemies}
        collidersRef={collidersRef}
      />
      <Background
        movement={new THREE.Vector3()}
        playerPos={modelRef.current.position}
      />
    </Canvas>
  );
};

export default Game;
