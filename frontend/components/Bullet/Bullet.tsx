import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Bullet = ({
    position,
    direction,
    onRemove,
  }: {
    position: THREE.Vector3;
    direction: THREE.Vector3;
    onRemove: () => void;
  }) => {
    const bulletRef = useRef<THREE.Mesh>(null);
    const speed = 0.5;
    const [bulletPos, setBulletPos] = useState(position.clone());
    const distanceTraveled = useRef(0);
  
    useFrame(() => {
      if (bulletRef.current) {
        bulletPos.add(direction.clone().multiplyScalar(speed));
        distanceTraveled.current += speed;
  
        bulletRef.current.position.copy(bulletPos);
  
        if (distanceTraveled.current >= 50) {
          onRemove(); // Удаляем пулю после 50 единиц
        }
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
  