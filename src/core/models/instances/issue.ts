import { BaseInstance } from './base';

class Issue extends BaseInstance {
  user?: string;

  title?: string;

  descrtiption?: string;

  state?: string;
}

export default Issue;
