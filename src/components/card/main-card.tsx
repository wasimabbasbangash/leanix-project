import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** styles scss */
import styles from './main-card.module.scss';
import { Button, Card, Input, message } from 'antd';
import { useToken } from './../../context/token-context';
import { useLazyQuery } from '@apollo/client';
import { CHECK_TOKEN_VALIDITY } from './../../services/queries';

export const MainCard: React.FC = (props): ReactElement => {
  const { setToken } = useToken();
  const [inputToken, setInputToken] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [checkTokenValidity] = useLazyQuery(CHECK_TOKEN_VALIDITY, {
    onCompleted: (data) => {
      if (data.viewer) {
        setToken(inputToken);
        navigate('/repository');
      } else {
        setError('Invalid token. Please try again.');
      }
    },
    onError: () => {
      setError('Invalid token. Please try again.');
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputToken(e.target.value);
    if (error) setError(null);
  };

  const handleSaveToken = (): void => {
    if(!error){
        setToken(inputToken); 
        checkTokenValidity({ variables: { token: inputToken } }); 
    }
  };

  return (
    <div className={styles.MainCardContainer}>
      <Card
        title="GitHub Issue Explorer"
        bordered
        actions={[
          <Button type="primary" ghost onClick={handleSaveToken}>
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
          {error && <p className={styles.ErrorText}>{error}</p>} {/* Display the error message */}
        </div>
      </Card>
    </div>
  );
};
