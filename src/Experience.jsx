import { ScrollControls, Scroll } from "@react-three/drei";
import Section1 from "./hero/Section1.jsx";
import CameraController from "./CameraController.jsx";

export default function Experience() {
    return (
        <>
            <ScrollControls pages={2.75} damping={0.2}>
                <CameraController />
                <Section1 />
            </ScrollControls>
        </>
    );
}
