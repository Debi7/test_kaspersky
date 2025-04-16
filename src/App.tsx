import React from 'react';
import { NewsSnippet } from './components/NewsSnippet/NewsSnippet';
import { newsData } from './constants/newsData'


export const App: React.FC = () => {

  return (
    <div style={{ padding: '20px' }}>
      <NewsSnippet news={newsData} />
    </div>
  );
};