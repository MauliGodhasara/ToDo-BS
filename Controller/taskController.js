const {
  createTask,
  getAllTask,
  getTaskById,
  getTaskByUserId,
} = require("../Service/taskService");

const addTaskController = async (req, res, next) => {
  try {
    const { userId } = req.decryptedToken;
    const task = await createTask(req.body, userId);
    res.status(task.status).send(task);
  } catch (error) {
    next(error);
  }
};

const getAllTaskController = async (req, res, next) => {
  try {
    const { status, priority } = req.query;
    const tasks = await getAllTask(status, priority);
    res.status(tasks.status).send(tasks);
  } catch (error) {
    next(error);
  }
};

const getTaskByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await getTaskById(id);
    res.status(task.status).send(task);
  } catch (error) {
    next(error);
  }
};

const getTaskByUserIdController = async (req, res, next) => {
  try {
    const { userId } = req.decryptedToken;
    const tasks = await getTaskByUserId(userId);
    res.status(tasks.status).send(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTaskController,
  getAllTaskController,
  getTaskByIdController,
  getTaskByUserIdController,
};
