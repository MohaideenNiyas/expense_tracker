import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionTable from "../components/TransactionTable.jsx";
import { fetchTransactions } from "../api/transactions.js";
import { useAuth } from "../auth/useAuth.jsx";

export default function Transactions() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await fetchTransactions();
      setItems(data);
      setEditing(null); // Reset editing after load
    } catch {
      alert("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [user]);

  const handleCancelEdit = () => {
    setEditing(null); // This allows re-editing the same transaction
  };

  if (!user) {
    return (
      <div className="card text-center text-slate-300">
        Please login to manage transactions.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TransactionForm
        onSaved={load}
        editing={editing}
        onCancelEdit={handleCancelEdit} // Pass cancel handler
      />
      {loading ? (
        <div className="card">Loading transactions...</div>
      ) : (
        <TransactionTable items={items} onChanged={load} onEdit={setEditing} />
      )}
    </div>
  );
}
