# Personal Expense Tracker

A web application to record income and expenses, categorise spending, and see total income, total expenses and balance.

## Technologies
- React 18 (Vite) - UI components, state and event handling
- Bootstrap 5 - responsive layout, forms, tables
- JSON Server (mock REST API, `db.json`) - **mock data only, not a real database or Spring Boot backend**

## Prerequisites
- Node.js 18 or later and npm

## Setup and run
```bash
npm install
npm start
```
- Frontend: http://localhost:5173
- API (JSON Server): http://localhost:3001

To run separately: `npm run server` and `npm run dev`.
To use a different API URL, create a `.env` file with `VITE_API_URL=http://localhost:3001`.

## Entities
| Entity | Fields |
|---|---|
| Transaction | id, title, amount, type (income/expense), category, date |
| Category | id, name, description |

## Endpoints
| Method | URL | Purpose |
|---|---|---|
| GET | /transactions | List transactions |
| POST | /transactions | Add transaction |
| PUT | /transactions/:id | Update transaction |
| DELETE | /transactions/:id | Delete transaction |
| GET / POST | /categories | List / add category |

## Known limitations
- Mock data only: no authentication, no production-level business rules, no real database persistence.
- Categories can be listed and added, but not edited or deleted from the UI.
