import React from 'react';
import { Typography } from 'antd';
import styles from './TitleLink.module.css';

const { Title } = Typography;

interface TitleLinkProps {
  titleLink: IData_SnippetNews;
}

export const TitleLink: React.FC<TitleLinkProps> = ({ titleLink }) => {
  const { URL, TI } = titleLink;

  return (
    <div className={styles.wrapperTitleLink}>
      <a href={URL} target="_blank" rel="noopener noreferrer">
        <Title level={4} style={{ color: 'blue' }}>
          {TI}
        </Title>
      </a>
    </div>
  );
};
