import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
    userId : mongoose.Types.ObjectId;
    name : string;
    amount : number;
    type : 'income' | 'expense';
    category : string;
    date : Date;
}

const TransactionSchema = new Schema({
    userId : { type: mongoose.Types.ObjectId, required: true },
    name : { type: String, required: true },
    amount : { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category : { type: String, required: true },
    date : { type: Date, required: true },
})

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);