import { useState, useEffect } from 'react';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import ArrowButton from '../../component/Button/ArrowButton.jsx';
import { SERVICE_CARDS } from './parthner.js';

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
            setProgress(0);
        }
    };

    const handlePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex((prev) => prev - 1);
            setProgress(0);
        }
    };

    const progressWidth = progress;

    return (
        <section className="w-full min-h-screen bg-white flex flex-col pb-20">
            <div className="pt-14 px-4 sm:px-6 lg:px-10 pb-4">
                <SectionHeader label="Partner's Voice" title="What customers say" theme="light" size="small" />
            </div>

            <div className="max-w-[1400px] mt-8 sm:mt-12 lg:mt-20 mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 flex-1 flex flex-col">
                {/* Testimonial layout */}
                <div className="flex flex-col lg:flex-row lg:justify-start lg:items-start lg:gap-8 xl:gap-16 2xl:gap-56 mt-4 lg:ml-0 xl:ml-7 min-h-[200px] lg:min-h-[250px]">
                    {/* Quote */}
                    <div className="w-full lg:w-[400px] xl:w-[500px] 2xl:w-[560px] h-auto mb-8 lg:mb-0">
                        <p className="text-[14px] sm:text-[16px] lg:text-[20px] xl:text-[23px] leading-relaxed lg:leading-loose tracking-widest lg:tracking-[0.175em] text-[#333] font-normal m-0">
                            {currentTestimonial.description}
                        </p>
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col gap-3 lg:gap-8 xl:gap-10">
                        <div className="flex items-start">
                            <span className="min-w-16 lg:min-w-20 text-[10px] lg:text-xs text-[#999] capitalize pt-[0.2rem]">Company</span>
                            <span className="text-xs sm:text-sm lg:text-base text-black font-medium leading-[1.4] flex-1">{currentTestimonial.Company}</span>
                        </div>
                        <div className="flex items-start">
                            <span className="min-w-16 lg:min-w-20 text-[10px] lg:text-xs text-[#999] capitalize pt-[0.2rem]">Name</span>
                            <span className="text-xs sm:text-sm lg:text-base text-black font-medium leading-[1.4] flex-1">{currentTestimonial.Name}</span>
                        </div>
                        <div className="flex items-start">
                            <span className="min-w-16 lg:min-w-20 text-[10px] lg:text-xs text-[#999] capitalize pt-[0.2rem]">Site</span>
                            <span className="text-xs sm:text-sm lg:text-base text-black font-medium leading-[1.4] flex-1">
                                <a href={currentTestimonial.Site} target="_blank" rel="noopener noreferrer"
                                    className="text-inherit underline underline-offset-2 lg:underline-offset-4">
                                    {currentTestimonial.Site}
                                </a>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="mt-auto mb-35 lg:mb-[11.2rem] pl-0 lg:pl-[2.8rem] grid grid-cols-1 lg:grid-cols-[auto_1fr] xl:grid-cols-[818px_auto] gap-x-4 lg:gap-x-8 xl:gap-x-24 items-center w-full lg:w-fit">
                    {/* Progress wrapper */}
                    <div className="flex items-center gap-4 lg:gap-8 xl:gap-12 order-1 lg:order-1 mb-10 lg:mb-0 justify-center md:justify-center">
                        {/* Progress bar track */}
                        <div className="w-[300px] sm:w-[300px] md:w-[500px] lg:w-[400px] xl:w-[700px] h-1 bg-[#e0e0e0] relative shrink-0">
                            <div
                                className="absolute left-0 top-0 h-full bg-black origin-left transition-[transform] duration-[1ms] ease-linear"
                                style={{ width: `${progressWidth}%` }}
                            />
                        </div>
                        {/* Progress number */}
                        <div className="text-[0.8rem] lg:text-[0.9rem] font-medium tracking-[0.05em] text-[#333] w-[60px] lg:w-[70px] flex-[0_0_60px] lg:flex-[0_0_70px] text-left tabular-nums">
                            0{activeIndex + 1} <span className="mx-1 lg:mx-2 text-[#ccc]">|</span> 0{totalSliders}
                        </div>
                    </div>
                    {/* Action buttons */}
                    <div className="flex gap-2 lg:gap-1 justify-center lg:justify-start order-2 lg:order-2 mb-4 lg:mb-0">
                        {/* Prev arrow */}
                        <div
                            style={{ '--btn-height': '35.8px' }}
                            className={`w-[35.8px] h-[35.8px] flex items-center justify-center shrink-0 overflow-hidden
                                        ${activeIndex === 0
                                    ? 'bg-[#f5f5f5] cursor-default pointer-events-none [&_.arrow-button-container]:bg-[#656565]! [&_.arrow-button]:text-white!'
                                    : ''}`}
                            onClick={handlePrev}
                        >
                            <ArrowButton direction="left" disabled={activeIndex === 0} />
                        </div>

                        {/* Motion toggle */}
                        <button
                            className="border-none cursor-pointer flex items-center justify-between
                                       h-[35.8px] w-[80px] px-2 bg-black text-white text-[0.85rem]
                                       capitalize leading-none gap-[0.35rem] shrink-0 whitespace-nowrap
                                       font-medium transition-[background,filter] duration-300 ease
                                       hover:brightness-110 [text-rendering:optimizeLegibility]"
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            Motion
                            <span className="bg-white w-[14px] h-[14px] flex items-center justify-center rounded-full shrink-0 ml-auto">
                                <img
                                    src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
                                    alt={isPlaying ? "pause" : "play"}
                                    className="w-[85%] h-[85%] object-contain block pointer-events-none"
                                />
                            </span>
                        </button>

                        {/* Next arrow */}
                        <div
                            style={{ '--btn-height': '35.8px' }}
                            className={`w-[35.8px] h-[35.8px] flex items-center justify-center shrink-0 overflow-hidden
                                        ${activeIndex === totalSliders - 1
                                    ? 'bg-[#f5f5f5] cursor-default pointer-events-none [&_.arrow-button-container]:bg-[#656565]! [&_.arrow-button]:text-white!'
                                    : ''}`}
                            onClick={handleNext}
                        >
                            <ArrowButton direction="right" disabled={activeIndex === totalSliders - 1} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
