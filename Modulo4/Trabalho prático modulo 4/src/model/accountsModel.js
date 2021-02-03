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
          balance: accounts[0].balance + req.body.deposito,
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
        balance: accounts[0].balance - req.body.deposito,
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

async function deleteByAccount(req) {
  const excluido = await acountsCollection.findOneAndDelete({
    agencia: req.body.agencia,
    conta: req.body.conta,
  });

  if(excluido == null){
    return null;
  }

  const agencia = await acountsCollection.find({agencia: req.body.agencia});

  return {
    conta_excluida: excluido.conta,
    contas_ativas_agencia: agencia.length,
  };
}

async function transfer(req) {      
  let origin = await acountsCollection.findOne({
    conta: req.body.conta_origem,
  });

  let destiny = await acountsCollection.findOne({
    conta: req.body.conta_destino,
  });

  if(origin.agencia != destiny.agencia && origin.balance >= (req.body.valor_transferencia + 8)){
    origin = {
      _id: origin._id,
      agencia: origin.agencia,
      conta: origin.conta,
      name: origin.name,
      balance: origin.balance - req.body.valor_transferencia - 8,
    };

    destiny = {
      _id: destiny._id,
      agencia: destiny.agencia,
      conta: destiny.conta,
      name: destiny.name,
      balance: destiny.balance + req.body.valor_transferencia,
    };

  } 
  else if(origin.agencia == destiny.agencia && origin.balance >= (req.body.valor_transferencia)) {
    origin = {
      _id: origin._id,
      agencia: origin.agencia,
      conta: origin.conta,
      name: origin.name,
      balance: origin.balance - req.body.valor_transferencia,
    };

    destiny = {
      _id: destiny._id,
      agencia: destiny.agencia,
      conta: destiny.conta,
      name: destiny.name,
      balance: destiny.balance + req.body.valor_transferencia,
    };
  } else { return null; }

  const returnOrigin = await acountsCollection.findByIdAndUpdate({_id: origin._id}, origin, {new: true});


  const returnDestiny = await acountsCollection.findByIdAndUpdate({_id: destiny._id}, destiny, {new: true});

  return {
    conta_origem: returnOrigin,
    conta_destino: returnDestiny,
  }
}

async function agencyAvarage(req){
  let response = await acountsCollection.aggregate([
    { $match: { agencia: req.body.agencia }},
  ]);
  let avarage = null;
  for (let i = 0; i < response.length; i++) {  
    avarage += response[i].balance;
  }

  return {
    agencia: req.body.agencia ,
    media: avarage/response.length
  };
}

async function findSmallerBalance(req){

  return await acountsCollection.aggregate([
    // {$match: {
    //     agencia: req.body.agencia,
    //   }
    // },
    {$sort: {balance: 1}},
    {$limit: req.body.limite},
    {$project: {
        _id: '$_id',
        agencia: '$agencia',
        conta: '$conta',
        balance: '$balance'
      }
    }
  ]);
}

async function findBigestBalance(req){
  return await acountsCollection.aggregate([
    {$sort: {balance: -1}},
    {$limit: req.body.limite},
    {$project: {
        _id: '$_id',
        agencia: '$agencia',
        conta: '$conta',
        name: '$name',
        balance: '$balance'
      }
    }
  ]);
}

async function transferPrivate(req){
  const agencias = await acountsCollection.aggregate([{
    $group: {
          _id: null,
          agencia: { $addToSet: "$agencia" }
      }}
  ]);
  
  let biggest = [];
  for(let i = 0; i < agencias[0].agencia.length; i++){
    biggest.push(await acountsCollection.aggregate([
      {$match: {
          agencia: agencias[0].agencia[i],
        }
      },
      {$sort: {balance: -1}},
      {$limit: 1},
      {$project: {
          _id: '$_id',
          agencia: '$agencia',
          conta: '$conta',
          name: '$name',
          balance: '$balance'
        }
      }
    ]));
  }
  
  for(let i = 0; i < biggest.length; i++){
    const privateTransfer = {
      agencia: 99,
      conta: biggest[i][0].conta,
      name: biggest[i][0].name,
      balance: biggest[i][0].balance,
    };    
    await acountsCollection.findByIdAndUpdate({_id: biggest[i][0]._id}, privateTransfer);
  }

  return await acountsCollection.find({
    agencia: 99,
  });
}

export { 
  deposit, 
  withdraw, 
  balance,
  deleteByAccount,
  transfer,
  agencyAvarage,
  findSmallerBalance,
  findBigestBalance,
  transferPrivate
};
