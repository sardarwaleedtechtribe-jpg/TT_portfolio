import React from 'react';
import './Button.css';
import ArrowButton from './ArrowButton.jsx';

const Button = ({ text = "Learn more about us", onClick, showArrow = true, className = ""}) => {
    return (
        <div
            className={`button-group ${!showArrow ? 'no-arrow' : ''} ${className}`}
            onClick={onClick}
        >
            <button className="about-button">
                <span className="button-text default">{text}</span>
                <span className="button-text hover">{text}</span>
            </button>

            {showArrow && <ArrowButton />}
        </div>
    );
};

export default Button;
