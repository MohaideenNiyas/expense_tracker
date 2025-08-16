import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";

export default function Register({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSuccess?.();
    } catch (e) {
      alert(e.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={submit}
        className="card w-full max-w-md space-y-5 p-6 shadow-md"
      >
        <h1 className="text-2xl font-bold text-slate-100">
          Create Account
        </h1>
        <p className="text-sm text-slate-400">
          Sign up to start tracking your expenses.
        </p>

        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input
            className="input mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Password</label>
          <input
            className="input mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          className="btn btn-primary w-full"
          disabled={busy}
        >
          {busy ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
}
