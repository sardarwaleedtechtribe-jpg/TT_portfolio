const LogoMark = ({ theme = 'light', animate = null, variant = 'default', textHeight = null, iconHeight = null }) => {
    const isDark = theme === 'dark';
    const isLarge = variant === 'large';
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

    const textBase = `font-['Inter'] font-extrabold ${isLarge ? 'text-[clamp(100px,25vw,300px)]' : 'text-[26px]'} leading-[0.85] tracking-[-0.02em] ${isDark ? 'text-black' : 'text-[#f0f0f0]'}`;

    return (
        <div className={`flex items-center w-full ${isLarge ? 'justify-center ' : 'justify-start'}`}>
            <div className="flex flex-col justify-center shrink-0">
                {[
                    { src: '/logo/TECH.svg', alt: 'TECH', delay: 'delay-0', mb: 'mb-[1vh]' },
                    { src: '/logo/TRIBE.svg', alt: 'TRIBE', delay: 'delay-150', mb: '' }
                ].map((logo, index) => (
                    <img
                        key={index}
                        src={logo.src}
                        alt={logo.alt}
                        style={textHeight ? { height: textHeight } : {}}
                        className={`${!textHeight ? (isLarge ? 'h-[32vh]' : 'h-[14px]') : ''} w-auto block ${isDark ? 'brightness-0' : 'brightness-0 invert'} ${getAnimationState(logo.delay)} ${logo.mb}`}
                    />
                ))}
            </div>
            <div className="shrink-0">
                <img src="/icons/T.svg" alt="T Logo"
                    style={iconHeight ? { height: iconHeight } : {}}
                    className={`${!iconHeight ? (isLarge ? 'h-[clamp(600px,100vw,2000px)]' : 'h-[46px]') : ''} w-auto block ${isDark ? 'brightness-0' : 'brightness-0 invert'}${isDark ? '' : ' drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]'} ${getAnimationState('delay-300')}`}
                />
            </div>
        </div>
    );
};

export default LogoMark; 