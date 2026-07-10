import React, { useState, useEffect } from "react";
import "../styles/plan.scss";
import { useInterview } from "../hooks/useInterview";
import { useParams } from "react-router-dom";
import Header from "./Header";

const Interview = () => {
  const [section, setSection] = useState(() => {
    // Initialize from localStorage if available
    return localStorage.getItem("lastSection") || null;
  });
  const { loading, resumeLoading, report, getReportById, downloadResumePdf } =
    useInterview();

  const { interviewId } = useParams();

  useEffect(() => {
    if (!interviewId) {
      console.log("No interviewId yet, skipping fetch");
      return;
    }

    getReportById(interviewId);
  }, [interviewId]);

  useEffect(() => {
    if (section) {
      localStorage.setItem("lastSection", section);
    }
  }, [section]);

  if (loading || resumeLoading) {
    return <main>Loading...</main>;
  }

  const renderContent = () => {
    if (!report) {
      return <main>Loading Report...</main>;
    }

    if (section === "technical") {
      return (
        <>
          <h3>Technical Questions</h3>
          {report?.technicalQuestions?.map((q, i) => (
            <div key={i} className="qa">
              <p>
                <strong>Q:</strong> {q?.question}
              </p>
              <p>
                <strong>A:</strong> {q?.answer}
              </p>
            </div>
          ))}
        </>
      );
    }

    if (section === "behavioral") {
      return (
        <>
          <h3>Behavioural Questions</h3>
          {report?.behavioralQuestions?.map((q, i) => (
            <div key={i} className="qa">
              <p>
                <strong>Q:</strong> {q?.question}
              </p>
              <p>
                <strong>A:</strong> {q?.answer}
              </p>
            </div>
          ))}
        </>
      );
    }

    if (section === "roadmap") {
      return (
        <>
          <h3>Preparation Plan</h3>
          {report?.preparationPlan?.map((day, i) => (
            <div key={i} className="day">
              <h4>
                Day {day?.day}: {day?.focus}
              </h4>
              <ul>
                {day?.tasks?.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      );
    }

    return <p>Select a section to view details.</p>;
  };

  return (
    <div className="container">
      {/* Column 1: Navigation */}
      <div className="column nav">
        <h2>Sections</h2>
        <ul>
          <li>
            <button
              className={section === "technical" ? "active" : ""}
              onClick={() => setSection("technical")}
            >
              Technical Questions
            </button>
          </li>
          <li>
            <button
              className={section === "behavioral" ? "active" : ""}
              onClick={() => setSection("behavioral")}
            >
              Behavioural Questions
            </button>
          </li>
          <li>
            <button
              className={section === "roadmap" ? "active" : ""}
              onClick={() => setSection("roadmap")}
            >
              Preparation Plan
            </button>
          </li>
        </ul>
        <button
          className="downloadBttn"
          onClick={() => {
            downloadResumePdf(interviewId);
          }}
        >
          Download AI resume
        </button>
      </div>

      {/* Column 2: Details */}
      <div className="column details">
        <h2>Details</h2>
        <div id="content">{renderContent()}</div>
      </div>

      {/* Column 3: Score & Skill Gaps */}
      <div className="column score">
        <h2>Match Score</h2>
        <div className="score-value">{report?.matchScore ?? 0} / 100</div>

        <h2>Skill Gaps</h2>
        <div className="tags">
          {report?.skillGaps?.map((gap, i) => (
            <span key={i} className={`tag ${gap?.severity ?? ""}`}>
              {gap?.skill} ({gap?.severity})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interview;
