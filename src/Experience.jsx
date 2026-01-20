import { Text3D, Center } from "@react-three/drei";
import Light from "./light/light.jsx";
import LogoModel from "./model/LogoModel.jsx";
import Text from "./text/text.jsx";

export default function Experience() {
    return (
        <>
            <ambientLight intensity={0.5} />

            <Light />

            <Text />
        </>
    );
}
