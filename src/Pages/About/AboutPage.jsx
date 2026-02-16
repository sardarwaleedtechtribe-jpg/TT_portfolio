import PageHeader from "../../component/PageHeader/PageHeader.jsx";
import Footer from "../../HeroComponent/Footer/Footer.jsx";
import "./AboutPage.css";

export default function AboutPage() {
    return (
        <div className="about-page-container">
            <PageHeader label="About" title="About Us" theme="light" currentPage="About" />
            {/* <Footer /> */}
        </div>
    );
}
