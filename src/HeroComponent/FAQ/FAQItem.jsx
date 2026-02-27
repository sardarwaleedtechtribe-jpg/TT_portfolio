import React from 'react';

export default function FAQItem({ item, isOpen, onClick }) {
    return (
        <div
            className={`group border-b border-[#e0e0e0] cursor-pointer transition-colors duration-300 ease hover:bg-[#f5f5f5] ${isOpen ? 'bg-[#f5f5f5]' : ''}`}
            onClick={onClick}
        >
            <div className="flex items-center px-4 md:px-22 py-4 md:py-6 gap-6 md:gap-16">
                <span className="text-xs md:text-[0.9rem] font-medium min-w-8 md:min-w-10 tracking-[0.05em]">Q{item.id}</span>
                <h3 className="text-[11px] md:text-[0.85rem] font-normal text-[#333] m-0 flex-1 tracking-[0.02em]">{item.question}</h3>
                <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-180 origin-center">
                    <span className={`absolute h-4 w-[1.2px] bg-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}></span>
                    <span className="absolute w-4 h-[1.2px] bg-black"></span>
                </div>
            </div>
            {isOpen && (
                <div className="px-4 md:px-22 pb-4 md:pb-6 md:py-6 max-w-[800px] ml-14 md:ml-0">
                    <div className="flex gap-3">
                        <span className="text-xs md:text-[0.95rem] font-medium text-[#000000] tracking-[0.05em]">A1</span>
                        <p className="text-xs md:text-[0.95rem] leading-[1.8] text-black m-0">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
