const { GoogleGenAI, Type } = require("@google/genai");

const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// Define the schema natively using the SDK's Type structure
const interviewReportSchema = {
  type: Type.OBJECT,
  properties: {
    matchScore: {
      type: Type.INTEGER,
      description:
        "The match score 0-100 between the candidate and the job describe",
    },
    technicalQuestions: {
      type: Type.ARRAY,
      description:
        "List of technical questions that can be asked in the interview",
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description: "The technical question can be asked in the interview",
          },
          intention: {
            type: Type.STRING,
            description: "The intention behind the technical question",
          },
          answer: {
            type: Type.STRING,
            description:
              "How to answer this question, points to be covered, what approach to take",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description:
              "The behavioral question can be asked in the interview",
          },
          intention: {
            type: Type.STRING,
            description: "The intention behind the behavioral question",
          },
          answer: {
            type: Type.STRING,
            description:
              "How to answer this question, points to be covered, what approach to take",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },
    skillGaps: {
      type: Type.ARRAY,
      description: "List of skill gaps that the candidate has",
      items: {
        type: Type.OBJECT,
        properties: {
          skill: {
            type: Type.STRING,
            description: "The skill which is lacking in the candidate",
          },
          severity: {
            type: Type.STRING,
            enum: ["low", "medium", "high"],
            description: "The severity of the skill gap",
          },
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: Type.ARRAY,
      description: "List of preparation plans for the candidate to follow",
      items: {
        type: Type.OBJECT,
        properties: {
          day: {
            type: Type.INTEGER,
            description: "The day of the preparation plan",
          },
          tasks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List the tasks to be completed on that day",
          },
          focus: {
            type: Type.STRING,
            description: "The focus of the preparation plan for that day",
          },
        },
        required: ["day", "tasks", "focus"],
      },
    },
    title: {
      type: Type.STRING,
      description: "The title of the interview report",
    },
  },
  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
    "title",
  ],
};

async function generateInterviewReport({
  jobDescription,
  selfDescription,
  resume,
}) {
  const prompt = `Generate the interview report for the candidate with the following details:
  Resume: ${resume}
  Self describe: ${selfDescription}
  Job describe: ${jobDescription}`;

  const response = await ai.models.generateContent({
    //model: "gemini-3-flash-preview",
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportSchema,
    },
  });

  const jsonContent = JSON.parse(response.text);
  console.log("Interview service", jsonContent);
  return jsonContent;
}

const targetResumeSchema = {
  type: Type.OBJECT,
  properties: {
    resume: {
      type: Type.STRING,
      description:
        "Provide the targeted resume HTML string on basis of self description, resume, job description",
    },
  },
  required: ["resume"],
};
const puppeteer = require("puppeteer");

async function utilityResumePdf(htmlContent) {
  const browser = await puppeteer.launch({
    // If you want to use installed Chrome/Edge instead of bundled Chromium:
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    // Or for Microsoft Edge:
    // executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle2" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
  });

  await browser.close();
  return pdfBuffer;
}

async function generateResumePdf({ jobDescription, selfDescription, resume }) {
  const code = `Generate a new resume in pure HTML format based on:
Resume: ${resume}
Job description: ${jobDescription}
Self description: ${selfDescription}

Return the HTML string inside the 'resume' field only.`;

  let response = await ai.models.generateContent({
    //model: "gemini-3-flash-preview",
    model: "gemini-2.5-flash",
    contents: code,
    config: {
      responseMimeType: "application/json",
      // Pass the native schema directly here
      responseSchema: targetResumeSchema,
    },
  });

  const jsonContent = JSON.parse(response.text);

  const pdfBuffer = await utilityResumePdf(jsonContent.resume);

  return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf };
