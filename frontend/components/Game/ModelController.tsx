import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SPEED = 0.05;

const ModelController = ({
  modelRef,
  onMove,
}: {
  modelRef: React.RefObject<THREE.Object3D>;
  onMove: (dir: THREE.Vector3) => void;
}) => {
  const movement = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // Обработчики клавиш
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case "KeyW":
        movement.current.forward = true;
        break;
      case "KeyS":
        movement.current.backward = true;
        break;
      case "KeyA":
        movement.current.left = true;
        break;
      case "KeyD":
        movement.current.right = true;
        break;
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
      case "KeyW":
        movement.current.forward = false;
        break;
      case "KeyS":
        movement.current.backward = false;
        break;
      case "KeyA":
        movement.current.left = false;
        break;
      case "KeyD":
        movement.current.right = false;
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      const direction = new THREE.Vector3();

      if (movement.current.forward) direction.z -= SPEED;
      if (movement.current.backward) direction.z += SPEED;
      if (movement.current.left) direction.x -= SPEED;
      if (movement.current.right) direction.x += SPEED;

      if (direction.lengthSq() > 0) {
        direction.normalize().multiplyScalar(SPEED);
        modelRef.current.position.add(direction);

        // Поворот модели в сторону движения
        const angle = Math.atan2(-direction.x, -direction.z);
        modelRef.current.rotation.y = angle;
      }
      onMove(direction);
    }
  });

  return null;
};

export default ModelController;
