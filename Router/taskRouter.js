const express = require('express');
const task = require('../Controller/taskController');
const verifyToken = require('../Middleware/verifyToken');

const router = express.Router();

router
  .route('/task')
  .post(verifyToken, task.addTaskController)
  .get(task.getAllTaskController);
router.route('/task/:id').get(task.getTaskByIdController);
router.route('/userTask').get(verifyToken, task.getTaskByUserIdController);

module.exports = { router };
