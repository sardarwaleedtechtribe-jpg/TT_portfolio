import { ScrollControls, Scroll } from "@react-three/drei";
import Section1 from "./hero/Section1.jsx";
import CameraController from "./CameraController.jsx";

export default function Experience() {
    return (
        <>
            <ScrollControls pages={8} damping={0.15}>
                {/* <CameraController /> */}
                <Section1 />
            </ScrollControls>
        </>
    );
}
