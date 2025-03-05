import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Bullet = ({
  position,
  direction,
  onRemove,
  enemies, // Передаём массив врагов
  onHitEnemy, // Функция для отнимания HP
}: {
  position: THREE.Vector3;
  direction: THREE.Vector3;
  onRemove: () => void;
  enemies: { id: number; position: THREE.Vector3; hp: number }[];
  onHitEnemy: (enemyId: number, damage: number) => void;
}) => {
  const bulletRef = useRef<THREE.Mesh>(null);
  const speed = 0.5;
  const [bulletPos, setBulletPos] = useState(position.clone());
  const distanceTraveled = useRef(0);

  useFrame(() => {
    if (!bulletRef.current) return;

    // Двигаем пулю
    bulletPos.add(direction.clone().multiplyScalar(speed));
    distanceTraveled.current += speed;
    bulletRef.current.position.copy(bulletPos);

    // Проверяем столкновение с врагами
    for (const enemy of enemies) {
      if (bulletPos.distanceTo(enemy.position) < 0.5) {
        onHitEnemy(enemy.id, 1); // Отнимаем 1 HP у врага
        onRemove(); // Удаляем пулю
        return;
      }
    }

    // Удаляем пулю, если она прошла 50 единиц
    if (distanceTraveled.current >= 50) {
      onRemove();
    }
  });

  return (
    <mesh ref={bulletRef} position={bulletPos}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};

export default Bullet;

  