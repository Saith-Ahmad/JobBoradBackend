import mongoose, { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email : string;
  status: 'member' | 'admin';
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique:true },
  status: { 
    type: String, 
    enum: ['member', 'admin'], 
    default: 'member', 
    required: true 
  },
}, { timestamps: true });

export default mongoose.models.User || model<IUser>('User', UserSchema);
