import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export function useStrengthsScroll(totalItems) {
    const stageRef = useRef();
    const containerRef = useRef();
    const detailsViewportRef = useRef();
    const detailsInnerRef = useRef();
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [transitionProgress, setTransitionProgress] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    const transitionStartRef = useRef(0);
    const TRANSITION_DURATION = 400;

    useFrame((state) => {
        if (window.innerWidth < 1120) return;
        if (!containerRef.current || !detailsInnerRef.current || !stageRef.current) return;

        // 1. Calculate max scroll distances
        const viewportHeight = window.innerHeight;
        const innerHeight = detailsInnerRef.current.scrollHeight;
        const maxTranslate = Math.max(0, innerHeight - viewportHeight);
        const targetTranslate = maxTranslate;

        // 2. Adjust stage height dynamically
        const pinHeight = containerRef.current.offsetHeight;
        const stageHeight = pinHeight + targetTranslate;

        const currentStageHeight = stageRef.current.offsetHeight;
        if (Math.abs(currentStageHeight - stageHeight) > 1) { 
            stageRef.current.style.height = `${stageHeight}px`; 
        }

        // 3. Pin container and scroll inner content
        const stageRect = stageRef.current.getBoundingClientRect();
        const pinnedTranslate = Math.min(targetTranslate, Math.max(0, -stageRect.top));
        containerRef.current.style.transform = pinnedTranslate ? `translate3d(0, ${pinnedTranslate}px, 0)` : 'none';

        const progress = targetTranslate === 0 ? 0 : (pinnedTranslate / targetTranslate);
        const translateY = -progress * targetTranslate;

        detailsInnerRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;

        // 4. Determine current active item
        const currentActive = Math.min(totalItems - 1, Math.max(0, Math.floor(progress * totalItems)));

        if (currentActive !== activeIndex) {
            setPrevIndex(activeIndex);
            setActiveIndex(currentActive);
            setIsTransitioning(true);
            transitionStartRef.current = state.clock.elapsedTime;
        }

        // 5. Handle shape transition animation
        if (isTransitioning) {
            const elapsed = state.clock.elapsedTime - transitionStartRef.current;
            const t = Math.min(1, elapsed / (TRANSITION_DURATION / 1000));
            const easedProgress = t === 1 ? 1 : 1 - Math.pow(1 - t, 3); // Cubic easing
            setTransitionProgress(easedProgress);

            if (t >= 1) {
                setIsTransitioning(false);
                setTransitionProgress(1);
            }
        }
    });

    return {
        refs: { stageRef, containerRef, detailsViewportRef, detailsInnerRef },
        state: { activeIndex, prevIndex, transitionProgress, isTransitioning }
    };
}
