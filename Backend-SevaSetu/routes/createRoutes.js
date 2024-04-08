import express from "express";
import createCustomer from "../controllers/createCustomer.js";
import { createInvoice } from "../controllers/createInvoice.js";
import { createItem } from "../controllers/createItem.js";

const router = express.Router();

router.route("/createCustomer").post(createCustomer);
router.route("/createItem").post(createItem);
router.route("/createInvoice/:Cid/:Iid").get(createInvoice);

export default router