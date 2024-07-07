import React from 'react';
import { List, Typography } from 'antd';
import PropTypes from 'prop-types';

export interface IssueProps {
    title: string;
    createDt: string;
    url: string;
  }

  interface IssueListProps {
    issues: IssueProps[];
  }

const { Text } = Typography;

const IssueList: React.FC<IssueListProps> = ({ issues }) => (
    <List
      itemLayout="horizontal"
      dataSource={issues}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={<a href={item.url}>{item.title}</a>}
            description={<Text type="secondary">{new Date(item.createDt).toLocaleString()}</Text>}
          />
        </List.Item>
      )}
    />
  );
  
  IssueList.propTypes = {
    issues: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        createDt: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  };
  
  export default IssueList;
