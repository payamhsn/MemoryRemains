import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getTrustedPerson,
  saveTrustedPerson,
  updateTrustedPerson,
  deleteTrustedPerson,
} from "../controllers/trustedPersonController.js";

const router = express.Router();

router.get("/", verifyToken, getTrustedPerson);
router.post("/", verifyToken, saveTrustedPerson);
router.put("/", verifyToken, updateTrustedPerson);
router.delete("/", verifyToken, deleteTrustedPerson);

export default router;
