import { Center, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import LogoModel from "../model/LogoModel";
import TextItem from "./TextItem";

export default function Text({ pure = false }) {
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
        <TextItem
          ref={techRef}
          text="TECH"
          position={[0.15, 0, 0]}
          pure={pure}
        />
        <TextItem
          ref={tribeRef}
          text="TRIBE"
          position={[0, -2.0, 0]}
          pure={pure}
        />
        <LogoModel ref={logoRef} position={[9, -0.25, 0.26]} scale={[3.5, 3.8, 6]} pure={pure} />
      </group>
    </Center>
  );
}
