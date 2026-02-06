import { useState } from 'react';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import { SERVICE_CARDS } from './parthner.js';
import './Parthner.css';

export default function Parthner() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const currentTestimonial = SERVICE_CARDS[activeIndex];
    const totalSliders = SERVICE_CARDS.length;

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % totalSliders);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + totalSliders) % totalSliders);
    };

    const progressWidth = ((activeIndex + 1) / totalSliders) * 100;

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
                        >
                            ←
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
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
