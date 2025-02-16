import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

const CameraController = ({
  target,
}: {
  target: React.RefObject<THREE.Object3D>;
}) => {
  const cameraRef = useRef<THREE.OrthographicCamera>(null);

  useFrame(() => {
    if (target.current && cameraRef.current) {
      const modelPos = target.current.position;
      cameraRef.current.position.set(
        modelPos.x,
        modelPos.y + 8,
        modelPos.z + 5
      );
      cameraRef.current.lookAt(modelPos.x, modelPos.y, modelPos.z);
    }
  });

  return (
    <OrthographicCamera
      makeDefault
      ref={cameraRef}
      position={[0, 0, 10]}
      zoom={50}
    />
  );
};

export default CameraController;
