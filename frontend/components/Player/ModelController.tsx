import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Bullet from "./Bullet";

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

  const cursorPos = useRef(new THREE.Vector2(0, 0));
  const raycaster = useRef(new THREE.Raycaster());
  const [bullets, setBullets] = useState<{ id: number; pos: THREE.Vector3; dir: THREE.Vector3 }[]>([]);
  const bulletId = useRef(0);
  const hoverTarget = useRef(new THREE.Vector3());

  const SPEED = 0.1;

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
      case "Space":
        shootBullet();
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

  const handleMouseMove = (event: MouseEvent) => {
    cursorPos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    cursorPos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  const shootBullet = () => {
    if (!modelRef.current) return;

    const bulletStartPos = modelRef.current.position.clone();
    
    const bulletDir = hoverTarget.current.clone().sub(bulletStartPos).normalize();

    setBullets((prev) => [...prev, { id: bulletId.current++, pos: bulletStartPos, dir: bulletDir }]);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(({ camera }) => {
    if (modelRef.current) {
      const direction = new THREE.Vector3();
      if (movement.current.forward) direction.z -= 1;
      if (movement.current.backward) direction.z += 1;
      if (movement.current.left) direction.x -= 1;
      if (movement.current.right) direction.x += 1;

      if (direction.lengthSq() > 0) {
        direction.normalize().multiplyScalar(SPEED);
        modelRef.current.position.add(direction);
      }

      raycaster.current.setFromCamera(cursorPos.current, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      raycaster.current.ray.intersectPlane(plane, hoverTarget.current);

      const modelPosition = modelRef.current.position;
      const lookAtVector = hoverTarget.current.clone().sub(modelPosition);
      const angle = Math.atan2(lookAtVector.x, lookAtVector.z);
      modelRef.current.rotation.y = angle;

      onMove(direction);
    }
  });

  return (
    <>
      {bullets.map((bullet) => (
        <Bullet
          key={bullet.id}
          position={bullet.pos}
          direction={bullet.dir}
          onRemove={() => setBullets((prev) => prev.filter((b) => b.id !== bullet.id))}
        />
      ))}
      <mesh position={hoverTarget.current}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  );
};

export default ModelController;
