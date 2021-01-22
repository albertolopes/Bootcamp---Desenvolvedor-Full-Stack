import express from "express";
import winston from "winston";
import grade from "./src/controllers/grade.js";
import swaggerUi from "swagger-ui-express";
import {swaggerDocument} from "./src/config/swagger.js"
import {promises as fs} from "fs";

const { readFile, writeFile} = fs;
const port = 3000;

global.fileName = "grades.json";
global.file = null;

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "app.log" })
    ],
    format: combine(
        label({ label: "my-app-api"}),
        timestamp(),
        myFormat
    )
});

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/grade", grade);
app.listen(3000, async () => {    
    try {
        file = await readFile(global.fileName, "utf8");
        logger.info("API Started!");        
    } catch (err) {
        const initialJson = {
            nextId: 1,
            accounts: []
        }        
        writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
            logger.info("API Started and File Created!");
        }).catch(err => {
            logger.error(err);
        });
    }
});