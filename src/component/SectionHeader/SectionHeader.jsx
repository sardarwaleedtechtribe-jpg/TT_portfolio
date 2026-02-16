const SectionHeader = ({ label, title, theme = 'light', titleId }) => {
    const isDark = theme === 'dark';

    return (
        <div className="ml-12">
            <div className={isDark
                ? "relative z-10 flex items-center gap-2 text-[11px] uppercase text-white"
                : "flex items-center gap-2 text-[11px] text-black"}>
                <span className={isDark
                    ? "w-[6px] h-[6px] bg-white rounded-none"
                    : "w-1 h-1 bg-black rounded-none"} aria-hidden="true" />
                <span>{label}</span>
            </div>

            <div className={isDark
                ? "relative z-10 mt-3 mb-8 h-[1px] bg-white/30"
                : "mt-3 mb-8 h-[1px] bg-black/10"} />

            <div className={isDark
                ? "relative z-10 flex flex-col text-white"
                : "flex justify-between items-start gap-16 mt-20 text-black"}>
                <h1 id={titleId} className={`text-[41px] font-['Barlow'] tracking-[0.1em] transition-all duration-300 ease-in-out ${isDark ? 'm-0' : '-mt-12'}`}>
                    {title}
                </h1>
            </div>
        </div>
    );
};

export default SectionHeader;
