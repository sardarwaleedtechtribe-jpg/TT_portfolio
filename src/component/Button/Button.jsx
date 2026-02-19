import React from 'react';
import ArrowButton from './ArrowButton.jsx';

const Button = ({ text = "Learn more about us", onClick, showArrow = true, className = "", disabled = false }) => {
    const isLight = className.includes('btn-light');

    const groupClasses = `
        flex items-center gap-[1px] mt-8 p-0 border-none bg-transparent text-left
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        group button-group ${className}
    `.replace(/\s+/g, ' ').trim();

    const aboutButtonClasses = `
        px-8 flex items-center justify-center relative overflow-hidden
        h-[var(--btn-height,52px)] min-h-[var(--btn-height,52px)]
        transition-colors duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isLight ? 'bg-white text-black group-hover:bg-[#f0f0f0]' : 'bg-black text-white group-hover:bg-[#1a1a1c]'}
        about-button
    `.replace(/\s+/g, ' ').trim();

    return (
        <button
            className={groupClasses}
            onClick={onClick}
            disabled={disabled}
            aria-label={text}
        >
            <div className={aboutButtonClasses}>
                <div className="relative h-[1.2em] flex items-center justify-center overflow-hidden pointer-events-none">
                    {/* Default Text */}
                    <span className={`
                        block font-semibold text-base whitespace-nowrap leading-none button-text
                        ${!disabled ? 'group-hover:transition-all group-hover:duration-[750ms] group-hover:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[150%] group-hover:opacity-0' : ''}
                    `.replace(/\s+/g, ' ').trim()}>
                        {text}
                    </span>
                    {/* Hover Text */}
                    <span className={`
                        absolute top-0 block font-semibold text-base whitespace-nowrap leading-none button-text
                        translate-y-[150%] opacity-0
                        ${!disabled ? 'group-hover:transition-all group-hover:duration-[750ms] group-hover:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100' : ''}
                    `.replace(/\s+/g, ' ').trim()}>
                        {text}
                    </span>
                </div>
            </div>

            {showArrow && <ArrowButton className={className} />}
        </button>
    );
};

export default Button;