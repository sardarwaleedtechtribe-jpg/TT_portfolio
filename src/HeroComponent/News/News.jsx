import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MdArrowForward } from 'react-icons/md';
import Button from '../../component/Button/Button.jsx';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import { NEWS_CATEGORIES, NEWS_ARTICLES, NEWS_ARTICLES2 } from './newsData';

// ─── Shared Tailwind class strings ───────────────────────────────────────────
const EASE_SMOOTH = 'ease-[cubic-bezier(0.16,1,0.3,1)]';
const HIDE_SCROLLBAR = '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden';

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Mobile: pill button for each category */
function CategoryPill({ title }) {
    return (
        <button
            className={`group shrink-0 flex items-center gap-1.5
                        border border-[#e0e0e0]
                        px-3 py-1.5 text-xs font-light text-black tracking-[0.04em]
                        cursor-pointer whitespace-nowrap
                        transition-colors duration-300 ease-in-out
                        hover:bg-[hsl(0,0%,94%)]`}
        >
            {title}
            <MdArrowForward
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
        </button>
    );
}

/** Mobile: featured article card (horizontal carousel item) */
function FeaturedCard({ article }) {
    return (
        <div className="group flex flex-col cursor-pointer shrink-0 w-[72vw]">
            <div className="w-full aspect-video overflow-hidden mb-2 bg-[#eee]">
                <img
                    src={article.image}
                    alt={article.title}
                    className={`w-full h-full object-cover transition-transform duration-600 ${EASE_SMOOTH} group-hover:scale-105`}
                />
            </div>
            <h3
                className={`text-xs font-normal leading-normal mb-2 text-black
                            underline decoration-transparent underline-offset-4 decoration-1
                            transition-[text-decoration-color] duration-300 ${EASE_SMOOTH}
                            group-hover:decoration-black`}
            >
                {article.title}
            </h3>
            <div className="flex gap-3 text-[0.65rem] text-black font-medium items-center tracking-[0.05em]">
                <span>{article.date}</span>
                <span>{article.tag}</span>
            </div>
        </div>
    );
}

/** Shared: secondary article row (used in both mobile & desktop) */
function SecondaryRow({ article, thumbnailBasis = '90px', mobileSize = false }) {
    return (
        <div
            className={`group flex border-t border-[#e0e0e0] items-start cursor-pointer
                        transition-colors duration-300 ease-in-out
                        ${mobileSize
                    ? 'py-4 px-5 gap-4 hover:bg-[hsl(0,0%,94%)]'
                    : 'py-5 gap-10 hover:bg-[hsl(0,0%,92%)]'
                }`}
        >
            <div
                className="shrink-0 aspect-3/2 overflow-hidden bg-[#eee]"
                style={{ flexBasis: thumbnailBasis, marginLeft: mobileSize ? 0 : '0.5rem' }}
            >
                <img
                    src={article.image}
                    alt={article.title}
                    className={`w-full h-full object-cover transition-transform duration-600 ${EASE_SMOOTH} group-hover:scale-[1.08]`}
                />
            </div>
            <div className="flex-1 flex flex-col justify-center">
                <h3
                    className={`font-medium leading-[1.4] text-[#1a1a1a] mb-1.5
                                underline decoration-transparent underline-offset-4
                                transition-[text-decoration-color] duration-300 ease-in-out
                                group-hover:decoration-black
                                ${mobileSize ? 'text-xs' : 'text-[1.15rem] mb-2'}`}
                >
                    {article.title}
                </h3>
                <div
                    className={`flex text-[#666] font-medium tracking-[0.05em]
                                ${mobileSize ? 'gap-3 text-[0.65rem]' : 'gap-8 text-[0.8rem]'}`}
                >
                    <span>{article.date}</span>
                    <span className="text-[#444]">{article.tag}</span>
                </div>
            </div>
        </div>
    );
}

/** Desktop: animated category row with slide-up text and slide-in arrow */
function CategoryItem({ title }) {
    return (
        <div className="group flex justify-between items-center py-[0.7rem] px-4 border-b border-[#e0e0e0] first:border-t cursor-pointer transition-all duration-300 ease-in-out hover:bg-neutral-50">
            {/* Animated label - Rolling effect */}
            <div className="relative h-6 overflow-hidden">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                    <span className="h-6 flex items-center text-[0.9rem] font-medium text-black tracking-[0.05em] uppercase">
                        {title}
                    </span>
                    <span className="h-6 flex items-center text-[0.9rem] font-medium text-black tracking-[0.05em] uppercase">
                        {title}
                    </span>
                </div>
            </div>

            {/* Animated arrow - Swift slide effect */}
            <div className="relative overflow-hidden w-5 h-5">
                <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full">
                    <MdArrowForward size={20} className="text-black" />
                </div>
                <div className="absolute top-0 left-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0">
                    <MdArrowForward size={20} className="text-black" />
                </div>
            </div>
        </div>
    );
}

