import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { sendCookies } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";
import { Foundations } from "../models/foundationsModels.js";

export const registerFoundation = async (req, res, next) => {
  const {
    foundation_name,
    foundation_email,
    category,
    foundation_password,
    foundation_head_name,
    foundation_short_description,
    foundation_cause,
    foundation_impact,
    foundation_image_url,
    foundation_signature_url,
    foundation_logo_url,
  } = req.body;

  try {
    let foundation = await Foundations.findOne({ foundation_email });

    if (foundation) {
      return res.status(401).json({
        success: false,
        message: "Foundation Already Exists",
      });
    }

    const hashpass = await bcrypt.hash(foundation_password, 10);
    foundation = await Foundations.create({
      foundation_name,
      foundation_email,
      category,
      foundation_head_name,
      foundation_short_description,
      foundation_cause,
      foundation_impact,
      foundation_image_url,
      foundation_signature_url,
      foundation_logo_url,
      foundation_password: hashpass,
    });
    sendCookies(foundation, res, "Register Success", 201);
  } catch (error) {
    console.log(error);
  }
};

export const editFoundationDetails = async (req, res, next) => {
  try {
    const {
      foundation_name,
      foundation_short_description,
      foundation_cause,
      foundation_impact,
      foundation_image_url,
      id,
    } = req.body;

    // console.log(foundation_name,
    //   foundation_short_description,
    //   foundation_cause,
    //   foundation_impact,
    //   id)
    const foundation = await Foundations.findById(id);

    foundation.foundation_name = foundation_name;
    foundation.foundation_short_description = foundation_short_description;
    foundation.foundation_cause = foundation_cause;
    foundation.foundation_impact = foundation_impact;
    foundation.foundation_image_url = foundation_image_url;

    // Save the updated foundation
    await foundation.save();

    res.status(200).json({
      success: true,
      message: "Foundation details updated successfully",
    });
  } catch (error) {
    console.log(error);
    next(ErrorHandler);
  }
};

export const loginFoundation = async (req, res, next) => {
  try {
    const { foundation_email, foundation_password } = req.body;

    const foundation = await Foundations.findOne({ foundation_email }).select(
      "+foundation_password"
    );

    if (!foundation)
      return res.status(401).json({
        success: false,
        message: "Foundation doesn't exist or Incorrect Email",
      });

    const isMatch = await bcrypt.compare(
      foundation_password,
      foundation.foundation_password
    );

    if (!isMatch)
      return res.status(404).json({
        success: false,
        message: "Invalid password",
      });
    else {
      sendCookies(
        foundation,
        res,
        `Welcome Back, ${foundation.foundation_name}`,
        200
      );
    }
  } catch (error) {
    console.log(error);
    next(ErrorHandler);
  }
};

export const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    foundation: req.foundation,
  });
};
export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expire: new Date(Date.now()),
      // sameSite:process.env.NODE_ENV === "Development"? "lax" : "none",
      // secure:process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
    });
};
const generateRandomToken = () => {
  return Math.random().toString(36).substring(2, 10); // Generate a random alphanumeric string
};

export const forgotpassword = async (req, res) => {
  try {
    const { foundation_email } = req.body;

    const foundation = await Foundations.findOne({ foundation_email });
    if (!foundation) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = generateRandomToken();
    const tokenExpire = Date.now() + 600000;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MYEMAIL,
        pass: process.env.MYPASS,
      },
    });

    const site = `https://seva-setu.vercel.app/foundation/login/resetpassword/${foundation_email}/${tokenExpire}`;
    const mailOptions = {
      from: { name: "SevaSetu", address: process.env.MYEMAIL },
      to: foundation_email,
      subject: "Reset Password",
      text: `Here is your password reset Link ${site}`,
    };

    transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const resetpassword = async (req, res) => {
  const { foundation_password,token} = req.body;
  const email = token
  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(foundation_password, 10);

    // Find the foundation by email and update its password
    const updatedFoundation = await Foundations.findOneAndUpdate(
      { foundation_email: email },
      { $set: { foundation_password: hashedPassword } },
      { new: true } // Set to true to return the updated document
    );

    if (!updatedFoundation) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};