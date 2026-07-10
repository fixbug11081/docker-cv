import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

/*const api = axios.create({
  baseURL: "/",
  withCredentials: true,
});*/

/**@description Generates an interview report based on the provided details    */

export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  try {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);
    console.log("calling node server");
    const response = await api.post("/api/interview/generate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("frontend data " + response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**@description Retrieves an interview report by its ID */

export const getInterviewReportById = async (interviewId) => {
  try {
    const response = await api.get(`/api/interview/${interviewId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**@description Retrieves all interview reports */
export const getAllInterviewReports = async () => {
  try {
    const response = await api.get("/api/interview");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**@description Download targeted resume pdf */

export const getResumePdf = async ({ interviewId }) => {
  try {
    const response = await api.post(
      `/api/interview/resume/pdf/${interviewId}`,
      null,
      {
        responseType: "blob",
      },
    );
    return response.data;
  } catch (error) {
    console.log("Error message" + error.message);
  }
};
