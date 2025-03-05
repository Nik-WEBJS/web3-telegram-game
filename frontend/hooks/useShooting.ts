import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const useShooting = (
  modelRef: React.RefObject<THREE.Object3D>,
  hoverTarget: React.RefObject<THREE.Vector3>
) => {
  const [bullets, setBullets] = useState<
    { id: number; pos: THREE.Vector3; dir: THREE.Vector3 }[]
  >([]);
  const bulletId = useRef(0);

  const shootBullet = () => {
    if (!modelRef.current) return;

    const bulletStartPos = modelRef.current.position.clone();
    const bulletDir = hoverTarget.current
      .clone()
      .sub(bulletStartPos)
      .normalize();

    setBullets((prev) => [
      ...prev,
      { id: bulletId.current++, pos: bulletStartPos, dir: bulletDir },
    ]);
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (event.button === 0) {
      shootBullet();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return { bullets, setBullets, shootBullet };
};
