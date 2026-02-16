import PageHeader from "../../component/PageHeader/PageHeader.jsx";
import Footer from "../../HeroComponent/Footer/Footer.jsx";
import "./ContactPage.css";

export default function ContactPage() {
    return (
        <div className="contact-page-container">
            <PageHeader label="Contact" title="Contact Us" theme="light" currentPage="Contact" />
            {/* <Footer /> */}
        </div>
    );
}
