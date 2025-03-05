import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

const INITIAL_ENEMIES_COUNT = 10;
const SPAWN_RADIUS = 20;
const MIN_DISTANCE_BETWEEN_ENEMIES = 5;
const ENEMY_MAX_HP = 10;

interface EnemyData {
  id: number;
  position: THREE.Vector3;
  hp: number;
}

export const useEnemies = (playerRef: React.RefObject<THREE.Object3D>) => {
  const [enemies, setEnemies] = useState<EnemyData[]>([]);
  const collidersRef = useRef<THREE.Object3D[]>([]);

  // Спавн врагов
  useEffect(() => {
    if (!playerRef.current) return;

    const newEnemies: EnemyData[] = [];
    const playerPos = playerRef.current.position;

    for (let i = 0; i < INITIAL_ENEMIES_COUNT; i++) {
      let position: THREE.Vector3;
      let isTooClose: boolean;

      do {
        const angle = Math.random() * Math.PI * 2;
        position = new THREE.Vector3(
          playerPos.x + Math.cos(angle) * SPAWN_RADIUS,
          0,
          playerPos.z + Math.sin(angle) * SPAWN_RADIUS
        );

        isTooClose = newEnemies.some(
          (enemy) =>
            enemy.position.distanceTo(position) < MIN_DISTANCE_BETWEEN_ENEMIES
        );
      } while (isTooClose);

      newEnemies.push({ id: i, position, hp: ENEMY_MAX_HP });
    }

    setEnemies(newEnemies);
  }, [playerRef]);

  // Уменьшение HP врага
  const damageEnemy = (enemyId: number, damage: number) => {
    setEnemies((prev) =>
      prev.map((enemy) =>
        enemy.id === enemyId
          ? { ...enemy, hp: Math.max(0, enemy.hp - damage) }
          : enemy
      )
    );
  };

  // Удаление мёртвых врагов
  useEffect(() => {
    setEnemies((prev) => prev.filter((enemy) => enemy.hp > 0));
  }, [enemies]);

  return { enemies, setEnemies, damageEnemy, collidersRef };
};
