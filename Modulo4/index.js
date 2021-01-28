import express from "express";
import winston from "winston";
import mongoose from "mongoose";

import { accountsRouter } from "./src/controller/accountsRouter.js";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
  format: combine(label({ label: "my-bank-api" }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use("/accounts", accountsRouter);
app.listen(3000, async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://albertolopes:242837@cluster0.s3dpa.mongodb.net/bank?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    );
    logger.info("API Started!");
    logger.info("Conectado ao MongoDB com sucesso");
  } catch (err) {
    logger.info("API Started!");
    logger.error("Erro ao conectar ao MongoDB");
  }
});
