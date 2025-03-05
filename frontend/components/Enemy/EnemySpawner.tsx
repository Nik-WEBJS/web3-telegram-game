import { useEffect, useRef, useState } from "react";
import Enemy from "./Enemy";
import * as THREE from "three";
import { Object3D, Vector3 } from "three";

const INITIAL_ENEMIES_COUNT = 10;
const SPAWN_RADIUS = 20;
const MIN_DISTANCE_BETWEEN_ENEMIES = 5;

const EnemySpawner = ({
  playerRef,
  enemies,
  setHp,
  collidersRef,
  onHitEnemy,
}: {
  playerRef: React.RefObject<THREE.Object3D>;
  enemies: { id: number; position: THREE.Vector3; hp: number }[];
  setHp: React.Dispatch<React.SetStateAction<number>>;
  collidersRef: React.RefObject<Object3D[]>;
  onHitEnemy: (enemyId: number, damage: number) => void;
}) => {
  return (
    <>
      {enemies.map((enemy) => (
        <Enemy
          key={`enemy-${enemy.id}`}
          id={enemy.id}
          playerRef={playerRef}
          position={enemy.position}
          setHp={setHp}
          collidersRef={collidersRef}
          onHitEnemy={onHitEnemy}
          hp={enemy.hp}
        />
      ))}
    </>
  );
};

export default EnemySpawner;
