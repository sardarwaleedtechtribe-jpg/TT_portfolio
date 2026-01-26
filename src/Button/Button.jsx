import React from 'react';
import './Button.css';

const Button = ({ text = "Learn more about us", onClick }) => {
    return (
        <div className="button-group" onClick={onClick}>
            <button className="about-button">
                <span className="button-text default">{text}</span>
                <span className="button-text hover">{text}</span>
            </button>
            <button className="arrow-button">
                <span className="arrow-text default">→</span>
                <span className="arrow-text hover">→</span>
            </button>
        </div>
    );
};

export default Button;
