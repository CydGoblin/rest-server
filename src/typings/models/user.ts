export interface UserModel {
  name: string;
  email: string;
  password: string;
  img?: string;
  role: string;
  status: boolean;
  googleOrigin: boolean;
}

export enum USER_ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}
