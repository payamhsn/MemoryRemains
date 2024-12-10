import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/accountController.js";

const router = express.Router();

// Apply verifyToken middleware to all routes
router.use(verifyToken);

// GET /api/accounts
router.get("/", getAccounts);

// POST /api/accounts
router.post("/", createAccount);

// PUT /api/accounts/:id
router.put("/:id", updateAccount);

// DELETE /api/accounts/:id
router.delete("/:id", deleteAccount);

export default router;
