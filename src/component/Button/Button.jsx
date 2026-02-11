import React from 'react';
import './Button.css';
import ArrowButton from './ArrowButton.jsx';

const Button = ({ text = "Learn more about us", onClick, showArrow = true, className = "" }) => {
    return (
        <div
            className={`button-group ${!showArrow ? 'no-arrow' : ''} ${className}`}
            onClick={onClick}
        >
            <div className="about-button">
                <button className='btn-Forall'>
                    <span className="button-text default">{text}</span>
                    <span className="button-text hover">{text}</span>
                </button>
            </div>

            {showArrow && <ArrowButton />}
        </div>
    );
};

export default Button;
