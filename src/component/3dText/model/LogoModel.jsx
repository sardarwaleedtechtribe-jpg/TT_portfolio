import { useGLTF, Center } from "@react-three/drei";
import { useMemo, forwardRef } from "react";
import * as THREE from "three";

const LogoModel = forwardRef((props, ref) => {
  const { scene } = useGLTF("/logo/t.glb");

  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: "black",
          metalness: 0.8,
          roughness: 0.5,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
        });
      }
    });
  }, [scene]);

  return (
    <group ref={ref} {...props}>
      <Center>
        <primitive
          object={scene}
          rotation={[0, Math.PI / 2, 0]}
        // scale={[0.7, 3./8, 4]}
        />
      </Center>
    </group>
  );
});

export default LogoModel;
