import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Model = forwardRef<THREE.Object3D, any>((props, ref) => {
  const { scene } = useGLTF("/models/swat/scene.gltf");

  return <primitive object={scene} ref={ref} {...props} />;
});

export default Model;
