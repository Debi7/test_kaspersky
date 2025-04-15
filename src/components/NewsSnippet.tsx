import React from 'react';
import { Card, Typography, Tag, Avatar } from 'antd';
import { IData_SnippetNews } from '../types/interfaces';

const { Title, Text } = Typography;

interface Props {
  news: IData_SnippetNews;
}

const NewsSnippet: React.FC<Props> = ({ news }: { news: IData_SnippetNews }) => {
  const { TI, AB, URL, DP, DOM, KW, FAV, HIGHLIGHTS } = news;

  return (
    <Card hoverable style={{ margin: '20px', backgroundColor: '#abcada' }}>
      <a href={URL} target="_blank" rel="noopener noreferrer">
        {FAV && <Avatar src={FAV} alt="favicon" style={{ marginBottom: '8px' }} />}
        <Title level={4}>{TI}</Title>
        <Text>{new Date(DP).toLocaleString()}</Text>
        <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
          {DOM}
        </Text>
        <Text>{AB.substring(0, 100)}...</Text>
        <div style={{ marginTop: '10px' }}>
          {KW.map(tag => (
            <Tag key={tag.value} color="blue">
              {tag.value} ({tag.count})
            </Tag>
          ))}
        </div>
      </a>
      {HIGHLIGHTS.length > 0 && (
        <div style={{ marginTop: '10px', fontStyle: 'italic' }}>
          {HIGHLIGHTS.map((highlight, index) => (
            <Text key={index} style={{ display: 'block' }}>
              {highlight}
            </Text>
          ))}
        </div>
      )}
    </Card>
  );
};

export default NewsSnippet;
