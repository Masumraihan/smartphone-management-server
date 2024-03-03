export type TUserRole = "superAdmin" | "manager" | "seller";
export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
};

export type TLoginUser = {
  email: string;
  password: string;
};
