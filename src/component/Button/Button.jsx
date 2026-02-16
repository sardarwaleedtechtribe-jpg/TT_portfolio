import React from 'react';
import './Button.css';
import ArrowButton from './ArrowButton.jsx';

const Button = ({ text = "Learn more about us", onClick, showArrow = true, className = "", disabled = false }) => {
    return (
        <button
            className={`button-group ${className}`}
            onClick={onClick}
            disabled={disabled}
            aria-label={text}
        >
            <div className="about-button">
                <div className="button-content-wrapper">
                    <span className="button-text default">{text}</span>
                    <span className="button-text hover">{text}</span>
                </div>
            </div>

            {showArrow && <ArrowButton />}
        </button>
    );
};

export default Button;
