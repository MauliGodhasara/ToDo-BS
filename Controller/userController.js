const { createUser, loginUser } = require("../Service/userService");

const addUserController = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(user.status).send(user);
  } catch (error) {
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const user = await loginUser(req.body);
    res.status(user.status).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUserController,
  loginUserController,
};
