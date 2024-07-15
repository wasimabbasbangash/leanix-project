import React, { ReactElement } from 'react';

/** styles scss */
import { Card } from 'antd';

import styles from './issue-card.module.scss';

export interface DetailsCardProps {
  user?: string;
  title?: string;
  description?: string;
  state?: string;
  stargazers?: number;
  onClickHandler?: () => void;
}

export const DetailsCard: React.FC<DetailsCardProps> = (
  props
): ReactElement => {
  const { user, title, description, stargazers, onClickHandler } = props;
  return (
    <div className={styles.CardContainer}>
      <Card title={title} bordered onClick={onClickHandler}>
        <div className={styles.OwnerAndStarDetails}>
          <p>By: {user}</p>
          <p>Stars: {stargazers}</p>
        </div>
        <div className={styles.Description}>
          <p>Description: {description}</p>
        </div>
      </Card>
    </div>
  );
};
