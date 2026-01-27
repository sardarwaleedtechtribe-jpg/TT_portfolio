import { Scroll } from "@react-three/drei";
import About from "../component/About/About.jsx";
import Product from "../component/vSilder/Product.jsx";
import CaseList from "../component/CaseRow/CaseList.jsx";
import Button from "../component/Button/Button.jsx";
import Services from "../component/Services/Services.jsx";

export default function HeroOverlay() {
    return (
        <Scroll html>
            <div style={{ position: 'absolute', top: '135vh', width: '100vw' }}>
                <About />
                <div style={{ marginTop: '-15vh' }}><Product /></div>
                <div>
                    <div style={{ marginTop: '61.55vh' }}>
                        <CaseList />
                    </div>
                </div>
                <div >
                    <Services />
                </div>
            </div>
        </Scroll>
    );
}
