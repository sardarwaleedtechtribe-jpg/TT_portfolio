import { useRef, useState, useEffect } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import './Strengths.css';
import { STATS_DATA, DETAILED_STRENGTHS } from './strengthsData.js';
import { Shape01R3F, Shape02R3F, Shape03R3F, Shape04R3F, Shape05R3F } from '../../component/Shapes/R3F/index.js';

const StatCounter = ({ value, label }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const numericValue = parseInt(value.replace(/[^0-9]/g, ''));

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    startAnimation();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px' // Offset slightly to ensure it's "well" in view
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [value, hasAnimated]);

    const startAnimation = () => {
        setHasAnimated(true);

        const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
        const duration = 1000; // 1 second
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.floor(easeProgress * numericValue);

            setCount(currentCount);

            if (frame === totalFrames) {
                clearInterval(timer);
                setCount(numericValue);
            }
        }, frameDuration);
    };

    const suffix = value.replace(/[0-9]/g, '');

    return (
        <div className="stat-card" ref={elementRef} role="listitem">
            <h2>{count}{suffix}</h2>
            <p>{label}</p>
        </div>
    );
};

export default function Strengths() {
    const stageRef = useRef();
    const containerRef = useRef();
    const detailsViewportRef = useRef();
    const detailsInnerRef = useRef();
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [transitionProgress, setTransitionProgress] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const hasReachedTopRef = useRef(false);
    const transitionStartRef = useRef(0);
    const TRANSITION_DURATION = 800; // 0.8 seconds

    useFrame((state, delta) => {
        if (!containerRef.current || !stageRef.current || !detailsViewportRef.current || !detailsInnerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        if (rect.top <= 1 && !hasReachedTopRef.current) { hasReachedTopRef.current = true; }
        else if (rect.top > 10) { hasReachedTopRef.current = false; }

        const viewportHeight = detailsViewportRef.current.clientHeight;
        const innerHeight = detailsInnerRef.current.scrollHeight;
        const maxTranslate = Math.max(0, innerHeight - viewportHeight);

        const lastItem = detailsInnerRef.current.querySelector('.strength-detail-item:last-child');
        const lastItemOffsetTop = lastItem ? lastItem.offsetTop : 0;
        const targetTranslate = Math.max(maxTranslate, lastItemOffsetTop);

        const pinHeight = containerRef.current.offsetHeight;

        const stageHeight = pinHeight + targetTranslate;
        const currentStageHeight = stageRef.current.offsetHeight;
        if (Math.abs(currentStageHeight - stageHeight) > 1) {
            stageRef.current.style.height = `${stageHeight}px`;
        }

        const stageRect = stageRef.current.getBoundingClientRect();
        const pinnedTranslate = Math.min(targetTranslate, Math.max(0, -stageRect.top));
        containerRef.current.style.transform = pinnedTranslate ? `translate3d(0, ${pinnedTranslate}px, 0)` : 'none';

        const progress = targetTranslate === 0 ? 0 : (pinnedTranslate / targetTranslate);
        const translateY = -progress * targetTranslate;

        detailsInnerRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;

        const totalItems = DETAILED_STRENGTHS.length;
        const currentActive = Math.min(totalItems - 1, Math.max(0, Math.round(progress * (totalItems - 1))));

        // Handle transition logic
        if (currentActive !== activeIndex) {
            setPrevIndex(activeIndex);
            setActiveIndex(currentActive);
            setIsTransitioning(true);
            transitionStartRef.current = state.clock.elapsedTime;
        }

        // Update transition progress
        if (isTransitioning) {
            const elapsed = state.clock.elapsedTime - transitionStartRef.current;
            const progress = Math.min(1, elapsed / (TRANSITION_DURATION / 1000));

            // Ease-out cubic function for smooth transition
            const easedProgress = progress === 1 ? 1 : 1 - Math.pow(1 - progress, 3);
            setTransitionProgress(easedProgress);

            if (progress >= 1) {
                setIsTransitioning(false);
                setTransitionProgress(1);
            }
        }
    });

    return (
        <section className="Strengths-root">
            <div className="Strengths-header">
                <SectionHeader
                    label="Strengths"
                    title="Our Strengths"
                    theme="light"
                    size="small"
                />
            </div>

            <div className="stats-container" role="list">
                {STATS_DATA.map((item, index) => (
                    <StatCounter key={index} value={item.value} label={item.label} />
                ))}
            </div>

            <div ref={stageRef} className="strengths-scroll-stage">
                <div ref={containerRef} className="strengths-layout-container">
                    <aside className="strengths-left-section" aria-hidden="true">
                        <div className="shape-container">
                            <Canvas
                                camera={{ position: [0, 0, 8], fov: 50 }}
                                style={{ width: '100%', height: '100%' }}
                            >
                                <ambientLight intensity={0.5} />
                                <directionalLight position={[5, 5, 5]} intensity={1} />

                                {/* Previous shape fading out */}
                                <group visible={isTransitioning}>
                                    <Shape01R3F isActive={prevIndex === 0} opacity={1 - transitionProgress} />
                                    <Shape02R3F isActive={prevIndex === 1} opacity={1 - transitionProgress} />
                                    <Shape03R3F isActive={prevIndex === 2} opacity={1 - transitionProgress} />
                                    <Shape04R3F isActive={prevIndex === 3} opacity={1 - transitionProgress} />
                                    <Shape05R3F isActive={prevIndex === 4} opacity={1 - transitionProgress} />
                                </group>

                                {/* Current shape fading in */}
                                <group visible={true}>
                                    <Shape01R3F isActive={activeIndex === 0} opacity={isTransitioning ? transitionProgress : 1} />
                                    <Shape02R3F isActive={activeIndex === 1} opacity={isTransitioning ? transitionProgress : 1} />
                                    <Shape03R3F isActive={activeIndex === 2} opacity={isTransitioning ? transitionProgress : 1} />
                                    <Shape04R3F isActive={activeIndex === 3} opacity={isTransitioning ? transitionProgress : 1} />
                                    <Shape05R3F isActive={activeIndex === 4} opacity={isTransitioning ? transitionProgress : 1} />
                                </group>
                            </Canvas>
                        </div>
                    </aside>

                    <div ref={detailsViewportRef} className="detailed-strengths">
                        <div ref={detailsInnerRef} className="detailed-strengths-inner">
                            {DETAILED_STRENGTHS.map((item) => (
                                <article className="strength-detail-item" key={item.id}>
                                    <div className="strength-index" aria-hidden="true">
                                        ( {item.id} )
                                    </div>
                                    <div className="strength-content">
                                        <h3 className="strength-title">{item.title}</h3>
                                        <div className="strength-divider"></div>
                                        <p className="strength-description">{item.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
