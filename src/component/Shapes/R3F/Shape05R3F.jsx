import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Square } from './Square';

export function Shape05R3F({ isActive, opacity = 1 }) {
    const topRef = useRef();    // Top center
    const bottomRef = useRef(); // Bottom center
    const leftRef = useRef();   // Left center
    const rightRef = useRef();  // Right center
    const timeRef = useRef(0);

    useFrame((state, delta) => {
        if (!isActive) return;

        timeRef.current += delta;
        const time = timeRef.current;
        const duration = 4;
        const t = (time % duration) / duration; // 0 to 1

        // Easing function
        const easeInOutCubic = (t) => {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const edgeDistance = 1.5; // Distance from center to edge

        if (topRef.current) {
            let progress;
            if (t < 0.15) { progress = easeInOutCubic(t / 0.15); }
            else if (t < 0.3) { progress = 1 - easeInOutCubic((t - 0.15) / 0.15); }
            else if (t < 0.65) { progress = easeInOutCubic((t - 0.3) / 0.35); }
            else { progress = 1 - easeInOutCubic((t - 0.65) / 0.35); }
            topRef.current.position.y = edgeDistance - (progress * edgeDistance);
            topRef.current.position.x = 0;
        }

        // Bottom square: moves from bottom edge to center and back
        if (bottomRef.current) {
            let progress;
            if (t < 0.15) { progress = easeInOutCubic(t / 0.15); }
            else if (t < 0.3) { progress = 1 - easeInOutCubic((t - 0.15) / 0.15); }
            else if (t < 0.65) { progress = easeInOutCubic((t - 0.3) / 0.35); }
            else { progress = 1 - easeInOutCubic((t - 0.65) / 0.35); }
            bottomRef.current.position.y = -edgeDistance + (progress * edgeDistance);
            bottomRef.current.position.x = 0;
        }

        // Left square: moves from left edge to center and back
        if (leftRef.current) {
            let progress;
            if (t < 0.15) { progress = easeInOutCubic(t / 0.15); }
            else if (t < 0.3) { progress = 1 - easeInOutCubic((t - 0.15) / 0.15); }
            else if (t < 0.65) { progress = easeInOutCubic((t - 0.3) / 0.35); }
            else { progress = 1 - easeInOutCubic((t - 0.65) / 0.35); }
            leftRef.current.position.x = -edgeDistance + (progress * edgeDistance);
            leftRef.current.position.y = 0;
        }

        // Right square: moves from right edge to center and back
        if (rightRef.current) {
            let progress;
            if (t < 0.15) { progress = easeInOutCubic(t / 0.15); }
            else if (t < 0.3) { progress = 1 - easeInOutCubic((t - 0.15) / 0.15); }
            else if (t < 0.65) { progress = easeInOutCubic((t - 0.3) / 0.35); }
            else { progress = 1 - easeInOutCubic((t - 0.65) / 0.35); }
            rightRef.current.position.x = edgeDistance - (progress * edgeDistance);
            rightRef.current.position.y = 0;
        }
    });

    return (
        <group visible={isActive}>
            <Square ref={topRef} opacity={opacity} />
            <Square ref={bottomRef} opacity={opacity} />
            <Square ref={leftRef} opacity={opacity} />
            <Square ref={rightRef} opacity={opacity} />
        </group>
    );
}
