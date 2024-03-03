export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: "superAdmin" | "manager" | "seller";
};

export type TLoginUser = {
  email: string;
  password: string;
};
