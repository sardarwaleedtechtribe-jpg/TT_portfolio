import React, { useRef, useState, useEffect } from 'react';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import ArrowButton from '../../component/Button/ArrowButton.jsx';
import { FLOW_DATA } from './flowData.js';

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
        const checkScrollState = () => {
            updateScrollButtons();
        };

        checkScrollState();

        const timer1 = setTimeout(checkScrollState, 100);

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
        const cardWidth = 500; // Matches the hardcoded item width
        const currentScroll = container.scrollLeft;

        // Calculate the next/previous card boundary
        let targetScroll;
        if (direction === 'left') {
            // Find the closest card boundary to the left
            targetScroll = Math.max(0, Math.ceil((currentScroll - cardWidth) / cardWidth) * cardWidth);
        } else {
            // Find the closest card boundary to the right
            targetScroll = Math.min(
                container.scrollWidth - container.clientWidth,
                Math.floor((currentScroll + cardWidth) / cardWidth) * cardWidth
            );
        }

        container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    };

    return (
        <section className="w-full bg-white min-h-screen pb-0 mb-[-5rem]">
            <div className="px-4 sm:px-6 lg:px-10 py-14">
                <SectionHeader label="Flow" title="Request flow" theme="light" />
            </div>

            <div
                className="flex overflow-x-auto overflow-y-hidden gap-0 pl-2 cursor-grab select-none [&::-webkit-scrollbar]:hidden"
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onScroll={updateScrollButtons}
            >
                {FLOW_DATA.map((item) => (
                    <div key={item.id} className="shrink-0 w-[500px] h-[450px] flex items-center justify-center px-12">
                        <div className="w-full h-full flex flex-col relative py-6">
                            <div className="w-full h-px bg-[#b0b0b0] mb-14"></div>
                            <div className="flex-2 flex flex-col justify-start px-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-[5px] h-[5px] bg-black"></div>
                                    <span className="text-[0.9rem] font-bold tracking-[0.05em]">{item.id}</span>
                                </div>
                                <h3 className="text-[1.25rem] font-medium mb-6 leading-[1.1] text-[#1a1a1a]">{item.title}</h3>
                                <p className="text-13px leading-[1.6] text-[#444] max-w-[350px] tracking-[0.05em]">{item.description}</p>
                            </div>
                            <div className="w-full h-px bg-[#b0b0b0] mb-3"></div>
                        </div>
                    </div>
                ))}
                {/* <div className="shrink-0 w-18"></div> */}
            </div>

            <div className="flex justify-end pr-18 gap-0 mt-3 relative z-10">
                <div
                    className={`ml-2.5 ${!canScrollLeft ? 'disabled' : ''}`}
                    onClick={() => canScrollLeft && scroll('left')}
                >
                    <ArrowButton direction="left" disabled={!canScrollLeft} />
                </div>
                <div
                    className={`ml-2.5 ${!canScrollRight ? 'disabled' : ''}`}
                    onClick={() => canScrollRight && scroll('right')}
                >
                    <ArrowButton direction="right" disabled={!canScrollRight} />
                </div>
            </div>
        </section>
    );
}
