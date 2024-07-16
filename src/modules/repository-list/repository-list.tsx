import React, { ReactElement, useEffect, useState } from 'react';

import { QueryResult, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  RepositoryNode,
  SearchPublicRepositoriesResult,
} from 'core/models/interfaces/search-public-repository-result';

import ActionButton from '../../components/action-button/action-button';
import { ContextBar } from '../../components/context-bar/context-bar';
import { DetailsCard } from '../../components/issue-card/issue-card';
import Spinner from '../../components/spinner/spinner';
import useDetectPageReload from '../../hooks/useDetectPageReload';
import { useToken } from '../../hooks/useTokenContext';
import { SEARCH_PUBLIC_REPOSITORIES } from '../../services/queries';

import styles from './repository-list.module.scss';

interface CursorState {
  cursors: (string | null)[];
  page: number;
}

export const RepositoryList: React.FC = (): ReactElement => {
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { token } = useToken();
  const [state, setState] = useState<CursorState>({ cursors: [], page: 1 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Detect if the page has been reloaded and navigate to home if true
  const isReloaded = useDetectPageReload();
  if (isReloaded) {
    navigate('/');
  }

  const {
    error,
    data,
    refetch,
    fetchMore,
  }: QueryResult<SearchPublicRepositoriesResult> = useQuery(
    SEARCH_PUBLIC_REPOSITORIES,
    {
      variables: { query: 'stars:>0', first: itemsPerPage, after: null },
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      },
    }
  );

  // Refetch data when the token changes
  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  // Update cursor state when new data is fetched
  useEffect(() => {
    if (
      data &&
      data.search.pageInfo.endCursor &&
      !state.cursors.includes(data.search.pageInfo.endCursor)
    ) {
      setState(prevState => ({
        ...prevState,
        cursors: [...prevState.cursors, data.search.pageInfo.endCursor],
      }));
    }
  }, [data, state.cursors]);

  const handlePageChange = async (newPage: number) => {
    if (newPage < state.page) {
      // Navigate to the previous page
      setState(prevState => ({
        ...prevState,
        page: newPage,
      }));
    } else if (newPage > state.page) {
      // Navigate to the next page
      setIsLoading(true);
      try {
        await fetchMore({
          variables: {
            first: itemsPerPage,
            after: state.cursors[newPage - 2],
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return previousResult;
            return {
              search: {
                ...fetchMoreResult.search,
                edges: [...fetchMoreResult.search.edges],
                pageInfo: fetchMoreResult.search.pageInfo,
              },
            };
          },
        });
        setState(prevState => ({
          ...prevState,
          page: newPage,
        }));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading || !data) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  const { edges, pageInfo } = data.search;

  const handleChangeApiKey = (): void => {
    navigate('/');
  };

  const handleCardClick = (node: RepositoryNode): void => {
    if (node.owner?.login && node.name)
      navigate(
        `/repository/issues?owner=${node.owner.login}&name=${node.name}`
      );
  };

  return (
    <div className={styles.RepositoryContainer}>
      <ContextBar>
        <ActionButton
          title='Change API Key'
          onClick={handleChangeApiKey}
          size='middle'
          type='primary'
        />
      </ContextBar>
      <div className={styles.RepositoryList}>
        {edges.map(({ node }) => (
          <DetailsCard
            key={node.id}
            title={node.name}
            user={node.owner?.login}
            description={node.description}
            stargazers={node.stargazers?.totalCount}
            onClickHandler={() => handleCardClick(node)}
          />
        ))}
      </div>
      <div className={styles.PaginationButtons}>
        <ActionButton
          title='Previous'
          onClick={() => handlePageChange(state.page - 1)}
          disabled={!pageInfo.hasPreviousPage}
        />
        <ActionButton
          title='Next'
          onClick={() => handlePageChange(state.page + 1)}
          disabled={!pageInfo.hasNextPage}
        />
      </div>
      {isLoading && <Spinner />}
    </div>
  );
};
