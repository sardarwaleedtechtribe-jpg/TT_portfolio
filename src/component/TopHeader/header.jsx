import { useState } from 'react';
import Button from '../Button/Button';
import LogoMark from '../Logo/LogoMark';

const Header = ({ theme = 'light' }) => {
    const isDarkUi = theme === 'dark';
    const [mode, setMode] = useState(isDarkUi ? 'dark' : 'light');

    // Layout configuration
    const headerStyles = `absolute top-0 left-0 w-full z-[1001] p-[20px_30px] pointer-events-none flex justify-between items-start box-border`;

    // Tagline styles
    const taglineStyles = `font-['Inter'] text-[9px] font-medium tracking-[0.1em] uppercase ${isDarkUi ? 'text-black/60' : 'text-white/60'}`;

    // Mode Toggle styles
    const toggleContainer = `flex bg-white/5 border-2 p-[2px] rounded-[2px] ${isDarkUi ? 'border-black bg-transparent' : 'border-white'}`;
    const modeBtnBase = `px-[16px] py-[7px] border-none bg-transparent font-['Inter'] text-[11px] font-semibold cursor-pointer transition-all duration-300 ease-in-out rounded-[1px]`;

    /**
     * Button Overrides:
     * We pass these classes directly to the Button component to ensure they 
     * exactly match the previous external CSS behavior.
     */
    const buttonOverrides = `
        !mt-0 !w-[185px] !h-[38px]
        [&_.about-button]:!h-full [&_.about-button]:!flex-1 [&_.about-button]:!p-0 
        [&_.about-button]:!flex [&_.about-button]:!items-center [&_.about-button]:!justify-center
        [&_.button-text]:!text-[11px] 
        [&_.arrow-button-container]:!h-full [&_.arrow-button-container]:!min-w-[37px] [&_.arrow-button-container]:!p-0
        ${isDarkUi
            ? "[&_.about-button]:!bg-black [&_.about-button]:!text-white [&_.button-group:hover_.about-button]:!bg-[#1a1a1a] [&_.button-text]:!text-white"
            : "[&_.about-button]:!bg-white [&_.about-button]:!text-black [&_.button-group:hover_.about-button]:!bg-[#f0f0f0] [&_.button-text]:!text-black"
        }
    `;

    return (
        <header className={`${headerStyles} ${isDarkUi ? 'dark-ui' : ''}`}>
            {/* Logo Block */}
            <div className="pointer-events-auto relative w-fit flex flex-col">
                <div className="relative z-[2] p-[16px_20px] flex flex-col">
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
                        className={`${modeBtnBase} ${mode === 'light' ? (isDarkUi ? 'bg-black text-white' : 'bg-white text-black') : (isDarkUi ? 'text-black' : 'text-white')}`}
                        onClick={() => setMode('light')}
                    >
                        Light
                    </button>
                    <button
                        className={`${modeBtnBase} ${mode === 'dark' ? (isDarkUi ? 'bg-black text-white' : 'bg-white text-black') : (isDarkUi ? 'text-black' : 'text-white')}`}
                        onClick={() => setMode('dark')}
                    >
                        Dark
                    </button>
                </div>

                {/* Contact Button */}
                <Button
                    text="Contact"
                    showArrow={false}
                    className={buttonOverrides}
                />
            </div>
        </header>
    );
};

export default Header;