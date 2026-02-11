import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MdArrowForward } from 'react-icons/md';
import Button from '../../component/Button/Button.jsx';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import ArrowButton from '../../component/Button/ArrowButton.jsx';
import './News.css';

import { NEWS_CATEGORIES, NEWS_ARTICLES, NEWS_ARTICLES2 } from './newsData';

export default function News() {
    const sectionRef = useRef(null);
    const stickyRef = useRef(null);
    const climbingRef = useRef(null);
    const leftPanelRef = useRef(null);

    useFrame(() => {
        if (!sectionRef.current || !stickyRef.current || !climbingRef.current) return;

        const STICKY_THRESHOLD = 130; // Distance from top in pixels where it should stick
        const rect = sectionRef.current.getBoundingClientRect();
        const stickyOffsetTop = stickyRef.current.offsetTop;
        const windowHeight = window.innerHeight;
        const stickyRelativeTop = rect.top + stickyOffsetTop;

        if (stickyRelativeTop <= STICKY_THRESHOLD) {
            const scrollDistance = STICKY_THRESHOLD - stickyRelativeTop;
            const stickyDuration = windowHeight * 0.6;

            const compensation = Math.min(scrollDistance, stickyDuration);
            stickyRef.current.style.transform = `translate3d(0, ${compensation}px, 0)`;

            const progress = Math.min(scrollDistance / stickyDuration, 1);
            climbingRef.current.style.transform = `translate3d(0, -${progress * 50}%, 0)`;
        } else {
            stickyRef.current.style.transform = `translate3d(0, 0, 0)`;
            climbingRef.current.style.transform = `translate3d(0, 0, 0)`;
        }
    });

    return (
        <section className="News-root" ref={sectionRef}>
            <div className="News-header">
                <SectionHeader label="News" title="News" theme="light" size="small" />
            </div>
            <div className="News-sticky-container" ref={stickyRef}>
                <div className="News-layout">

                    <div className="News-left-panel" ref={leftPanelRef}>
                        <div className="button-group news-cta-group">
                            <Button text="See the list of announcements" />
                        </div>

                        <div className="News-categories">
                            {NEWS_CATEGORIES.map((item, index) => (
                                <div key={index} className="news-category-item">
                                    <div className="category-title-wrapper">
                                        <span className="category-text default">{item.title}</span>
                                        <span className="category-text hover">{item.title}</span>
                                    </div>
                                    <div className="category-arrow-wrapper">
                                        <span className="category-arrow default"><MdArrowForward size={20} /></span>
                                        <span className="category-arrow hover"><MdArrowForward size={20} /></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="News-right-panel">
                        <div
                            className="News-climbing-wrapper"
                            ref={climbingRef}
                        >
                            <div className="news-articles-grid">
                                {NEWS_ARTICLES.map((article, index) => (
                                    <div key={index} className="news-article-card">
                                        <div className="article-image-container">
                                            <img src={article.image} alt="News thumbnail" className="article-image" />
                                        </div>
                                        <div className="article-content">
                                            <h3 className="article-title">{article.title}</h3>
                                            <div className="article-footer">
                                                <span className="article-date">{article.date}</span>
                                                <span className="article-tag">{article.tag}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            <div className="news-secondary-articles">
                                {NEWS_ARTICLES2.map((article, index) => (
                                    <div key={index} className="secondary-article-row">
                                        <div className="secondary-article-image-container">
                                            <img src={article.image} alt="News thumbnail" className="secondary-article-image" />
                                        </div>
                                        <div className="secondary-article-content">
                                            <h3 className="secondary-article-title">{article.title}</h3>
                                            <div className="secondary-article-footer">
                                                <span className="secondary-article-date">{article.date}</span>
                                                <span className="secondary-article-tag">{article.tag}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="news-bottom-line" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}