import { useState, useRef } from "react";
import "./CaseRow.css";
import Button from "../Button/Button.jsx";

export default function CaseRow({ title, company, tags, year, video }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  return (
    <div
      className="case-row"
      onMouseEnter={() => {
        setIsHovered(true);
        videoRef.current?.play();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <div className="case-left">
        <div className="title-container">
          <span className="title-text default">{title}</span>
          <span className="title-text hover">{title}</span>
        </div>
        <span className="company">{company}</span>
      </div>

      <div className="case-center">{tags}</div>

      <div className="year-container">
        <span className="year">{year}</span>
      </div>

      <div className="arrow-container">
        <span className="arrow default">→</span>
        <span className="arrow hover">→</span>
      </div>

      <div className={`video-preview ${isHovered ? "visible" : ""}`}>
        <video ref={videoRef} src={video} loop muted playsInline />
      </div>
    </div>
  );
}
