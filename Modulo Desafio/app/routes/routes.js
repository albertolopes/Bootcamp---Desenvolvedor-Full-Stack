const express = require("express");
const transactionRouter = express.Router();
const logger = require("../config/logger");

const transactionService = require("../services/transactionService");

transactionRouter.get("/", async (req, res) => {
  try {
    res.send(await transactionService.find(req));
    logger.info(`GET / - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao buscar finanças" });
    logger.error(`GET / - ${JSON.stringify(error.message)}`);
  }
});

transactionRouter.get("/:id", async (req, res) => {
  try {
    res.send(await transactionService.findById(req));
    logger.info(`GET / - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao buscar finanças" });
    logger.error(`GET / - ${JSON.stringify(error.message)}`);
  }
});

transactionRouter.post('/', async (req, res) => {
    try {
        res.send(await transactionService.create(req));
        logger.info(`POST / - ${JSON.stringify()}`);
      } catch (error) {
        res
          .status(500)
          .send({ message: error.message || "Algum erro ocorreu ao criar finança" });
        logger.error(`POST / - ${JSON.stringify(error.message)}`);
      }
});

transactionRouter.put('/', async (req, res) => {
    try {
        res.send(await transactionService.update(req));
        logger.info(`PUT / - ${JSON.stringify()}`);
      } catch (error) {
        res
          .status(500)
          .send({ message: error.message || "Algum erro ocorreu ao atualizar finança" });
        logger.error(`PUT / - ${JSON.stringify(error.message)}`);
      }
});

transactionRouter.delete('/:id', async (req, res) => {
  try {
      await transactionService.delete(req);
      res.status(204).send();
      logger.info(`DELETE / - ${JSON.stringify()}`);
    } catch (error) {
      res
        .status(500)
        .send({ message: error.message || "Algum erro ocorreu ao deletar finança" });
      logger.error(`DELETE / - ${JSON.stringify(error.message)}`);
    }
});

module.exports = transactionRouter;
