import React, { useRef, useState, useEffect } from 'react';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import ArrowButton from '../../component/Button/ArrowButton.jsx';
import { FLOW_DATA } from './flowData.js';
import './Flow.css';

export default function Flow() {
    const scrollContainerRef = useRef(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 5); // 5px buffer
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5); // 5px buffer
        }
    };

    useEffect(() => {
        // Multiple checks to ensure proper initialization
        const checkScrollState = () => {
            updateScrollButtons();
        };

        // Immediate check
        checkScrollState();

        // Check after short delay (for initial render)
        const timer1 = setTimeout(checkScrollState, 100);

        // Check after longer delay (for images/fonts loading)
        const timer2 = setTimeout(checkScrollState, 500);

        window.addEventListener('resize', updateScrollButtons);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            window.removeEventListener('resize', updateScrollButtons);
        };
    }, []);

    const handleMouseDown = (e) => {
        isDown.current = true;
        scrollContainerRef.current.classList.add('active');
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown.current = false;
        scrollContainerRef.current.classList.remove('active');
    };

    const handleMouseUp = () => {
        isDown.current = false;
        scrollContainerRef.current.classList.remove('active');
        updateScrollButtons();
    };

    const handleMouseMove = (e) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; // scroll-fast
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
        updateScrollButtons();
    };

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        const scrollAmount = 380; // approximate card width
        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="Flow-root">
            <div className="Flow-header">
                <SectionHeader label="Flow" title="Request flow" theme="light" />
            </div>

            <div
                className="Flow-cards-container"
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onScroll={updateScrollButtons}
            >
                {FLOW_DATA.map((item) => (
                    <div key={item.id} className="Flow-card">
                        <div className="Flow-card-inner">
                            <div className="Flow-card-top-line"></div>
                            <div className="Flow-card-content">
                                <div className="Flow-card-id-wrapper">
                                    <div className="Flow-card-square"></div>
                                    <span className="Flow-card-id">{item.id}</span>
                                </div>
                                <h3 className="Flow-card-title">{item.title}</h3>
                                <p className="Flow-card-description">{item.description}</p>
                            </div>
                            <div className="Flow-card-bottom-line"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="Flow-navigation">
                <div
                    className={`center-box-arrow prev ${!canScrollLeft ? 'disabled' : ''}`}
                    onClick={() => canScrollLeft && scroll('left')}
                >
                    <ArrowButton direction="left" disabled={!canScrollLeft} />
                </div>
                <div
                    className={`center-box-arrow next ${!canScrollRight ? 'disabled' : ''}`}
                    onClick={() => canScrollRight && scroll('right')}
                >
                    <ArrowButton direction="right" disabled={!canScrollRight} />
                </div>
            </div>
        </section>
    );
}
