import express from "express";
import { foundationDetail, getAllfoundation } from "../controllers/foundationController.js";
import { editFoundationDetails, forgotpassword, getProfile, loginFoundation, logout, registerFoundation, resetpassword } from "../controllers/foundationAuth.js";
import { isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

router.route("/details/:id").get(foundationDetail);
router.route("/ids").get(getAllfoundation);
router.route("/register").post(registerFoundation);
router.route("/editdetails").post(editFoundationDetails)
router.route("/login").post(loginFoundation);
router.route("/login/forgotpassword").post(forgotpassword);
router.route("/login/resetpassword").post(resetpassword);
router.route("/getprofile").get(isAuthenticated,getProfile)
router.route("/logout").get(isAuthenticated,logout)

export default router;
