import { useState, useEffect } from 'react';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import { SERVICE_CARDS } from './parthner.js';
import './Parthner.css';

export default function Parthner() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const currentTestimonial = SERVICE_CARDS[activeIndex];
    const totalSliders = SERVICE_CARDS.length;

    // Automatic loader effect
    useEffect(() => {
        let timer;
        if (isPlaying) {
            timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        // Move to next testimonial and reset progress
                        setActiveIndex((idx) => (idx + 1) % totalSliders);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 50); // 50ms * 100 = 5 seconds per testimonial
        }
        return () => clearInterval(timer);
    }, [isPlaying, totalSliders]);

    const handleNext = () => {
        if (activeIndex < totalSliders - 1) {
            setActiveIndex((prev) => prev + 1);
            setProgress(0); // Reset progress when manually navigating
        }
    };

    const handlePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex((prev) => prev - 1);
            setProgress(0); // Reset progress when manually navigating
        }
    };

    const progressWidth = progress;

    return (
        <section className="Parthner-root">
            <div className="Parthner-header">
                <SectionHeader label="Partner's Voice" title="What customers say" theme="light" size="small" />
            </div>

            <div className="Parthner-container">
                <div className="testimonial-layout">
                    <div className="testimonial-quote">
                        <p>{currentTestimonial.description}</p>
                    </div>

                    <div className="testimonial-info">
                        <div className="info-row">
                            <span className="info-label">Company</span>
                            <span className="info-value">{currentTestimonial.Company}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Name</span>
                            <span className="info-value">{currentTestimonial.Name}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Site</span>
                            <span className="info-value">
                                <a href={currentTestimonial.Site} target="_blank" rel="noopener noreferrer">
                                    {currentTestimonial.Site}
                                </a>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="Parthner-controls">
                    <div className="slider-progress-wrapper">
                        <div className="progress-bar-track">
                            <div className="progress-bar-fill" style={{ width: `${progressWidth}%` }}></div>
                        </div>
                        <div className="progress-number">
                            0{activeIndex + 1} <span className="separator">|</span> 0{totalSliders}
                        </div>
                    </div>

                    <div className="slider-action-buttons">
                        <button
                            className="slider-btn arrow-prev"
                            aria-label="Previous"
                            onClick={handlePrev}
                            disabled={activeIndex === 0}
                        > ←
                        </button>
                        <button
                            className="slider-btn motion-toggle"
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            Motion
                            <span className="pause-icon">
                                <img src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
                                    alt={isPlaying ? "pause" : "play"} />
                            </span>
                        </button>
                        <button
                            className="slider-btn arrow-next"
                            aria-label="Next"
                            onClick={handleNext}
                            disabled={activeIndex === totalSliders - 1}
                        > →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
