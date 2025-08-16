import { useEffect, useState } from "react";
import { getTransaction } from "../api/transactions";
import TransactionForm from "../components/TransactionForm";
import { toast } from "react-toastify";

export default function EditTransaction({ transactionId, onDone }) {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTx() {
      try {
        const data = await getTransaction(transactionId);
        setTransaction(data);
      } catch (err) {
        toast.error("Failed to load transaction");
      } finally {
        setLoading(false);
      }
    }
    fetchTx();
  }, [transactionId]);

  if (loading) return <div>Loading transaction...</div>;
  if (!transaction) return <div>Transaction not found</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
      <TransactionForm
        editing={transaction}
        onSaved={onDone}
      />
    </div>
  );
}
