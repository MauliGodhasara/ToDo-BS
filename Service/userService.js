const bcrypt = require("bcrypt");
const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");

const createUser = async (data) => {
  const { userName, password } = data;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ userName, password: hashedPassword });
  await user.save();

  if (!user) {
    const error = new Error("Failed to create user");
    error.statusCode = 400;
    throw error;
  }

  return { status: 200, data: user, message: "User created successfully" };
};

const loginUser = async (data) => {
  const { userName, password } = data;
  const user = await User.findOne({ userName });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid username or password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ userId: user.id }, process.env.KEY, {
    expiresIn: "24h",
    algorithm: "HS256",
  });

  return { status: 200, data: { token, user }, message: "Login successful" };
};

module.exports = { createUser, loginUser };
