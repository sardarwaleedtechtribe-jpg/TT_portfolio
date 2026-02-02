import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = ['Home', 'About us', 'Works', 'Our Strengths', 'Service', 'News', 'Recruit', 'Contact'];

    return (
        <div className="navbar-wrapper">
            <div className={`menu-panel ${isOpen ? 'active' : ''}`}>
                <div className="panel-content">
                    {/* Top Cards Section */}
                    <div className="panel-top-cards">
                        <div className="panel-card">
                            <div className="card-label"><span className="dot"></span>Recruit</div>
                            <div className="card-title">Careers</div>
                            <div className="card-arrow">
                                <span className="arrow-text default">→</span>
                                <span className="arrow-text hover">→</span>
                            </div>
                        </div>
                        <div className="panel-card">
                            <div className="card-label"><span className="dot"></span>Contact</div>
                            <div className="card-title">Contact us</div>
                            <div className="card-arrow">
                                <span className="arrow-text default">→</span>
                                <span className="arrow-text hover">→</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Menu List */}
                    <ul className="panel-list">
                        <li className="list-item active">
                            <span className="item-text">Home</span>
                            <span className="item-icon">
                                <span className="arrow-text default">→</span>
                                <span className="arrow-text hover">→</span>
                            </span>
                        </li>

                        <li className="list-item">
                            <span className="item-text underline">About Us</span>
                            <span className="item-icon">
                                <span className="arrow-text default">→</span>
                                <span className="arrow-text hover">→</span>
                            </span>
                            <ul className="sub-list">
                                <li>Corporate Philosophy <span className="sub-arrow">
                                    <span className="arrow-text default">→</span>
                                    <span className="arrow-text hover">→</span>
                                </span></li>
                                <li>Company Information <span className="sub-arrow">
                                    <span className="arrow-text default">→</span>
                                    <span className="arrow-text hover">→</span>
                                </span></li>
                                <li>Members <span className="sub-arrow">
                                    <span className="arrow-text default">→</span>
                                    <span className="arrow-text hover">→</span>
                                </span></li>
                                <li>Access <span className="sub-arrow">
                                    <span className="arrow-text default">→</span>
                                    <span className="arrow-text hover">→</span>
                                </span></li>
                            </ul>
                        </li>

                        <li className="list-item">
                            <span className="item-text underline">Our Strengths</span>
                            <span className="item-icon">
                                <span className="arrow-text default">→</span>
                                <span className="arrow-text hover">→</span>
                            </span>
                        </li>

                        <li className="list-item">
                            <span className="item-text underline">Production Achievements</span>
                            <span className="item-icon">
                                <span className="arrow-text default">→</span>
                                <span className="arrow-text hover">→</span>
                            </span>
                        </li>

                        <li className="list-item">
                            <span className="item-text underline">Services</span>
                            <span className="item-icon">
                                <span className="arrow-text default">→</span>
                                <span className="arrow-text hover">→</span>
                            </span>
                        </li>

                        <li className="list-item">
                            <span className="item-text underline">News</span>
                            <span className="item-icon">
                                <span className="arrow-text default">→</span>
                                <span className="arrow-text hover">→</span>
                            </span>
                        </li>

                        <li className="list-item">
                            <span className="item-text underline">Careers</span>
                            <span className="item-icon">
                                <span className="arrow-text default">→</span>
                                <span className="arrow-text hover">→</span>
                            </span>
                        </li>

                        <li className="list-item">
                            <span className="item-text underline">Contact us</span>
                            <span className="item-icon">
                                <span className="arrow-text default">→</span>
                                <span className="arrow-text hover">→</span>
                            </span>
                            <ul className="sub-list">
                                <li>Frequently Asked Questions <span className="sub-arrow">
                                    <span className="arrow-text default">→</span>
                                    <span className="arrow-text hover">→</span>
                                </span></li>
                                <li>Consultation on production <span className="sub-arrow">
                                    <span className="arrow-text default">→</span>
                                    <span className="arrow-text hover">→</span>
                                </span></li>
                                <li>Recruitment Interview Form <span className="sub-arrow">
                                    <span className="arrow-text default">→</span>
                                    <span className="arrow-text hover">→</span>
                                </span></li>
                                <li>Other Inquiries <span className="sub-arrow">
                                    <span className="arrow-text default">→</span>
                                    <span className="arrow-text hover">→</span>
                                </span></li>
                            </ul>
                        </li>

                    </ul>
                    <div className="panel-footer">
                        <a href="#privacy" className="footer-link">Privacy Policy</a>
                    </div>
                </div>
            </div>

            <nav className={`navbar-container ${isOpen ? 'menu-open' : ''}`}>
                <div className="navbar-links-container">
                    <ul className={`navbar-links ${isOpen ? 'hidden' : ''}`}>
                        {navLinks.map((link) => (
                            <li key={link}>
                                <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                            </li>
                        ))}
                    </ul>
                    <div className={`navbar-placeholder-text ${isOpen ? 'visible' : ''}`}>
                        <div className="marquee-wrapper">
                            <div className="marquee-content">
                                <span>TechTribe — building modern web, mobile & AI solutions.</span>
                                <span>Code. Create. Innovate — the TechTribe way.</span>
                                <span>Empowering developers with real-world technology.</span>
                                <span>From ideas to scalable digital products.</span>
                                <span>TechTribe — learn fast, build smarter, grow together.</span>
                                {/* Duplicate for seamless loop */}
                                <span>TechTribe — building modern web, mobile & AI solutions.</span>
                                <span>Code. Create. Innovate — the TechTribe way.</span>
                                <span>Empowering developers with real-world technology.</span>
                                <span>From ideas to scalable digital products.</span>
                                <span>TechTribe — learn fast, build smarter, grow together.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`navbar-icon ${isOpen ? 'active' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span></span>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
