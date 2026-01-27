import { useRef } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import Button from '../Button/Button.jsx';
import './Services.css';

const SERVICES = ['Brand Design', 'UX Design', 'Web Development', '3D Motion'];

const Services = () => {
    const scroll = useScroll();
    const sectionRef = useRef();
    const bgWrapperRef = useRef();
    const lineLoaderRef = useRef();

    // Sticky range
    const startOffset = 0.7209;
    const endOffset = 0.85;

    useFrame(() => {
        if (!sectionRef.current) return;

        const offset = scroll.offset;
        const totalScroll = (8 - 1) * window.innerHeight;
        const sectionHeight = window.innerHeight;

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

            <div className="services-meta">
                <span className="services-dot" aria-hidden="true" />
                <span className="services-label">Service</span>
            </div>

            <hr className="services-divider" />

            <div className="services-main">
                <h1 id="services-title" className="title">Services</h1>
            </div>

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

            <div className="services-right-content">
                <Button text="Explore our services" />
            </div>
        </section>
    );
};

export default Services;
