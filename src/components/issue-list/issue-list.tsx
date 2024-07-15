import React from 'react';

import { List, Typography } from 'antd';

export interface IssueProps {
  title: string;
  createDt: string;
  url: string;
}

interface IssueListProps {
  issues: IssueProps[];
}

const { Text } = Typography;

export const IssueList: React.FC<IssueListProps> = ({ issues }) => (
  <List
    itemLayout="horizontal"
    dataSource={issues}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          title={
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          }
          description={
            <Text type="secondary">
              {new Date(item.createDt).toLocaleString()}
            </Text>
          }
        />
      </List.Item>
    )}
  />
);
