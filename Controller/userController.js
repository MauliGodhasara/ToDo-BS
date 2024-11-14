const {
  createUser,
  loginUser
} = require("../Service/userService");

const addUserController = async (req, res) => {
  const User = await createUser(req.body);
  res.send(User);
};
const loginUserController = async(req,res)=>{
  const user = await loginUser(req.body)
  res.send(user)
}
module.exports = {
  addUserController,
  loginUserController
}