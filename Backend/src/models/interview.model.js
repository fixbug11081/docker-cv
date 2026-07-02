import mongoose from "mongoose";
/**
 * Resume: { type: String, required: true }
 * job description: { type: String, required: true }
 * Technical questions: [{
 * question: { type: String }, answer: { type: String }
 *  ,intention: { type: String }}]
 * Behavioral questions: [{
 * question: { type: String }, answer: { type: String }
 *  ,intention: { type: String }}]
 * skill gaps: [skills:{ type: String }]
 * Preparation Plan:[day:Number,tasks:[type
 * ]] { type: String }
 */
const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: { type: String, required: [true, "Answer is required"] },
  },
  { _id: false },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: { type: String, required: [true, "Answer is required"] },
  },
  { _id: false },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  { _id: false },
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "Day is required"],
    },
    tasks: [
      {
        type: String,
        required: [true, "Tasks are required"],
      },
    ],
    focus: {
      type: String,
      required: [true, "Focus is required"],
    },
  },
  { _id: false },
);
const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true },
);

const interviewReportModel = mongoose.model(
  "interviewReport",
  interviewReportSchema,
);

export default interviewReportModel;
