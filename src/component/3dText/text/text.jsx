import { Center, useScroll } from "@react-three/drei";
import { Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import LogoModel from "../model/LogoModel";

export default function Text() {
  const scroll = useScroll();
  const techRef = useRef();
  const tribeRef = useRef();
  const logoRef = useRef();

  useFrame(() => {
    const offset = scroll.offset;
    const normalizedOffset = Math.min(offset / 0.15, 1);
    const scaleY = 1 - normalizedOffset * 0.998;
    const logoScaleZ = 6 - normalizedOffset * 5.4;

    if (techRef.current) techRef.current.scale.z = scaleY;
    if (tribeRef.current) tribeRef.current.scale.z = scaleY;
    if (logoRef.current) logoRef.current.scale.z = logoScaleZ;
  });

  return (
    <Center position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <group>
        <Text3D
          ref={techRef}
          font="/fonts/helvetiker_bold.typeface.json"
          size={1.6}
          height={0.5}
          curveSegments={12}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          letterSpacing={0.3}
          position={[0.15, 0, 0]}
        >
          TECH
          <meshPhysicalMaterial
            color="black"
            metalness={0.8}
            roughness={0.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Text3D>
        <Text3D
          ref={tribeRef}
          font="/fonts/helvetiker_bold.typeface.json"
          size={1.6}
          height={0.5}
          curveSegments={12}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          letterSpacing={0.3}
          position={[0, -2.0, 0]}
        >
          TRIBE
          <meshPhysicalMaterial
            color="black"
            metalness={0.8}
            roughness={0.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Text3D>
        <LogoModel ref={logoRef} position={[9, -0.25, 0.26]} scale={[3.5, 3.8, 6]} />
      </group>
    </Center>
  );
}