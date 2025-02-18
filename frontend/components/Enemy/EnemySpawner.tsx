import { useEffect, useRef, useState } from "react";
import Enemy from "./Enemy";
import * as THREE from "three";
import { Object3D, Vector3 } from "three";

const INITIAL_ENEMIES_COUNT = 10;
const SPAWN_RADIUS = 20;
const MIN_DISTANCE_BETWEEN_ENEMIES = 5;

const EnemySpawner = ({
  playerRef,
  enemyCount = INITIAL_ENEMIES_COUNT,
  setHp,
}: {
  playerRef: React.RefObject<THREE.Object3D>;
  enemyCount?: number;
  setHp: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [enemyPositions, setEnemyPositions] = useState<Vector3[]>([]);
  const collidersRef = useRef<Object3D[]>([]);

  useEffect(() => {
    if (!playerRef.current) return;

    const newEnemies: Vector3[] = [];
    const playerPos = playerRef.current.position;

    for (let i = 0; i < enemyCount; i++) {
      let position: Vector3;
      let isTooClose: boolean;

      do {
        const angle = Math.random() * Math.PI * 2;
        position = new THREE.Vector3(
          playerPos.x + Math.cos(angle) * SPAWN_RADIUS,
          0,
          playerPos.z + Math.sin(angle) * SPAWN_RADIUS
        );

        // Проверяем, не слишком ли близко к другим врагам
        isTooClose = newEnemies.some(
          (enemyPos) =>
            enemyPos.distanceTo(position) < MIN_DISTANCE_BETWEEN_ENEMIES
        );
      } while (isTooClose); // Если слишком близко, пробуем заново

      newEnemies.push(position);
    }

    setEnemyPositions(newEnemies);
  }, [enemyCount, playerRef]);

  return (
    <>
      {enemyPositions.map((position, index) => (
        <Enemy
          key={`enemy-${index}`}
          playerRef={playerRef}
          position={position}
          setHp={setHp}
          collidersRef={collidersRef}
        />
      ))}
    </>
  );
};

export default EnemySpawner;