/** Desktop: featured article card in the grid */
function DesktopFeaturedCard({ article }) {
    return (
        <div className="group flex-1 flex flex-col cursor-pointer">
            <div className="w-full aspect-video overflow-hidden mb-6 bg-[#eee]">
                <img
                    src={article.image}
                    alt={article.title}
                    className={`w-full h-full object-cover transition-transform duration-600 ${EASE_SMOOTH} group-hover:scale-105`}
                />
            </div>
            <h3
                className={`text-base font-normal leading-normal mb-6 text-black
                            underline decoration-transparent underline-offset-4 decoration-1
                            transition-[text-decoration-color] duration-300 ${EASE_SMOOTH}
                            group-hover:decoration-black`}
            >
                {article.title}
            </h3>
            <div className="flex gap-8 text-xs text-black font-medium items-center tracking-[0.05em]">
                <span>{article.date}</span>
                <span>{article.tag}</span>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function News() {
    const sectionRef = useRef(null);
    const stickyRef = useRef(null);
    const climbingRef = useRef(null);
    const leftPanelRef = useRef(null);

    useFrame(() => {
        if (!sectionRef.current || !stickyRef.current || !climbingRef.current) return;

        const STICKY_THRESHOLD = 130;
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const stickyRelativeTop = rect.top + stickyRef.current.offsetTop;

        if (stickyRelativeTop <= STICKY_THRESHOLD) {
            const scrollDistance = STICKY_THRESHOLD - stickyRelativeTop;
            const stickyDuration = windowHeight * 0.6;

            stickyRef.current.style.transform =
                `translate3d(0, ${Math.min(scrollDistance, stickyDuration)}px, 0)`;
            climbingRef.current.style.transform =
                `translate3d(0, -${Math.min(scrollDistance / stickyDuration, 1) * 50}%, 0)`;
        } else {
            stickyRef.current.style.transform = 'translate3d(0, 0, 0)';
            climbingRef.current.style.transform = 'translate3d(0, 0, 0)';
        }
    });

    return (
        <section
            className="w-full bg-white relative overflow-visible h-auto lg:h-[150vh]"
            ref={sectionRef}
        >
            {/* Section Header */}
            <div className="px-5 lg:px-10 pb-4 shrink-0 z-10">
                <SectionHeader label="News" title="News" theme="light" size="small" />
            </div>

            {/* ════════════════════════════════════
                MOBILE LAYOUT  (< lg)
                ════════════════════════════════════ */}
            <div className="lg:hidden flex flex-col">

                {/* 1. Category pills — horizontal scroll */}
                <div className={`flex overflow-x-auto gap-2 px-5 pb-4 ${HIDE_SCROLLBAR}`}>
                    {NEWS_CATEGORIES.map((item, i) => (
                        <CategoryPill key={i} title={item.title} />
                    ))}
                </div>

                {/* 2. Featured articles — horizontal scroll carousel */}
                <div className={`flex overflow-x-auto gap-4 px-5 mt-2 ${HIDE_SCROLLBAR}`}>
                    {NEWS_ARTICLES.map((article, i) => (
                        <FeaturedCard key={i} article={article} />
                    ))}
                </div>

                {/* 3. Secondary articles */}
                <div className="flex flex-col w-full mt-6">
                    {NEWS_ARTICLES2.map((article, i) => (
                        <SecondaryRow key={i} article={article} thumbnailBasis="90px" mobileSize />
                    ))}
                    <div className="h-px bg-[#e0e0e0] mt-2 mb-6 mx-5" />
                </div>

                {/* 4. CTA button — pinned to bottom of mobile section */}
                <div className="px-5 pb-8 mt-2 flex justify-center">
                    <div className="scale-[0.8] origin-center">
                        <Button text="See the list of announcements" />
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════
                DESKTOP LAYOUT  (≥ lg)
                ════════════════════════════════════ */}
            <div
                className="hidden lg:flex relative h-screen w-full flex-col overflow-hidden"
                ref={stickyRef}
            >
                <div className="flex flex-1 h-screen overflow-hidden">

                    {/* Left panel — CTA + category list */}
                    <div
                        className="w-[30%] p-8 flex flex-col items-center"

                    >
                        <div className="pb-8 lg:ml-14 xl:ml-0">
                            <div className="min-[1000px]:max-[1100px]:scale-[0.78] min-[1000px]:max-[1100px]:origin-left">
                                <Button text="See the list of announcements" />
                            </div>
                        </div>
                        <div className="flex flex-col w-[75%]">
                            {NEWS_CATEGORIES.map((item, i) => (
                                <CategoryItem key={i} title={item.title} />
                            ))}
                        </div>
                    </div>

                    {/* Right panel — articles */}
                    <div className="w-[70%] p-8 flex flex-col overflow-hidden relative">
                        <div
                            className="w-full flex flex-col will-change-transform"
                            ref={climbingRef}
                        >
                            <div className="flex gap-8 w-full mt-4">
                                {NEWS_ARTICLES.map((article, i) => (
                                    <DesktopFeaturedCard key={i} article={article} />
                                ))}
                            </div>

                            {/* Secondary articles */}
                            <div className="flex flex-col w-full mt-8">
                                {NEWS_ARTICLES2.map((article, i) => (
                                    <SecondaryRow key={i} article={article} thumbnailBasis="120px" />
                                ))}
                                <div className="w-full h-px bg-[#e0e0e0] mt-2 mb-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}