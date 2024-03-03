import RegisterUserModel from "../modules/auth/auth.model";

export const seedSuperAdmin = async () => {
  const superAdmin = await RegisterUserModel.findOne({ role: "superAdmin" });

  const superAdminData = {
    name: "Super Admin",
    email: "VQqFP@example.com",
    password: "123456",
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
