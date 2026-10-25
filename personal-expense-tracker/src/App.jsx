import { useEffect, useState } from "react";
import { api } from "./api";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("all");
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [t, c] = await Promise.all([api.list("transactions"), api.list("categories")]);
      setTransactions(t.sort((a, b) => b.date.localeCompare(a.date)));
      setCategories(c);
      setError("");
    } catch {
      setError("Cannot reach the server. Run 'npm start' so JSON Server is running on port 3001.");
    }
  };

  useEffect(() => { load(); }, []);

  const run = async (action) => {
    try { await action(); await load(); } catch (e) { setError(e.message); }
  };

  const save = (data) =>
    run(async () => {
      if (editing) await api.update("transactions", editing.id, data);
      else await api.create("transactions", data);
      setEditing(null);
    });

  const remove = (t) => {
    if (window.confirm(`Delete "${t.title}"?`)) run(() => api.remove("transactions", t.id));
  };

  const addCategory = () => {
    const name = newCategory.trim();
    if (!name || categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) return;
    run(() => api.create("categories", { name, description: "Custom category" }));
    setNewCategory("");
  };

  const visible = transactions.filter((t) => filter === "all" || t.type === filter);

  return (
    <div className="container py-4">
      <div className="hero p-4 mb-4">
        <h1 className="h2 mb-1">Personal Expense Tracker</h1>
        <p className="mb-0">Record your income and expenses and see where your money goes.</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <SummaryCards transactions={transactions} />
      <TransactionForm categories={categories} editing={editing} onSave={save} onCancel={() => setEditing(null)} />

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-2 gap-2">
        <h5 className="mb-0">Transaction History</h5>
        <div className="d-flex gap-2">
          <input className="form-control form-control-sm" placeholder="New category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          <button className="btn btn-sm btn-outline-primary text-nowrap" onClick={addCategory}>Add Category</button>
          <select className="form-select form-select-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <TransactionList transactions={visible} onEdit={(t) => { setEditing(t); window.scrollTo({ top: 0, behavior: "smooth" }); }} onDelete={remove} />
    </div>
  );
}
