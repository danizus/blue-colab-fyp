const User = require("../models/user.model");
const { signToken } = require("../utils/token");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const user = await User.create({ email, password });

    const token = signToken(user._id);

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user._id);

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
