import PageHeader from "../../component/PageHeader/PageHeader.jsx";
import Footer from "../../HeroComponent/Footer/Footer.jsx";
import "./WorkPage.css";

export default function WorkPage() {
    return (
        <div className="work-page-container">
            <PageHeader label="Works" title="Our Works" theme="light" currentPage="Works" />
            {/* <Footer /> */}
        </div>
    );
}
