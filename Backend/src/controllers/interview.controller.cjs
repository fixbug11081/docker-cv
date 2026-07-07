const pdfParse = require("pdf-parse");

const interviewReportModel = require("../models/interview.model.js").default;
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../services/ai.service.js");

/**
 * @description Generate interview report based on resume, self description, and job description
 * @param {Object} req - Express request object
 */
async function generateReport(req, res) {
  try {
    const resumeFile = req.file;
    if (!resumeFile) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    // Extract text from the PDF buffer object
    const pdfData = await pdfParse(resumeFile.buffer);
    const resumeText = pdfData.text;

    const { selfDescription, jobDescription } = req.body;
    console.log("Calling function generateInetrviewReport");
    // Generate the report object from the AI service
    const reportStr = await generateInterviewReport({
      resume: resumeText, // Pass parsed text string, not the full object
      selfDescription,
      jobDescription,
    });
    console.log(reportStr);
    // Explicitly parse the response text string into a JS object
    let reportData;
    if (typeof reportStr === "object" && reportStr !== null) {
      reportData = reportStr;
    } else {
      try {
        reportData = JSON.parse(reportStr);
      } catch (parseError) {
        // Fallback if Gemini wrapped it inside standard markdown codeblocks ```json ... ```
        console.log("Error" + parseError.message);
        const cleanStr = reportStr.replace(/```json|```/g, "").trim();
        reportData = JSON.parse(cleanStr);
      }
    }

    // Save metadata and structured report data to the database
    const savedReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeText,
      selfDescription,
      jobDescription,
      ...reportData,
    });

    // Return the response
    return res.status(200).json({
      message: "Interview report generated successfully",
      interviewReport: {
        _id: savedReport._id,
        jobDescription,
        selfDescription,
        resume: resumeText,
        ...reportData,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

/**
 * @description Get interview report by ID
 * @param {Object} req - interviewId
 */

async function getInterviewReportById(req, res) {
  try {
    const { interviewId } = req.params;

    const report = await interviewReportModel
      .findById(interviewId)
      .where("user")
      .equals(req.user.id);

    if (!report) {
      return res.status(404).json({ error: "Interview Report not found" });
    }
    return res
      .status(200)
      .json({ message: "Interview Report found", interviewReport: report });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

/**
 * @description Get all interview reports for the authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllInterviewReports(req, res) {
  try {
    const reports = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -technicalQuestions -behaviouralQuestions -skillgaps -preparationPlan",
      );
    // Exclude large text fields for efficiency
    return res.status(200).json({
      message: "All Interview Reports fetched successfully",
      interviewReports: reports,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

/**
 * @description Generate resume pdf on the basis of resume, jobdescription, self description
 */
async function getResumePdf(req, res) {
  const { interviewReportId } = req.params;

  const interviewReport =
    await interviewReportModel.findById(interviewReportId);
  console.log(interviewReport);
  if (!interviewReport) {
    return res.status(404).json({ message: "Interview report found" });
  }
  const pdfBuffer = await generateResumePdf({
    jobDescription: interviewReport.jobDescription,
    selfDescription: interviewReport.selfDescription,
    resume: interviewReport.resume,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Desposition": `attachment;filename=resume_${interviewReportId}.pdf`,
  });
  console.log("Sending pdf buffer length: " + pdfBuffer.length);
  res.send(pdfBuffer);
}
module.exports = {
  generateReport,
  getInterviewReportById,
  getAllInterviewReports,
  getResumePdf,
};
