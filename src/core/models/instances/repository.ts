import { BaseInstance } from './base';

class Repository extends BaseInstance {
  name?: string;

  owner?: {
    login: string;
  };

  description?: string;

  stargazers?: {
    totalCount: number;
  };
}

export default Repository;
