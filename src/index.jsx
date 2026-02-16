import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Experience from './Experience.jsx'
import Navbar from './component/Navbar/Navbar.jsx'
import AboutPage from './Pages/About/AboutPage.jsx'
import ServicesPage from './Pages/Services/ServicesPage.jsx'
import WorkPage from './Pages/Works/WorkPage.jsx'
import StrengtsPage from './Pages/Strengts/StrengtsPage.jsx'
import NewsPage from './Pages/News/NewsPage.jsx'
import RecruitPage from './Pages/Recruit/RecruitPage.jsx'
import ContactPage from './Pages/Contact/ContactPage.jsx'

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
            <Route path="/" element={
                <Canvas
                    gl={{
                        // antialias: true,
                    }}
                    camera={{
                        fov: 45,
                        near: 0.1,
                        far: 200,
                        position: [-6.8, -2.5, 0.0],
                        rotation: [0, -1.5, 0]
                    }}
                >
                    <Experience />
                </Canvas>
            } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/strengths" element={<StrengtsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/recruit" element={<RecruitPage />} />
            <Route path="/contact" element={<ContactPage />} />
        </Routes>
    </BrowserRouter>
)
