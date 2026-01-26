import React from 'react';
import './Services.css';

const Services = () => {
    return (
        <section className="about-header" style={{ background: 'red' }}>
            <div className="about-meta">
                <span className="dot" />
                <span className="label">Service</span>
            </div>

            <hr className="divider" />

            <div className="about-main">
                <h1 className="title">Services</h1>
            </div>
        </section>
    );
};

export default Services;