import React from 'react';
import { Typography, Avatar } from 'antd';
import { BookOpen, User, Flag } from 'lucide-react';
import { ucFirst } from '../../utils/ucFirst';
import styles from './InfoSourceBlock.module.css';

const { Text } = Typography;

interface InfoSourceProps {
  infoSource: IData_SnippetNews;
}

export const InfoSourceBlock: React.FC<InfoSourceProps> = ({ infoSource }) => {
  const { FAV, DOM, CNTR, LANG, AU } = infoSource;

  const hasAU = AU && AU.length > 0;

  return (
    <div className={`${styles.wrapperInfoSource} ${hasAU ? styles.withAu : styles.withoutAu}`}>
      <div className={styles.dom}>
        {FAV && <Avatar src={FAV} alt="favicon" className={styles.fav} />}
        <a href={DOM}>
          <Text
            type="secondary"
            style={{
              color: 'blue',
              textDecorationLine: 'underline',
            }}
          >
            {DOM}
          </Text>
        </a>
      </div>

      <div className={styles.cntr}>
        <Flag className={styles.icon} />
        {CNTR}
      </div>

      <div className={styles.lang}>
        <BookOpen className={styles.icon} />
        {ucFirst(LANG)}
      </div>

      {hasAU && (
        <div className={styles.au}>
          <User className={styles.icon} />
          {AU.map((str, index) => (
            <Text style={{ color: '#979696' }} key={index}>
              {str}
              {index !== AU.length - 1 ? ', ' : ''}
            </Text>
          ))}
        </div>
      )}
    </div>
  );
};