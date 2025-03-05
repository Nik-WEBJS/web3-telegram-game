import { useEffect, useRef } from "react";
import * as THREE from "three";

export const useMovement = () => {
  const movement = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
};
