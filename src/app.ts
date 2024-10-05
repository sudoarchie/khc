import express from "express";
import mainRouter from "./mainrouter";
import cors from 'cors';
import cookieParser from "cookie-parser";
const port = process.env.PORT || 3000;
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: "http://localhost:3001"
}))

app.get("/health", (_, res) => {
  res.send("All things working fine")
});

app.use('/api/v1', mainRouter)
app.listen(3000, () => {
  console.log(`http://localhost:${port}`);
});
