import { Center } from "@react-three/drei";
import { Text3D } from "@react-three/drei";
import LogoModel from "../model/LogoModel";

export default function Text() {
  return (
    <Center position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <group>
        <Text3D
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
        <LogoModel
          position={[9.5, -0.25, 0.26]}
          // rotation={[0, Math.PI / 2, 0]}
          // scale={[7,3.8,4]}
        />
      </group>
    </Center>
  );
}