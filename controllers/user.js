import moment from "moment";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { welcomeEmail } from "../middleware/emails/subscription.js";
// import { goodbye } from "../middleware/emails/unsubscription.js";
import User from "../models/user.js";

export const getUsers = async (_, res, next) => {
  try {
    const users = await User.find().select(
      "email name company phone email picture"
    );

    if (users < 1) {
      res.status(404).json({
        message: "NO USER FOUND",
        users,
      });
    } else {
      res.status(200).json({
        message: "USERS LISTS",
        users,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.userId });
    if (user) {
      res.status(200).json({
        message: "USER SUCCESSFULLY FETCHED",
        user,
      });
    } else {
      res.status(404).json({
        message: "No Valid entry found for provided Id",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
export const createUser = async (req, res, next) => {
  let {
    username,
    password,
    country,
    age,
    name,
    gender,
    company,
    email,
    phone,
    address,
    about,
    education,
    skills,
    portfolio,
    socialmedialink,
    picture,
  } = req.body;
  const _id = new mongoose.Types.ObjectId();

  try {
    const existingUser = await User.find({ email: email });
    if (existingUser.length >= 1) {
      return res.status(409).json({
        message: "EMAIL EXISTS",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        _id,
        username,
        picture,
        country,
        age,
        name,
        gender,
        company,
        email,
        phone,
        address,
        about,
        registered: moment().format("MMM Do YY"),
        education,
        info: {
          overview: "",
          experience: "",
        },
        skills,
        portfolio,
        socialmedialink,
        password: hashedPassword,
      });
      const newUser = await user.save();

      // Generate token

      const token = jwt.sign(
        {
          email: req.body.email,
          id: req.body._id,
        },
        "thisisasecretkey",
        {
          expiresIn: 60 * 60,
        }
      );
      res.status(200).json({
        message: "SUCCESSFULLY SIGNU UP",
        user,
        token,
      });
      welcomeEmail(user.email);
      res.json({
        message: "USER CREATED",
        createduser: newUser,
        token,
        request: {
          type: "GET",
          url: `localhost:8080/users/${newUser._id}`,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
export const loginUser = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });

    if (user.length === 0) {
      res.status(404).json({
        message: "PPLEASE ENSURE YOU HAVE AN ACCOUNT",
      });
    }

    let userPassword = user[0].password;
    if (user.length < 1) {
      res.status(404).json({
        message: " INVALID EMAIL OR PASSWORD ",
      });
    } else {
      const result = await bcrypt.compare(req.body.password, userPassword);
      if (result) {
        // Generate token

        const token = jwt.sign(
          {
            email: req.body.email,
            id: req.body._id,
          },
          "thisisasecretkey",
          {
            expiresIn: 60 * 60,
          }
        );
        res.status(200).json({
          message: "SUCCESSFULLY LOGGED IN",
          user,
          token,
        });
      } else {
        res.status(400).json({
          message: "AUTHENTICATION FAILED !",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
export const loginSocialAccount = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length < 1) {
      res.status(404).json({
        message: " INVALID EMAIL OR PASSWORD ",
      });
    } else {
      res.status(200).json({
        message: "SUCCESSFULLY LOGGED IN",
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
export const updateUserPicture = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    console.log(req);
    const user = await User.updateOne(
      { _id: userId },
      { picture: req.route.path }
    );
    res.status(200).json({
      messgae: "USER  IMAGE SUCCESSFULLY UPDATED",
      path: req.file.path,
      request: {
        type: "GET",
        url: `localhost:8080/user/${user._id}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
export const updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const props = req.body;

  try {
    const user = await User.updateOne({ _id: userId }, props);
    res.status(200).json({
      messgae: "USER SUCCESSFULLY UPDATED",
      user,
      request: {
        type: "GET",
        url: `localhost:8080/user/${user._id}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
export const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const result = await User.deleteOne({ _id: userId });
    // goodbyeEmail.goodbyeEmail(user.email)
    res.status(200).json({
      message: "USER SUCCESSFULLY DELETED",
      result,
      request: {
        type: "CREATE USER",
        url: `localhost:8080/user/`,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
