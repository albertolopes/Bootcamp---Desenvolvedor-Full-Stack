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

const port = 3000;
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use("/accounts", accountsRouter);
app.listen(port, async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://albertolopes:LIGOPhZB4Ik57N1a@cluster0.s3dpa.mongodb.net/bank?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    );
    logger.info("API iniciada na porta: " + port)
    logger.info("Conectado ao MongoDB com sucesso");
  } catch (err) {
    logger.info("API Started!");
    logger.error("Erro ao conectar ao MongoDB");
  }
});
