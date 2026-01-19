import Expense from "../models/expense.js";

export const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const requestId = req.headers["x-request-id"];

    if (!requestId) {
      return res.status(400).json({ error: "Missing x-request-id header" });
    }

    let existing = await Expense.findOne({ requestId });
    if (existing) {
      return res.json(existing);
    }

    const expense = await Expense.create({
      amount,
      category,
      description,
      date,
      requestId
    });

    return res.status(201).json(expense);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export const getExpenses = async (req, res) => {
  try {
    const { category, sort } = req.query;

    const filter = {};
    if (category) filter.category = category;

    let query = Expense.find(filter);

    if (sort === "date_desc") {
      query = query.sort({ date: -1 });
    }

    const expenses = await query.lean();
    return res.json(expenses);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
