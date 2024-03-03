import { encrypt } from "secure-encrypt";
import RegisterUserModel from "../modules/auth/auth.model";
import config from "../config";

export const seedSuperAdmin = async () => {
  const superAdmin = await RegisterUserModel.findOne({ role: "superAdmin" });

  const plainTextPass = "123456";

  const hashedPassword = encrypt(plainTextPass, config.encrypt_secret);
  const superAdminData = {
    name: "Super Admin",
    email: "superAdmin@gmail.com",
    password: hashedPassword,
    role: "superAdmin",
  };

  if (!superAdmin) {
    try {
      await RegisterUserModel.create(superAdminData);
    } catch (error) {
      console.log(error);
    }
  }
};
