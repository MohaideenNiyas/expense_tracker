import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  listTransactions, createTransaction, updateTransaction, deleteTransaction, insights
} from "../controllers/transactionsController.js";

const router = Router();

// all routes require auth
router.use(requireAuth);

router.get("/", listTransactions);
router.post("/", createTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);
router.get("/insights/summary", insights);

export default router;
