import { IUser } from "../typings/models/user";
import { User } from "./models/user";
export async function getUsers(
  skip: number,
  limit: number,
  omitDeleted: boolean = true
): Promise<[IUser[], number]> {
  const query = omitDeleted ? { status: true } : { status: true };

  const userPromise = User.find(query).skip(skip).limit(Number(limit));
  const totalPromise = User.countDocuments(query);

  return await Promise.all([userPromise, totalPromise]);
}
