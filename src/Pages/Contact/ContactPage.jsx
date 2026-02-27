import React, { useState } from 'react';
import PageHeader from "../../component/PageHeader/PageHeader.jsx";
import Button from '../../component/Button/Button.jsx';
import ArrowButton from '../../component/Button/ArrowButton.jsx';
import Footer from "../../HeroComponent/Footer/Footer.jsx";
import { FAQ_DATA } from "../../HeroComponent/FAQ/faqData.js";
import SectionHeader from "../../component/SectionHeader/SectionHeader.jsx";
import RecommendedLink, { RECOMMENDED_LINKS } from "../../component/Button/RecommendedLink.jsx";
import FAQItem from "../../HeroComponent/FAQ/FAQItem.jsx";

const contactCards = [
    {
        label: "Get in Touch",
        title: "Consultation on production",
        description: "Please feel free to contact us even if you do not have any requirements for a project, estimate, or competition participation request."
    },
    {
        label: "Join Us",
        title: "Recruitment Interview Form",
        description: "We are looking for new graduates / mid-career recruitment. Please feel free to apply for a casual interview first."
    },
    {
        label: "Contact Us",
        title: "Other Inquiries",
        description: "Please contact us here for requests for speaking, media coverage, and suggestions about production partners."
    }
];

export default function ContactPage() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-screen h-screen bg-white text-black flex flex-col font-inherit overflow-y-auto overflow-x-hidden">
            <PageHeader label="Contact" title="Contact Us" theme="dark" currentPage="Contact" />

            <section className="flex-1 max-w-[1900px] mx-auto w-full px-6 md:px-24 py-12 md:py-16 flex flex-col gap-4">
                <div className="w-full max-w-[1000px] mt-10 md:mt-0 md:mx-auto">
                    <p className="text-[12px] md:text-[17px] leading-loose text-black font-normal tracking-tight">
                        Please contact us using our inquiry form.<br />
                        By clarifying the budget and launch time in advance, you can judge more specific feasibility.
                    </p>
                </div>

                <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-10 mt-10 ">
                    <h2 className="text-[18px] md:text-[24px] xl:text-[32px] font-medium tracking-[-0.02em] leading-[0.9] text-black">
                        Frequently Asked Questions
                    </h2>

                    <div className="border-t border-[#e0e0e0]">
                        {FAQ_DATA.map((item, index) => (
                            <FAQItem
                                key={index}
                                item={item}
                                isOpen={openIndex === index}
                                onClick={() => toggleAccordion(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex justify-end px-0 mt-8">
                    <Button text="See frequentlv asked Questions" />
                </div>
            </section>

            {/* Contact Inquiry Cards Section */}
            <section className="max-w-[1900px] mx-auto w-full px-6 md:px-24 py-16 flex flex-col">
                <div className="w-full max-w-[1000px] mx-auto">
                    <h2 className="text-[18px] md:text-[24px] xl:text-[32px] font-medium tracking-[-0.02em] leading-[0.9] text-black mb-10">
                        Various menus
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xl:gap-8 justify-items-center w-full">
                        {contactCards.map((card, index) => (
                            <div
                                key={index}
                                className="w-full max-w-[280px] sm:max-w-[320px] min-h-[300px] lg:h-[400px] border border-[#e5e5e5] p-7 lg:p-8 flex flex-col justify-between group hover:bg-[#fafafa] transition-colors duration-500 cursor-pointer"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mb-6 lg:mb-10">
                                        <span className="w-1.5 h-1.5 bg-black"></span>
                                        <span className="text-[10px] md:text-[11px] font-bold  text-black">
                                            {card.label}
                                        </span>
                                    </div>
                                    <h3 className="text-[18px] lg:text-[22px] font-normal tracking-[-0.02em] leading-[1.1] text-black mb-6 lg:mb-10">
                                        {card.title}
                                    </h3>
                                    <p className="text-[13px] lg:text-[14px] font-normal leading-[1.7] text-[#333] opacity-90 pr-2">
                                        {card.description}
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <ArrowButton
                                        className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] xl:w-[45px] xl:h-[45px]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="max-w-[1900px] mb-20 ml-4 md:mb-35 w-full">
                <SectionHeader
                    label="Recommend"
                    title="Learn more about TECH TRIBE"
                    theme="light"
                    size="small"
                />

                <div className="flex flex-wrap gap-2 mt-10 md:mt-12 mx-4 md:mx-12">
                    {RECOMMENDED_LINKS.map((link, index) => (
                        <RecommendedLink key={index} label={link.label} to={link.to} />
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
