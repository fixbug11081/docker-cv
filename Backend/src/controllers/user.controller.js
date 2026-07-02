const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklisttoken.model");

/**
 *
 * @name registerUser{*} req
 * @description Creation of new user
 * @access Public
 */

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res
      .status(400)
      .json({ message: "Please provide username, email and password" });

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExists) {
    return res
      .status(400)
      .json({ message: "Username or Email already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashed,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.SECRETS,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  return res.status(201).json({
    message: "User created successfully",
    user: { id: user._id, username: user.username, email: user.email },
  });
}

/**
 * @name loginUser
 * @description Log in user
 * @access public
 */

async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Provide email and password" });
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.SECRETS,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "User logged in successfully.",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function logoutUser(req, res) {
  try {
    const token = req.cookies?.token;

    if (token) {
      await blacklistTokenModel.create({ token });
    }

    res.clearCookie("token");

    res.status(200).json({ message: "User logout successfully" });
  } catch (err) {
    console.log("Error occur " + err.message);
  }
}

async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);

  return res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
module.exports = { registerUser, loginUser, logoutUser, getMe };
