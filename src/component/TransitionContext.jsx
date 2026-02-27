import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const navigate = useNavigate();

    const transitionTo = (path) => {
        if (window.location.pathname === path) return;

        setIsTransitioning(true);
        setTimeout(() => {
            navigate(path);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 800);
        }, 800);
    };

    return (
        <TransitionContext.Provider value={{ isTransitioning, transitionTo }}>
            {children}
            {/* The Global Black Curtain */}
            <div className={`fixed top-0 bottom-0 left-1/2 w-screen h-[150vh] bg-black z-9999 pointer-events-none transition-transform duration-800 ease-[cubic-bezier(0.65,0,0.35,1)] ${isTransitioning ? '-translate-x-1/2 -translate-y-[33%]' : '-translate-x-1/2 translate-y-full'}`} />
        </TransitionContext.Provider>
    );
};

export const useTransition = () => useContext(TransitionContext);
