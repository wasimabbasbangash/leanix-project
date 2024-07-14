import React, { ReactElement } from 'react';

import styles from './app-content.module.scss';
import { MainCard } from './components/card/main-card';

export const AppContent: React.FC = (): ReactElement => {
  return (
    <div className={styles.appContainer}>
      <MainCard />
    </div>
  );
};
