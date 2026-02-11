// src/component/Logo/LogoMark.jsx
import './Logo.css';

const LogoMark = ({ theme = 'light', animate = null }) => {
    const animationClass = animate !== null ? (animate ? 'animate-start' : 'animate-init') : '';
    return (
        <div className={`logo-main-row ${theme} ${animationClass}`}>
            <div className="text-group">
                <span className="text-design">TECH</span>
                <span className="text-studio">TRIBE</span>
            </div>
            <div className="logo-mark-wrapper">
                <img src="/logo/t.svg" alt="T Logo" className="header-logo-svg" />
            </div>
        </div>
    );
};

export default LogoMark;