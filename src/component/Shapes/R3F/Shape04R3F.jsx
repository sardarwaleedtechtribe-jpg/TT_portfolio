import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Square } from './Square';

export function Shape04R3F({ isActive, opacity = 1 }) {
    const square1Ref = useRef(); // Outer left
    const square2Ref = useRef(); // Inner left
    const square3Ref = useRef(); // Inner right
    const square4Ref = useRef(); // Outer right
    const timeRef = useRef(0);

    useFrame((state, delta) => {
        if (!isActive) return;

        timeRef.current += delta;
        const time = timeRef.current;
        const duration = 10;
        const t = (time % duration) / duration; // 0 to 1

        // Easing function
        const ease = (t) => {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        // Outer positions
        const outerDist = 1.4;
        const innerDist = 0.45;

        // Position 1: Outer Left - Swap left->right, then bottom clockwise
        if (square1Ref.current) {
            let x, y;
            const progress = t * 10; // 0-10 for easier keyframe mapping

            if (progress < 1) { // 0-10%: Swap left to right
                const p = ease(progress);
                x = -outerDist + (p * outerDist * 2);
                y = 0;
            } else if (progress < 2) { // 10-20%: Move down
                x = outerDist;
                const p = ease(progress - 1);
                y = -(p * outerDist);
            } else if (progress < 3) { // 20-30%: Move to center bottom
                const p = ease(progress - 2);
                x = outerDist - (p * outerDist);
                y = -outerDist;
            } else if (progress < 4) { // 30-40%: Move to left bottom
                const p = ease(progress - 3);
                x = -(p * outerDist);
                y = -outerDist;
            } else if (progress < 5) { // 40-50%: Move up to left
                const p = ease(progress - 4);
                x = -outerDist;
                y = -outerDist + (p * outerDist);
            } else if (progress < 6) { // 50-60%: Swap left to right again
                const p = ease(progress - 5);
                x = -outerDist + (p * outerDist * 2);
                y = 0;
            } else if (progress < 7) { // 60-70%: Move down
                x = outerDist;
                const p = ease(progress - 6);
                y = -(p * outerDist);
            } else if (progress < 8) { // 70-80%: Move to center bottom
                const p = ease(progress - 7);
                x = outerDist - (p * outerDist);
                y = -outerDist;
            } else if (progress < 9) { // 80-90%: Move to left bottom
                const p = ease(progress - 8);
                x = -(p * outerDist);
                y = -outerDist;
            } else { // 90-100%: Move up to left
                const p = ease(progress - 9);
                x = -outerDist;
                y = -outerDist + (p * outerDist);
            }

            square1Ref.current.position.x = x;
            square1Ref.current.position.y = y;
        }

        // Position 2: Inner Left - Similar pattern but smaller
        if (square2Ref.current) {
            let x, y;
            const progress = t * 10;

            if (progress < 1) {
                const p = ease(progress);
                x = -innerDist + (p * innerDist * 2);
                y = 0;
            } else if (progress < 2) {
                x = innerDist;
                const p = ease(progress - 1);
                y = -(p * innerDist);
            } else if (progress < 3) {
                const p = ease(progress - 2);
                x = innerDist - (p * innerDist);
                y = -innerDist;
            } else if (progress < 4) {
                const p = ease(progress - 3);
                x = -(p * innerDist);
                y = -innerDist;
            } else if (progress < 5) {
                const p = ease(progress - 4);
                x = -innerDist;
                y = -innerDist + (p * innerDist);
            } else if (progress < 6) {
                const p = ease(progress - 5);
                x = -innerDist + (p * innerDist * 2);
                y = 0;
            } else if (progress < 7) {
                x = innerDist;
                const p = ease(progress - 6);
                y = -(p * innerDist);
            } else if (progress < 8) {
                const p = ease(progress - 7);
                x = innerDist - (p * innerDist);
                y = -innerDist;
            } else if (progress < 9) {
                const p = ease(progress - 8);
                x = -(p * innerDist);
                y = -innerDist;
            } else {
                const p = ease(progress - 9);
                x = -innerDist;
                y = -innerDist + (p * innerDist);
            }

            square2Ref.current.position.x = x;
            square2Ref.current.position.y = y;
        }

        // Position 3: Inner Right - Opposite pattern (top half)
        if (square3Ref.current) {
            let x, y;
            const progress = t * 10;

            if (progress < 1) {
                const p = ease(progress);
                x = innerDist - (p * innerDist * 2);
                y = 0;
            } else if (progress < 2) {
                x = -innerDist;
                const p = ease(progress - 1);
                y = p * innerDist;
            } else if (progress < 3) {
                const p = ease(progress - 2);
                x = -innerDist + (p * innerDist);
                y = innerDist;
            } else if (progress < 4) {
                const p = ease(progress - 3);
                x = (p * innerDist);
                y = innerDist;
            } else if (progress < 5) {
                const p = ease(progress - 4);
                x = innerDist;
                y = innerDist - (p * innerDist);
            } else if (progress < 6) {
                const p = ease(progress - 5);
                x = innerDist - (p * innerDist * 2);
                y = 0;
            } else if (progress < 7) {
                x = -innerDist;
                const p = ease(progress - 6);
                y = p * innerDist;
            } else if (progress < 8) {
                const p = ease(progress - 7);
                x = -innerDist + (p * innerDist);
                y = innerDist;
            } else if (progress < 9) {
                const p = ease(progress - 8);
                x = (p * innerDist);
                y = innerDist;
            } else {
                const p = ease(progress - 9);
                x = innerDist;
                y = innerDist - (p * innerDist);
            }

            square3Ref.current.position.x = x;
            square3Ref.current.position.y = y;
        }

        // Position 4: Outer Right - Opposite pattern (top half)
        if (square4Ref.current) {
            let x, y;
            const progress = t * 10;

            if (progress < 1) {
                const p = ease(progress);
                x = outerDist - (p * outerDist * 2);
                y = 0;
            } else if (progress < 2) {
                x = -outerDist;
                const p = ease(progress - 1);
                y = p * outerDist;
            } else if (progress < 3) {
                const p = ease(progress - 2);
                x = -outerDist + (p * outerDist);
                y = outerDist;
            } else if (progress < 4) {
                const p = ease(progress - 3);
                x = (p * outerDist);
                y = outerDist;
            } else if (progress < 5) {
                const p = ease(progress - 4);
                x = outerDist;
                y = outerDist - (p * outerDist);
            } else if (progress < 6) {
                const p = ease(progress - 5);
                x = outerDist - (p * outerDist * 2);
                y = 0;
            } else if (progress < 7) {
                x = -outerDist;
                const p = ease(progress - 6);
                y = p * outerDist;
            } else if (progress < 8) {
                const p = ease(progress - 7);
                x = -outerDist + (p * outerDist);
                y = outerDist;
            } else if (progress < 9) {
                const p = ease(progress - 8);
                x = (p * outerDist);
                y = outerDist;
            } else {
                const p = ease(progress - 9);
                x = outerDist;
                y = outerDist - (p * outerDist);
            }

            square4Ref.current.position.x = x;
            square4Ref.current.position.y = y;
        }
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
