const { UserModel } = require('../../Schema/userSchema');
const constants = require('../../utils/constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT library

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: constants.REQUIRED_FIELDS_MESSAGE });
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: constants.INVALID_CREDENTIALS_MESSAGE,
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: false,
        message: constants.INVALID_CREDENTIALS_MESSAGE,
      });
    }

    // Generate JWT token with user ID and expiration time
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Customize expiration time (e.g., '1h', '24h')
    });

    // Exclude sensitive fields from user object
    const { password: _, jwtTokens: __, createdAt: ___, updatedAt: ____, ...userData } = user.toObject();

    // Update user's JWT tokens (optional): Consider storing refresh token on server
    user.jwtTokens.push(token); // Implement logic to manage token storage
    await user.save();

    // Set JWT token in cookie (secure: true for HTTPS)
    res.cookie('jwt', token, { httpOnly: true, secure: true }); // Adjust settings

    res.json({ status: true, message: constants.LOGIN_SUCCESS_MESSAGE, data: userData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: constants.LOGIN_FAILED_MESSAGE });
  }
};

module.exports = { loginUser };
