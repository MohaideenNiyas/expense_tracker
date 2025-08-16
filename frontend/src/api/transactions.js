import { api } from "./client";

export const fetchTransactions = () =>
  api.get("/transactions").then(r => r.data);

export const createTransaction = (data) =>
  api.post("/transactions", data).then(r => r.data);

export const updateTransaction = (id, data) =>
  api.put(`/transactions/${id}`, data).then(r => r.data);

export const deleteTransaction = (id) =>
  api.delete(`/transactions/${id}`).then(r => r.data);

export const fetchInsights = (params = {}) =>
  api.get("/transactions/insights/summary", { params }).then(r => r.data);
