export interface UserModel {
  name: string;
  email: string;
  password: string;
  img?: string;
  role: string;
  status: boolean;
  google: boolean;
}

export enum USER_ROLES {
  ADMIN,
  USER,
}
