import { useState } from 'react';
import './header.css';
import Button from '../Button/Button';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('light'); // 'light' or 'dark'
 
    return (
        <header className="top-header">
            <div className="logo-block">
                <div className="logo-content">
                    <div className="logo-main-row">
                        <div className="text-group">
                            <span className="text-design">TECH</span>
                            <span className="text-studio">TRIBE</span>
                        </div>
                        <div className="logo-mark-wrapper">
                            <img src="/logo/t.svg" alt="T Logo" className="header-logo-svg" />
                        </div>
                    </div>
                    <div className="logo-footer">
                        <span className="tagline">Digital Creative Studio</span>
                    </div>
                </div>
            </div>
            <div className="header-right-group">
                <div className="mode-toggle">
                    <button className={`mode-btn ${mode === 'light' ? 'active' : ''}`} onClick={() => setMode('light')}>Light</button>
                    <button className={`mode-btn ${mode === 'dark' ? 'active' : ''}`} onClick={() => setMode('dark')}>Dark</button>
                </div>
                <div className="header-button-container">
                    <Button className="header-button" text="Contact" showArrow={false} />
                </div>
            </div>
        </header>
    );
};

export default Header;