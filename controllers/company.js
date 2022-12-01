import moment from "moment";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { welcomeEmail } from "../middleware/emails/subscription.js";
// import { goodbye } from "../middleware/emails/unsubscription.js";
import Company from "../models/company.js";
import jwt from "jsonwebtoken";

export const getCompanies = async (req, res, next) => {
  try {
    const company = await Company.find().select(
      " _id company createdAt phone email picture"
    );

    if (company.length < 1) {
      res.status(404).json({ message: "No Companies found" });
    } else {
      res.status(200).json({
        message: "companyS LISTS",
        company,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
export const getCompanybyId = async (req, res, next) => {
  try {
    const companyFound = await Company.findById({ _id: req.params.companyId });
    const {
      company,
      password,
      country,
      createdAt,
      email,
      phone,
      address,
      about,
      skills,
      portfolio,
      socialmedialink,
      total_number_employee,
    } = companyFound;

    let companyDetails = {
      company,
      country,
      createdAt,
      email,
      phone,
      address,
      about,
      skills,
      portfolio,
      socialmedialink,
      total_number_employee,
    };

    if (company) {
      res.status(200).json({
        message: "COMPANY SUCCESSFULLY FETCHED",
        companyDetails,
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
export const createCompany = async (req, res, next) => {
  let {
    company,
    password,
    country,
    createdAt,
    email,
    phone,
    address,
    about,
    skills,
    portfolio,
    socialmedialink,
    total_number_employee,
  } = req.body;
  const _id = new mongoose.Types.ObjectId();

  try {
    const existingCompany = await Company.find({ email: email });
    if (existingCompany.length >= 1) {
      return res.status(409).json({
        message: "EMAIL EXISTS",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newCompany = new Company({
        _id,
        company,
        picture: "",
        country,
        createdAt,
        company,
        email,
        phone,
        address,
        about,
        registered: moment().format("MMM Do YY"),
        info: {
          overview: "",
          awards: [],
        },
        skills,
        portfolio,
        socialmedialink,
        total_number_employee,
        password: hashedPassword,
      });
      const createdCompany = await newCompany.save();
      welcomeEmail(createdCompany.email);

      const token = jwt.sign(
        {
          email,
          id: _id,
        },
        "thisisasecretkey",
        {
          expiresIn: "5h",
        }
      );
      res.json({
        message: "COMPANY CREATED",
        createdCompany,
        token,
        request: {
          type: "GET",
          url: `localhost:8080/company/${createdCompany._id}`,
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
export const loginCompany = async (req, res, next) => {
  try {
    const company = await Company.find({ email: req.body.email });

    if (company.length === 0) {
      res.status(404).json({
        message: "INVALID EMAIL OR PASSWORD ",
      });
      return;
    }
    let companyPassword = company[0]?.password;

    const result = await bcrypt.compare(req.body.password, companyPassword);

    if (result) {
      const token = jwt.sign(
        {
          email: req.body.email,
          id: company._id,
        },
        "thisisasecretkey",
        {
          expiresIn: "5h",
        }
      );
      res.status(200).json({
        message: "SUCCESSFULLY LOGGED IN",
        company,
        token,
      });
    } else {
      res.status(400).json({
        message: "AUTHENTICATION FAILED !",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
export const updateCompanyPicture = async (req, res, next) => {
  const companyId = req.params.companyId;

  try {
    const company = await Company.updateOne(
      { _id: companyId },
      { picture: req.file.path }
    );
    res.status(200).json({
      messgae: "COMPANY IMAGE SUCCESSFULLY UPDATED",
      path: req.file.path,
      request: {
        type: "GET",
        url: `localhost:8080/company/${company._id}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
export const updateCompany = async (req, res, next) => {
  const companyId = req.params.companyId;
  const props = req.body;

  try {
    const company = await Company.update({ _id: companyId }, props);

    res.status(200).json({
      messgae: "COMPANY SUCCESSFULLY UPDATED",
      company,
      request: {
        type: "GET",
        url: `localhost:8080/company/${company._id}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error,
    });
  }
};
export const deleteCompany = async (req, res, next) => {
  const companyId = req.params.companyId;

  try {
    console.log(companyId);
    const result = await Company.deleteOne({ _id: companyId });
    // goodbyeEmail.goodbyeEmail(createdCompany.email)
    res.status(200).json({
      message: "COMPANY SUCCESSFULLY DELETED",
      result,
      request: {
        type: "CREATE COMPANY",
        url: `localhost:8080/company/`,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
