import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuPanel from './MenuPanel';
import { useTransition } from '../TransitionContext';

const Navbar = () => {
    const { isTransitioning, transitionTo } = useTransition();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', hoverName: 'HOME', path: '/' },
        { name: 'About us', hoverName: 'ABOUT', path: '/about' },
        { name: 'Works', hoverName: 'WORKS', path: '/work' },
        { name: 'Our Strengths', hoverName: 'STRENGTHS', path: '/strengths' },
        { name: 'Service', hoverName: 'SERVICE', path: '/services' },
        { name: 'News', hoverName: 'NEWS', path: '/news' },
        { name: 'Recruit', hoverName: 'RECRUIT', path: '/recruit' },
        { name: 'Contact', hoverName: 'CONTACT', path: '/contact' }
    ];

    const marqueeItems = [
        "TechTribe — building modern web, mobile & AI solutions.", "Code. Create. Innovate — the TechTribe way.",
        "Empowering developers with real-world technology.", "From ideas to scalable digital products.",
        "TechTribe — learn fast, build smarter, grow together."
    ];

    const closeMenu = () => setIsOpen(false);

    const handleNavigation = (e, path) => {
        e.preventDefault();
        closeMenu();
        transitionTo(path);
    };

    return (
        <div className="fixed bottom-[27px] left-1/2 -translate-x-1/2 z-10000 flex flex-col items-center pointer-events-none">
            <style>
                {`
                    @keyframes marquee-walk {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-50% - 20px)); }
                    }
                `}
            </style>

            <MenuPanel isOpen={isOpen} handleNavigation={handleNavigation} />

            <div className="relative flex items-center">
                <nav className={`
                    w-[335px]  md:w-[560px] lg:w-[573px] xl:w-[590px] 2xl:w-[640px] h-[41px] lg:h-[43px] xl:h-[44px] 2xl:h-[48px] bg-[rgb(20,20,20)] rounded-[3px] flex items-center justify-between px-0 box-border shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 pointer-events-auto relative
                    before:content-[''] before:absolute before:inset-[2px] before:border before:border-white/20 before:rounded-[2px] before:transition-opacity before:duration-300 before:pointer-events-none
                    ${isOpen ? 'before:opacity-100' : 'before:opacity-0'}
                `}>
                    <div className="flex-1 h-full flex items-center overflow-hidden">
                        <ul className={`flex items-center list-none m-0 p-0 gap-1 flex-1 transition-all duration-400 justify-center ${isOpen ? 'translate-y-12 opacity-0 pointer-events-none' : ''}`}>
                            {navLinks.map((link) => (
                                <li
                                    key={link.name}
                                    className={`group ${['Our Strengths', 'News', 'Recruit'].includes(link.name) ? 'hidden md:block' : ''}`}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={(e) => handleNavigation(e, link.path)}
                                        className="text-white no-underline font-['Inter'] text-[10.5px] lg:text-[11px] xl:text-[11px] 2xl:text-[12px] font-medium tracking-[1px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap border border-white/20 px-[10px] lg:px-[11px] xl:px-[12px] 2xl:px-[14px] h-[33px] lg:h-[34px] xl:h-[36px] 2xl:h-[39px] flex items-center justify-center rounded-[2px] leading-none hover:bg-white/10 hover:border-white/40"
                                    >
                                        <span className="h-[1.25em] relative overflow-hidden flex items-center justify-center">
                                            <span className="block transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[150%] will-change-transform">{link.name}</span>
                                            <span className="absolute block transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-[150%] group-hover:translate-y-0 will-change-transform text-[0.72em]">{link.hoverName}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className={`absolute left-[10px] right-[10px] text-white font-['Inter'] text-sm font-medium tracking-[1px] transition-all duration-400 pointer-events-none overflow-hidden ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
                            <div className="w-full overflow-hidden">
                                <div className={`flex whitespace-nowrap gap-10 ${isOpen ? 'animate-[marquee-walk_8s_linear_infinite]' : 'animate-[marquee-walk_15s_linear_infinite] [animation-play-state:paused]'}`}>
                                    {[...marqueeItems, ...marqueeItems].map((text, index) => (
                                        <span key={index} className="shrink-0">{text}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div
                    className={`
                        group/icon text-[#646262] bg-[rgb(20,20,20)] cursor-pointer flex items-center justify-center h-full px-2 lg:px-[7px] xl:px-[9px] 2xl:px-[11px] py-[16px] lg:py-[16.5px] xl:py-[17px] 2xl:py-[19px] rounded-[3px] ml-2 pointer-events-auto border border-[rgba(53,51,51,0.2)] transition-all duration-200
                        hover:bg-[rgb(36,34,34)] hover:border-white/50
                    `}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="relative w-[35px] lg:w-[37px] xl:w-[39px] 2xl:w-[44px] h-[7px] translate-y-[2px]">
                        <span className={`
                            absolute block w-full h-px bg-[rgb(255,255,255)] transition-all duration-300 ease-in-out 
                            ${isOpen ? 'rotate-35 translate-y-0 group-hover/icon:rotate-25' : '-translate-y-[2.5px]'}
                        `} />
                        <span className={`
                            absolute block w-full h-px bg-[rgb(255,255,255)] transition-all duration-300 ease-in-out 
                            ${isOpen ? 'rotate-[-35deg] translate-y-0 group-hover/icon:rotate-[-25deg]' : 'translate-y-[2.5px]'}
                        `} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
