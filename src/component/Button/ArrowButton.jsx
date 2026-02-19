import { MdArrowForward, MdArrowBack } from 'react-icons/md';

const ArrowButton = ({ direction = 'right', disabled = false, className = "" }) => {
    const ArrowIcon = direction === 'left' ? MdArrowBack : MdArrowForward;
    const isLight = className.includes('btn-light');
    const isLeft = direction === 'left';

    const containerClasses = `
        flex items-center justify-center overflow-hidden
        transition-colors duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isLight ? 'bg-white group-hover:bg-[#f0f0f0]' : 'bg-black group-hover:bg-[#1a1a1c]'}
        w-[var(--btn-height,52px)] h-[var(--btn-height,52px)]
        arrow-button-container
        ${className}
    `.replace(/\s+/g, ' ').trim();

    return (
        <div
            className={`group/arrow ${containerClasses} ${disabled ? 'opacity-30 pointer-events-none grayscale' : 'cursor-pointer'}`}
        >
            <div className="relative flex h-full w-[40%] items-center justify-center overflow-hidden pointer-events-none">
                {/* Default Icon */}
                <span className={`
                    inline-block will-change-transform transform-gpu
                    ${isLight ? 'text-black' : 'text-white'}
                    ${!isLeft && !disabled ? 'group-hover/arrow:transition-all group-hover/arrow:duration-[750ms] group-hover/arrow:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/arrow:translate-x-full group-hover/arrow:opacity-0 group-hover:transition-all group-hover:duration-[750ms] group-hover:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full group-hover:opacity-0' : ''}
                `.replace(/\s+/g, ' ').trim()}>
                    <ArrowIcon size={20} />
                </span>

                {/* Hover Icon (slides in)*/}
                {!isLeft && !disabled && (
                    <span className={`
                        absolute left-1/2 top-1/2 -translate-y-1/2 opacity-0 -translate-x-[150%]
                        ${isLight ? 'text-black' : 'text-white'}
                        group-hover/arrow:transition-all group-hover/arrow:duration-[750ms] group-hover/arrow:delay-[150ms] group-hover/arrow:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/arrow:-translate-x-1/2 group-hover/arrow:opacity-100
                        group-hover:transition-all group-hover:duration-[750ms] group-hover:delay-[150ms] group-hover:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1/2 group-hover:opacity-100
                    `.replace(/\s+/g, ' ').trim()}>
                        <ArrowIcon size={20} />
                    </span>
                )}
            </div>
        </div>
    );
};

export default ArrowButton;
