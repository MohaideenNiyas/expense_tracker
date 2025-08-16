import { useState, useMemo } from "react";
import { deleteTransaction } from "../api/transactions";
import { fmtCurrency, fmtDate } from "../utils/format";
import { toast } from "react-toastify";
import { Trash2, Pencil, X } from "lucide-react";

const CATEGORIES = ["All", "Food", "Travel", "Bills", "Shopping", "Health", "Entertainment", "Other"];
const TYPES = ["All", "income", "expense"];

export default function TransactionTable({ items, onChanged, onEdit }) {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("");

  const onDelete = async (id) => {
    if (!confirm("Delete this transaction?")) return;
    try {
      await deleteTransaction(id);
      toast.success("Transaction deleted successfully");
      onChanged?.();
    } catch (e) {
      toast.error("Failed to delete transaction");
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter((t) => {
      const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;
      const matchesType = typeFilter === "All" || t.type === typeFilter;
      const matchesMonth = !monthFilter || t.date.slice(0, 7) === monthFilter; // YYYY-MM
      return matchesCategory && matchesType && matchesMonth;
    });
  }, [items, categoryFilter, typeFilter, monthFilter]);

  const resetFilters = () => {
    setCategoryFilter("All");
    setTypeFilter("All");
    setMonthFilter("");
  };

  return (
    <div className="card overflow-x-auto shadow-lg rounded-lg bg-slate-800 border border-slate-700 p-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full items-center">
        {/* Category Filter */}
        <select
          className="select bg-slate-900 border-slate-700 focus:border-blue-500 text-slate-200 flex-1 w-full sm:w-auto"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          className="select bg-slate-900 border-slate-700 focus:border-blue-500 text-slate-200 flex-1 w-full sm:w-auto"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>

        {/* Month Filter */}
        <input
          type="month"
          className="input bg-slate-900 border-slate-700 focus:border-blue-500 text-slate-200 flex-1 w-full sm:w-auto appearance-none"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          style={{
            color: "white",
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
        />

        {/* Reset Filters Button */}
        <button
          type="button"
          className="btn bg-rose-500 hover:bg-rose-400 text-white flex items-center gap-1 flex-1 w-full sm:w-auto justify-center"
          onClick={resetFilters}
        >
          <X size={16} /> Reset Filters
        </button>
      </div>

      {/* Transaction Table */}
      <table className="w-full text-sm">
        <thead className="text-left text-slate-300 border-b border-slate-700 bg-slate-900">
          <tr>
            <th className="py-3 px-4">Date</th>
            <th className="px-4">Title</th>
            <th className="px-4">Category</th>
            <th className="px-4">Type</th>
            <th className="text-right px-4">Amount</th>
            <th className="px-4"></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((t, idx) => (
            <tr
              key={t.id}
              className={`transition-colors ${idx % 2 === 0 ? "bg-slate-800" : "bg-slate-900"} hover:bg-slate-700`}
            >
              <td className="py-3 px-4">{fmtDate(t.date)}</td>
              <td className="px-4">{t.title}</td>
              <td className="px-4">{t.category}</td>
              <td className={`px-4 font-medium ${t.type === "income" ? "text-green-400" : "text-rose-400"}`}>
                {t.type}
              </td>
              <td className="text-right px-4 font-semibold">{fmtCurrency(t.amount)}</td>
              <td className="text-right px-4">
                <div className="flex gap-3 justify-end">
                  <button
                    className="text-blue-400 hover:text-blue-300"
                    title="Edit"
                    onClick={() => onEdit?.(t)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-rose-400 hover:text-rose-300"
                    title="Delete"
                    onClick={() => onDelete(t.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-6 text-slate-400">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Custom CSS for Month input calendar icon */}
      <style>
        {`
          input[type="month"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}
