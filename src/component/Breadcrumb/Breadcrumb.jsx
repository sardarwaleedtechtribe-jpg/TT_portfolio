import { Link } from 'react-router-dom';

export default function Breadcrumb({ currentPage }) {
    return (
        <div className="flex items-center gap-2 text-[14px] absolute top-26 right-12">
            <Link to="/" className="relative font-normal text-black cursor-pointer group">
                Home
                <span className="absolute left-0 -bottom-[0.25px] w-full h-px bg-black origin-left transition-transform duration-330 cubic-bezier-[0.16,1,0.3,1] group-hover:scale-x-0 group-hover:origin-right" />
            </Link>
            <span className="font-normal text-black">›</span>
            <span className="font-bold text-black">{currentPage}</span>
        </div>
    );
}
