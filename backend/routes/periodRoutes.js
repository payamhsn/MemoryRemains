import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getInactivityPeriod,
  updateInactivityPeriod,
} from "../controllers/periodController.js";
const router = express.Router();

router.get("/", verifyToken, getInactivityPeriod);
router.post("/", verifyToken, updateInactivityPeriod);

export default router;
