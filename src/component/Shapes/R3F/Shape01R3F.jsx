import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Square } from './Square';

export function Shape01R3F({ isActive, opacity = 1 }) {
    const box1Ref = useRef();
    const box2Ref = useRef();
    const box3Ref = useRef();
    const box4Ref = useRef();
    const timeRef = useRef(0);

    useFrame((state, delta) => {
        if (!isActive) return;

        timeRef.current += delta;

        const time = timeRef.current;
        const duration = 4;
        const size = 2.7;
        const halfSize = size / 2;

        // Cubic bezier easing function to match CSS animation
        const easeInOutCubic = (t) => {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        // Calculate positions for each box moving in a square path
        const animateBox = (ref, offset) => {
            if (!ref.current) return;

            const t = ((time + offset) % duration) / duration; // 0 to 1
            const edge = Math.floor(t * 4); // Which edge (0-3)
            const edgeProgress = (t * 4) % 1; // Progress along current edge (0-1)
            const easedProgress = easeInOutCubic(edgeProgress); // Apply easing

            let x, y;

            // Clockwise square path: top-left -> top-right -> bottom-right -> bottom-left
            switch (edge) {
                case 0:
                    x = -halfSize + (easedProgress * size);
                    y = halfSize;
                    break;
                case 1:
                    x = halfSize;
                    y = halfSize - (easedProgress * size);
                    break;
                case 2:
                    x = halfSize - (easedProgress * size);
                    y = -halfSize;
                    break;
                default:
                    x = -halfSize;
                    y = -halfSize + (easedProgress * size);
                    break;
            }

            ref.current.position.x = x;
            ref.current.position.y = y;
        };

        animateBox(box1Ref, 0);
        animateBox(box2Ref, -1);
        animateBox(box3Ref, -2);
        animateBox(box4Ref, -3);
    });

    return (
        <group visible={isActive}>
            <Square ref={box1Ref} opacity={opacity} />
            <Square ref={box2Ref} opacity={opacity} />
            <Square ref={box3Ref} opacity={opacity} />
            <Square ref={box4Ref} opacity={opacity} />
        </group>
    );
}
