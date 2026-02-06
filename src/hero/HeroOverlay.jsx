import { Scroll, useScroll } from "@react-three/drei";
import About from "../Pages/About/About.jsx";
import Product from "../Pages/vSilder/Product.jsx";
import CaseList from "../Pages/CaseRow/CaseList.jsx";
import Services from "../Pages/Services/Services.jsx";
import Strengths from "../Pages/Strengths/Strengths.jsx";
import Parthner from "../Pages/Parthner/Parthner.jsx";
import Button from "../component/Button/Button.jsx";
import Header from "../component/TopHeader/header.jsx";
import BottomLeftText from "../component/BottomLeftText/BottomLeftText.jsx";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";


import Flow from "../Pages/Flow/Flow.jsx";
import News from "../Pages/News/News.jsx";
import FAQ from "../Pages/FAQ/FAQ.jsx";

export default function HeroOverlay() {
    const scroll = useScroll();
    const wrapperRef = useRef();
    const contentRef = useRef();
    const caseListWrapperRef = useRef();

    useFrame(() => {
        if (!wrapperRef.current || !contentRef.current || !caseListWrapperRef.current) return;

        const scrollOffset = scroll.offset;
        console.log("Scroll Offset:", scrollOffset.toFixed(4));

        // --- Product Animation Math (Sync with Product.jsx) ---
        const startOffset = 0.2078;
        const endOffset = 0.2541;
        const totalScroll = (scroll.pages - 1) * window.innerHeight;
        const currentPixels = scrollOffset * totalScroll;
        const startPixels = startOffset * totalScroll;
        const topOffset = window.innerHeight * 0.043;

        let compensation = topOffset;
        if (scrollOffset >= startOffset && scrollOffset <= endOffset) {
            compensation = (currentPixels - startPixels) + topOffset;
        } else if (scrollOffset > endOffset) {
            const endPixels = endOffset * totalScroll;
            compensation = (endPixels - startPixels) + topOffset;
        }

        const segmentLength = (endOffset - startOffset) / 4;
        const v2End = startOffset + segmentLength;
        const v3End = v2End + segmentLength;

        // Video positions (tailing chain)
        const v2Raw = Math.min(Math.max((scrollOffset - startOffset) / segmentLength, 0), 1);
        const v2Top = 85 - (Math.pow(v2Raw, 2.2) * 78);

        const v3Raw = Math.min(Math.max((scrollOffset - v2End) / segmentLength, 0), 1);
        const v3Top = (v2Top + 78) - (Math.pow(v3Raw, 2.2) * 71);

        const v4Raw = Math.min(Math.max((scrollOffset - v3End) / segmentLength, 0), 1);
        const v4Top = (v3Top + 71) - (Math.pow(v4Raw, 2.2) * 85);

        // Calculate CaseList anchor point (locked to Video 4's bottom)
        const v4Height = 90; // Video 4 height in vh
        const currentCaseListTopPx = compensation + (v4Top + v4Height) * (window.innerHeight / 100);
        // Initial anchor (where CaseList would be without tailing)
        const initialCaseListTopPx = topOffset + (85 + v4Height) * (window.innerHeight / 100);
        const tailingTranslation = currentCaseListTopPx - initialCaseListTopPx;

        caseListWrapperRef.current.style.transform = `translate3d(0, ${tailingTranslation}px, 0)`;

        // --- Original Scroll Accelerator ---
        const scrollDist = scroll.pages * window.innerHeight;
        const contentHeight = contentRef.current.offsetHeight + (window.innerHeight * 1.35);

        if (contentHeight > scrollDist) {
            const deficit = contentHeight - scrollDist;
            const boostStart = 0.85;
            const boostFactor = Math.max(0, (scroll.offset - boostStart) / (1 - boostStart));
            wrapperRef.current.style.transform = `translate3d(0, -${boostFactor * deficit}px, 0)`;
        } else {
            wrapperRef.current.style.transform = `none`;
        }
    });

    // console.log("HeroOverlay Mounting");

    return (
        <Scroll html>
            <Header />
            {/* <BottomLeftText /> */}
            <div ref={wrapperRef} style={{ width: '100vw', minHeight: '100vh', overflow: 'visible' }}>
                <div ref={contentRef} style={{ position: 'relative', top: '135vh', width: '100vw', overflow: 'visible' }}>
                    <About />
                    <Product />
                    <div ref={caseListWrapperRef} style={{ overflow: 'visible' }}>
                        <div style={{ marginTop: '86.55vh' }}><CaseList /></div>
                        <Services />
                    </div>
                    <div style={{ marginTop: '60vh', height: 'auto' }}>
                        <Strengths />
                        <Flow />
                        <News />
                        <FAQ />
                        <Parthner />
                    </div>


                </div>
            </div>
        </Scroll>
    );
}
