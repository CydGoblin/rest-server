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
  // FIX: it breaks without this, more info on link. Seems to be related.
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/39358#issuecomment-546559564
  [key: string]: string;
  id: string;
}
