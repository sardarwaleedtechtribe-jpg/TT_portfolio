import { Link } from 'react-router-dom';
import ArrowButton from './ArrowButton';

export const RECOMMENDED_LINKS = [
    { label: "Our Strengths", to: "/strengths" },
    { label: "Services", to: "/services" },
    { label: "Production Achievements", to: "/achievements" },
    { label: "Corporate Philosophy", to: "/philosophy" },
    { label: "Company Information", to: "/company" },
    { label: "Members", to: "/members" }
];

const RecommendedLink = ({ label, to = "#" }) => {
    return (
        <Link
            to={to}
            className="group inline-block bg-white p-0 border border-[#e5e5e5] h-[50px] transition-all duration-300 hover:bg-[#fafafa]"
        >
            <div className="flex items-center justify-between h-full px-4 gap-4">
                <div className="relative h-[1.5em] overflow-hidden flex-1">
                    {[0, 1].map((i) => (
                        <span key={i} className={`
                            ${i === 1 ? 'absolute top-full left-0' : 'block'} 
                            text-[15px] font-normal tracking-tight text-[#141414] 
                            whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] 
                            group-hover:-translate-y-full
                        `}>
                            {label}
                        </span>
                    ))}
                </div>

                <div className="shrink-0">
                    <ArrowButton
                        className="bg-transparent! border-none w-[35px]! h-[35px]! p-0! pointer-events-none btn-light group-hover:bg-transparent!"
                    />
                </div>
            </div>
        </Link>
    );
};

export default RecommendedLink;
