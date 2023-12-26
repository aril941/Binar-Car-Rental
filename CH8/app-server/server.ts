/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express, NextFunction, Request, Response } from "express";
import path from "path";
import apiRouter from "./routes/api";
import ResponseBuilder from "./utils/responBuilder";
import cors from "cors";

const { PORT = 8888 } = process.env;
const PUBLIC_DIR = path.join(__dirname, "public");

class Server {
  private app: Express;
  constructor() {
    this.app = express();

    this.app.use(express.static(PUBLIC_DIR));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "http://localhost:5173",
      })
    );

    this.app.use("/api", apiRouter);

    // Handle not found errors
    this.app.use(this.notFoundHandler);

    // Handle other errors
    this.app.use(this.errorHandler);
  }

  private notFoundHandler(req: Request, res: Response, next: NextFunction) {
    return ResponseBuilder.response({
      res,
      code: 404,
      message: "resource not found",
      data: "not found",
    });
  }

  private errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log(err.stack);
    return ResponseBuilder.response({
      res,
      code: err?.statusCode ?? 500,
      message: err.message,
      data: err.name,
    });
  }

  public run() {
    this.app.listen(PORT, () => {
      console.log("Server running on http://localhost:%d", PORT);
    });
  }
}

new Server().run();