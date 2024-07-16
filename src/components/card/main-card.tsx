import React, { ReactElement, useState } from 'react';

/** styles scss */
import { useLazyQuery } from '@apollo/client';
import { Button, Card, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useToken } from '../../hooks/useTokenContext';
import { CHECK_TOKEN_VALIDITY } from '../../services/queries';

import styles from './main-card.module.scss';

export const MainCard: React.FC = (): ReactElement => {
  const { setToken } = useToken(); // Hook to set the token in the global context
  const [inputToken, setInputToken] = useState<string>(''); // State to hold the user's input token
  const [error, setError] = useState<string | null>(null); // State to hold any error messages
  const navigate = useNavigate();
  // Lazy query to check the validity of the entered GitHub API token
  const [checkTokenValidity] = useLazyQuery(CHECK_TOKEN_VALIDITY, {
    onCompleted: data => {
      if (data.viewer) {
        setToken(inputToken); // If token is valid, set it in the global context
        navigate('/repository'); // Navigate to the repository list page
      } else {
        setError('Invalid token. Please try again.'); // Show error if token is invalid
      }
    },
    onError: () => {
      setError('Invalid token. Please try again.'); // Show error if there is an issue with the query
    },
  });

  // Handler for input change events
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputToken(e.target.value); // Update the inputToken state with the new value
    if (error) setError(null); // Clear the error message if there is one
  };

  // Handler for the save token button click event
  const handleSaveToken = (): void => {
    if (!error) {
      checkTokenValidity({ variables: { token: inputToken } }); // Check if the token is valid
      setToken(inputToken); // Set the token in the global context
    }
  };

  return (
    <div className={styles.MainCardContainer}>
      <Card
        title='GitHub Issue Explorer'
        bordered
        actions={[
          <Button
            type='primary'
            disabled={!inputToken.length}
            ghost
            onClick={handleSaveToken}
          >
            Browse
          </Button>,
        ]}
      >
        <div className={styles.MainCardContent}>
          <p className={styles.Description}>
            Enter your API token to start browsing issues of public repositories
          </p>
          <p>Your API token</p>
          <Input value={inputToken} onChange={handleInputChange} />
          {error && <p className={styles.ErrorText}>{error}</p>}
        </div>
      </Card>
    </div>
  );
};
