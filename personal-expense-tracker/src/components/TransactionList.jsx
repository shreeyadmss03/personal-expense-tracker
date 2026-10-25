export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) return <p className="text-muted">No transactions found.</p>;

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle bg-white">
        <thead className="table-light">
          <tr>
            <th>Date</th><th>Title</th><th>Category</th><th>Type</th><th>Amount</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.title}</td>
              <td><span className="badge text-bg-secondary">{t.category}</span></td>
              <td className={t.type === "income" ? "text-success" : "text-danger"}>{t.type}</td>
              <td className={t.type === "income" ? "text-success" : "text-danger"}>
                {t.type === "income" ? "+" : "-"}₹{Number(t.amount).toLocaleString("en-IN")}
              </td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(t)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(t)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
