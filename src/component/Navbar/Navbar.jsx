import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MenuPanel from './MenuPanel';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
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
        if (location.pathname === path) {
            closeMenu();
            return;
        }
        closeMenu();
        setIsTransitioning(true);
        setTimeout(() => {
            navigate(path);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 800);
        }, 800);
    };

    return (
        <div className="fixed bottom-[35px] left-1/2 -translate-x-1/2 z-[10000] flex flex-col items-center pointer-events-none">
            <style>
                {`
                    @keyframes marquee-walk {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-50% - 20px)); }
                    }
                `}
            </style>

            <div className={`fixed top-0 bottom-0 left-1/2 w-[100vw] h-[150vh] bg-black z-[9999] pointer-events-none transition-transform duration-[800ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${isTransitioning ? '-translate-x-1/2 -translate-y-[33%]' : '-translate-x-1/2 translate-y-full'}`} />

            <MenuPanel isOpen={isOpen} handleNavigation={handleNavigation} />

            <div className="relative flex items-center">
                <nav className={`
                    w-[835px] h-[53px] bg-[rgb(20,20,20)] rounded-[3px] flex items-center justify-between px-1 box-border shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 pointer-events-auto relative
                    before:content-[''] before:absolute before:inset-[2px] before:border before:border-white/20 before:rounded-[2px] before:transition-opacity before:duration-300 before:pointer-events-none
                    ${isOpen ? 'before:opacity-100' : 'before:opacity-0'}
                `}>
                    <div className="flex-1 h-full flex items-center overflow-hidden">
                        <ul className={`flex items-center list-none m-0 p-0 gap-1 flex-1 transition-all duration-400 justify-center ${isOpen ? 'translate-y-12 opacity-0 pointer-events-none' : ''}`}>
                            {navLinks.map((link) => (
                                <li key={link.name} className="group">
                                    <Link
                                        to={link.path}
                                        onClick={(e) => handleNavigation(e, link.path)}
                                        className="text-white no-underline font-['Inter'] text-[12.5px] font-medium tracking-[1.25px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap border border-white/20 px-[17.8px] h-[42px] flex items-center justify-center rounded-[2px] leading-none hover:bg-white/10 hover:border-white/40"
                                    >
                                        <span className="h-[1.25em] relative overflow-hidden flex items-center justify-center px-[5px]">
                                            <span className="block transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[150%] will-change-transform">{link.name}</span>
                                            <span className="absolute block transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-[150%] group-hover:translate-y-0 will-change-transform text-[0.82em]">{link.hoverName}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className={`absolute left-[10px] right-[10px] text-white font-['Inter'] text-sm font-medium tracking-[1px] transition-all duration-400 pointer-events-none overflow-hidden ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
                            <div className="w-full overflow-hidden">
                                <div className={`flex whitespace-nowrap gap-10 ${isOpen ? 'animate-[marquee-walk_25s_linear_infinite]' : 'animate-[marquee-walk_25s_linear_infinite] [animation-play-state:paused]'}`}>
                                    {[...marqueeItems, ...marqueeItems].map((text, index) => (
                                        <span key={index} className="flex-shrink-0">{text}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div
                    className={`
                        group/icon text-[#646262] bg-[rgb(20,20,20)] cursor-pointer flex items-center justify-center h-full px-2 py-[22px] rounded-[3px] absolute left-[calc(100%+8px)] top-0 pointer-events-auto border border-[rgba(53,51,51,0.2)] transition-all duration-200
                        hover:bg-[rgb(36,34,34)] hover:border-white/50
                    `}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="relative w-[45px] h-[1px]">
                        <span className={`
                            absolute block w-full h-[1px] bg-[rgb(169,162,162)] transition-all duration-300 ease-in-out 
                            ${isOpen ? 'rotate-[35deg] translate-y-0 group-hover/icon:rotate-[25deg]' : '-translate-y-[2.5px]'}
                        `}></span>
                        <span className={`
                            absolute block w-full h-[1px] bg-[rgb(169,162,162)] transition-all duration-300 ease-in-out 
                            ${isOpen ? 'rotate-[-35deg] translate-y-0 group-hover/icon:rotate-[-25deg]' : 'translate-y-[2.5px]'}
                        `}></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
