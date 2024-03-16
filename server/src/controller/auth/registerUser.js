const { UserModel } = require('../../Schema/userSchema');
const constants = require('../../utils/constants');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: constants.REQUIRED_FIELDS_MESSAGE });
    }

    // Check for existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: constants.EMAIL_EXISTS_MESSAGE });
    }

    // Create user
    const user = new UserModel({
      name,
      email,
      password,
    });

    // Save user
    await user.save();

    res.json({ status: true, message: constants.REGISTRATION_SUCCESS_MESSAGE });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: constants.REGISTRATION_FAILED_MESSAGE });
  }
};

module.exports = { registerUser };
