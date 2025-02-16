import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const ResizeHandler = () => {
  const { gl, camera, setSize } = useThree();

  useEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth, window.innerHeight);
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, [gl, camera, setSize]);

  return null;
};

export default ResizeHandler;
