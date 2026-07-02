const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app.js");

const port = process.env.PORT;
const connectToDB = require("./src/config/database.js");

connectToDB();

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
