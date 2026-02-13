import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Square } from './Square';

export function Shape03R3F({ isActive, opacity = 1 }) {
    // Center square
    const centerRef = useRef();

    // Inner corners (4 squares)
    const tlRef = useRef();
    const trRef = useRef();
    const blRef = useRef();
    const brRef = useRef();

    // Outer corners (4 squares)
    const otlRef = useRef();
    const otrRef = useRef();
    const oblRef = useRef();
    const obrRef = useRef();

    const timeRef = useRef(0);

    useFrame((state, delta) => {
        if (!isActive) return;

        timeRef.current += delta;
        const time = timeRef.current;
        const duration = 3;
        const t = (time % duration) / duration; // 0 to 1

        // Phase 1: Center square (0% - 33.34%)
        if (centerRef.current) {
            let scale = 0;
            if (t < 0.1666) { // 0% to 16.66%
                scale = t / 0.1666; // Scale up
            } else if (t < 0.3334) { // 16.66% to 33.34%
                scale = 1 - ((t - 0.1666) / 0.1668); // Scale down
            }
            centerRef.current.scale.set(scale, scale, 1);
        }

        // Phase 2: Inner corners (33.34% - 66.67%)
        const animateInnerCorner = (ref, homePos) => {
            if (!ref.current) return;
            let scale = 0;
            const [hx, hy] = homePos;
            
            // Calculate offsets to simulate pivot points
            // (0.2 is half of the square's 0.4 size)
            const innerX = hx > 0 ? -0.2 : 0.2; 
            const innerY = hy > 0 ? -0.2 : 0.2;

            if (t >= 0.3334 && t < 0.5) { 
                const subT = (t - 0.3334) / 0.1666;
                scale = subT;
                // Grow out from the inner corner
                ref.current.position.set(hx + innerX * (1 - subT), hy + innerY * (1 - subT), 0);
            } else if (t >= 0.5 && t < 0.6666) { 
                const subT = (t - 0.5) / 0.1666;
                scale = 1 - subT;
                // Shrink into the outer corner
                ref.current.position.set(hx - innerX * subT, hy - innerY * subT, 0);
            }
            ref.current.scale.set(scale, scale, 1);
        };

        // Apply to the 4 inner refs with their home positions
        animateInnerCorner(tlRef, [-offset, offset]);
        animateInnerCorner(trRef, [offset, offset]);
        animateInnerCorner(blRef, [-offset, -offset]);
        animateInnerCorner(brRef, [offset, -offset]);

        // Phase 3: Outer corners (66.67% - 100%)
        const animateOuterCorner = (ref, homePos) => {
            if (!ref.current) return;
            let scale = 0;
            const [hx, hy] = homePos;
            const innerX = hx > 0 ? -0.2 : 0.2;
            const innerY = hy > 0 ? -0.2 : 0.2;

            if (t >= 0.6667 && t < 0.8333) {
                const subT = (t - 0.6667) / 0.1666;
                scale = subT;
                ref.current.position.set(hx + innerX * (1 - subT), hy + innerY * (1 - subT), 0);
            } else if (t >= 0.8333) {
                const subT = (t - 0.8333) / 0.1667;
                scale = 1 - subT;
                ref.current.position.set(hx - innerX * subT, hy - innerY * subT, 0);
            }
            ref.current.scale.set(scale, scale, 1);
        };

        animateOuterCorner(otlRef, [-outerOffset, outerOffset]);
        animateOuterCorner(otrRef, [outerOffset, outerOffset]);
        animateOuterCorner(oblRef, [-outerOffset, -outerOffset]);
        animateOuterCorner(obrRef, [outerOffset, -outerOffset]);
    });

    const offset = 0.9; // Inner offset
    const outerOffset = 1.5; // Outer offset

    return (
        <group visible={isActive}>
            <Square ref={centerRef} position={[0, 0, 0]} opacity={opacity} />
            <Square ref={tlRef} position={[-offset, offset, 0]} opacity={opacity} />
            <Square ref={trRef} position={[offset, offset, 0]} opacity={opacity} />
            <Square ref={blRef} position={[-offset, -offset, 0]} opacity={opacity} />
            <Square ref={brRef} position={[offset, -offset, 0]} opacity={opacity} />
            <Square ref={otlRef} position={[-outerOffset, outerOffset, 0]} opacity={opacity} />
            <Square ref={otrRef} position={[outerOffset, outerOffset, 0]} opacity={opacity} />
            <Square ref={oblRef} position={[-outerOffset, -outerOffset, 0]} opacity={opacity} />
            <Square ref={obrRef} position={[outerOffset, -outerOffset, 0]} opacity={opacity} />
        </group>
    );
}
