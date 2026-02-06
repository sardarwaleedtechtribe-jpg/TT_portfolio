import './Button.css';

const ArrowButton = ({ direction = 'right', disabled = false }) => {
    const arrow = direction === 'left' ? '←' : '→';

    return (
        <button
            className={`arrow-button ${direction}`}
            disabled={disabled}
        >
            <span className="arrow-text default">{arrow}</span>
            <span className="arrow-text hover">{arrow}</span>
        </button>
    );
};

export default ArrowButton;
