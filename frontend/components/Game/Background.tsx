import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader, Vector3 } from "three";
import * as THREE from "three";

const TILE_SIZE = 50; // Размер одной плитки
const GRID_SIZE = 3; // Количество плиток в ряд (3x3)

const Background = ({
  movement,
  playerPos,
}: {
  movement: Vector3;
  playerPos: Vector3;
}) => {
  const texture = useLoader(TextureLoader, "/models/floor/floor.jpg");
  const tilesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(5, 5);
  }, [texture]);

  // Создаем массив позиций плиток
  const tilePositions = useMemo(() => {
    const positions = [];
    for (let x = -1; x <= 1; x++) {
      for (let z = -1; z <= 1; z++) {
        positions.push(new Vector3(x * TILE_SIZE, 0, z * TILE_SIZE));
      }
    }
    return positions;
  }, []);

  useFrame(() => {
    if (!playerPos || !tilesRef.current.length) return;

    const offsetX = Math.floor(playerPos.x / TILE_SIZE) * TILE_SIZE;
    const offsetZ = Math.floor(playerPos.z / TILE_SIZE) * TILE_SIZE;

    tilesRef.current.forEach((tile, index) => {
      if (tile) {
        tile.position.set(
          tilePositions[index].x + offsetX,
          0,
          tilePositions[index].z + offsetZ
        );
      }
    });
  });

  return (
    <>
      {tilePositions.map((pos, index) => (
        <mesh
          key={index}
          ref={(el) => {
            if (el) {
              tilesRef.current[index] = el;
            }
          }}
          rotation={[-Math.PI / 2, 0, 0]}
          position={pos.toArray()}
        >
          <planeGeometry args={[TILE_SIZE, TILE_SIZE]} />
          <meshStandardMaterial map={texture} />
        </mesh>
      ))}
    </>
  );
};

export default Background;
