import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import './Button.css';

const ArrowButton = ({ direction = 'right', disabled = false, isActive = false }) => {
    const ArrowIcon = direction === 'left' ? MdArrowBack : MdArrowForward;

    return (
        <div className="arrow-button-container">
            <button
                className={`arrow-button ${direction} ${isActive ? 'active' : ''}`}
                disabled={disabled}
            >
                <span className="arrow-text default"><ArrowIcon size={20} /></span>
                <span className="arrow-text hover"><ArrowIcon size={20} /></span>
            </button>
        </div>
    );
};

export default ArrowButton;
