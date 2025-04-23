import React from 'react';
import { Card, Typography, Tooltip } from 'antd';
import { truncateText } from '../../utils/truncate';
import { ucFirst } from '../../utils/ucFirst';
import { Highlights } from '../../components/Highlights/Highlights';
import { DuplicatesCollapse } from '../../components/DuplicatesCollapse/DuplicatesCollapse';
import { InfoSquareIcon } from '../InfoSquareIcon/InfoSquareIcon';
import { SquareIcon } from '../SquareIcon/SquareIcon';
import { ButtonSourse } from '../ButtonSourse/ButtonSourse';
import { InfoSourceBlock } from '../InfoSourceBlock/InfoSourceBlock';
import { TimeTrafficBlock } from '../TimeTrafficBlock/TimeTrafficBlock';
import { TitleLink } from '../TitleLink/TitleLink';
import { TagsBlock } from '../TagsBlock/TagsBlock';
import styles from './NewsSnippet.module.css';

const { Text } = Typography;

const dummyText = "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.";

interface NewsSnippetProps {
  news: IData_SnippetNews;
}

export const NewsSnippet: React.FC<NewsSnippetProps> = ({ news }) => {
  const { AB, HIGHLIGHTS, SENT } = news;

  const handleShowMore = () => {
    alert('Показать еще!');
  };


  return (
    <Card className={styles.wrapperCard}>
      <div className={styles.card}>
        <div className={styles.wrapperDate}>
          <TimeTrafficBlock timeTraffic={news} />

          <div className={styles.wrapperSent}>
            <div className={styles.sentNews} style={{ backgroundColor: SENT === 'negative' ? '#ff0000' : 'rgb(134, 239, 150)' }}>
              {ucFirst(SENT)}
            </div>
            <Tooltip title="Информация">
              <InfoSquareIcon />
            </Tooltip>
            <SquareIcon />
          </div>
        </div>

        <TitleLink titleLink={news} />
        <InfoSourceBlock infoSource={news} />

        <Text style={{ color: 'white' }}>{truncateText(AB, 100)}</Text>

        {HIGHLIGHTS.length > 0 && (
          <Highlights highlights={HIGHLIGHTS} onShowMore={handleShowMore} />
        )}

        <TagsBlock tags={news} />
        <ButtonSourse type='button' text="Original Sourse" className={styles.btnSourse} />

        <div className={styles.headerDuplicates}>
          <div>
            <span className={styles.text}>Duplicates: </span>
            <span style={{ color: 'white' }}>192</span>
          </div>
          <button style={{ backgroundColor: 'inherit', color: '#808080', cursor: 'pointer' }}>By Relevance</button>
        </div>

        <div className={styles.wrapperDuplicates}>
          <div className={styles.wrapperDate}>
            <TimeTrafficBlock timeTraffic={news} />
            <div className={styles.iconDuplicates}>
              <Tooltip title="Информация">
                <InfoSquareIcon />
              </Tooltip>
              <SquareIcon />
            </div>
          </div>
          <TitleLink titleLink={news} />
          <InfoSourceBlock infoSource={news} />
        </div>

        <DuplicatesCollapse text={dummyText} />
      </div>
    </Card>
  );
};
