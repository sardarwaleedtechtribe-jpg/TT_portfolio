import { useState } from 'react';
import Button from '../Button/Button';
import LogoMark from '../Logo/LogoMark';
import { useTransition } from '../TransitionContext';

const Header = ({ theme = 'light' }) => {
    const { transitionTo } = useTransition();
    const isDarkUi = theme === 'dark';
    const [mode, setMode] = useState(isDarkUi ? 'dark' : 'light');
    const headerStyles = `absolute top-0 left-0 w-full z-[1001] p-[20px_30px] pointer-events-none flex justify-between items-start box-border`;
    const taglineStyles = `font-['Inter'] text-[7px] font-medium tracking-[0.1em] uppercase ${isDarkUi ? 'text-black/60' : 'text-white/60'}`;
    const toggleContainer = `flex bg-black/40 p-[2px] rounded-[2px] items-stretch gap-[1px] pointer-events-auto border border-white`;
    const modeBtnBase = `px-[24px] py-[8px] border-none font-['Inter'] text-[12px] font-bold cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-center`;

    const getBtnStyle = (btnMode) => {
        return mode === btnMode
            ? "bg-[#111111] text-white border-[1.5px] border-white z-10 shadow-lg"
            : "bg-[#eeeeee] text-black underline underline-offset-[3px] decoration-[1.5px]";
    };

    const buttonOverrides = `
        !mt-0 !w-[210px] [--btn-height:40px]
        
        ${mode === 'dark'
            ? "[&_.about-button]:!bg-black [&_.about-button]:!text-white [&_.button-group:hover_.about-button]:!bg-[#1a1a1a] [&_.button-text]:!text-white"
            : "[&_.about-button]:!bg-white [&_.about-button]:!text-black [&_.button-group:hover_.about-button]:!bg-[#f0f0f0] [&_.button-text]:!text-black"
        }
    `;

    return (
        <header className={`${headerStyles} ${isDarkUi ? 'dark-ui' : ''}`}>
            {/* Logo Block */}
            <div className="pointer-events-auto relative w-fit flex flex-col">
                <div className="relative z-2 p-[16px_0px] flex flex-col">
                    <LogoMark theme={mode} />
                    <div className="flex items-center mt-[6px]">
                        <span className={taglineStyles}>Digital Creative Studio</span>
                    </div>
                </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-[15px] pointer-events-auto mt-[15px]">
                <div className={toggleContainer}>
                    <button
                        className={`${modeBtnBase} ${getBtnStyle('light')}`}
                        onClick={() => setMode('light')}
                    >
                        Light
                    </button>
                    <button
                        className={`${modeBtnBase} ${getBtnStyle('dark')}`}
                        onClick={() => setMode('dark')}
                    >
                        Dark
                    </button>
                </div>

                {/* Contact Button */}
                <Button
                    text="Contact"
                    showArrow={false}
                    className={`mt-0! w-[220px]! [--btn-height:40px] [&_.about-button]:flex-1 [&_.button-text]:text-[11px]! ${mode === 'light' ? 'btn-light' : ''}`}
                    onClick={() => transitionTo('/contact')}
                />
            </div>
        </header>
    );
};

export default Header;