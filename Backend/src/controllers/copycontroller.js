import generateInterviewReport from "../services/ai.service.js";
const pdfParse = require("pdf-parse");
const interviewReportModel = require("../models/interview.model.js");

export async function generateReport(req, res) {
  try {
    const resumeFile = req.file;
    if (!resumeFile) {
      return res.status(400).json({ error: "Resume file is required" });
    }
    const resumeContent = await pdfParse(req.file.buffer);
    const { selfDescription, jobDescription } = req.body;

    const report = await generateInterviewReport({
      resume: resumeContent,
      selfDescription,
      jobDescription,
    });

    await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent,
      selfDescription,
      jobDescription,
      ...report,
    });

    res.status(200).json({
      message: "Interview report generated successfully",
      ...report,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
