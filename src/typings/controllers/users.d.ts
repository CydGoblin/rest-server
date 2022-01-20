export interface PostBody {
  id: number;
  name: string;
  age: string;
}

export interface GetQuery {
  limit?: string;
  page?: string;
}

export interface PutParams {
  [key: string]: string; // TODO: it breaks without this
  id: string;
}
