import mongoose from "mongoose";

const accountsSchema = mongoose.Schema({
  id: {
    type: String,
  },
  agencia: {
    type: Number,
    require: true,
  },
  conta: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    require: true,
  },
});

const acountsCollection = mongoose.model("accounts", accountsSchema, "accounts");

export { acountsCollection };
