import { Link } from 'react-router-dom';

const NavArrow = ({ className = "", as: Component = 'span', variant = 'default' }) => {
    const getArrowClasses = (index) => {
        if (index === 1) {
            const base = "inline-block translate-x-0 opacity-100 whitespace-nowrap";
            const hover =
                variant === 'card' ? "group-hover:transition-all group-hover:duration-[400ms] group-hover:cubic-bezier-[0.16,1,0.3,1] group-hover:translate-x-full group-hover:opacity-0" :
                    variant === 'sub' ? "group-hover/sub:transition-all group-hover/sub:duration-[400ms] group-hover/sub:cubic-bezier-[0.16,1,0.3,1] group-hover/sub:translate-x-full group-hover/sub:opacity-0" :
                        "group-hover:transition-all group-hover:duration-[400ms] group-hover:cubic-bezier-[0.16,1,0.3,1] group-hover:translate-x-full group-hover:opacity-0";
            return `${base} ${hover}`;
        } else {
            const base = "absolute top-1/2 left-1/2 -translate-x-[150%] -translate-y-1/2 opacity-0 inline-block whitespace-nowrap";
            const hover =
                variant === 'card' ? "group-hover:transition-all group-hover:duration-[400ms] group-hover:cubic-bezier-[0.16,1,0.3,1] group-hover:-translate-x-1/2 group-hover:opacity-100 group-hover:delay-[300ms]" :
                    variant === 'sub' ? "group-hover/sub:transition-all group-hover/sub:duration-[400ms] group-hover/sub:cubic-bezier-[0.16,1,0.3,1] group-hover/sub:-translate-x-1/2 group-hover/sub:opacity-100 group-hover/sub:delay-[300ms]" :
                        "group-hover:transition-all group-hover:duration-[400ms] group-hover:cubic-bezier-[0.16,1,0.3,1] group-hover:-translate-x-1/2 group-hover:opacity-100 group-hover:delay-[300ms]";
            return `${base} ${hover}`;
        }
    };

    return (
        <Component className={`relative flex items-center justify-center h-[1.2em] w-[1.2em] overflow-hidden ${className}`}>
            <span className={getArrowClasses(1)}>→</span>
            <span className={getArrowClasses(2)}>→</span>
        </Component>
    );
};

import { TOP_CARDS, MENU_ITEMS } from './MenuData';

const MenuPanel = ({ isOpen, handleNavigation }) => {
    return (
        <div className={`
            relative mb-[5px] w-[395px] h-[58vh] md:h-[78vh] md:w-[622px] lg:w-[635px] xl:w-[655px] 2xl:w-[715px] max-w-[97vw] 
            bg-[rgb(10,10,10)] rounded-[2px] shadow-[0_10px_40px_rgba(0,0,0,0.8)]
            border border-white/10 overflow-y-auto overflow-x-hidden
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            pointer-events-auto
            transition-all duration-500 cubic-bezier-[0.4,0,0.2,1]
            ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-[16px] invisible'}
        `.replace(/\s+/g, ' ').trim()}>

            <div className="px-4 md:px-7 lg:px-10 xl:px-14 2xl:px-22 py-3 xl:py-4 text-white font-['Inter',sans-serif]">
                {/* Top Cards Section */}
                <div className="flex gap-3 mb-[20px]">
                    {TOP_CARDS.map(card => (
                        <Link
                            key={card.id}
                            to={card.path}
                            className="group flex-1 border border-white/20 p-[10px_15px] flex items-center justify-between relative cursor-pointer transition-colors duration-200 hover:bg-white/5 no-underline text-white"
                            onClick={(e) => handleNavigation(e, card.path)}
                        >
                            <div>
                                <div className="text-[9px] font-semibold mb-[3px] flex items-center gap-[6px]">
                                    <span className="inline-block w-[2.5px] h-[2.5px] bg-white"></span>
                                    {card.label}
                                </div>
                                <div className="text-[10px] sm:text-[10.5px] lg:text-[11px] xl:text-[12px] font-bold tracking-[0.5px]">
                                    {card.title}
                                </div>
                            </div>
                            <NavArrow as="div" className="text-[18px] opacity-70" />
                        </Link>
                    ))}
                </div>

                {/* Main Menu List */}
                <ul className="list-none p-0 m-0 border-b border-white/15">
                    {MENU_ITEMS.map((item, idx) => (
                        <li key={idx} className={`
                            border-t border-white/15 py-3 flex flex-wrap justify-between items-center
                            ${item.active ? 'active' : ''}
                        `.replace(/\s+/g, ' ').trim()}>
                            <div className="group flex justify-between items-center w-full">
                                {item.path ? (
                                    <Link
                                        to={item.path}
                                        className={`
                                            text-[12px] sm:text-[13px] lg:text-[13.5px] xl:text-[14.5px] 2xl:text-[16px] font-bold tracking-[0.5px] cursor-pointer no-underline text-white relative
                                            ${item.underline || item.active ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-white after:origin-left after:transition-transform after:duration-400 after:cubic-bezier-[0.16,1,0.3,1] hover:after:scale-x-0 hover:after:origin-right' : ''}
                                        `.replace(/\s+/g, ' ').trim()}
                                        onClick={(e) => handleNavigation(e, item.path)}
                                    >
                                        {item.text}
                                    </Link>
                                ) : (
                                    <span className={`
                                        text-[15px] sm:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] font-bold tracking-[0.5px] cursor-pointer text-white relative
                                        ${item.underline ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-white after:origin-left after:transition-transform after:duration-400 after:cubic-bezier-[0.16,1,0.3,1] hover:after:scale-x-0 hover:after:origin-right' : ''}
                                    `.replace(/\s+/g, ' ').trim()}>
                                        {item.text}
                                    </span>
                                )}

                                <NavArrow className="text-[18px] opacity-70" />
                            </div>

                            {item.subItems && (
                                <ul className="w-full list-none p-[10px_0_0_15px] m-0 flex flex-col gap-2">
                                    {item.subItems.map((sub, sIdx) => (
                                        <li key={sIdx} className="group/sub text-[13px] font-normal text-white/70 flex justify-between cursor-pointer transition-colors duration-200 hover:text-white">
                                            {sub} <NavArrow variant="sub" className="text-[14px] opacity-50" />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="flex justify-end py-3">
                    <a href="#privacy" className={`
                        text-white/40 text-[10px] no-underline transition-colors duration-200 hover:text-white relative
                        after:content-[""] after:absolute after:left-0 after:-bottom-px after:w-full after:h-px after:bg-current after:origin-left after:transition-transform after:duration-400 after:cubic-bezier-[0.16,1,0.3,1] hover:after:scale-x-0 hover:after:origin-right
                    `.replace(/\s+/g, ' ').trim()}>
                        Privacy Policy
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MenuPanel;
