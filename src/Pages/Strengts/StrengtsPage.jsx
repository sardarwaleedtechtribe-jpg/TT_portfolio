import PageHeader from "../../component/PageHeader/PageHeader.jsx";
import Footer from "../../HeroComponent/Footer/Footer.jsx";
import "./StrengtsPage.css";

export default function StrengtsPage() {
    return (
        <div className="strengths-page-container">
            <PageHeader label="Strengths" title="Our Strengths" theme="light" currentPage="Strengths" />
            {/* <Footer /> */}
        </div>
    );
}
