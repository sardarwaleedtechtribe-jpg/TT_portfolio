import ArrowButton from "../../component/Button/ArrowButton.jsx";
import { FOOTER_DATA } from "./footerData.js";
import { MdArrowUpward, MdArrowForward } from "react-icons/md";
import LogoMark from "../../component/Logo/LogoMark.jsx";
import { useEffect, useRef, useState } from "react";
import {
  descUnderline,
  navLinkUnderline,
  extIconBase,
  extIconHoverAfter,
  extIconHoverBefore,
} from "./footerStyles.js";

export default function Footer() {
  const [logoVisible, setLogoVisible] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setLogoVisible(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (logoRef.current) observer.observe(logoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="w-full bg-white py-8 sm:py-12 lg:py-16">
      <div className=" max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row justify-center gap-4 sm:gap-6 lg:gap-8 flex-wrap">
        {FOOTER_DATA.map((item) => (
          <div
            key={item.id}
            className="flex-1 min-w-[280px] sm:min-w-[300px] max-w-[755px]
                                   h-auto sm:h-[155px] lg:h-[175px]
                                   px-5 py-7 sm:px-8 sm:py-9 lg:px-[46px] lg:py-[51px]
                                   border border-[#e0e0e0] flex flex-col relative
                                   transition-all duration-300 cursor-pointer box-border
                                   hover:border-black hover:bg-[#fafafa] group"
          >
            <div className="text-[0.6rem] font-semibold tracking-widest text-[#666] mb-2">
              {item.label}
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black m-0 mb-2 leading-[1.2]">
              {item.title}
            </h2>
            <p className="text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.4] text-[#141414] m-0 max-w-[577px] tracking-[0.01em] pr-10 sm:pr-12">
              {item.description}
            </p>
            <div
              className="absolute right-4 sm:right-8 lg:right-[46px] top-1/2 -translate-y-1/2
                                        [&_.arrow-button-container]:bg-black [&_.arrow-button]:text-white
                                        [&_.arrow-button-container]:w-8 [&_.arrow-button-container]:h-8
                                        sm:[&_.arrow-button-container]:w-10 sm:[&_.arrow-button-container]:h-10
                                        group-hover:[&_.arrow-button-container]:bg-[#1a1a1a]"
            >
              <ArrowButton direction="right" />
            </div>
          </div>
        ))}
      </div>

      <div className=" max-w-[1600px] mx-auto mt-10 sm:mt-12 lg:mt-16 px-4 sm:px-6 lg:px-10 font-sans box-border">
        <div className="flex flex-col-reverse gap-10 lg:flex-row lg:gap-0 lg:justify-between items-start mb-10 sm:mb-12 lg:mb-16 w-full max-w-[1542px] mx-auto">
          <div className="flex flex-row flex-wrap gap-8 sm:gap-10 lg:flex-col lg:gap-6 lg:w-[200px]">
            <div className="text-[11px] leading-relaxed text-[#444]">
              <p className="m-0">990-2462</p>
              <p className="m-0">
                Yamagata Prefecture Yamagata City Fukamachi 2-2-22
              </p>
              <a
                href="#"
                className="group inline-block mt-2 text-black underline text-[12px]"
              >
                Google Map
                <span
                  className={`${extIconBase} ${extIconHoverAfter} ${extIconHoverBefore}`}
                />
              </a>
            </div>

            <div className="border-t border-[#eee] min-w-[140px]">
              {["X", "Instagram", "Facebook"].map((name) => (
                <div
                  key={name}
                  className="group flex justify-between items-center py-[0.6rem]
                                               border-b border-[#eee] text-[13px] text-black cursor-pointer"
                >
                  <span>{name}</span>
                  <span
                    className={`${extIconBase} ${extIconHoverAfter} ${extIconHoverBefore}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-start lg:justify-center lg:pt-[10px]">
            <nav className="hidden md:flex flex-wrap justify-start gap-y-6 gap-x-8  lg:gap-y-6 lg:max-gap-x-10 xl:gap-x-12 max-w-[950px] w-full">
              {[
                "Home",
                "About Us",
                "Our Strengths",
                "Production Achievements",
                "Services",
                "News",
                "Careers",
                "Contact us",
              ].map((label) => (
                <a
                  key={label}
                  href="#"
                  className={`${navLinkUnderline} text-[14px] font-medium text-black no-underline whitespace-nowrap`}
                >
                  {label}
                </a>
              ))}
            </nav>

            <nav className="flex md:hidden flex-col w-[90vw] border-t border-[#eee]">
              {[
                "Home",
                "About Us",
                "Our Strengths",
                "Production Achievements",
                "Services",
                "News",
                "Careers",
                "Contact us",
              ].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="flex justify-between items-center py-4 border-b border-[#eee]
                                               text-[13px] sm:text-[14px] font-medium text-black no-underline"
                >
                  <span>{label}</span>
                  <MdArrowForward size={18} className="opacity-60" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end py-6 sm:py-8 border-t border-[#f0f0f0]">
          <div className="text-[11px] sm:text-[12px] text-[#888] ">
            © 2026 TECH TRIBE PVT LTD.
          </div>
          <div className="flex items-center gap-6 sm:gap-8">
            <a
              href="#"
              className="text-[11px] sm:text-[12px] text-black underline"
            >
              Privacy Policy
            </a>
            <button
              className="group bg-black text-white border-0 py-[0.1rem] px-4
                                       text-[11px] sm:text-[12px] font-semibold cursor-pointer
                                       flex items-center gap-2
                                       hover:bg-[#272626] transition-colors duration-200"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span>Top</span>
              <div className="relative w-[18px] h-[18px] overflow-hidden flex items-center justify-center">
                <MdArrowUpward
                  size={18}
                  className="absolute
                    group-hover:transition-transform group-hover:duration-600 group-hover:ease-[cubic-bezier(0.16,1,0.3,1)]
                    group-hover:-translate-y-full"
                />
                <MdArrowUpward
                  size={18}
                  className="absolute translate-y-full
                    group-hover:transition-transform group-hover:duration-600 group-hover:ease-[cubic-bezier(0.16,1,0.3,1)]
                    group-hover:translate-y-0"
                />
              </div>
            </button>
          </div>
        </div>

        <div
          ref={logoRef}
          className="mt-10 sm:mt-14 lg:mt-20 flex justify-center overflow-hidden"
        >
          <LogoMark
            theme="dark"
            animate={logoVisible}
            variant="large"
            textHeight="21vh"
            iconHeight="75vh"
          />
        </div>
      </div>
    </footer>
  );
}
