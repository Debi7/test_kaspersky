import React from 'react';
import { Collapse } from 'antd';
import styles from './DuplicatesCollapse.module.css';

const { Panel } = Collapse;

interface DuplicatesCollapseProps {
  text: string;
  header?: string;
}

export const DuplicatesCollapse: React.FC<DuplicatesCollapseProps> = ({ text, header = "View Duplicates" }) => {
  return (
    <Collapse className={styles.wrapperCollapse}>
      <Panel className={styles.collapseHeader} header={header} key="1">
        <p className={styles.text}>{text}</p>
      </Panel>
    </Collapse>
  );
};
