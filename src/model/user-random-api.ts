import { RandomUser } from "./user-random";

export interface RandomUserApiResponse {
  info: RandomUserApiInfo;
  results: Array<RandomUser.User>;
}

export interface RandomUserApiInfo {
  page: number
  results: number
  seed: string;
  version: string;
}