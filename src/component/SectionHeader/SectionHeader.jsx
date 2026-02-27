const SectionHeader = ({ label, title, theme = 'light', titleId, size = 'default' }) => {
    const isDark = theme === 'dark';
    const isSmall = size === 'small';

    return (
        <div className="ml-4 sm:ml-8 lg:ml-20">
            <div className={isDark
                ? "relative z-10 flex items-center gap-2 text-[10px] sm:text-[11px] lg:text-[12px] tracking-widest text-white"
                : "flex items-center gap-2 text-[10px] sm:text-[11px] lg:text-[12px] tracking-widest text-black"}>
                <span className={isDark
                    ? "w-[4px] h-[4px] sm:w-[5px] sm:h-[5px] bg-white rounded-none -mb-2"
                    : "w-[4px] h-[4px] sm:w-[5px] sm:h-[5px] bg-black rounded-none -mb-2"} aria-hidden="true" />
                <span className="font-bold -mb-2 tracking-widest">{label}</span>
            </div>

            <div className={isDark
                ? "relative z-10 mt-4 mb-10 h-px bg-white/30"
                : "mt-4 mb-10 h-px bg-black/10"} />

            <div className={isDark
                ? "relative z-10 flex flex-col text-white"
                : "flex justify-between items-start gap-8 sm:gap-12 lg:gap-16 mt-8 sm:mt-10 lg:mt-12 text-black"}>
                <h1 id={titleId} className={`font-['Barlow'] tracking-[0.065em] leading-[0.9] transition-all duration-300 ease-in-out ${isDark ? 'm-0' : '-mt-5'} ${isSmall
                    ? 'text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] font-semibold'
                    : 'text-[28px] sm:text-[36px] lg:text-[44px] xl:text-[47px] font-extrabold'
                    }`}>
                    {title}
                </h1>
            </div>
        </div >
    );
};

export default SectionHeader;
