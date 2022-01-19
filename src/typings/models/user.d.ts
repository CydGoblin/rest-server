export interface UserModel {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  img?: string;
  role: string;
  status: boolean;
  googleOrigin: boolean;
}
