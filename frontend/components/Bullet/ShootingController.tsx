import { useShooting } from "../../hooks/useShooting";
import BulletsRenderer from "./BulletsRenderer";
import * as THREE from "three";

const ShootingController = ({
  modelRef,
  hoverTarget,
  enemies,
  onHitEnemy,
}: {
  modelRef: React.RefObject<THREE.Object3D>;
  hoverTarget: React.RefObject<THREE.Vector3>;
  enemies: { id: number; position: THREE.Vector3; hp: number }[];
  onHitEnemy: (enemyId: number, damage: number) => void;
}) => {
  const { bullets, setBullets } = useShooting(modelRef, hoverTarget);

  return (
    <BulletsRenderer
      bullets={bullets}
      removeBullet={(id) =>
        setBullets((prev) => prev.filter((b) => b.id !== id))
      }
      enemies={enemies}
      onHitEnemy={onHitEnemy}
    />
  );
};

export default ShootingController;
