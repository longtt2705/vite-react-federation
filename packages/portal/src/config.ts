export abstract class Config {
  static API_URL = import.meta.env.VITE_API_URL;
}

export type Response<T> = {
  data: T;
};
