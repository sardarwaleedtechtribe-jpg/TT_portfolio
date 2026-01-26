import { ScrollControls, Scroll } from "@react-three/drei";
import Hero from "./hero/hero.jsx";
import CameraController from "./CameraController.jsx";

export default function Experience() {
    return (
        <>
            <ScrollControls pages={8} damping={0.15}>
                {/* <CameraController /> */}
                <Hero />
            </ScrollControls>
        </>
    );
}
