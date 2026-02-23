import ArrowButton from '../../component/Button/ArrowButton.jsx';
import { FOOTER_DATA } from './footerData.js';
import { MdArrowUpward } from 'react-icons/md';
import LogoMark from '../../component/Logo/LogoMark.jsx';
import { useEffect, useRef, useState } from 'react';

// ── Reusable Tailwind class strings ─────────────────────────────────────────

// Underline that scaleX-animates out on hover (description paragraphs)
const descUnderline =
    "relative inline-block pb-[4px] cursor-pointer " +
    "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-black " +
    "after:scale-x-100 after:origin-left " +
    "after:transition-transform after:duration-[400ms] after:[transition-timing-function:cubic-bezier(0.5,0,0,1)] " +
    "hover:after:scale-x-0 hover:after:origin-right";

// Same underline animation for nav links (pb-[2px] instead of 4px)
const navLinkUnderline =
    "relative pb-[2px] " +
    "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-black " +
    "after:scale-x-100 after:origin-left " +
    "after:transition-transform after:duration-[400ms] after:[transition-timing-function:cubic-bezier(0.5,0,0,1)] " +
    "hover:after:scale-x-0 hover:after:origin-right";

// External-link corner-bracket icon base (4×4 box with ::before & ::after corners)
const extIconBase =
    "inline-block w-[4px] h-[4px] border border-black ml-[10px] align-middle relative top-[-3px] " +
    // bottom-left corner (::before)
    "before:content-[''] before:absolute before:bottom-[-1px] before:left-[-1px] " +
    "before:w-[3px] before:h-[3px] before:border-b before:border-l before:border-black " +
    "before:transition-all before:duration-200 before:ease " +
    // top-right corner (::after)
    "after:content-[''] after:absolute after:top-[-3px] after:right-[-3px] " +
    "after:w-[3px] after:h-[3px] after:border-t after:border-r after:border-black " +
    "after:transition-all after:duration-200 after:ease";

// On hover move ::after inward (top-right corner contracts)
const extIconHoverAfter = "group-hover:after:top-[-1px] group-hover:after:right-[-1px]";
// On hover move ::before outward (bottom-left corner expands)
const extIconHoverBefore = "group-hover:before:bottom-[-3px] group-hover:before:left-[-3px]";

export default function Footer() {
    const [logoVisible, setLogoVisible] = useState(false);
    const logoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setLogoVisible(true), 100);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (logoRef.current) observer.observe(logoRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <footer className="w-full bg-white py-16">

            {/* ── Top cards grid ── */}
            <div className="max-w-[1600px] mx-auto px-10 flex justify-center gap-8 flex-wrap">
                {FOOTER_DATA.map((item) => (
                    <div
                        key={item.id}
                        className="flex-1 max-w-[755px] min-w-[300px] h-[175px] px-[46px] py-[51px]
                                   border border-[#e0e0e0] flex flex-col relative
                                   transition-all duration-300 cursor-pointer box-border
                                   hover:border-black hover:bg-[#fafafa] group"
                    >
                        <div className="text-[0.6rem] font-semibold tracking-widest text-[#666] mb-2">
                            {item.label}
                        </div>
                        <h2 className="text-2xl font-bold text-black m-0 mb-2 leading-[1.2]">
                            {item.title}
                        </h2>
                        <p className="text-[15px] leading-[1.4] text-[#141414] m-0 max-w-[577px] tracking-[0.01em]">
                            {item.description}
                        </p>
                        {/* Arrow — absolutely centred on right */}
                        <div className="absolute right-[46px] top-1/2 -translate-y-1/2
                                        [&_.arrow-button]:bg-black [&_.arrow-button]:text-white
                                        [&_.arrow-button]:w-10 [&_.arrow-button]:h-10 [&_.arrow-button]:min-w-[40px]
                                        group-hover:[&_.arrow-button]:bg-[#1a1a1a]">
                            <ArrowButton direction="right" />
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Bottom section ── */}
            <div className="max-w-[1600px] mx-auto mt-16 px-10 font-sans box-border">

                {/* Left col + Right col */}
                <div className="flex flex-col md:flex-row items-start mb-16 w-full max-w-[1542px] mx-auto gap-12 md:gap-8">

                    {/* Left col */}
                    <div className="flex flex-col gap-6 w-[200px]">

                        {/* Address */}
                        <div className="text-[11px] leading-relaxed text-[#444]">
                            <p className="m-0">990-2462</p>
                            <p className="m-0">Yamagata Prefecture Yamagata City Fukamachi 2-2-22</p>
                            {/* group on <a> so ext-icon responds to link hover */}
                            <a href="#" className="group inline-block mt-2 text-black underline text-[12px]">
                                Google Map
                                <span className={`${extIconBase} ${extIconHoverAfter} ${extIconHoverBefore}`} />
                            </a>
                        </div>

                        {/* Social links */}
                        <div className="border-t border-[#eee]">
                            {['X', 'Instagram', 'Facebook'].map((name) => (
                                // group on each row so ext-icon responds to row hover
                                <div
                                    key={name}
                                    className="group flex justify-between items-center py-[0.6rem]
                                               border-b border-[#eee] text-[13px] text-black cursor-pointer"
                                >
                                    <span>{name}</span>
                                    <span className={`${extIconBase} ${extIconHoverAfter} ${extIconHoverBefore}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right col — nav links */}
                    <div className="flex-1">
                        <nav className="flex flex-wrap justify-end gap-x-14 gap-y-4  w-full">
                            {['Home', 'About Us', 'Our Strengths', 'Production Achievements', 'Services', 'News', 'Careers', 'Contact us'].map((label) => (
                                <a
                                    key={label}
                                    href="#"
                                    className={`${navLinkUnderline} text-[14px] font-medium text-black no-underline whitespace-nowrap`}
                                >
                                    {label}
                                </a>
                            ))}
                        </nav>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="flex justify-between items-end py-8 border-t border-[#f0f0f0]">
                    <div className="text-[12px] text-[#888]">© 2026 TECH TRIBE PVT LTD.</div>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-[12px] text-black underline">Privacy Policy</a>

                        {/* group on button so the two arrow icons can respond to button hover */}
                        <button
                            className="group bg-black text-white border-0 py-[0.1rem] px-4
                                       text-[12px] font-semibold cursor-pointer
                                       flex items-center gap-2
                                       hover:bg-[#272626] transition-colors duration-200"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <span>Top</span>
                            <div className="relative w-[18px] h-[18px] overflow-hidden flex items-center justify-center">
                                {/* default arrow — slides up on hover */}
                                <MdArrowUpward
                                    size={18}
                                    className="absolute
                                               transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]
                                               group-hover:-translate-y-full"
                                />
                                {/* hover arrow — starts below, slides into view */}
                                <MdArrowUpward
                                    size={18}
                                    className="absolute translate-y-full
                                               transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]
                                               group-hover:translate-y-0"
                                />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Big logo */}
                <div
                    ref={logoRef}
                >
                    <LogoMark
                        theme="dark"
                        animate={logoVisible}
                        variant="large"
                        textHeight="35vh"
                        iconHeight="75vh"
                    />
                </div>
            </div>
        </footer>
    );
} 