import { useRef, useState } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import Button from '../../component/Button/Button.jsx';
import ArrowButton from '../../component/Button/ArrowButton.jsx';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import { SERVICE_CARDS } from './servicesData.js';
import './Services.css';

const SERVICES = ['Brand Strategy', 'UI/UX Design', 'Web Development', '3D Anime Motion'];

const Services = () => {
    const scroll = useScroll();
    const sectionRef = useRef();
    const bgWrapperRef = useRef();
    const lineLoaderRef = useRef();
    const cardScrollerRef = useRef();
    const [activeCardIndex, setActiveCardIndex] = useState(0);

    // Sticky range
    const startOffset = 0.7209;
    const endOffset = 0.85;

    useFrame(() => {
        if (!sectionRef.current) return;

        const offset = scroll.offset;
        const totalScroll = (8 - 1) * window.innerHeight;
        const sectionHeight = sectionRef.current.offsetHeight;

        let compensation = 0;
        let progress = 0;

        if (offset >= startOffset && offset <= endOffset) {
            const currentPixels = offset * totalScroll;
            const startPixels = startOffset * totalScroll;
            compensation = currentPixels - startPixels;
            progress = (offset - startOffset) / (endOffset - startOffset);
            sectionRef.current.classList.add('is-sticky');
        } else if (offset > endOffset) {
            const startPixels = startOffset * totalScroll;
            const endPixels = endOffset * totalScroll;
            compensation = endPixels - startPixels;
            progress = 1;
            sectionRef.current.classList.remove('is-sticky');
        } else {
            compensation = 0;
            progress = 0;
            sectionRef.current.classList.remove('is-sticky');
        }

        // Apply styles using requestAnimationFrame for maximum smoothness
        requestAnimationFrame(() => {
            if (sectionRef.current) {
                sectionRef.current.style.transform = `translate3d(0, ${compensation}px, 0)`;
            }
            if (bgWrapperRef.current) {
                // Move by 300% of section height to reveal 3 more images after the first one
                const parallaxMove = progress * (sectionHeight * 3);
                bgWrapperRef.current.style.transform = `translate3d(0, -${parallaxMove}px, 0)`;
            }
            if (lineLoaderRef.current) {
                // Animate line-loader with scaleY from 0 to 1 (fills from top to bottom)
                lineLoaderRef.current.style.transform = `translateY(7.6rem) scaleY(${progress})`;
            }

            if (cardScrollerRef.current) {
                // Scroll card content: move by (totalHeight - 100%)
                // We have 4 cards, so we move by 300% of container height
                const cardHeight = 365; // matches .services-center-box height
                const gap = 10; // matches .services-box-scroller gap
                const totalMove = (cardHeight + gap) * (SERVICE_CARDS.length - 1);
                // Start at negative offset (showing the last item in DOM, which is Card 1)
                // End at 0 (showing the first item in DOM, which is Card 4)
                const cardMove = (progress - 1) * totalMove;
                cardScrollerRef.current.style.transform = `translate3d(0, ${cardMove}px, 0)`;
            }
        });
    });

    return (
        <section
            ref={sectionRef}
            className="services-header"
            aria-labelledby="services-title"
        >
            <div className="services-parallax-bg">
                <div ref={bgWrapperRef} className="parallax-img-wrapper">
                    <div className="parallax-img img-1" />
                    <div className="parallax-img img-2" />
                    <div className="parallax-img img-3" />
                    <div className="parallax-img img-4" />
                </div>
            </div>

            <SectionHeader label="Service" title="Services" theme="dark" titleId="services-title" />
            {/* Center box */}
            <div className="services-center-box">
                <div ref={cardScrollerRef} className="services-box-scroller">
                    {[...SERVICE_CARDS].reverse().map((card) => (
                        <div key={card.id} className="services-box-content">
                            <div className="center-box-meta">
                                <span className="center-box-dot" aria-hidden="true" />
                                <span className="center-box-label">{card.label}</span>
                            </div>

                            <div className="center-box-title-wrapper">
                                <h2 className="center-box-title" style={{ whiteSpace: 'pre-line' }}>{card.title}</h2>
                            </div>

                            <p className="center-box-description" style={{ whiteSpace: 'pre-line' }}>
                                {card.description}
                            </p>
                            <div className="center-box-arrow">
                                <ArrowButton />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* left footer */}
            <div className="services-footer">
                <hr ref={lineLoaderRef} className="services-line-loader" />
                <ul className="services-tag-list">
                    {SERVICES.map((service) => (
                        <li key={service} className="service-tag">
                            <span className="dot" aria-hidden="true" />
                            <span className="label">{service}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {/* right footerButton */}
            <div className="services-right-content">
                <Button text="Explore our services" />
            </div>
        </section>
    );
};

export default Services;
