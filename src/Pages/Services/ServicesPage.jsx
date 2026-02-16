import PageHeader from "../../component/PageHeader/PageHeader.jsx";
import Footer from "../../HeroComponent/Footer/Footer.jsx";
import "./ServicesPage.css";

export default function ServicesPage() {
    return (
        <div className="services-page-container">
            <PageHeader label="Services" title="Our Services" theme="light" currentPage="Services" />
            {/* <Footer /> */}
        </div>
    );
}
