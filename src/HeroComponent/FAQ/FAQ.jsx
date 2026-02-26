import React, { useState } from 'react';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import Button from '../../component/Button/Button.jsx';
import { FAQ_DATA } from './faqData.js';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full min-h-[60vh] bg-white flex flex-col pb-12 md:pb-0">
            <div className="px-4 sm:px-6 lg:px-10 py-4 lg:py-14">
                <SectionHeader label="FAQ" title="Frequently Asked Questions" theme="light" size="small" />
            </div>

            <div className="mx-4 md:mx-10 border-t border-[#e0e0e0] mt-9 md:mt-0">
                {FAQ_DATA.map((item, index) => (
                    <div
                        key={index}
                        className={`group border-b border-[#e0e0e0] cursor-pointer transition-colors duration-300 ease hover:bg-[#f5f5f5] ${openIndex === index ? 'bg-[#f5f5f5]' : ''}`}
                        onClick={() => toggleAccordion(index)}
                    >
                        <div className="flex items-center px-4 md:px-22 py-4 md:py-6 gap-6 md:gap-16">
                            <span className="text-sm md:text-[1.1rem] font-bold md:font-black min-w-8 md:min-w-12 tracking-[0.05em]">Q{item.id}</span>
                            <h3 className="text-sm md:text-base font-normal md:font-medium text-[#333] m-0 flex-1 tracking-[0.02em]">{item.question}</h3>
                            <span className="text-xl md:text-[2rem] font-light text-black flex items-center justify-center w-8 h-8 select-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-180">
                                {openIndex === index ? '−' : '+'}
                            </span>
                        </div>
                        {openIndex === index && (
                            <div className="px-4 md:px-22 pb-4 md:pb-6 md:py-6 max-w-[800px] ml-14 md:ml-0">
                                <div className="flex gap-3">
                                    <span className="text-xs md:text-[0.95rem] font-medium text-[#000000] tracking-[0.05em]">A1</span>
                                    <p className="text-xs md:text-[0.95rem] leading-[1.8] text-black m-0">{item.answer}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-end px-4 sm:px-6 lg:px-10 mt-8">
                <Button text="See frequentlv asked Questions" />
            </div>
        </section>
    );
}
