import { useEffect, useState } from "react";

const empty = { title: "", amount: "", type: "expense", category: "", date: new Date().toISOString().slice(0, 10) };

export default function TransactionForm({ categories, editing, onSave, onCancel }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(editing || empty);
    setErrors({});
  }, [editing]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Title is required.";
    if (!form.amount || Number(form.amount) <= 0) err.amount = "Enter an amount greater than 0.";
    if (!form.category) err.category = "Please select a category.";
    if (!form.date) err.date = "Date is required.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...form, title: form.title.trim(), amount: Number(form.amount) });
    if (!editing) setForm(empty);
  };

  const field = (name) => `form-control ${errors[name] ? "is-invalid" : ""}`;

  return (
    <form className="card p-3 mb-4 shadow-sm" onSubmit={submit} noValidate>
      <h5 className="mb-3">{editing ? "Edit Transaction" : "Add Transaction"}</h5>
      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Title</label>
          <input name="title" className={field("title")} value={form.title} onChange={change} placeholder="e.g. Lunch" />
          <div className="invalid-feedback">{errors.title}</div>
        </div>
        <div className="col-md-2">
          <label className="form-label">Amount (₹)</label>
          <input name="amount" type="number" className={field("amount")} value={form.amount} onChange={change} />
          <div className="invalid-feedback">{errors.amount}</div>
        </div>
        <div className="col-md-2">
          <label className="form-label">Type</label>
          <select name="type" className="form-select" value={form.type} onChange={change}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Category</label>
          <select name="category" className={`form-select ${errors.category ? "is-invalid" : ""}`} value={form.category} onChange={change}>
            <option value="">Select...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.category}</div>
        </div>
        <div className="col-md-2">
          <label className="form-label">Date</label>
          <input name="date" type="date" className={field("date")} value={form.date} onChange={change} />
          <div className="invalid-feedback">{errors.date}</div>
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-primary me-2" type="submit">{editing ? "Update" : "Add Transaction"}</button>
        {editing && <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
