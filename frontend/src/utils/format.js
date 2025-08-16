export const fmtCurrency = (n = 0) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

export const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString();
