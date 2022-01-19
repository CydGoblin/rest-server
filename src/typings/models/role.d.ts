import { Types } from "mongoose";

export interface RoleModel {
  // https://mongoosejs.com/docs/typescript.html#objectids-and-other-mongoose-types
  _id: Types.ObjectId;
  role: string;
}
