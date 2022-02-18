import { Types } from "mongoose";

export interface IRoleModel {
  // https://mongoosejs.com/docs/typescript.html#objectids-and-other-mongoose-types
  _id: Types.ObjectId;
  role: string;
}
