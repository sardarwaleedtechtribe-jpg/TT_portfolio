import PageHeader from "../../component/PageHeader/PageHeader.jsx";
import Footer from "../../HeroComponent/Footer/Footer.jsx";
import "./NewsPage.css";

export default function NewsPage() {
    return (
        <div className="news-page-container">
            <PageHeader label="News" title="Latest News" theme="light" currentPage="News" />
            {/* <Footer /> */}
        </div>
    );
}
