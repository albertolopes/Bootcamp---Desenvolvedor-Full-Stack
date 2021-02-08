const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const TransactionModel = require("../models/TransactionModel");

exports.find = async (req) => {
  const json = JSON.parse(req.query.object);
 
  return await TransactionModel.find({
    yearMonth: json.yearMonth,
    description: {$regex: new RegExp(json.description),$options: "i"}
  });

};

exports.findById = async (req) => {  
  console.log(req.params.id)
  return await TransactionModel.findById({ _id: req.params.id });
};

exports.create = async (req) => {
    return await TransactionModel.create(
      createJsonFinancy(req)
    );
}

exports.update = async (req) => {
    return await TransactionModel.updateOne( { _id: req.body._id },
        createFinancy(req)
        ,{ new: true });
}

exports.delete = async (req) => {
  return await TransactionModel.findByIdAndDelete({ _id: req.params.id });
}

const createJsonFinancy = (req) => {
  const date = req.body.yearMonthDay.split("-");
  return {
    _id: req.body._id !== 'undefined' ? req.body._id : "" ,
    description: req.body.description,
    value: req.body.value,
    category: req.body.category,
    year: date[0],
    month: date[1],
    day: date[2],
    yearMonth: `${date[0]}-${date[1]}` ,
    yearMonthDay: req.body.yearMonthDay,
    type: req.body.type
  }
}
