const Task = require("../Model/taskModel");

const createTask = async (data, id) => {
  const { title, description, dueDate, priority, status } = data;
  const task = new Task({
    title,
    description,
    dueDate,
    priority,
    status,
    user: id,
  });
  await task.save();
  return {
    status: 201,
    data: task,
    message: "Task created successfully",
  };
};

const getAllTask = async (status, priority) => {
  const filter = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const tasks = await Task.find(filter);
  if (tasks.length === 0) {
    const error = new Error("No tasks found");
    error.statusCode = 404;
    throw error;
  }

  return {
    status: 200,
    message: "Tasks retrieved successfully",
    data: tasks,
  };
};

const getTaskById = async (id) => {
  const task = await Task.findOne({ _id: id });
  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  return {
    status: 200,
    message: "Task found successfully",
    data: task,
  };
};

const getTaskByUserId = async (id) => {
  const tasks = await Task.find({ user: id });
  if (tasks.length === 0) {
    const error = new Error("No tasks found for this user");
    error.statusCode = 404;
    throw error;
  }
  return {
    status: 200,
    message: "Tasks retrieved successfully for the user",
    data: tasks,
  };
};

module.exports = {
  createTask,
  getAllTask,
  getTaskById,
  getTaskByUserId,
};
