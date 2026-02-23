import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Center } from "@react-three/drei";
import PageHeader from "../../component/PageHeader/PageHeader.jsx";
import Footer from "../../HeroComponent/Footer/Footer.jsx";
import "./RecruitPage.css";
import TextItem from "../../component/3dText/text/TextItem.jsx";
import LogoModel from "../../component/3dText/model/LogoModel";

const TEXT_CONFIG = {
    TECH: {
        initial: [
            [0, Math.PI * 0.6, 0],
            [0, Math.PI * 0.57, 0],
            [0, Math.PI * 0.54, 0],
            [0, Math.PI * 0.5, 0],
        ],
        target: [0, 0, 0, 0].map(() => [0, 0, 0])
    },
    TRIBE: {
        initial: [
            [0, Math.PI * 0.6, 0],
            [0, Math.PI * 0.57, 0],
            [0, Math.PI * 0.55, 0],
            [0, Math.PI * 0.5, 0],
            [0, Math.PI * 0.47, 0],
        ],
        target: [0, 0, 0, 0, 0].map(() => [0, 0, 0])
    },
    LOGO: {
        initial: [0, Math.PI * 0.42615, 0], // Resulting in (0.1 + 0.5) = 0.6 PI, matching start of TECH
        target: [0, 0, 0] // Resulting in (-0.5 + 0.5) = 0 PI, matching flat TECH
    }
};

const Letter = ({ char, position, pure, height = 0.01, initialRotation, targetRotation, delay = 0 }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            const duration = 0.05;
            const progress = Math.min(Math.max((state.clock.elapsedTime - delay) / duration, 0), 1);

            const rx = initialRotation[0] + (targetRotation[0] - initialRotation[0]) * progress;
            const ry = initialRotation[1] + (targetRotation[1] - initialRotation[1]) * progress;
            const rz = initialRotation[2] + (targetRotation[2] - initialRotation[2]) * progress;
            ref.current.rotation.set(rx, ry, rz);
        }
    });

    return (
        <group position={position}>
            <Center ref={ref}>
                <TextItem text={char} pure={pure} height={height} />
            </Center>
        </group>
    );
};

const IndividualText = ({ text, position, pure, height = 0.01, spacing = 1.8, initialRotations = [], targetRotations = [], baseDelay = 2.0 }) => {
    return (
        <group position={position}>
            {text.split("").map((char, i) => (
                <Letter
                    key={i}
                    char={char}
                    position={[i * spacing, 0, 0]}
                    pure={pure}
                    height={height}
                    initialRotation={initialRotations[i] || [0, 0, 0]}
                    targetRotation={targetRotations[i] || [0, 0, 0]}
                    delay={baseDelay} // Uniform delay for all letters
                />
            ))}
        </group>
    );
};

const AnimatedLogo = ({ initial, target, delay = 2.0, ...props }) => {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) {
            const duration = 0.05;
            const progress = Math.min(Math.max((state.clock.elapsedTime - delay) / duration, 0), 1);

            const rx = initial[0] + (target[0] - initial[0]) * progress;
            const ry = initial[1] + (target[1] - initial[1]) * progress;
            const rz = initial[2] + (target[2] - initial[2]) * progress;
            ref.current.rotation.set(rx, ry, rz);
        }
    });
    return <LogoModel ref={ref} {...props} />;
};

export default function RecruitPage() {
    return (
        <div className="recruit-page-container pointer-events-none">
            <div className="fixed inset-0 z-0 pointer-events-auto">
                <Canvas
                    camera={{
                        fov: 45,
                        near: 0.1,
                        far: 200,
                        position: [0, 17, 0],
                    }}
                >
                    <color attach="background" args={["white"]} />
                    <ScrollControls pages={0}>
                        <Center rotation={[-Math.PI / 2, 0, 0]}>
                            <IndividualText
                                text="TECH"
                                pure={true}
                                position={[-1.2, 1.75, 0]}
                                height={0.01}
                                initialRotations={TEXT_CONFIG.TECH.initial}
                                targetRotations={TEXT_CONFIG.TECH.target}
                            />
                            <IndividualText
                                text="TRIBE"
                                pure={true}
                                position={[-1.2, -1, 0]}
                                height={0.01}
                                initialRotations={TEXT_CONFIG.TRIBE.initial}
                                targetRotations={TEXT_CONFIG.TRIBE.target}
                            />
                            <AnimatedLogo
                                pure={true}
                                position={[8.5, 0.4, 0]}
                                scale={[4.75, 4.75, 2.3]}
                                initial={TEXT_CONFIG.LOGO.initial}
                                target={TEXT_CONFIG.LOGO.target}
                            />
                        </Center>
                    </ScrollControls>
                </Canvas>
            </div>

            {/* <div className="relative z-10"> */}
            {/* <PageHeader label="Recruit" title="Careers" theme="light" currentPage="Recruit" /> */}
            {/* <div className="h-[200vh]"></div> */}
            {/* <Footer /> */}
            {/* </div> */}
        </div>
    );
}
