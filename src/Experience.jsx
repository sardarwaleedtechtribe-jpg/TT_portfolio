import Hero from "./hero/hero.jsx";
import CameraController from "./CameraController.jsx";
import HeroOverlay from "./hero/HeroOverlay.jsx";
import { ScrollControls } from "@react-three/drei";
import Strengths from "./Pages/Strengths/Strengths.jsx";
import Flow from "./Pages/Flow/Flow.jsx";

export default function Experience() {
    return (
        <>
            <ScrollControls pages={14} damping={0.2} >
                <CameraController />
                <Hero />
                <HeroOverlay />
            </ScrollControls>

        </>);
}
