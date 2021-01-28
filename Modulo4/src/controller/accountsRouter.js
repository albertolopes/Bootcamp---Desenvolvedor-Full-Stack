import express from "express";
import { deposit, withdraw, balance } from "../model/accountsModel.js";

const app = express();

app.put("/deposit", async (req, res) => {
  try {
    const response = await deposit(req);

    if(response != null){
        res.send(response);
    }else{
        res.status(404).send("Conta não encontrada")
    }
  } catch (error) {
    res.status(500).send(error)
  }
});

app.put("/withdraw", async (req, res) => {
    try {
        const response = await withdraw(req);

        if(response != null){
            res.send(response);
        }else{
            res.status(404).send("Conta não encontrada")
        }
    } catch (error) {
        res.status(500).send(error)
    }   
});

app.put("/balance", async (req, res) => {
    try {
        const response = await balance(req);

        if(response != null){
            res.send(response);
        }else{
            res.status(404).send("Conta não encontrada")
        }
    } catch (error) {
        res.status(500).send(error)
    }   
});

export { app as accountsRouter };
