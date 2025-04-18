import React from 'react';
import { Card, Typography, Tag, Avatar, Collapse } from 'antd';
import { format } from 'date-fns';
import styles from './NewsSnippet.module.css';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const text = "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.";

function parseHighlights(text: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  const regex = /<kw>(.*?)<\/kw>/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const plainText = text.substring(lastIndex, match.index);
      result.push(plainText);
    }

    const keyword = match[1];
    result.push(
      <Tag key={match.index} color="#3B83BD" style={{ marginRight: '8px' }}>
        {keyword}
      </Tag>
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex));
  }

  return result;
}

interface Props {
  news: IData_SnippetNews;
}

export const NewsSnippet: React.FC<Props> = ({ news }) => {
  const { TI, AB, URL, DP, DOM, KW, FAV, HIGHLIGHTS, REACH, TRAFFIC } = news;
  // const formattedDateTime = format(new Date(DP), 'd MMMM yyyy hh:mm a');
  const formattedDateTime = format(new Date(DP), 'd MMMM yyyy HH:mm');

  return (
    <Card hoverable className={styles.wrapperCard}>
      <div className={styles.card}>
        <div className={styles.timeTraffic}>
          <Text>{formattedDateTime}</Text>
          <Text>{REACH}K Reach</Text>
          <Text>Top Traffic: {TRAFFIC.map(item => (<span>{item.value} {item.count}% </span>))}</Text>
        </div>

        <a href={URL} target="_blank" rel="noopener noreferrer">
          <Title level={4} style={{ color: 'blue' }}>{TI}</Title>
        </a>

        <div className={styles.iconLink}>
          {FAV && <Avatar src={FAV} alt="favicon" className={styles.icon} />}
          <a href={DOM}>
            <Text type="secondary" className={styles.link}>
              {DOM}
            </Text>
          </a>
        </div>

        <Text>{AB.substring(0, 100)}...</Text>

        {HIGHLIGHTS.length > 0 && (
          <div style={{ marginTop: '20px', fontStyle: 'italic' }}>
            {HIGHLIGHTS.map((highlight, index) => (
              <Text key={index} style={{ display: 'block', marginTop: '15px' }}>
                {parseHighlights(highlight)}
              </Text>
            ))}
          </div>
        )}

        {/* бордер-радиус больше, цвет бэка наследуемый, цвет текста серый */}
        <div style={{ marginTop: '20px' }}>
          {KW.map(tag => (
            <Tag key={tag.value} style={{ color: 'blue' }}>
              {tag.value} ({tag.count})
            </Tag>
          ))}
        </div>


        <Collapse style={{ marginTop: '20px' }}>
          <Panel className={styles.collapseHeader} header="View Duplicates" key="1">
            <p className={styles.text}>{text}</p>
          </Panel>
        </Collapse>
      </div>

    </Card >
  );
};