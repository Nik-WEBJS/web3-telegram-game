import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Object3D } from "three";
import { useGLTF } from "@react-three/drei";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const ENEMY_SPEED = 0.02;
const ENEMY_MAX_HP = 10;

const Enemy = ({
  playerRef,
  position,
  setHp,
  onHitEnemy,
  id,
  collidersRef,
  hp,
}: {
  playerRef: React.RefObject<Object3D>;
  position: Vector3;
  id: number;
  onHitEnemy: (enemyId: number, damage: number) => void;
  setHp: React.Dispatch<React.SetStateAction<number>>;
  collidersRef: React.RefObject<Object3D[]>;
  hp: number;
}) => {
  const { scene } = useGLTF("/assets/enemy/scene.gltf");
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const enemyRef = useRef<Object3D>(new Object3D());

  useEffect(() => {
    if (enemyRef.current) {
      enemyRef.current.position.copy(position);
      collidersRef.current.push(enemyRef.current);
    }
    return () => {
      collidersRef.current = collidersRef.current.filter(
        (obj) => obj !== enemyRef.current
      );
    };
  }, [position]);

  useFrame((state) => {
    if (!playerRef.current || !enemyRef.current) return;

    const enemyPos = enemyRef.current.position;
    const playerPos = playerRef.current.position;
    const direction = new THREE.Vector3().subVectors(playerPos, enemyPos).normalize();
    const newPosition = enemyPos.clone().add(direction.multiplyScalar(ENEMY_SPEED));

    let canMove = true;
    for (const other of collidersRef.current) {
      if (other !== enemyRef.current && newPosition.distanceTo(other.position) < 0.5) {
        canMove = false;
        break;
      }
    }

    if (canMove) {
      enemyPos.copy(newPosition);
    }
  });

  return (
    <>
      {hp > 0 && (
        <primitive object={clonedScene} ref={enemyRef}>
          {/* HP Бар */}
          <Html position={[0, -1.5, 0]} center>
            <div
              style={{
                width: "50px",
                height: "6px",
                background: "red",
                borderRadius: "3px",
                border: "1px solid black",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${(hp / 10) * 100}%`,
                  height: "100%",
                  background: "lime",
                  borderRadius: "3px",
                }}
              />
            </div>
          </Html>
        </primitive>
      )}
    </>
  );
};

export default Enemy;

