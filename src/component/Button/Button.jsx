import React from 'react';
import './Button.css';
import ArrowButton from './ArrowButton.jsx';

const Button = ({ text = "Learn more about us", onClick }) => {
    return (
        <div className="button-group" onClick={onClick}>
            <button className="about-button">
                <span className="button-text default">{text}</span>
                <span className="button-text hover">{text}</span>
            </button>
            <ArrowButton />
        </div>
    );
};

export default Button;
