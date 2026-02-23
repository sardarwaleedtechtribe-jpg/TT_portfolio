import * as THREE from "three";
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import Light from "../component/3dText/light/light.jsx";
import Text from "../component/3dText/text/text.jsx";
import "./hero.css";

export default function Hero({ pure = false, ...props }) {
    const scroll = useScroll()
    const ambientRef = useRef()
    const floorRef = useRef()
    const [noiseOpacity, setNoiseOpacity] = useState(15.94)
    const [intensityMultiplier, setIntensityMultiplier] = useState(1)

    const baseColor = new THREE.Color("#444444")  // Lighter gray than before
    const targetColor = new THREE.Color("#ffffff")

    useFrame((state) => {
        if (pure) {
            state.scene.background = targetColor
            return
        }
        const offset = scroll.offset
        const normalizedOffset = Math.min(offset / 0.08, 1);
        const multiplier = 1 - normalizedOffset;

        setIntensityMultiplier(multiplier)
        setNoiseOpacity(0.4 * multiplier)

        if (ambientRef.current) ambientRef.current.intensity = 0.5 * multiplier

        // Background color transitions to white at 0.15
        const colorNormalizedOffset = Math.min(offset / 0.125, 1);
        const currentColor = baseColor.clone().lerp(targetColor, colorNormalizedOffset)
        state.scene.background = currentColor

        if (floorRef.current) floorRef.current.color.copy(currentColor)
        document.body.style.backgroundColor = `#${currentColor.getHexString()}`
    })

    return (
        <group {...props}>
            {!pure && (
                <EffectComposer>
                    <Noise opacity={noiseOpacity}
                        blendFunction={BlendFunction.OVERLAY}
                        color="white" />
                </EffectComposer>
            )}
            {!pure && <ambientLight ref={ambientRef} intensity={0.5} />}
            {!pure && <Light intensityMultiplier={intensityMultiplier} />}
            <Text pure={pure} />
        </group>
    );
}
