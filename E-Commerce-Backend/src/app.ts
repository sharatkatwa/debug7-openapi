import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { apiReference } from "@scalar/express-api-reference";
import { swaggerSpec } from "./config/swagger";
import routes from "./routes";
import { errorHandler, notFound } from "./middlewares/error.middleware";

const app: Application = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_req: Request, res: Response) => {
  res.json({ success: true, message: "E-commerce backend is running" });
});

// Raw OpenAPI JSON spec endpoint
app.get("/api/docs.json", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Scalar API Reference UI
app.use(
  "/api/docs",
  apiReference({
    spec: {
      content: swaggerSpec,
    },
    theme: "purple",
    darkMode: true,
    pageTitle: "Horizon E-Commerce API Reference",
  })
);

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
