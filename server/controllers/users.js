import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import { jwtConfig } from "../config.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ messsage: "User does not exist!" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      jwtConfig.secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ messsage: "User already exist!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      jwtConfig.secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
