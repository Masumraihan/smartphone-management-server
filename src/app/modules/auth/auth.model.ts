import mongoose, { Schema } from "mongoose";
import { TRegisterUser } from "./auth.interface";
import { userRole } from "./auth.constant";

const registerUserSchema = new Schema<TRegisterUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: 0 },
    role: {
      type: String,
      enum: [userRole.manager, userRole.seller, userRole.superAdmin],
      default: userRole.seller,
    },
  },
  {
    timestamps: true,
  },
);

const RegisterUserModel = mongoose.model<TRegisterUser>("User", registerUserSchema);
export default RegisterUserModel;
