import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { RectAreaLightHelper } from "three-stdlib";
import { useControls } from "leva";

// Initialize RectAreaLight support
RectAreaLightUniformsLib.init();

export default function Light() {
  const rectLight1 = useRef();
  const rectLight2 = useRef();

  // const { position1, scale1 } = useControls("Light 1", {
  //   position1: { value: [1.7, 1.2, -4], step: 0.1 },
  //   scale1: { value: [500, 50, 50], step: 1 },
  // });

  // const { position2, scale2 } = useControls("Light 2", {
  //   position2: { value: [-6.3, 0.6, 3], step: 0.1 },
  //   scale2: { value: [500, 50, 50], step: 1 },
  // });

  // useHelper(rectLight1, RectAreaLightHelper, 'red')
  // useHelper(rectLight2, RectAreaLightHelper, 'white')

  // Static values to replace useControls
  const position1 = [1.7, 1.2, -4];
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
        intensity={500}
        color={"white"}
        position={position1}
        scale={scale1}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />

      {/* RectAreaLight 2 */}
      <rectAreaLight
        ref={rectLight2}
        width={10}
        height={5}
        intensity={50}
        color={"white"}
        position={position2}
        scale={scale2}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
    </>
  );
}
