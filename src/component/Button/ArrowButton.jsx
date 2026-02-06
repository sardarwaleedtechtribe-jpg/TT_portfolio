import './Button.css';

const ArrowButton = ({ direction = 'right', disabled = false, isActive = false }) => {
    const arrow = direction === 'left' ? '←' : '→';

    return (
        <button
            className={`arrow-button ${direction} ${isActive ? 'active' : ''}`}
            disabled={disabled}
        >
            <span className="arrow-text default">{arrow}</span>
            <span className="arrow-text hover">{arrow}</span>
        </button>
    );
};

export default ArrowButton;
