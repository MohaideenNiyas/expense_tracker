import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import { AuthProvider, useAuth } from "./auth/useAuth.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InnerApp() {
  const [page, setPage] = useState("dashboard"); // dashboard | transactions | login | register
  const { user, initializing } = useAuth();
  const [editingTx, setEditingTx] = useState(null);

  // redirect to login if not authenticated for protected pages
  const goto = (p) => setPage(p);

  let content = null;
  if (initializing) {
    content = <div className="card mt-10 max-w-lg mx-auto">Loading...</div>;
  } else if (!user && (page === "dashboard" || page === "transactions")) {
    content = <Login onSuccess={() => setPage("dashboard")} />;
  } else {
    if (page === "dashboard") content = <Dashboard />;
    if (page === "transactions")
      content = (
        <Transactions
          onEditTransaction={(tx) => setEditingTx(tx)}
          closeEditModal={() => setEditingTx(null)}
        />
      );
    if (page === "login")
      content = <Login onSuccess={() => setPage("dashboard")} />;
    if (page === "register")
      content = <Register onSuccess={() => setPage("dashboard")} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={goto} active={page} />
      <main className="max-w-6xl mx-auto p-4 md:p-8">{content}</main>

      
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <InnerApp />
      <ToastContainer position="top-right" autoClose={2000} />
    </AuthProvider>
  );
}
