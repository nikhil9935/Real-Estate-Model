import mongoose from "mongoose";
export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  phone: string;
}

export const userSchema = new mongoose.Schema<UserDocument>({
  username: String,
  email: String,
  password: String,
  phone: String,
});