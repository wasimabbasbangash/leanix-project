import React, { useEffect } from 'react';

import { QueryResult, useQuery } from '@apollo/client';

import { CHECK_TOKEN_VALIDITY } from './queries';

interface CheckTokenValidityProps {
  onValid: () => void;
  onInvalid: () => void;
}

interface CheckTokenValidityData {
  viewer: {
    login: string;
  };
}

const CheckTokenValidity: React.FC<CheckTokenValidityProps> = ({
  onValid,
  onInvalid,
}) => {
  const { loading, error, data }: QueryResult<CheckTokenValidityData> =
    useQuery(CHECK_TOKEN_VALIDITY);

  useEffect(() => {
    if (!loading) {
      if (error) {
        onInvalid();
      } else if (data) {
        onValid();
      }
    }
  }, [loading, error, data, onValid, onInvalid]);

  return null;
};

export default CheckTokenValidity;
