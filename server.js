import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/expense_route.js";

dotenv.config();
const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", expenseRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Expense Tracker Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
