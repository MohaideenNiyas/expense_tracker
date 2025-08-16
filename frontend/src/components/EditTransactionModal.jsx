import { useEffect, useState } from "react";
import { updateTransaction } from "../api/transactions";
import { toast } from "react-toastify";

const CATEGORIES = ["Food", "Travel", "Bills", "Shopping", "Health", "Entertainment", "Other"];

export default function EditTransactionModal({ transaction, onClose, onUpdated }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transaction) {
      setTitle(transaction.title);
      setAmount(transaction.amount);
      setType(transaction.type);
      setCategory(transaction.category);
      setDate(transaction.date.slice(0, 10));
    }
  }, [transaction]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateTransaction(transaction.id, {
        title,
        amount: Number(amount),
        type,
        category,
        date: new Date(date).toISOString(),
      });
      toast.info("Transaction updated successfully");
      onUpdated?.();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update transaction");
    } finally {
      setLoading(false);
    }
  };

  if (!transaction) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <form
        onSubmit={handleUpdate}
        className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-lg border border-slate-700"
      >
        <h2 className="text-lg font-semibold mb-4 text-white">Edit Transaction</h2>

        <div className="mb-3">
          <label className="text-sm text-slate-300">Title</label>
          <input
            className="input mt-1 bg-slate-900 border-slate-700 focus:border-blue-500 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-sm text-slate-300">Amount</label>
          <input
            className="input mt-1 bg-slate-900 border-slate-700 focus:border-blue-500 w-full"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-sm text-slate-300">Type</label>
          <select
            className="select mt-1 bg-slate-900 border-slate-700 focus:border-blue-500 w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="text-sm text-slate-300">Category</label>
          <select
            className="select mt-1 bg-slate-900 border-slate-700 focus:border-blue-500 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="text-sm text-slate-300">Date</label>
          <input
            className="input mt-1 bg-slate-900 border-slate-700 focus:border-blue-500 w-full"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
