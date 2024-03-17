const { UserModel } = require('../../Schema/userSchema');
const constants = require('../../utils/constants');
const bcrypt = require('bcrypt');

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

    // Exclude sensitive fields from user object
    const { password: _, jwtTokens: __, ...userData } = user.toObject();

    res.json({ status: true, message: constants.LOGIN_SUCCESS_MESSAGE, user: userData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: constants.LOGIN_FAILED_MESSAGE });
  }
};

module.exports = { loginUser };
