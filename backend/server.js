import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createTableIfNotExists } from "./config/initDb.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());  

app.use("/complaints", complaintRoutes);

app.get("/", (req, res) => res.send("🚀 Backend is working!"));

// Initialize DB and start server
createTableIfNotExists().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
