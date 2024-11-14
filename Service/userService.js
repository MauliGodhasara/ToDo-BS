const bcrypt = require('bcrypt');
const User = require('../Model/userModel');
const jwt = require('jsonwebtoken');

const createUser = async (data) => {
  try {
    const { userName, password } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ userName, password: hashedPassword });
    await user.save();
    if (user) {
      return { status: 200, data: user, message: 'User created successfully' };
    }
  } catch (err) {
    console.error('Error saving user:', err);
    return { status: 400, data: err, message: 'Failed to create user' };
  }
};

const loginUser = async (data) => {
  const { userName, password } = data;
  const user = await User.findOne({ userName });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.KEY,
        { expiresIn: '24h', algorithm: 'HS256' }
      );
      return {
        status: 200,
        data: { token, user },
        message: 'Login successful',
      };
    } else {
      return { status: 401, message: 'Invalid username or password' };
    }
  } else {
    return { status: 404, message: 'User not found' };
  }
};

module.exports = { createUser, loginUser };
