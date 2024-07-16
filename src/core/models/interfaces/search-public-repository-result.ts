import Repository from '../instances/repository';

export interface RepositoryNode extends Repository {
  id: string;
  url: string;
}

export interface SearchPublicRepositoriesResult {
  search: {
    repositoryCount: number;
    edges: Array<{
      node: RepositoryNode;
    }>;
    pageInfo: {
      endCursor: string | null;
      hasNextPage: boolean;
      startCursor: string | null;
      hasPreviousPage: boolean;
    };
  };
}
