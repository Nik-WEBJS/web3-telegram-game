import React from "react";
import * as THREE from "three";
import Bullet from "./Bullet";

interface BulletsRendererProps {
  bullets: { id: number; pos: THREE.Vector3; dir: THREE.Vector3 }[];
  removeBullet: (id: number) => void;
  enemies: { id: number; position: THREE.Vector3; hp: number }[];
  onHitEnemy: (enemyId: number, damage: number) => void;
}

const BulletsRenderer: React.FC<BulletsRendererProps> = ({
  bullets,
  removeBullet,
  enemies,
  onHitEnemy,
}) => {
  return (
    <>
      {bullets.map((bullet) => (
        <Bullet
          key={bullet.id}
          position={bullet.pos}
          direction={bullet.dir}
          onRemove={() => removeBullet(bullet.id)}
          enemies={enemies}
          onHitEnemy={onHitEnemy}
        />
      ))}
    </>
  );
};

export default BulletsRenderer;
