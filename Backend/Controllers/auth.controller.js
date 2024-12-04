import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utils/errorHandler.js";
import jwt from "jsonwebtoken";
export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(500, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10); // hashSync has inbuilt await

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.json("user created successfully");
  } catch (err) {
    next(err);
  }
};

//signIn api
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email == "" || password == "") {
    return next(errorHandler(500, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      // console.log(validUser);

      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validPassword.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: hashedPass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true, //https needs to be true
        sameSite: "None", // cross
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json(rest);
  } catch (err) {
    next(err);
  }
};
