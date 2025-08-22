import { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFoundHandler from "./middlewares/notFoundHandler";
import routers from "./routes";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

if (config.nodeEnv !== 'production') {
  app.use(morgan('dev'));
}



// Routes
app.use("/api/v1", routers);

// Server health check
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Error handler
app.use(globalErrorHandler);

// Not found handler
app.use(notFoundHandler);

export default app;
