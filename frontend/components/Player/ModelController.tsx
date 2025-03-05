import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMovement } from "../../hooks/useMovement";

const SPEED = 0.1;

const ModelController = ({
  modelRef,
  onMove,
  hoverTarget,
}: {
  modelRef: React.RefObject<THREE.Object3D>;
  onMove: (dir: THREE.Vector3) => void;
  hoverTarget: React.RefObject<THREE.Vector3>;
}) => {
  const movement = useMovement();
  const cursorPos = useRef(new THREE.Vector2(0, 0));
  const raycaster = useRef(new THREE.Raycaster());

  const handleMouseMove = (event: MouseEvent) => {
    cursorPos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    cursorPos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
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
      <mesh position={hoverTarget.current}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  );
};

export default ModelController;
