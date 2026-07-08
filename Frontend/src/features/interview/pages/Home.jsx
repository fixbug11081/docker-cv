import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/interview.form.scss";
import { useInterview } from "../hooks/useInterview";
import { useEffect } from "react";
import Header from "./Header";

const Home = () => {
  const { loading, getReport, getAllReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("All report ");
    getAllReport();
  }, []);

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await getReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });

    navigate(`/interview/${data._id}`);
  };
  if (loading) {
    return <main>Loading interview plan.....</main>;
  }
  return (
    <main className="home">
      <Header />
      <h1>Create Custom Interview Plan</h1>
      <div className="left">
        <label htmlFor="JobDescription">Job description</label>
        <textarea
          name="jobDescription"
          placeholder="Enter job Description"
          rows="10"
          cols="100"
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>
      <div className="right">
        <div className="input-group">
          <label htmlFor="resume">Upload resume</label>
          <input
            ref={resumeInputRef}
            type="file"
            name="resume"
            accept=".pdf"
          ></input>
        </div>
        <div className="input-group">
          <label htmlFor="selfDescription">Self Description</label>
          <textarea
            name="selfDescription"
            placeholder="Enter self Description"
            rows="10"
            cols="100"
            onChange={(e) => setSelfDescription(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleGenerateReport} className="bttn-primary">
        Get report
      </button>
      <div className="report-container">
        <h3>Recents Interview Plans</h3>
        <div className="report-grid">
          {reports.length > 0 &&
            reports.map((item) => (
              <div className="report-card" key={item._id}>
                <h4 className="report-title">{item.title}</h4>
                <p className="create-item">
                  Generated on {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <p className="match-score">{item.matchScore}</p>
                <button
                  className="open-report"
                  onClick={() => navigate(`/interview/${item._id}`)}
                >
                  View Report
                </button>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
