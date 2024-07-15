import React from 'react';

import { Button } from 'antd';

import styles from './action-button.module.scss';

interface ActionButtonProps {
  title: string;
  onClick: () => void;
  size?: 'large' | 'middle' | 'small';
  type?: 'primary' | 'default';
  icon?: React.ReactNode;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  onClick,
  size = 'middle',
  type = 'default',
  icon,
  disabled = false,
}) => {
  return (
    <div className={styles.ActionButton}>
      <Button
        type={type}
        size={size}
        onClick={onClick}
        icon={icon}
        disabled={disabled}
      >
        {title}
      </Button>
    </div>
  );
};

export default ActionButton;
