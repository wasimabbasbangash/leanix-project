import React from 'react';
import { Spin } from 'antd';
import styles from './spinner.module.scss';

const Spinner: React.FC = () => {
  return (
    <div className={styles.overlay}>
      <Spin size="large" />
    </div>
  );
};

export default Spinner;
