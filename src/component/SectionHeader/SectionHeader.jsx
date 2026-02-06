import React from 'react';
import './SectionHeader.css';

const SectionHeader = ({ label, title, theme = 'light', titleId }) => {
    const isDark = theme === 'dark';

    return (
        <div className="section-header-container">
            <div className={isDark ? 'services-meta' : 'about-meta'}>
                <span className={isDark ? 'services-dot' : 'dot'} aria-hidden="true" />
                <span className={isDark ? 'services-label' : 'label'}>{label}</span>
            </div>

            <hr className={isDark ? 'services-divider' : 'divider'} />

            <div className={isDark ? 'services-main' : 'about-main'}>
                <h1 id={titleId} className="title">{title}</h1>
            </div>
        </div>
    );
};

export default SectionHeader;
