const {
  createTask,
  getAllTask,
  getTaskById,
  getTaskByUserId,
} = require('../Service/taskService'); 

const addTaskController = async (req, res) => { 
  const { userId } = req.decryptedToken;
  const task = await createTask(req.body, userId);
  res.send(task);
};

const getAllTaskController = async (req, res) => {
  const { status, priority } = req.query;
  const task = await getAllTask(status, priority);
  res.send(task);
};

const getTaskByIdController = async (req, res) => {
  const { id } = req.params; // Corrected 'parms' to 'params'
  const task = await getTaskById(id);
  res.send(task);
};

const getTaskByUserIdController = async (req, res) => {
  const { userId } = req.decryptedToken;
  const task = await getTaskByUserId(userId);
  res.send(task);
};

module.exports = {
  addTaskController, 
  getAllTaskController,
  getTaskByIdController,
  getTaskByUserIdController,
};
