import React, { useState } from 'react';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import Button from '../../component/Button/Button.jsx';
import { FAQ_DATA } from './faqData.js';
import FAQItem from './FAQItem.jsx';

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
                    <FAQItem
                        key={index}
                        item={item}
                        isOpen={openIndex === index}
                        onClick={() => toggleAccordion(index)}
                    />
                ))}
            </div>

            <div className="flex justify-end px-4 sm:px-6 lg:px-10 mt-8">
                <Button text="See frequentlv asked Questions" />
            </div>
        </section>
    );
}
