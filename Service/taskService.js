const Task = require("../Model/taskModel");

const createTask = async (data, id) => {
  try {
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
  } catch (err) {
    console.error("Error saving task:", err);
    return { status: 400, data: err, message: "Failed to create task" };
  }
};

const getAllTask = async (status, priority) => {
  try {
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter);

    if (tasks.length === 0) {
      return {
        status: 404,
        message: "No tasks found",
        data: [],
      };
    }

    return {
      status: 200,
      message: "Tasks retrieved successfully",
      data: tasks,
    };
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return { status: 400, data: err, message: "Failed to fetch tasks" };
  }
};

const getTaskById = async (id) => {
  try {
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return {
        status: 404,
        message: "Task not found",
        data: null,
      };
    }
    return {
      status: 200,
      message: "Task found successfully",
      data: task,
    };
  } catch (err) {
    console.error("Error fetching task by ID:", err);
    return { status: 400, data: err, message: "Failed to fetch task" };
  }
};

const getTaskByUserId = async (id) => {
  try {
    const tasks = await Task.find({ user: id });

    if (tasks.length === 0) {
      return {
        status: 404,
        message: "No tasks found for this user",
        data: [],
      };
    }

    return {
      status: 200,
      message: "Tasks retrieved successfully for the user",
      data: tasks,
    };
  } catch (err) {
    console.error("Error fetching tasks by user ID:", err);
    return { status: 400, data: err, message: "Failed to fetch tasks by user" };
  }
};

module.exports = {
  createTask,
  getAllTask,
  getTaskById,
  getTaskByUserId,
};
