// sample.js

const resume = `
Name: John Doe
Email: johndoe@example.com
Phone: +1-555-123-4567
LinkedIn: linkedin.com/in/johndoe
GitHub: github.com/johndoe

Summary:
Full-stack developer with 5+ years of experience building scalable web applications.
Strong expertise in React, Node.js, and MongoDB. Passionate about solving complex problems
and mentoring junior developers.

Education:
- B.Sc. in Computer Science, XYZ University (2016–2020)
  Coursework: Data Structures, Algorithms, Database Systems, Web Development

Professional Experience:
- Frontend Developer, Tech Solutions Inc. (2020–2023)
  • Built and maintained React-based applications serving 50k+ users
  • Collaborated with backend team to integrate REST APIs
  • Improved performance by 30% using React.memo and code splitting

- Full Stack Developer, Innovative Apps Ltd. (2023–Present)
  • Designed authentication system using JWT and bcrypt
  • Implemented scalable job queue with BullMQ and Redis
  • Developed MongoDB aggregation pipelines for analytics dashboards

Projects:
- Task Manager App: MERN stack project with real-time updates using Socket.IO
- E-commerce Platform: Integrated Stripe payments and order tracking
- Portfolio Website: Personal site showcasing projects and blogs

Skills:
- Frontend: HTML5, CSS3 (Flexbox, Grid)
- Backend: Node.js, Express
- Database: MongoDB, Mongoose, 
- Tools: Git, BullMQ, Webpack
- Other: Authentication systems, CI/CD pipelines

Achievements:
- Awarded "Developer of the Year" at Tech Solutions Inc. (2022)
- Published technical blog series on React performance optimization
`;

const jobDescription = `
Title: Full Stack Developer
Company: Innovative Apps Ltd.
Location: Remote
Requirements: React, Redux, Node.js, Express, MongoDB, Redis, Authentication systems
Responsibilities: Build scalable web apps, collaborate with teams, optimize performance & security
`;

const selfDescription = `
I am a passionate developer with experience in building scalable web applications using React, Node.js, and MongoDB. 
I enjoy solving complex problems, collaborating with teams, and continuously learning new technologies. 
My strengths include problem-solving, debugging, teamwork, and quick learning.
`;

module.exports = { resume, jobDescription, selfDescription };
