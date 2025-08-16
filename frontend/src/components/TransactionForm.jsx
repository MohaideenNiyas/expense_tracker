import { useEffect, useState } from "react";
import { createTransaction, updateTransaction } from "../api/transactions";
import { toast } from "react-toastify";

const CATEGORIES = ["Food", "Travel", "Bills", "Shopping", "Health", "Entertainment", "Other"];

export default function TransactionForm({ onSaved, editing, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  const isEditing = !!editing;

  // Populate form whenever 'editing' changes
  useEffect(() => {
    if (editing) {
      setTitle(editing.title || "");
      setAmount(editing.amount || "");
      setType(editing.type || "expense");
      setCategory(editing.category || "Food");
      setDate(editing.date ? editing.date.slice(0, 10) : new Date().toISOString().slice(0, 10));
    } else {
      resetForm();
    }
  }, [editing]);

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("Food");
    setDate(new Date().toISOString().slice(0, 10));
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit?.(); // notify parent
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date: new Date(date).toISOString(),
    };

    try {
      if (editing?.id) {
        await updateTransaction(editing.id, payload);
        toast.info("Transaction updated successfully");
      } else {
        await createTransaction(payload);
        toast.success("Transaction added successfully");
      }
      resetForm();
      onSaved?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="card grid sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end shadow-lg border border-slate-700 bg-slate-800 p-4 rounded-lg"
    >
      {/* Title */}
      <div className="lg:col-span-2">
        <label className="text-sm text-slate-300">Title</label>
        <input
          className="input mt-1 bg-slate-900 border-slate-700 focus:border-blue-500 text-white placeholder:text-slate-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Groceries"
          required
        />
      </div>

      {/* Amount */}
      <div>
        <label className="text-sm text-slate-300">Amount</label>
        <input
          className="input mt-1 bg-slate-900 border-slate-700 focus:border-blue-500 text-white placeholder:text-slate-400"
          value={amount}
          type="number"
          step="0.01"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          required
        />
      </div>

      {/* Type */}
      <div>
        <label className="text-sm text-slate-300">Type</label>
        <select
          className="select mt-1 bg-slate-900 border-slate-700 focus:border-blue-500 text-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="text-sm text-slate-300">Category</label>
        <select
          className="select mt-1 bg-slate-900 border-slate-700 focus:border-blue-500 text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="text-sm text-slate-300">Date</label>
        <input
          className="input mt-1 bg-slate-900 border-slate-700 focus:border-blue-500 text-white placeholder:text-slate-400 caret-white"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="sm:col-span-2 lg:col-span-1 flex gap-2 items-center">
        {isEditing && (
          <button
            type="button"
            className="btn btn-ghost text-white border border-slate-600 hover:bg-slate-700 flex-shrink-0"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary flex-1 transition-all duration-300 ${
            isEditing ? "min-w-[120px]" : "w-full"
          }`}
        >
          {loading ? (isEditing ? "Updating..." : "Saving...") : isEditing ? "Update" : "Add"}
        </button>
      </div>
      
    </form>
  );
}
