import { BaseInstance } from "./base";

export class Repository extends BaseInstance {
    name?: string;
    owner?: {
      login: string;
    };
    description?: string;
    stargazers?: {
      totalCount: number
    };
  }