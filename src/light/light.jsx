import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { RectAreaLightHelper } from "three-stdlib";
import { useControls } from "leva";

// Initialize RectAreaLight support
RectAreaLightUniformsLib.init();

export default function Light({ intensityMultiplier = 1 }) {
  const rectLight1 = useRef();
  const rectLight2 = useRef();

  // Static values to replace useControls
  const position1 = [1.3, 5.1, 0];
  const rotation1 = [-1.5, 0.4, 0];
  const scale1 = [500, 50, 50];
  const position2 = [-6.3, 0.6, 3];
  const scale2 = [500, 50, 50];

  return (
    <>
      {/* RectAreaLight 1 */}
      <rectAreaLight
        ref={rectLight1}
        width={10}
        height={5}
        intensity={600 * intensityMultiplier}
        color={"white"}
        position={position1}
        rotation={rotation1}
        scale={scale1}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
    </>
  );
}
