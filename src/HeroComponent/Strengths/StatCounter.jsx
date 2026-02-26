import { useState, useEffect, useRef } from 'react';

export default function StatCounter({ value, label }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    startAnimation(numericValue);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [value, hasAnimated]);

    const startAnimation = (numericValue) => {
        setHasAnimated(true);

        const duration = 1000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.floor(easeProgress * numericValue);

            setCount(currentCount);

            if (frame === totalFrames) {
                clearInterval(timer);
                setCount(numericValue);
            }
        }, frameDuration);
    };

    const suffix = value.replace(/[0-9]/g, '');

    return (
        <div
            className="flex flex-col items-center justify-center gap-6 px-6 min-[1120px]:px-12 border-b min-[1120px]:border-b-0 min-[1120px]:border-r border-[#d9d9d9] last:border-b-0 min-[1120px]:last:border-r-0 aspect-square w-full max-w-[320px] min-[1120px]:max-w-none mx-auto h-full"
            ref={elementRef}
            role="listitem"
        >
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-extrabold m-0 text-[#111] leading-none">
                {count}{suffix}
            </h2>
            <p className="text-[clamp(0.8rem,1vw,0.9rem)] tracking-[2px] uppercase text-[#111] text-center">
                {label}
            </p>
        </div>
    );
}
