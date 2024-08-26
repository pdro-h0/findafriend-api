import express from "express";
import { env } from "./env";
import petRoutes from "./routes/pet-route";
import orgRoutes from "./routes/org-route";
import cors from "cors"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use(petRoutes);
app.use(orgRoutes);

app.listen(env.PORT, () => {
  console.log(`🚀 Server running at port ${env.PORT}`);
});
