import React, { useEffect, useRef } from 'react';
import './VideoStack.css';

const VIDEOS = [
    "https://res.cloudinary.com/dcm0qgsxn/video/upload/v1769096179/v4_nhezwg.mp4",
    "https://res.cloudinary.com/dcm0qgsxn/video/upload/v1768346483/v1_2_online-video-cutter.com_v1ojdt.mp4",
    "https://res.cloudinary.com/dcm0qgsxn/video/upload/v1769096178/v1_oyqnnx.mp4",
    "https://res.cloudinary.com/dcm0qgsxn/video/upload/v1769096427/v3_flhapf.mp4"
];

const VideoStack = () => {
    const containerRef = useRef(null);
    const videoRefs = useRef([]);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Each video covers the previous one over an 80vh scroll distance
            const vh80 = viewportHeight * 0.8;

            // Calculate how far the container's top has scrolled past the viewport's top
            const scrolledPast = -rect.top;

            videoRefs.current.forEach((videoWrapper, index) => {
                if (!videoWrapper) return;

                if (index === 0) {
                    videoWrapper.style.transform = 'translateY(0px)';
                    return;
                }

                const startScroll = (index - 1) * vh80;
                let progress = (scrolledPast - startScroll) / vh80;
                progress = Math.min(Math.max(progress, 0), 1);

                // translateY goes from 80vh down to 0
                const y = vh80 * (1 - progress);

                videoWrapper.style.transform = `translateY(${y}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // R3F ScrollControls synchronization
        let rafId;
        const update = () => {
            handleScroll();
            rafId = requestAnimationFrame(update);
        };
        rafId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="video-stack-main-container" ref={containerRef}>
            <div className="video-stack-sticky-wrapper">
                {VIDEOS.map((url, index) => (
                    <div
                        key={index}
                        className="video-item-wrapper"
                        style={{ zIndex: index + 1 }}
                        ref={el => videoRefs.current[index] = el}
                    >
                        <video
                            src={url}
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoStack;
