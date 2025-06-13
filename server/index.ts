import express from "express";
import cors from "cors";
import sample from "./routes/sample";
import expenseManagement from "./routes/expense-management";

const port = 3200;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/sample", sample);
app.use("/api/expense-management", expenseManagement);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
