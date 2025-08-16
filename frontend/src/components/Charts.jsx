import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";
import { useInView } from "react-intersection-observer"; // new
import { useState, useEffect } from "react";

const COLORS = [
  '#4A90E2', '#50E3C2', '#F5A623', '#9B59B6',
  '#1ABC9C', '#2ECC71', '#FF6B6B', '#FFD700'
];

const chartTitleClass = "mb-4 text-lg font-semibold text-slate-100";

const tooltipStyle = {
  backgroundColor: 'rgba(30, 41, 59, 0.9)',
  border: '1px solid #334155',
  color: '#f1f5f9',
};

const legendStyleInside = {
  bottom: 10,
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '0.9rem',
  color: '#cbd5e1',
  lineHeight: 1,
};

// Wrapper hook to enable animation only when element is visible
const useAnimateOnView = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (inView) setAnimate(true);
  }, [inView]);
  return [ref, animate];
};

export function CategoryPie({ data }) {
  const [ref, animate] = useAnimateOnView();
  const entries = Object.entries(data || {}).map(([name, value]) => ({ name, value }));

  return (
    <div ref={ref} className="card h-[32rem] border border-slate-700 w-full mb-8">
      <div className={chartTitleClass}>Category Breakdown</div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            data={entries}
            outerRadius={120}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
            labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
            isAnimationActive={animate}
          >
            {entries.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#f1f5f9' }} />
         
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MonthlyBar({ months }) {
  const [ref, animate] = useAnimateOnView();
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const data = (months || []).map((m, i) => ({
    name: labels[i],
    income: m.income,
    expense: m.expense
  }));

  return (
    <div ref={ref} className="card h-[32rem] border border-slate-700 w-full mb-8">
      <div className={chartTitleClass}>Monthly Trends</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend verticalAlign="bottom" align="center" wrapperStyle={legendStyleInside} />
          <Bar dataKey="income" fill="#4CAF50" radius={[4, 4, 0, 0]} isAnimationActive={animate} />
          <Bar dataKey="expense" fill="#F44336" radius={[4, 4, 0, 0]} isAnimationActive={animate} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BalanceAndIncomeVsExpenses({ months }) {
  const [ref1, animate1] = useAnimateOnView();
  const [ref2, animate2] = useAnimateOnView();
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  
  const balanceData = (months || []).map((m, i) => ({
    name: labels[i],
    balance: m.income - m.expense
  }));

  const incomeExpenseData = (months || []).map((m, i) => ({
    name: labels[i],
    income: m.income,
    expense: m.expense
  }));

  return (
    <div className="w-full flex flex-col gap-8">
      <div ref={ref1} className="card h-[34rem] border border-slate-700 w-full mb-8">
        <div className={chartTitleClass}>Balance Trend</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={balanceData} margin={{ bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend verticalAlign="bottom" align="center" wrapperStyle={legendStyleInside} />
            <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} isAnimationActive={animate1} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div ref={ref2} className="card h-[34rem] border border-slate-700 w-full mb-8">
        <div className={chartTitleClass}>Income vs Expenses (Monthly)</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={incomeExpenseData} margin={{ bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend verticalAlign="bottom" align="center" wrapperStyle={legendStyleInside} />
            <Line type="monotone" dataKey="income" stroke="#4CAF50" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={animate2} />
            <Line type="monotone" dataKey="expense" stroke="#F44336" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={animate2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
