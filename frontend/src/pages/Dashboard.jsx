import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import { fetchInsights } from "../api/transactions.js";
import { fmtCurrency } from "../utils/format.js";
import { CategoryPie, MonthlyBar, BalanceAndIncomeVsExpenses } from "../components/Charts.jsx";
import { useAuth } from "../auth/useAuth.jsx";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await fetchInsights();
      setSummary(data);
    } catch {
      setSummary(null);
      alert("Failed to load insights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [user]);

  if (!user) return <div className="card">Please login to view your dashboard.</div>;
  if (loading) return <div className="card">Loading dashboard...</div>;
  if (!summary) return <div className="card">No data.</div>;

  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          title="Total Income"
          value={fmtCurrency(summary.totalIncome)}
          icon={() => <ArrowUpCircle className="w-8 h-8 text-green-400" />}
        />
        <Card
          title="Total Expense"
          value={fmtCurrency(summary.totalExpense)}
          icon={() => <ArrowDownCircle className="w-8 h-8 text-rose-400" />}
        />
        <Card
          title="Balance"
          value={fmtCurrency(summary.balance)}
          icon={() => <Wallet className="w-8 h-8 text-blue-400" />}
        />
      </div>

      {/* Top charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryPie data={summary.categories} />
        <MonthlyBar months={summary.months} />
      </div>

      {/* Stacked trend charts */}
      <div>
        <BalanceAndIncomeVsExpenses months={summary.months} />
      </div>
    </div>
  );
}
