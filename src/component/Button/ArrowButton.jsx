import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import './Button.css';

const ArrowButton = ({ direction = 'right', disabled = false, className = "" }) => {
    const ArrowIcon = direction === 'left' ? MdArrowBack : MdArrowForward;

    return (
        <div className={`arrow-button-container ${className}`}>
            <div className={`arrow-wrapper ${direction}`}>
                <span className="arrow-icon default">
                    <ArrowIcon size={20} />
                </span>
                <span className="arrow-icon hover">
                    <ArrowIcon size={20} />
                </span>
            </div>
        </div>
    );
};

export default ArrowButton;
