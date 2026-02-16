import React from 'react';
import { Link } from 'react-router-dom';

const NavArrow = ({ className, as: Component = 'span' }) => {
    return (
        <Component className={className}>
            <span className="arrow-text default">→</span>
            <span className="arrow-text hover">→</span>
        </Component>
    );
};

const TOP_CARDS = [
    { id: 'recruit', label: 'Recruit', title: 'Careers', path: '/recruit' },
    { id: 'contact', label: 'Contact', title: 'Contact us', path: '/contact' }
];

const MENU_ITEMS = [
    { text: 'Home', path: '/', active: true },
    {
        text: 'About Us',
        path: '/about',
        underline: true,
        subItems: ['Corporate Philosophy', 'Company Information', 'Members', 'Access']
    },
    { text: 'Our Strengths', underline: true },
    { text: 'Production Achievements', underline: true },
    { text: 'Services', underline: true },
    { text: 'News', underline: true },
    { text: 'Careers', underline: true },
    {
        text: 'Contact us',
        underline: true,
        subItems: [
            'Frequently Asked Questions',
            'Consultation on production',
            'Recruitment Interview Form',
            'Other Inquiries'
        ]
    }
];

const MenuPanel = ({ isOpen, handleNavigation }) => {
    return (
        <div className={`menu-panel ${isOpen ? 'active' : ''}`}>
            <div className="panel-content">
                {/* Top Cards Section */}
                <div className="panel-top-cards">
                    {TOP_CARDS.map(card => (
                        <Link
                            key={card.id}
                            to={card.path}
                            className="panel-card"
                            onClick={(e) => handleNavigation(e, card.path)}
                        >
                            <div className="card-label"><span className="dot"></span>{card.label}</div>
                            <div className="card-title">{card.title}</div>
                            <NavArrow as="div" className="card-arrow" />
                        </Link>
                    ))}
                </div>

                {/* Main Menu List */}
                <ul className="panel-list">
                    {MENU_ITEMS.map((item, idx) => (
                        <li key={idx} className={`list-item ${item.active ? 'active' : ''}`}>
                            {item.path ? (
                                <Link
                                    to={item.path}
                                    className={`item-text ${item.underline ? 'underline' : ''}`}
                                    onClick={(e) => handleNavigation(e, item.path)}
                                >
                                    {item.text}
                                </Link>
                            ) : (
                                <span className={`item-text ${item.underline ? 'underline' : ''}`}>
                                    {item.text}
                                </span>
                            )}
                            <NavArrow className="item-icon" />

                            {item.subItems && (
                                <ul className="sub-list">
                                    {item.subItems.map((sub, sIdx) => (
                                        <li key={sIdx}>
                                            {sub} <NavArrow className="sub-arrow" />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="panel-footer">
                    <a href="#privacy" className="footer-link">Privacy Policy</a>
                </div>
            </div>
        </div>
    );
};

export default MenuPanel;
