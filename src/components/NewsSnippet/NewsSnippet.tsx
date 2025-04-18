import React from 'react';
import { Card, Typography, Tag, Avatar, Button } from 'antd';
import { formatDateTime } from '../../utils/dateUtils';
import { truncateText } from '../../utils/truncate';
import { Highlights } from '../../components/Highlight/Highlight';
import { DuplicatesCollapse } from '../../components/DuplicatesCollapse/DuplicatesCollapse';
import styles from './NewsSnippet.module.css';

const { Title, Text } = Typography;

const dummyText = "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.";

interface Props {
  news: IData_SnippetNews;
}

export const NewsSnippet: React.FC<Props> = ({ news }) => {
  const { TI, AB, URL, DP, DOM, KW, FAV, HIGHLIGHTS, REACH, TRAFFIC } = news;
  const formattedDateTime = formatDateTime(DP);

  const handleShowMore = () => {
    alert('Показать еще!');
  };


  return (
    <Card className={styles.wrapperCard}>
      <div className={styles.card}>
        <div className={styles.timeTraffic}>
          <Text>{formattedDateTime}</Text>
          <Text>{REACH}K Reach</Text>
          <Text>
            Top Traffic:{' '}
            {TRAFFIC.map((item, index) => (
              <span key={index}>
                {item.value} {item.count}%{' '}
              </span>
            ))}
          </Text>
        </div>

        <a href={URL} target="_blank" rel="noopener noreferrer">
          <Title level={4} style={{ color: 'blue' }}>
            {TI}
          </Title>
        </a>

        <div className={styles.iconLink}>
          {FAV && <Avatar src={FAV} alt="favicon" className={styles.icon} />}
          <a href={DOM}>
            <Text type="secondary" className={styles.link}>
              {DOM}
            </Text>
          </a>
        </div>

        <Text>{truncateText(AB, 100)}</Text>

        {HIGHLIGHTS.length > 0 && (
          <Highlights highlights={HIGHLIGHTS} onShowMore={handleShowMore} />
        )}

        <div style={{ marginTop: '20px' }}>
          {KW.map((tag) => (
            <Tag
              key={tag.value}
              style={{
                color: 'grey',
                background: 'inherit',
                borderRadius: '11px',
              }}
            >
              {tag.value} {tag.count}
            </Tag>
          ))}
        </div>

        <Button style={{
          fontWeight: 'bold',
          marginTop: '20px',
          color: 'blue',
          background: '#8D917A',
          borderRadius: '11px',
          border: 'none'
        }} >Original Sourse</Button>

        <DuplicatesCollapse text={dummyText} />
      </div>
    </Card>
  );
};
