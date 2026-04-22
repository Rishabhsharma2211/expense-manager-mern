const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// ADD EXPENSE
router.post("/expense", auth, async (req, res) => {
  const expense = new Expense({
    userId: req.user.id,
    ...req.body
  });

  await expense.save();
  res.json(expense);
});

// GET EXPENSES
router.get("/expenses", auth, async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  res.json(expenses);
});

module.exports = router;