import React, { ReactElement, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ActionButton from './../../components/action-button/action-button';
import ContextBar from './../../components/context-bar/context-bar';
import Spinner from './../../components/spinner/spinner';
import { GET_REPOSITORY_DETAILS_WITH_ISSUES } from './../../services/queries';
import styles from './repository-issues.module.scss';
import { StarFilled, MergeFilled } from '@ant-design/icons';
import useDetectPageReload from './../../hooks/useDetectPageReload';
import IssueList, { IssueProps } from './../../components/issue-list/issue-list';

export const RepositoryIssues: React.FC = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const owner = params.get('owner');
  const name = params.get('name');

  const isReloaded = useDetectPageReload();
  if (isReloaded) {
    navigate('/');
  }

  const [issueCursorStack, setIssueCursorStack] = useState<string[]>([]);
  const [issueCursor, setIssueCursor] = useState<string | null>(null);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_REPOSITORY_DETAILS_WITH_ISSUES, {
    variables: { owner, name, first: 5, after: issueCursor },
    skip: !owner || !name,
    onCompleted: (data) => {
      setHasNextPage(data?.repository?.issues.pageInfo.hasNextPage ?? false);
      setHasPreviousPage(issueCursorStack.length > 0);
    },
  });

  const handleChangeApiKey = (): void => {
    navigate('/');
  };

  useEffect(() => {
    if (data) {
      setHasNextPage(data.repository.issues.pageInfo.hasNextPage);
      setHasPreviousPage(issueCursorStack.length > 0);
    }
  }, [data, issueCursorStack]);

  const handleNextIssues = () => {
    if (data?.repository?.issues.pageInfo.hasNextPage) {
      const lastIssue = data.repository.issues.edges[data.repository.issues.edges.length - 1];
      if (lastIssue && lastIssue.cursor) {
        const newCursor = lastIssue.cursor;
        setIssueCursorStack((prevStack) => [...prevStack, newCursor]);
        setIssueCursor(newCursor);
        console.log('Next Issues - after cursor:', newCursor);
        fetchMore({
          variables: { owner, name, first: 5, after: newCursor },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prevResult;
            setHasNextPage(fetchMoreResult.repository.issues.pageInfo.hasNextPage);
            setHasPreviousPage(true);
            return fetchMoreResult;
          },
        });
      }
    }
  };

  const handlePreviousIssues = () => {
    if (issueCursorStack.length > 0) {
      const newCursorStack = [...issueCursorStack];
      const previousCursor = newCursorStack[newCursorStack.length - 2]; 
      newCursorStack.pop(); 
      setIssueCursorStack(newCursorStack);
      setIssueCursor(previousCursor || null);
      console.log('Previous Issues - after cursor:', previousCursor);
      fetchMore({
        variables: { owner, name, first: 5, after: previousCursor },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          setHasNextPage(fetchMoreResult.repository.issues.pageInfo.hasNextPage);
          setHasPreviousPage(newCursorStack.length > 0);
          return fetchMoreResult;
        },
      });
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  const issues: IssueProps[] = data?.repository?.issues.edges.map((issue: any) => ({
    title: issue.node.title,
    createDt: issue.node.createdAt,
    url: issue.node.url,
  })) || [];

  return (
    <div className={styles.RepositoryIssuesContainer}>
      <ContextBar>
        <ActionButton
          title="Change API Key"
          onClick={handleChangeApiKey}
          size="middle"
          type="primary"
        />
      </ContextBar>
      {data?.repository && (
        <>
          <div className={styles.RepositoryDetails}>
            <h1>{data.repository.name}</h1>
            <p>{data.repository.description}</p>
            <div className={styles.RepositoryStats}>
              <p><strong><StarFilled style={{ color: '#f7d600' }}/></strong> {data.repository.stargazerCount}</p>
              <p><strong>Watchers:</strong> {data.repository.watchers.totalCount}</p>
              <p><strong><MergeFilled /></strong> {data.repository.forkCount}</p>
            </div>
          </div>
          <div className={styles.IssuesList}>
            <h2>Issues</h2>
            <IssueList issues={issues} />
          </div>
          <div className={styles.PaginationButtons}>
            <ActionButton
              title="Previous Issues"
              onClick={handlePreviousIssues}
              size="middle"
              type="default"
              disabled={!hasPreviousPage}
            />
            <ActionButton
              title="Next Issues"
              onClick={handleNextIssues}
              size="middle"
              type="default"
              disabled={!hasNextPage}
            />
          </div>
        </>
      )}
    </div>
  );
};
