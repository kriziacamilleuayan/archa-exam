import express from "express";
import cors from "cors";
import sample from "./routes/sample";

const port = 3200;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/sample", sample);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
