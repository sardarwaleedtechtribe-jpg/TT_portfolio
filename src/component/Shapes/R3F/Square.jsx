import { forwardRef } from 'react';

export const Square = forwardRef(({ position, opacity = 1 }, ref) => {
    return (
        <mesh ref={ref} position={position}>
            <planeGeometry args={[0.4, 0.4]} />
            <meshStandardMaterial color="#000000" transparent opacity={opacity} />
        </mesh>
    );
});

Square.displayName = 'Square';
