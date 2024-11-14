const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./Database/dbConfig');
const taskRouter = require('./Router/taskRouter');
const userRouter = require('./Router/userRouter');

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use('/api', taskRouter.router);
app.use('/', userRouter.router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
