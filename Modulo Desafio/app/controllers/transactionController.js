const logger = require("../config/logger");
const transactionService = require("../services/transactionService");

exports.find = async (req, res) => {
  try {
    res.send("teste");
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};
