import { Document, Schema, model, models } from "mongoose";

export interface ICycle extends Document {
  from: Date;
  to: Date;
  budget: number;
  transactions: Schema.Types.ObjectId[];
  createdAt: Date;
  user: Schema.Types.ObjectId;
}

const CycleSchema = new Schema({
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  budget: { type: Number, required: true },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Cycle = models.Cycle || model("Cycle", CycleSchema);

export default Cycle;
