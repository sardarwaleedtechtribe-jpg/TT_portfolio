import { Text3D } from "@react-three/drei";
import { forwardRef } from "react";

const TextItem = forwardRef(({ text, position, pure, height = 0.5, ...props }, ref) => {
    return (
        <Text3D
            ref={ref}
            font="/fonts/helvetiker_bold.typeface.json"
            size={1.6}
            height={height}
            curveSegments={12}
            bevelEnabled
            bevelSize={0.04}
            bevelThickness={0.1}
            letterSpacing={0.3}
            position={position}
            {...props}
        >
            {text}
            {pure ? (
                <meshBasicMaterial color="black" />
            ) : (
                <meshPhysicalMaterial
                    color="black"
                    metalness={0.8}
                    roughness={0.5}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            )}
        </Text3D>
    );
});

export default TextItem;
