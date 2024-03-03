import mongoose, { Schema } from "mongoose";
import { TRegisterUser } from "./auth.interface";

const registerUserSchema = new Schema<TRegisterUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: 0 },
  },
  {
    timestamps: true,
  },
);

const RegisterUserModel = mongoose.model<TRegisterUser>("User", registerUserSchema);
export default RegisterUserModel;
