import { txCol } from "../services/firebase.js";
import { transactionSchema } from "../validators/transactionSchema.js";

const docToObj = (doc) => ({ id: doc.id, ...doc.data() });

export const listTransactions = async (req, res, next) => {
  try {
    const { uid } = req.user;
    const snap = await txCol(uid).orderBy("date", "desc").get();
    const items = snap.docs.map(docToObj);
    res.json(items);
  } catch (err) { next(err); }
};

export const createTransaction = async (req, res, next) => {
  try {
    const { uid } = req.user;
    const { error, value } = transactionSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const dateObj = new Date(value.date);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ message: "Invalid date format provided." });
    }
    const payload = { ...value, date: dateObj.toISOString(), createdAt: new Date().toISOString() };
    const ref = await txCol(uid).add(payload);
    const doc = await ref.get();
    res.status(201).json(docToObj(doc));
  } catch (err) { next(err); }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    // allow partial update
    const partialSchema = transactionSchema.fork(
      Object.keys(transactionSchema.describe().keys), (s) => s.optional()
    );
    const { error, value } = partialSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const ref = txCol(uid).doc(id);
    const existing = await ref.get();
    if (!existing.exists) return res.status(404).json({ message: "Not found" });

    await ref.update({ ...value, updatedAt: new Date().toISOString() });
    const updated = await ref.get();
    res.json(docToObj(updated));
  } catch (err) { next(err); }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;
    await txCol(uid).doc(id).delete();
    res.status(204).send();
  } catch (err) { next(err); }
};

export const insights = async (req, res, next) => {
  try {
    const { uid } = req.user;
    const { year } = req.query;

    const snap = await txCol(uid).get();
    const txs = snap.docs.map(docToObj);

    const months = Array.from({ length: 12 }, () => ({ income: 0, expense: 0 }));
    const categories = {};
    let totalIncome = 0, totalExpense = 0;

    for (const t of txs) {
      const d = new Date(t.date);
      // Skip transactions with invalid dates
      if (isNaN(d.getTime())) {
        console.warn(`Skipping transaction with invalid date: ${t.date}`);
        continue;
      }

      if (year && d.getFullYear() !== Number(year)) continue;

      const m = d.getMonth();
      if (t.type === "income") {
        months[m].income += t.amount;
        totalIncome += t.amount;
      } else if (t.type === "expense") { // Ensure type is 'expense'
        months[m].expense += t.amount;
        totalExpense += t.amount;
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      } else {
        console.warn(`Skipping transaction with unknown type: ${t.type}`);
      }
    }

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      months,
      categories
    });
  } catch (err) { next(err); }
};
