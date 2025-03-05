import React from "react";
import * as THREE from "three";
import Bullet from "./Bullet";

interface BulletsRendererProps {
  bullets: { id: number; pos: THREE.Vector3; dir: THREE.Vector3 }[];
  removeBullet: (id: number) => void;
}

const BulletsRenderer: React.FC<BulletsRendererProps> = ({
  bullets,
  removeBullet,
}) => {
  return (
    <>
      {bullets.map((bullet) => (
        <Bullet
          key={bullet.id}
          position={bullet.pos}
          direction={bullet.dir}
          onRemove={() => removeBullet(bullet.id)}
        />
      ))}
    </>
  );
};

export default BulletsRenderer;
