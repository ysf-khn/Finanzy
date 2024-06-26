import { Document, Schema, model, models } from "mongoose";

export interface ITransaction extends Document {
  name: string;
  amount: number;
  category: string;
  paymentMode: string;
  notes: string;
  transactionType: string;
  cycle: Schema.Types.ObjectId | null;
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
  cycle: { type: Schema.Types.ObjectId, ref: "Cycle", required: false },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction =
  models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
