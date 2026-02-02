import { ScrollControls, Scroll } from "@react-three/drei";
import Hero from "./hero/hero.jsx";
import CameraController from "./CameraController.jsx";
import Header from './component/TopHeader/header.jsx';

export default function Experience() {
    return (
        <>
            <ScrollControls pages={8} damping={0.2} >
                <CameraController />
                <Hero />
                <Scroll html>
                    <Header />
                </Scroll>
            </ScrollControls>
        </>);
}
