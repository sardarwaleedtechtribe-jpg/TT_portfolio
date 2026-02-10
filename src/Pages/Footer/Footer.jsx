import ArrowButton from '../../component/Button/ArrowButton.jsx';
import { FOOTER_DATA } from './footerData.js';
import { MdArrowUpward } from 'react-icons/md';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer-root">
            <div className="footer-container">
                {FOOTER_DATA.map((item) => (
                    <div key={item.id} className="footer-section">
                        <div className="footer-label">{item.label}</div>
                        <h2 className="footer-title">{item.title}</h2>
                        <p className="footer-description">
                            {item.description}
                        </p>
                        <div className="footer-arrow">
                            <ArrowButton direction="right" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="footer-bottom-section">
                <div className="footer-bottom-content">
                    {/* Left Column: Address and Socials */}
                    <div className="footer-left-col">
                        <div className="footer-address-info">
                            <p className="postal-code">990-2462</p>
                            <p className="address-text">Yamagata Prefecture Yamagata City Fukamachi 2-2-22</p>
                            <a href="#" className="google-maps-link">Google Map
                                <span className="external-icon"></span>
                            </a>
                        </div>

                        <div className="footer-social-links">
                            <div className="social-item">
                                <span>X</span>
                                <span className="external-icon"></span>
                            </div>
                            <div className="social-item">
                                <span>Instagram</span>
                                <span className="external-icon"></span>
                            </div>
                            <div className="social-item">
                                <span>Facebook</span>
                                <span className="external-icon"></span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Navigation */}
                    <div className="footer-right-col">
                        <nav className="footer-navigation">
                            <a href="#" className="nav-link">Home</a>
                            <a href="#" className="nav-link">About Us</a>
                            <a href="#" className="nav-link">Our Strengths</a>
                            <a href="#" className="nav-link">Production Achievements</a>
                            <a href="#" className="nav-link">Services</a>
                            <a href="#" className="nav-link">News</a>
                            <a href="#" className="nav-link">Careers</a>
                            <a href="#" className="nav-link">Contact us</a>
                        </nav>
                    </div>
                </div>

                <div className="footer-bottom-bar">
                    <div className="footer-copyright">
                        © 2026 DESIGN STUDIO K, LLC.
                    </div>
                    <div className="footer-secondary-links">
                        <a href="#" className="privacy-link">Privacy Policy</a>
                        <button className="top-scroll-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <span>Top</span>
                            <div className="top-icon-container">
                                <MdArrowUpward size={18} className="top-arrow default" />
                                <MdArrowUpward size={18} className="top-arrow hover" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

        </footer>
    );
}