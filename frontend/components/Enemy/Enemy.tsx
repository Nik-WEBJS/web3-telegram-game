import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Object3D } from "three";
import { useGLTF } from "@react-three/drei";

const ENEMY_SPEED = 0.02; // Скорость врагов

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
  const [isInRange, setIsInRange] = useState(false);
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

    const newPosition = enemyPos
      .clone()
      .add(direction.multiplyScalar(ENEMY_SPEED));

    // Проверка на столкновение с другими врагами
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

    // Проверка на столкновение с игроком
    const distance = enemyPos.distanceTo(playerPos);
    if (distance < 0.5) {
      if (!isInRange) setIsInRange(true);

      const currentTime = state.clock.getElapsedTime();
      if (currentTime - lastHitTimeRef.current >= 1) {
        setHp((prevHp) => Math.max(prevHp - 3, 0));
        lastHitTimeRef.current = currentTime;
      }
    } else {
      if (isInRange) setIsInRange(false);
    }
  });
  return <primitive object={clonedScene} ref={enemyRef} />;
};

export default Enemy;
