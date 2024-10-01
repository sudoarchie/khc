import express from "express";
import mainRouter from "./router";
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get("/health", (_, res) => {
  res.send("All things working fine")
});

app.use('/api/v1', mainRouter)
app.listen(3000, () => {
  console.log(`http://localhost:${port}`);
});
