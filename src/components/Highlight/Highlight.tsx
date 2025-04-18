import React from 'react';
import { Typography, Tag, Button } from 'antd';

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
        <Text key={index} style={{ display: 'block', color: 'white' }}>
          {parseHighlights(highlight)}
        </Text>
      ))}
      {onShowMore && (
        <Button
          style={{ background: 'inherit', marginTop: '5px', padding: '0px', border: 'none', color: 'blue' }}
          onClick={onShowMore}
        >
          Show more
        </Button>
      )}
    </div>
  );
};
