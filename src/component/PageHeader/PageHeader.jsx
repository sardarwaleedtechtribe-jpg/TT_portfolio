import Header from "../TopHeader/header.jsx";
import SectionHeader from "../SectionHeader/SectionHeader.jsx";
import Breadcrumb from "../Breadcrumb/Breadcrumb.jsx";

export default function PageHeader({ label, title, theme = "light", currentPage }) {
    return (
        <div className="w-full">
            <Header theme="dark" />
            <div className="relative max-w-[1900px] mx-auto pt-[17.5rem] px-[1.5rem] pb-[5rem] w-full box-border">
                {currentPage && <Breadcrumb currentPage={currentPage} />}
                <SectionHeader label={label} title={title} theme={theme} />
            </div>
        </div>
    );
}
