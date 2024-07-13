import React from 'react';
import styles from './context-bar.module.scss';

interface ContextBarProps {
  children: React.ReactNode;
}

export const ContextBar: React.FC<ContextBarProps> = ({ children }) => {
  return (
    <div className={styles.ContextBar}>
      <div className={styles.ButtonContainer}>{children}</div>
    </div>
  );
};
