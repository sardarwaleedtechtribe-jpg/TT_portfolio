import CaseRow from "./CaseRow";

const cases = [
  {
    title: "MEDIUM Branding Site",
    company: "Umedia Inc.",
    tags: "Branding, UI / UX, Front-end / CMS Development, Website",
    year: "2025",
    video: "https://res.cloudinary.com/dcm0qgsxn/video/upload/v1769096179/v4_nhezwg.mp4",
  },
  {
    title: "Miroku Neurorehabilitation Clinic Official Site",
    company: "Miroku Neurorehabilitation Clinic",
    tags: "UI / UX, Front-end / CMS Development, Website",
    year: "2023",
    video: "https://res.cloudinary.com/dcm0qgsxn/video/upload/v1769096179/v3.mp4",
  },
  {
    title: "IHI CORE.tech Branding Site",
    company: "IHI Corporation",
    tags: "Front-end / CMS Development, Website",
    year: "2022",
    video: "https://res.cloudinary.com/dcm0qgsxn/video/upload/v1769096179/v2.mp4",
  },
  {
    title: "anytimeLIVE! Branding",
    company: "Tohoku Pioneer Co., Ltd.",
    tags: "Branding, UI / UX, Front-end / CMS, Logo, Video, Graphics",
    year: "2023",
    video: "https://res.cloudinary.com/dcm0qgsxn/video/upload/v1769096179/v1.mp4",
  },
];

export default function CaseList() {
  return (
    <div className="case-row-container">
      {cases.map((item, index) => (
        <CaseRow key={index} {...item} />
      ))}
    </div>
  );
}
