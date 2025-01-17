const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./Database/dbConfig");
const taskRouter = require("./Router/taskRouter");
const userRouter = require("./Router/userRouter");
const errorHandler = require("./Middleware/errorHandler");
const requestLogger = require("./Middleware/requestLogger");

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use(requestLogger);

app.use("/api", taskRouter.router);
app.use("/", userRouter.router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
