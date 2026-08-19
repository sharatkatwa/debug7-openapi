import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
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

// Swagger UI Route
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Raw OpenAPI JSON spec endpoint
app.get("/api/docs.json", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
