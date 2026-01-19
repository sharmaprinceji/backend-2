import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  amount: {
    type: mongoose.Types.Decimal128,
    required: true,
    get: v => parseFloat(v.toString())
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: "",
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  requestId: {
    type: String,
    unique: true,
    sparse: true
  }
}, { toJSON: { getters: true } });

export default mongoose.model("Expense", ExpenseSchema);
