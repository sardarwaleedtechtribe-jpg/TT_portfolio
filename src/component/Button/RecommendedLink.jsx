import { Link } from 'react-router-dom';
import ArrowButton from './ArrowButton';

const RecommendedLink = ({ label, to = "#" }) => {
    return (
        <Link
            to={to}
            className="group block bg-white p-0 border border-[#e5e5e5] h-[50px] max-w-[200px] transition-all duration-300 hover:bg-[#fafafa]"
        >
            <div className="flex items-center justify-between h-full px-4">
                <div className="relative h-[1.5em] overflow-hidden">
                    {[0, 1].map((i) => (
                        <span key={i} className={`
                            ${i === 1 ? 'absolute top-full left-0' : 'block'} 
                            text-[16px] font-medium tracking-tight text-[#141414] 
                            transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] 
                            group-hover:-translate-y-full
                        `}>
                            {label}
                        </span>
                    ))}
                </div>

                <ArrowButton
                    className="bg-transparent! border-none w-[40px]! h-[40px]! p-0! pointer-events-none btn-light group-hover:bg-transparent!"
                />
            </div>
        </Link>
    );
};

export default RecommendedLink;
