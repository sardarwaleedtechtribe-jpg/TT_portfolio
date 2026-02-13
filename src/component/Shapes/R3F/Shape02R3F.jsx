import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Square } from './Square';

export function Shape02R3F({ isActive, opacity = 1 }) {
    const square1Ref = useRef(); // top-right (moves left)
    const square2Ref = useRef(); // right-center (moves left)
    const square3Ref = useRef(); // left-center (moves right)
    const square4Ref = useRef(); // bottom-left (moves right)
    const timeRef = useRef(0);

    useFrame((state, delta) => {
        if (!isActive) return;

        timeRef.current += delta;
        const time = timeRef.current;
        const duration = 2.75;

        // Cubic bezier easing
        const easeInOutCubic = (t) => {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        // Crossing animation: right to left
        const animateRightToLeft = (ref, startY) => {
            if (!ref.current) return;

            const t = (time % duration) / duration;
            let progress;

            if (t < 0.4) { progress = easeInOutCubic(t / 0.4); }
            else if (t < 0.6) { progress = 1; }
            else { progress = 1 - easeInOutCubic((t - 0.6) / 0.4); }

            const distance = 2.5;
            ref.current.position.x = (distance / 2) - (progress * distance);
            ref.current.position.y = startY;
        };

        // Crossing animation: left to right
        const animateLeftToRight = (ref, startY) => {
            if (!ref.current) return;

            const t = (time % duration) / duration;
            let progress;

            if (t < 0.4) {
                // Moving right
                progress = easeInOutCubic(t / 0.4);
            } else if (t < 0.6) {
                // Pause at right
                progress = 1;
            } else {
                // Moving back left
                progress = 1 - easeInOutCubic((t - 0.6) / 0.4);
            }

            const distance = 2.5;
            ref.current.position.x = -(distance / 2) + (progress * distance);
            ref.current.position.y = startY;
        };

        // Animate squares
        animateRightToLeft(square1Ref, 1.5);   // top-right
        animateRightToLeft(square2Ref, -0.5);  // right-center
        animateLeftToRight(square3Ref, 0.5);   // left-center
        animateLeftToRight(square4Ref, -1.5);  // bottom-left
    });

    return (
        <group visible={isActive}>
            <Square ref={square1Ref} opacity={opacity} />
            <Square ref={square2Ref} opacity={opacity} />
            <Square ref={square3Ref} opacity={opacity} />
            <Square ref={square4Ref} opacity={opacity} />
        </group>
    );
}
