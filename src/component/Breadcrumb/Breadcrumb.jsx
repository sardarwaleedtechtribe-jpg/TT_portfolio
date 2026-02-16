export default function Breadcrumb({ currentPage }) {
    return (
        <div className="flex items-center gap-2 text-[14px] absolute top-[6.5rem] right-[3rem]">
            <span className="underline font-normal text-black">Home</span>
            <span className="font-normal text-black">›</span>
            <span className="font-bold text-black">{currentPage}</span>
        </div>
    );
}
