import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import './Strengths.css';
import { STATS_DATA, DETAILED_STRENGTHS } from './strengthsData.js';
import { Shape01, Shape02, Shape03, Shape04, Shape05 } from '../../component/Shapes/Core/Shapes.jsx';

const SHAPES = [Shape01, Shape02, Shape03, Shape04, Shape05];

export default function Strengths() {
    const stageRef = useRef();
    const containerRef = useRef();
    const detailsViewportRef = useRef();
    const detailsInnerRef = useRef();
    const [activeIndex, setActiveIndex] = useState(0);
    const hasReachedTopRef = useRef(false);

    useFrame(() => {
        if (!containerRef.current || !stageRef.current || !detailsViewportRef.current || !detailsInnerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        // Check if the top of the div is at or above the top of the viewport
        if (rect.top <= 1 && !hasReachedTopRef.current) {
            console.log("%c >>> Strengths section has reached the TOP <<<", "color: #fff; background: #ff0000; font-weight: bold; padding: 4px;");
            hasReachedTopRef.current = true;
        } else if (rect.top > 10) {
            // Reset with a bit of buffer to avoid flickering
            hasReachedTopRef.current = false;
        }

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

        // Calculate and update the active shape index (0 to 4)
        const totalItems = DETAILED_STRENGTHS.length;
        const currentActive = Math.min(totalItems - 1, Math.max(0, Math.round(progress * (totalItems - 1))));

        if (currentActive !== activeIndex) {
            setActiveIndex(currentActive);
        }
    });

    return (
        <section className="Strengths-root">
            <div className="Strengths-header">
                <SectionHeader
                    label="Strengths"
                    title="Our Strengths"
                    theme="light"
                />
            </div>

            <div className="stats-container" role="list">
                {STATS_DATA.map((item, index) => (
                    <div className="stat-card" key={index} role="listitem">
                        <h2>{item.value}</h2>
                        <p>{item.label}</p>
                    </div>
                ))}
            </div>

            <div ref={stageRef} className="strengths-scroll-stage">
                <div ref={containerRef} className="strengths-layout-container">
                    <aside className="strengths-left-section" aria-hidden="true">
                        <div className="shape-container">
                            {SHAPES.map((Shape, index) => (
                                <div
                                    key={index}
                                    className={`shape-wrapper ${index === activeIndex ? 'active' : ''}`}
                                >
                                    <Shape />
                                </div>
                            ))}
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