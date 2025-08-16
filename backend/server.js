import 'dotenv/config'; // This ensures dotenv is configured before other imports
import app from "./src/app.js";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
