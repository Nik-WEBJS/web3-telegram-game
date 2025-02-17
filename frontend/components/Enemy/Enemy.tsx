import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Object3D } from "three";
import { useGLTF } from "@react-three/drei";

const ENEMY_SPEED = 0.002; // Скорость врагов

const Enemy = ({
  playerRef,
  position,
  setHp,
}: {
  playerRef: React.RefObject<Object3D>;
  position: Vector3;
  setHp: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { scene } = useGLTF("/models/enemy/scene.gltf");
  const enemyRef = useRef<Object3D>(new Object3D());
  const [isInRange, setIsInRange] = useState(false);
  const lastHitTimeRef = useRef<number>(0);

  useEffect(() => {
    if (enemyRef.current) {
      enemyRef.current.position.copy(position);
    }
  }, [position]);

  useFrame((state) => {
    if (!playerRef.current || !enemyRef.current) return;

    const enemyPos = enemyRef.current.position;
    const playerPos = playerRef.current.position;
    const direction = new Vector3().subVectors(playerPos, enemyPos).normalize();
    enemyPos.add(direction.multiplyScalar(ENEMY_SPEED));

    // Проверка на столкновение (расстояние между врагом и игроком)
    const distance = enemyPos.distanceTo(playerPos);
    if (distance < 1) {
      if (!isInRange) {
        setIsInRange(true);
      }

      const currentTime = state.clock.getElapsedTime(); 
      if (currentTime - lastHitTimeRef.current >= 3) {
        setHp((prevHp) => Math.max(prevHp - 1, 0)); 
        lastHitTimeRef.current = currentTime;
      }
    } else {
      if (isInRange) {
        setIsInRange(false);
      }
    }
  });

  return <primitive object={scene} ref={enemyRef} />;
};

export default Enemy;
