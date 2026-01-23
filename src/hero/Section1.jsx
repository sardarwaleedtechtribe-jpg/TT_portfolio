import Light from "../light/light.jsx";
import Text from "../text/text.jsx";
import Product from "../Product.jsx";
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useScroll, Scroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import "./Section1.css";

export default function Section1() {
    const scroll = useScroll()
    const ambientRef = useRef()
    const floorRef = useRef()
    const [noiseOpacity, setNoiseOpacity] = useState(0.4)
    const [intensityMultiplier, setIntensityMultiplier] = useState(1)

    const baseColor = new THREE.Color("#565555")
    const targetColor = new THREE.Color("#ffffff")

    useFrame((state) => {
        const offset = scroll.offset
        console.log("Scroll Offset:", offset.toFixed(3))
        const multiplier = 1 - offset

        setIntensityMultiplier(multiplier)
        setNoiseOpacity(0.4 * multiplier)

        if (ambientRef.current) ambientRef.current.intensity = 0.5 * multiplier

        const currentColor = baseColor.clone().lerp(targetColor, offset)
        state.scene.background = currentColor

        if (floorRef.current) floorRef.current.color.copy(currentColor)
        document.body.style.backgroundColor = `#${currentColor.getHexString()}`
    })

    return (
        <>
            <EffectComposer>
                <Noise
                    opacity={noiseOpacity}
                    blendFunction={BlendFunction.OVERLAY}
                />
            </EffectComposer>
            <ambientLight ref={ambientRef} intensity={0.5} />
            <Light intensityMultiplier={intensityMultiplier} />
            <Text />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} scale={20} >
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial ref={floorRef} color="#565555" />
            </mesh>

            <Scroll html>
                <div style={{ position: 'absolute', top: '140vh', width: '100vw' }}>
                    <section className="about-header" style={{ background: 'transparent' }}>
                        <div className="about-meta">
                            <span className="dot" />
                            <span className="label">About Us</span>
                        </div>

                        <hr className="divider" />

                        <div className="about-main">
                            <h1 className="title">About Us</h1>
                            <div className="about-description">
                                <p>
                                    Now that digital has become a part of our daily lives, what is sought after is an experience that moves the heart. We combine design that connects with the user's emotions with smooth-moving technology, achieving both ease of use and a sense of immersion. We create new precedents that no one has ever seen before, without compromising on a single pixel.
                                </p>
                                <div className="button-group">
                                    <button className="about-button">
                                        <span className="button-text default">Learn more about us</span>
                                        <span className="button-text hover">Learn more about us</span>
                                    </button>
                                    <button className="arrow-button">
                                        <span className="arrow-text default">→</span>
                                        <span className="arrow-text hover">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div style={{ marginTop: '-15vh' }}>
                        <Product />
                    </div>

                </div>
            </Scroll>
        </>
    );
}

