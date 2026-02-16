import CaseRow from "./CaseRow.jsx";
import Button from "../../component/Button/Button.jsx";
import { cases } from "./casesData.js";

export default function CaseList() {
  return (
    <div className="case-row-container">
      {cases.map((item, index) => (
        <CaseRow key={index} {...item} />
      ))}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8vh' }}>
        <Button text="See more production achievements" />
      </div>
    </div>
  );
}
