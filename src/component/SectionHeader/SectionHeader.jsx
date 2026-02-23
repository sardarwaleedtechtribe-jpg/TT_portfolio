const SectionHeader = ({ label, title, theme = 'light', titleId }) => {
    const isDark = theme === 'dark';

    return (
        <div className="ml-12">
            <div className={isDark
                ? "relative z-10 flex items-center gap-2 text-[12px] tracking-widest text-white"
                : "flex items-center gap-2 text-[12px] tracking-widest text-black"}>
                <span className={isDark
                    ? "w-[5px] h-[5px] bg-white rounded-none -mb-2"
                    : "w-[5px] h-[5px] bg-black rounded-none -mb-2"} aria-hidden="true" />
                <span className="font-bold -mb-2">{label}</span>
            </div>

            <div className={isDark
                ? "relative z-10 mt-4 mb-10 h-px bg-white/30"
                : "mt-4 mb-10 h-px bg-black/10"} />

            <div className={isDark
                ? "relative z-10 flex flex-col text-white"
                : "flex justify-between items-start gap-16 mt-12 text-black"}>
                <h1 id={titleId} className={`text-[52px] font-['Barlow'] font-extrabold tracking-[-0.02em] leading-[0.9] transition-all duration-300 ease-in-out ${isDark ? 'm-0' : '-mt-5'}`}>
                    {title}
                </h1>
            </div>
        </div >
    );
};

export default SectionHeader;
