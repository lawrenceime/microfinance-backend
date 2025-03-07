import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    resetToken: string;
    resetTokenExpiry?: Date;
}

const UserSchema = new Schema({
    _id : { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date }
})

export default mongoose.model<IUser>('User', UserSchema);