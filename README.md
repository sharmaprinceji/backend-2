
# 🏦 Expense Tracker Backend API

A minimal production-aware backend for a personal expense tracking system.

Supports:
- Creating expenses (with idempotent behavior)
- Fetching expenses with filtering + sorting
- Decimal-safe money handling
- Persistent storage via MongoDB

---

## 🚀 Features

✔ `POST /expenses` — create expense
✔ `GET /expenses` — list expenses
✔ Optional query filters:
&nbsp;&nbsp;`category=Food`
&nbsp;&nbsp;`sort=date_desc`
✔ Idempotency via `x-request-id` header
✔ MongoDB `Decimal128` for accurate money storage
✔ Persists data across refreshes

---

## 🗄️ Data Model

Expense schema includes:

```js
{
_id,
amount: Decimal128,
category: String,
description: String,
date: Date,
created_at: Date,
requestId: String (unique, for idempotency)
}
💰 Money Handling
Decimal128 avoids floating point issues (e.g., 0.1 + 0.2 ≠ 0.3 in JS).

📡 API Endpoints
POST /expenses
Create new expense.

Headers:

css
Copy code
x-request-id: <uuid>
Body:

json
Copy code
{
"amount": 120,
"category": "Food",
"description": "Lunch",
"date": "2024-01-19"
}
Idempotent behavior:
If same x-request-id is re-sent due to retries, the same record is returned, preventing duplicates.

GET /expenses
Supports filtering + sorting:

Query Example
category /expenses?category=Food
sort=date_desc /expenses?sort=date_desc

Example:

bash
Copy code
GET /expenses?category=Food&sort=date_desc
🧪 Example Response
json
Copy code
{
"data": [
{
"_id": "...",
"amount": "120.00",
"category": "Food",
"description": "Lunch",
"date": "2024-01-19T00:00:00.000Z"
}
]
}
🧱 Tech Stack
Node.js + Express

MongoDB + Mongoose

UUID for idempotency token

Decimal128 for money

⚙️ Setup & Installation
1. Clone & Install
sh
Copy code
cd backend
npm install
2. Environment Variables
Create .env:

ini
Copy code
MONGO_URI=<your-mongodb-uri>
PORT=4000
3. Run Server
sh
Copy code
npm start
Server runs at:

arduino
Copy code
http://localhost:4000
🧠 Design Decisions
MongoDB chosen for flexible JSON storage & cloud deployment

Decimal128 avoids floating-point money errors

Idempotency tokens prevent duplicate submissions under retries

⚖️ Trade-offs
No authentication (not required)

No pagination

Limited validation (can be extended)

No automated tests due to timebox

🗺️ Future Enhancements
Would add:

Validation rules (negative amounts prevention)

Pagination & search

Monthly summaries

JWT authentication

Integration tests (Supertest)