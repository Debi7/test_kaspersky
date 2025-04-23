import React from 'react';
import { Typography } from 'antd';
import { formatDateTime } from '../../utils/dateUtils';
import styles from './TimeTrafficBlock.module.css';

const { Text } = Typography;

interface TimeTrafficProps {
  timeTraffic: IData_SnippetNews;
}

export const TimeTrafficBlock: React.FC<TimeTrafficProps> = ({ timeTraffic }) => {
  const { DP, REACH, TRAFFIC } = timeTraffic;

  const formattedDateTime = formatDateTime(DP);

  return (
    <div className={styles.timeTraffic}>
      <Text className={styles.text}>{formattedDateTime}</Text>
      <Text className={styles.text}>{REACH}
        <span style={{ color: 'white' }}>K{' '}</span>Reach</Text>
      <Text className={styles.text}>
        Top Traffic:{' '}
        {TRAFFIC.map((item, index) => (
          <span key={index}>
            {item.value} {item.count}%{' '}
          </span>
        ))}
      </Text>
    </div>
  );
};