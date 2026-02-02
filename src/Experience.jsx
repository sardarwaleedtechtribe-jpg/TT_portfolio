import Hero from "./hero/hero.jsx";
import CameraController from "./CameraController.jsx";
import HeroOverlay from "./hero/HeroOverlay.jsx";
import { ScrollControls } from "@react-three/drei";

export default function Experience() {
    return (
        <>
            <ScrollControls pages={8} damping={0.2} >
                <CameraController />
                <Hero />
                <HeroOverlay />
            </ScrollControls>
        </>);
}
