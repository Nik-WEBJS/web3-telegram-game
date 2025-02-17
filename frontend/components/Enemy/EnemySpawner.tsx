import { useEffect, useRef, useState } from "react";
import Enemy from "./Enemy";
import * as THREE from "three";

const INITIAL_ENEMIES_COUNT = 10; // Количество врагов при старте

const EnemySpawner = ({
  playerRef,
  enemyCount = INITIAL_ENEMIES_COUNT,
  setHp
}: {
  playerRef: React.RefObject<THREE.Object3D>;
  enemyCount?: number;
  setHp: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [enemies, setEnemies] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    const spawnedEnemies = [];
    for (let i = 0; i < enemyCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 10;
      const playerPos = playerRef.current?.position || new THREE.Vector3(0, 0, 0);
      const position = new THREE.Vector3(
        playerPos.x + Math.cos(angle) * radius,
        0,
        playerPos.z + Math.sin(angle) * radius
      );

      spawnedEnemies.push(
        <Enemy key={i} playerRef={playerRef} position={position} setHp={setHp} />
      );
    }
    setEnemies(spawnedEnemies);
  }, [enemyCount, playerRef]);

  return <>{enemies}</>;
};

export default EnemySpawner;