import { acountsCollection } from "../collections/acountsCollection.js";

async function deposit(req) {
  const accounts = await acountsCollection.find({
    agencia: req.body.agencia,
    conta: req.body.conta,
  });

  if(accounts.length !== 0){

      const sum = {
          agencia: accounts[0].agencia,
          conta: accounts[0].conta,
          name: accounts[0].name,
          balance: accounts[0].balance + req.body.deposit,
      };
  
      const back = await acountsCollection.findByIdAndUpdate({_id: accounts[0]._id}, sum, {
          new: true,
      });
      
      return back;
  }else{
      return null;
  }
}

async function withdraw(req){

  const accounts = await acountsCollection.find({
    agencia: req.body.agencia,
    conta: req.body.conta,
  });

  if(accounts.length !== 0 & accounts[0].balance != 0){

      const sub = {
        agencia: accounts[0].agencia,
        conta: accounts[0].conta,
        name: accounts[0].name,
        balance: accounts[0].balance - req.body.deposit,
      };
  
      const back = await acountsCollection.findByIdAndUpdate({_id: accounts[0]._id}, sub, {
        new: true,
      });
      
      return back;
  }else{
      return null;
  }
}

async function balance(req) {
  const accounts = await acountsCollection.find({
    agencia: req.body.agencia,
    conta: req.body.conta,
  });

  if(accounts.length !== 0){
      return accounts;
  }else{
      return null;
  }
}

export { deposit, withdraw, balance };
