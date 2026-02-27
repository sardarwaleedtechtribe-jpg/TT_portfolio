import PageHeader from "../../component/PageHeader/PageHeader.jsx";
import Footer from "../../HeroComponent/Footer/Footer.jsx";
import ArrowButton from "../../component/Button/ArrowButton.jsx";
import SectionHeader from "../../component/SectionHeader/SectionHeader.jsx";
import RecommendedLink, { RECOMMENDED_LINKS } from "../../component/Button/RecommendedLink.jsx";

const sections = [
    { label: "Concept", title: "Corporate Philosophy" },
    { label: "Company", title: "Company Profile" },
    { label: "Member", title: "Members" },
    { label: "Access", title: "Access" },
];

export default function AboutPage() {
    return (
        <div className="w-full h-screen bg-white text-black overflow-y-auto overflow-x-hidden flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <PageHeader label="About us" title="About Us" theme="light" currentPage="About Us" />

            <main className="max-w-[1900px] mx-auto mt-16 px-6 pb-14 flex justify-end">
                <div className="w-full max-w-[1000px] text-[20px] leading-[1.5] tracking-normal text-[#141414]
                 font-medium opacity-80">
                    <p className="mb-8 font-normal [word-spacing:0.2em]">
                        Now that digital has been integrated into everyday life,
                        what is required is an experience that moves the heart. <br /> We
                        combine design that resonates with users' emotions with technology
                        that moves smoothly to achieve both ease of use and immersion. It doesn't
                        compromise a single pixel, creating a new precedent that no one has ever seen.
                    </p>
                </div>
            </main>

            <section className="max-w-[1080px] mx-auto px-6 pb-40 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-14">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="bg-white p-10 border border-[#e5e5e5] flex flex-col justify-between min-h-[240px] md:min-h-[258px] group transition-all duration-500 hover:bg-[#fafafa] cursor-pointer"
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="w-1.5 h-1.5 bg-black"></span>
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-black">
                                        {section.label}
                                    </span>
                                </div>
                                <h3 className="text-[18px] md:text-[22px] lg:text-[24px] font-bold leading-[1.2] tracking-tight text-[#141414]">
                                    {section.title}
                                </h3>
                            </div>
                            <div className="flex justify-end">
                                <ArrowButton className="w-[30px] h-[30px]" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-[1900px] pb-35">
                <SectionHeader label="Recommend" title="Learn more about TECH TRIBE" theme="light" size="small" />

                <div className="flex flex-wrap gap-2 mt-12 mx-12">
                    {RECOMMENDED_LINKS.map((link, index) => (
                        <RecommendedLink key={index} label={link.label} to={link.to} />
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
