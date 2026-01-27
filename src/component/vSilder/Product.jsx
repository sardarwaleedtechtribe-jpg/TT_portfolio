import { useEffect, useRef, useState } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import './Product.css';

export default function Product() {
  const scroll = useScroll();
  const stackRef = useRef(null);
  const videoRefs = useRef([]);
  const containerRefs = useRef([]);
  const [videosLoaded, setVideosLoaded] = useState([false, false, false]);

  // The range where the video should stick to the top
  const startOffset = 0.386;
  const endOffset = 0.472;

  const videos = [
    {
      src: "https://res.cloudinary.com/dcm0qgsxn/video/upload/v1769096179/v4_nhezwg.mp4",
      alt: "Product showcase video 1"
    },
    {
      src: "https://res.cloudinary.com/dcm0qgsxn/video/upload/v1769096427/v3_flhapf.mp4",
      alt: "Product showcase video 2"
    },
    {
      src: "https://res.cloudinary.com/dcm0qgsxn/video/upload/v1768346483/v1_2_online-video-cutter.com_v1ojdt.mp4",
      alt: "Product showcase video 3"
    },
    {
      src: "https://res.cloudinary.com/dcm0qgsxn/video/upload/v1769096178/v1_oyqnnx.mp4",
      alt: "Product showcase video 4"
    }
  ];

  useFrame(() => {
    if (!stackRef.current) return;

    const scrollOffset = scroll.offset;
    const isFixed = scrollOffset >= startOffset && scrollOffset <= endOffset;

    // Calculate compensation
    const totalScroll = (8 - 1) * window.innerHeight;
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

    // Apply compensation
    stackRef.current.style.transform = `translateY(${compensation}px)`;
    if (isFixed) {
      stackRef.current.classList.add('is-fixed');
    } else {
      stackRef.current.classList.remove('is-fixed');
    }

    // Rollover logic
    const totalRange = endOffset - startOffset;
    const segmentLength = totalRange / 4;

    // Video 2
    const v2Start = startOffset;
    const v2End = startOffset + segmentLength;
    const v2Progress = Math.min(Math.max((scrollOffset - v2Start) / (v2End - v2Start), 0), 1);
    const v2Top = 85 - (v2Progress * 78);

    // Video 3
    const v3Start = v2End;
    const v3End = v2End + segmentLength;
    const v3Progress = Math.min(Math.max((scrollOffset - v3Start) / (v3End - v3Start), 0), 1);
    const v3Top = 85 - (v3Progress * 71);

    // Video 4 (Coverage Video)
    const v4Start = v3End;
    const v4End = v3End + segmentLength;
    const v4Progress = Math.min(Math.max((scrollOffset - v4Start) / (v4End - v4Start), 0), 1);

    const v4TopStart = 85;
    const v4Top = v4TopStart - (v4Progress * 85);

    // Update container positions
    if (containerRefs.current[1]) {
      containerRefs.current[1].style.top = `${v2Top}vh`;
    }
    if (containerRefs.current[2]) {
      containerRefs.current[2].style.top = `${v3Top}vh`;
      containerRefs.current[2].style.visibility = scrollOffset > v2End ? 'visible' : 'hidden';
    }
    if (containerRefs.current[3]) {
      containerRefs.current[3].style.top = `${v4Top}vh`;
      containerRefs.current[3].style.visibility = scrollOffset > v3End ? 'visible' : 'hidden';
    }
  });


  return (
    <section className="about-header">
      <div className="about-meta">
        <span className="dot" />
        <span className="label">Works</span>
      </div>

      <hr className="divider" />

      <div className="about-main">
        <h1 className="title">Production Achievements</h1>
      </div>

      <div ref={stackRef} className="product-videos-stack">
        {videos.map((video, index) => (
          <div
            key={index}
            ref={(el) => (containerRefs.current[index] = el)}
            className={`product-video-container product-video-container${index + 1}`}
            style={{ '--video-index': index }}
          >
            <div className="product-video-label">
              <span className="square-dot" />
              <span className="number">{`0${index + 1}`}</span>
            </div>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.src}
              loop
              muted
              playsInline
              aria-label={video.alt}
              onMouseEnter={(e) => {
                e.currentTarget.play().catch(() => { });
              }}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
              onLoadedData={() => {
                const newLoaded = [...videosLoaded];
                newLoaded[index] = true;
                setVideosLoaded(newLoaded);
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ height: '1000px' }} />
    </section>
  );
}
