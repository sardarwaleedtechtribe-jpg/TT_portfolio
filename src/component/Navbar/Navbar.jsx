import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import MenuPanel from './MenuPanel';

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

            <MenuPanel isOpen={isOpen} handleNavigation={handleNavigation} />

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
