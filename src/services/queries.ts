import { gql } from '@apollo/client';

export const CHECK_TOKEN_VALIDITY = gql`
  query CheckTokenValidity {
    viewer {
      login
    }
  }
`;

export const SEARCH_PUBLIC_REPOSITORIES = gql`
  query SearchPublicRepositories($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            description
            url
            stargazers {
              totalCount
            }
            owner {
              login
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
        hasPreviousPage
      }
    }
  }
`;

export const GET_REPOSITORY_DETAILS_WITH_ISSUES = gql`
  query GetRepositoryDetailsWithIssues($owner: String!, $name: String!, $first: Int!, $after: String) {
    repository(owner: $owner, name: $name) {
      name
      owner {
        login
      }
      stargazerCount
      description
      url
      createdAt
      updatedAt
      pushedAt
      forkCount
      watchers {
        totalCount
      }
      issues(first: $first, after: $after, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        edges {
          node {
            title
            url
            createdAt
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
      pullRequests {
        totalCount
      }
      defaultBranchRef {
        target {
          ... on Commit {
            history {
              totalCount
            }
          }
        }
      }
    }
  }
`;

