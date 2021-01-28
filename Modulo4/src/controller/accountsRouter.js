import express from "express";
import { 
    deposit, 
    withdraw, 
    balance,
    deleteByAccount,
    transfer,
    agencyAvarage,
    findSmallerBalance,
    findBigestBalance,
    transferPrivate
} from "../model/accountsModel.js";

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

app.delete("/delete-see-active-acounts", async (req, res) => {
    try {
        const response = await deleteByAccount(req);

        if(response != null){
            res.send(response);
        }else{
            res.status(404).send("Conta não encontrada")
        }
    } catch (error) {
        res.status(500).send(error)
    }   
});

app.put("/transfer", async (req, res) => {
    try {
        const response = await transfer(req);

        if(response != null){
            res.send(response);
        }else{
            res.status(404).send("Contas não encontradas")
        }
    } catch (error) {
        res.status(500).send(error)
    }   
});

app.get("/agency-avarage", async (req, res) => {
    try {
        const response = await agencyAvarage(req);

        if(response != null){
            res.send(response);
        }else{
            res.status(404).send("Contas não encontradas")
        }
    } catch (error) {
        res.status(500).send(error)
    }   
});

app.get("/find-smaller-balance", async (req, res) => {
    try {
        const response = await findSmallerBalance(req);

        if(response != null){
            res.send(response);
        }else{
            res.status(404).send("Contas não encontradas")
        }
    } catch (error) {
        res.status(500).send(error)
    }   
});

app.get("/find-Bigest-balance", async (req, res) => {
    try {
        const response = await findBigestBalance(req);

        if(response != null){
            res.send(response);
        }else{
            res.status(404).send("Contas não encontradas")
        }
    } catch (error) {
        res.status(500).send(error)
    }   
});

app.get("/transfer-to-private", async (req, res) => {
    try {
        const response = await transferPrivate(req);

        if(response != null){
            res.send(response);
        }else{
            res.status(404).send("Contas não encontradas")
        }
    } catch (error) {
        res.status(500).send(error)
    }   
});

export { app as accountsRouter };
