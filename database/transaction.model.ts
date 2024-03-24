import { Document, Schema, model, models } from "mongoose";

export interface ITransaction extends Document {
  name: string;
  amount: number;
  category: string;
  paymentMode: string;
  notes: string;
  transactionType: string;
  user: Schema.Types.ObjectId;
  createdAt: Date;
}

const TransactionSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String },
  paymentMode: { type: String },
  notes: { type: String },
  transactionType: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction =
  models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
