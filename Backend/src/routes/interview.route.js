const express = require("express");
const interviewRouter = express.Router();
const authMiddleware = require("../middleware/auth.middleware.js");
const interviewController = require("../controllers/interview.controller.cjs");
const upload = require("../middleware/file.middleware.js");

/**
 * @route POST /api/interview/generate
 * @description Generate interview report on basis of resume, self description and job description
 * @access Private
 */

interviewRouter.post(
  "/generate",
  authMiddleware.authUser,
  upload.single("resume"),
  interviewController.generateReport,
);

/**
 * @route GET /api/interview/:id
 * @description Get interview report by ID
 * @access Private
 */
interviewRouter.get(
  "/:interviewId",
  authMiddleware.authUser,
  interviewController.getInterviewReportById,
);

/**
 * @route GET /api/interview
 * @description Get all interview reports for the authenticated user
 * @access Private
 */
interviewRouter.get(
  "/",
  authMiddleware.authUser,
  interviewController.getAllInterviewReports,
);

/**
 * @route GET /resume/pdf/:interviewReportId
 * @description Get the resume pdf on basis of user resume,self description, job description
 * @access Private
 */

interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  authMiddleware.authUser,
  interviewController.getResumePdf,
);
module.exports = interviewRouter;
