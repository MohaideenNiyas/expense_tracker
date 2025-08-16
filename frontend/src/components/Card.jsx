export default function Card({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="card flex items-center justify-between transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div>
        <div className="text-sm text-slate-400">{title}</div>
        <div className="text-2xl font-semibold text-slate-100">
          {value}
        </div>
        {subtitle && (
          <div className="text-xs text-slate-400 mt-1">
            {subtitle}
          </div>
        )}
      </div>
      {Icon && (
        <div>
          <Icon className="w-10 h-10" /> {/* Bigger icon */}
        </div>
      )}
    </div>
  );
}
