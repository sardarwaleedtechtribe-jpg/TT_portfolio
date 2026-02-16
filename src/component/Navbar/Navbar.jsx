import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import NavArrow from './NavArrow';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About us', path: '/about' },
        { name: 'Works', path: '/work' },
        { name: 'Our Strengths', path: '/strengths' },
        { name: 'Service', path: '/services' },
        { name: 'News', path: '/news' },
        { name: 'Recruit', path: '/recruit' },
        { name: 'Contact', path: '/contact' }
    ];

    const marqueeItems = [
        "TechTribe — building modern web, mobile & AI solutions.", "Code. Create. Innovate — the TechTribe way.",
        "Empowering developers with real-world technology.", "From ideas to scalable digital products.",
        "TechTribe — learn fast, build smarter, grow together."
    ];

    const closeMenu = () => setIsOpen(false);

    const handleNavigation = (e, path) => {
        e.preventDefault();

        // Don't trigger transition if already on the target page
        if (location.pathname === path) {
            closeMenu();
            return;
        }

        closeMenu();
        setIsTransitioning(true);

        setTimeout(() => {
            navigate(path);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 800);
        }, 800);
    };

    return (
        <div className="navbar-wrapper">
            <div className={`nav-transition-overlay ${isTransitioning ? 'active' : ''}`} />
            <div className={`menu-panel ${isOpen ? 'active' : ''}`}>
                <div className="panel-content">
                    {/* Top Cards Section */}
                    <div className="panel-top-cards">
                        <Link to="/recruit" className="panel-card" onClick={(e) => handleNavigation(e, '/recruit')}>
                            <div className="card-label"><span className="dot"></span>Recruit</div>
                            <div className="card-title">Careers</div>
                            <NavArrow as="div" className="card-arrow" />
                        </Link>
                        <Link to="/contact" className="panel-card" onClick={(e) => handleNavigation(e, '/contact')}>
                            <div className="card-label"><span className="dot"></span>Contact</div>
                            <div className="card-title">Contact us</div>
                            <NavArrow as="div" className="card-arrow" />
                        </Link>
                    </div>

                    {/* Main Menu List */}
                    <ul className="panel-list">
                        <li className="list-item active">
                            <Link to="/" className="item-text" onClick={(e) => handleNavigation(e, '/')}>Home</Link>
                            <NavArrow className="item-icon" />
                        </li>

                        <li className="list-item">
                            <Link to="/about" className="item-text underline" onClick={(e) => handleNavigation(e, '/about')}>About Us</Link>
                            <NavArrow className="item-icon" />
                            <ul className="sub-list">
                                <li>Corpo66666666666rate Philosophy <NavArrow className="sub-arrow" /></li>
                                <li>Company Information <NavArrow className="sub-arrow" /></li>
                                <li>Members <NavArrow className="sub-arrow" /></li>
                                <li>Access <NavArrow className="sub-arrow" /></li>
                            </ul>
                        </li>

                        <li className="list-item">
                            <span className="item-text underline">Our Strengths</span>
                            <NavArrow className="item-icon" />
                        </li>

                        <li className="list-item">
                            <span className="item-text underline">Production Achievements</span>
                            <NavArrow className="item-icon" />
                        </li>

                        <li className="list-item">
                            <span className="item-text underline">Services</span>
                            <NavArrow className="item-icon" />
                        </li>

                        <li className="list-item">
                            <span className="item-text underline">News</span>
                            <NavArrow className="item-icon" />
                        </li>

                        <li className="list-item">
                            <span className="item-text underline">Careers</span>
                            <NavArrow className="item-icon" />
                        </li>

                        <li className="list-item">
                            <span className="item-text underline">Contact us</span>
                            <NavArrow className="item-icon" />
                            <ul className="sub-list">
                                <li>Frequently Asked Questions <NavArrow className="sub-arrow" /></li>
                                <li>Consultation on production <NavArrow className="sub-arrow" /></li>
                                <li>Recruitment Interview Form <NavArrow className="sub-arrow" /></li>
                                <li>Other Inquiries <NavArrow className="sub-arrow" /></li>
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
                            <li key={link.name}>
                                {link.path.startsWith('/') ? (
                                    <Link to={link.path} onClick={(e) => handleNavigation(e, link.path)}>{link.name}</Link>
                                ) : (
                                    <a href={link.path}>{link.name}</a>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className={`navbar-placeholder-text ${isOpen ? 'visible' : ''}`}>
                        <div className="marquee-wrapper">
                            <div className="marquee-content">
                                {[...marqueeItems, ...marqueeItems].map((text, index) => (
                                    <span key={index}>{text}</span>
                                ))}
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
