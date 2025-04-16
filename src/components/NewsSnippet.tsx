import React from 'react';
import { Card, Typography, Tag, Avatar, Collapse } from 'antd';
import { IData_SnippetNews } from '../types/interfaces';
import './NewsSnippet.css';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const text = "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.";
interface Props {
  news: IData_SnippetNews;
}

const NewsSnippet: React.FC<Props> = ({ news }) => {
  const { TI, AB, URL, DP, DOM, KW, FAV, HIGHLIGHTS } = news;

  return (
    <Card hoverable className='card'>
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

      <Collapse style={{ marginTop: '20px' }}>
        <Panel className='collapse-header' header="View Duplicates" key="1">
          <p className='text'>{text}</p>
        </Panel>
      </Collapse>
    </Card >
  );
};

export default NewsSnippet;
