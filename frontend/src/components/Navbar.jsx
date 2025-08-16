import { useAuth } from "../auth/useAuth.jsx";

export default function Navbar({ onNavigate, active }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-700 bg-slate-900/80 backdrop-blur">

      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-bold text-slate-100">
          Expense Tracker
        </div>

        <nav className="flex items-center gap-2">
          {user && (
            <>
              <button
                className={`btn btn-outline ${active === "dashboard" ? "bg-slate-800" : ""}`}
                onClick={() => onNavigate("dashboard")}
              >
                Dashboard
              </button>
              <button
                className={`btn btn-outline ${active === "transactions" ? "bg-slate-800" : ""}`}
                onClick={() => onNavigate("transactions")}
              >
                Transactions
              </button>
            </>
          )}

          {!user ? (
            <>
              <button className="btn btn-outline" onClick={() => onNavigate("login")}>Login</button>
              <button className="btn btn-primary" onClick={() => onNavigate("register")}>Register</button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-300 hidden sm:block">
                {user.email}
              </span>
              <button className="btn btn-primary" onClick={logout}>Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
