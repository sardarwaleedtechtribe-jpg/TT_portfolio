const LogoMark = ({ theme = 'light', animate = null }) => {
    const isDark = theme === 'dark';
    const isAnimateInit = animate === false;
    const isAnimateStart = animate === true;

    // Animation transition styles
    const transitionStyles = "transition-[opacity,transform,clip-path] duration-[1.8s] ease-[cubic-bezier(0.19,1,0.22,1)]";

    // Base animation states
    const getAnimationState = (delay) => {
        if (animate === null) return "";
        return isAnimateStart
            ? `opacity-100 translate-y-0 [clip-path:inset(0_0_0_0)] ${transitionStyles} ${delay}`
            : "opacity-0 translate-y-[60px] [clip-path:inset(100%_0_0_0)]";
    };

    const textBase = `font-['Inter'] font-extrabold text-[26px] leading-[0.85] tracking-[-0.02em] ${isDark ? 'text-black' : 'text-[#f0f0f0]'}`;

    return (
        <div className="flex items-center justify-start gap-[1px] mb-[2px]">
            <div className="flex flex-col justify-center">
                <span className={`${textBase} mb-1 ${getAnimationState('delay-0')}`}>TECH</span>
                <span className={`${textBase} mt-1 ${getAnimationState('delay-[0.15s]')}`}>TRIBE</span>
            </div>
            <div className="flex-shrink-0">
                <img  src="/logo/t.svg"  alt="T Logo"
                    className={`h-[58px] w-auto block ${isDark ? 'brightness-0' : 'drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]'} ${getAnimationState('delay-[0.3s]')}`}
                />
            </div>
        </div>
    );
};

export default LogoMark;