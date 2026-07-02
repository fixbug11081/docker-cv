import { useContext, useEffect, useState } from "react";
import {
  generateInterviewReport,
  getInterviewReportById,
  getAllInterviewReports,
  getResumePdf,
} from "../services/interview.api";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used within InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const getReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (err) {
      console.error("Error generating report:", err);
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (id) => {
    setLoading(true);

    try {
      const response = await getInterviewReportById(id);
      setReport(response.interviewReport);
      //return response;
    } catch (err) {
      console.error("Error fetching report by id:", err);
    } finally {
      setLoading(false);
    }
  };

  const getAllReport = async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      setReports(response.interviewReports);
    } catch (err) {
      console.error("Error fetching all reports:", err);
    } finally {
      setLoading(false);
    }
  };

  const [resumeLoading, setResumeLoading] = useState(false);

  const downloadResumePdf = async (interviewId) => {
    console.log("User click");
    setResumeLoading(true);
    try {
      console.log("Start ,downloading");
      const response = await getResumePdf({ interviewId });
      console.log(response);
      // const blob = await response.blob();
      const url = window.URL.createObjectURL(
        new Blob([response], { "Content-Type": "application/pdf" }),
      );

      const pdflink = document.createElement("a");
      pdflink.href = url;
      pdflink.setAttribute("download", `resume_${interviewId}.pdf`);
      document.body.appendChild(pdflink);
      pdflink.click();
      pdflink.remove();
      window.URL.revokeObjectURL();
    } catch (err) {
      console.log(err.message);
    } finally {
      setResumeLoading(false);
    }
  };
  return {
    loading,
    resumeLoading,
    report,
    reports,
    getReport,
    getAllReport,
    getReportById,
    downloadResumePdf,
  };
};
