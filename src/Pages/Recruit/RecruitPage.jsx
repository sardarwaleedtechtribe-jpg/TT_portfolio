import PageHeader from "../../component/PageHeader/PageHeader.jsx";
import Footer from "../../HeroComponent/Footer/Footer.jsx";
import "./RecruitPage.css";

export default function RecruitPage() {
    return (
        <div className="recruit-page-container">
            <PageHeader label="Recruit" title="Careers" theme="light" currentPage="Recruit" />
            {/* <Footer /> */}
        </div>
    );
}
