import React from 'react';
import { Typography, Tag } from 'antd';
import { ButtonSourse } from '../ButtonSourse/ButtonSourse';
import styles from './Highlights.module.css';
const { Text } = Typography;

interface HighlightsProps {
  highlights: string[];
  onShowMore?: () => void;
}

export function parseHighlights(text: string): React.ReactNode[] {
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


export const Highlights: React.FC<HighlightsProps> = ({ highlights, onShowMore }) => {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      {highlights.map((highlight, index) => (
        <Text key={index} style={{ display: 'block', color: 'white', marginBottom: '5px' }}>
          {parseHighlights(highlight)}
        </Text>
      ))}
      {onShowMore && (
        <ButtonSourse
          type='button'
          text='Show more'
          className={styles.btnShowMore}
          onClick={onShowMore}
        />
      )}
    </div>
  );
};
