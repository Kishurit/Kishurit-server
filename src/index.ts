import cors from "cors";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import morgan from "morgan";
import express, { NextFunction, Request, Response } from "express";
import nocache from "nocache";
dotenv.config();

import { app } from "./server";
import routes from "./routes";
import db1, { connectToDatabase1 } from "./db1";
import { cls } from "./api";

cls();
connectToDatabase1();
//connectToDatabase2();

const options: cors.CorsOptions = {
  allowedHeaders: ["Content-Type"],
  credentials: true,
  methods: "GET,PUT,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

app.use(cors(options));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(nocache());
app.use(morgan("dev"));

app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log ((new Date()).toLocaleTimeString());
    next();
})

routes.forEach((route) => {
  app.use("/", route);
});

app.post("/*", function (req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ status: 404, message: "הדף לא קיים" });
});

app.get("/*", function (req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ status: 404, message: "הדף לא קיים" });
});
