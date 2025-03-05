import { useShooting } from "../../hooks/useShooting";
import BulletsRenderer from "./BulletsRenderer";
import * as THREE from "three";

const ShootingController = ({
  modelRef,
  hoverTarget,
}: {
  modelRef: React.RefObject<THREE.Object3D>;
  hoverTarget: React.RefObject<THREE.Vector3>;
}) => {
  const { bullets, setBullets } = useShooting(modelRef, hoverTarget);

  return (
    <BulletsRenderer
      bullets={bullets}
      removeBullet={(id) =>
        setBullets((prev) => prev.filter((b) => b.id !== id))
      }
    />
  );
};

export default ShootingController;
