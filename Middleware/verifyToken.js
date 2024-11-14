const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.json({
        body: { message: 'Token is not available', data: '' },
        success: false,
      });
    }
    jwt.verify(token, process.env.KEY, (error, decryptedToken) => {
      if (error) {
        console.log(error); // Log the error for debugging
        return res
          .status(401)
          .json({ message: 'Invalid token', success: false });
      } else {
        req.decryptedToken = decryptedToken;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Export the middleware function directly
module.exports = verifyToken;
