const fmt = (n) => "₹" + n.toLocaleString("en-IN");

export default function SummaryCards({ transactions }) {
  const sum = (t) => transactions.filter((x) => x.type === t).reduce((s, x) => s + Number(x.amount), 0);
  const income = sum("income");
  const expense = sum("expense");
  const balance = income - expense;

  const cards = [
    { label: "Total Income", value: income, cls: "text-success" },
    { label: "Total Expenses", value: expense, cls: "text-danger" },
    { label: "Balance", value: balance, cls: balance >= 0 ? "text-primary" : "text-danger" },
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((c) => (
        <div className="col-md-4" key={c.label}>
          <div className="card summary-card p-3">
            <div className="text-muted small">{c.label}</div>
            <div className={`fs-3 fw-bold ${c.cls}`}>{fmt(c.value)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
