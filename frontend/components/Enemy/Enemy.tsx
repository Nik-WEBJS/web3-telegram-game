import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Object3D } from "three";
import { useGLTF } from "@react-three/drei";
import { Html } from "@react-three/drei";

const ENEMY_SPEED = 0.02;
const ENEMY_MAX_HP = 10;

const Enemy = ({
  playerRef,
  position,
  setHp,
  collidersRef,
}: {
  playerRef: React.RefObject<Object3D>;
  position: Vector3;
  setHp: React.Dispatch<React.SetStateAction<number>>;
  collidersRef: React.RefObject<Object3D[]>;
}) => {
  const { scene } = useGLTF("/assets/enemy/scene.gltf");
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const enemyRef = useRef<Object3D>(new Object3D());

  const [enemyHp, setEnemyHp] = useState(ENEMY_MAX_HP);
  const lastHitTimeRef = useRef<number>(0);

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
    const direction = new Vector3().subVectors(playerPos, enemyPos).normalize();

    const newPosition = enemyPos.clone().add(direction.multiplyScalar(ENEMY_SPEED));

    let canMove = true;
    for (const other of collidersRef.current) {
      if (
        other !== enemyRef.current &&
        newPosition.distanceTo(other.position) < 0.5
      ) {
        canMove = false;
        break;
      }
    }

    if (canMove) {
      enemyPos.copy(newPosition);
    }

    const distance = enemyPos.distanceTo(playerPos);
    if (distance < 0.5) {
      const currentTime = state.clock.getElapsedTime();
      if (currentTime - lastHitTimeRef.current >= 1) {
        setHp((prevHp) => Math.max(prevHp - 3, 0));
        lastHitTimeRef.current = currentTime;
      }
    }
  });

  useEffect(() => {
    if (enemyHp <= 0) {
      collidersRef.current = collidersRef.current.filter(
        (obj) => obj !== enemyRef.current
      );
    }
  }, [enemyHp]);

  return (
    <>
      {enemyHp > 0 && (
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
                  width: `${(enemyHp / ENEMY_MAX_HP) * 100}%`,
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
