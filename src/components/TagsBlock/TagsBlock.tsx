import React, { useRef, useEffect, useReducer } from 'react';
import { Tag } from 'antd';
import { ButtonSourse } from '../ButtonSourse/ButtonSourse';
import { tagsReducer, initialTagsState } from '../../store/tagsReducer';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageHelpers';
import styles from './TagsBlock.module.css';

interface TagItem {
  value: string;
  original: string;
  count: number;
}

interface TagsBlockProps {
  tags: { KW: TagItem[] };
}

export const TagsBlock: React.FC<TagsBlockProps> = ({ tags }) => {
  const btnClasses = `${styles.btnSourse} ${styles.inherit}`;

  const { KW } = tags;

  const containerRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [state, dispatch] = useReducer(tagsReducer, initialTagsState, () => {
    const visibleCount = loadFromLocalStorage('tagsVisibleCount', KW.length);
    const showButton = loadFromLocalStorage('tagsShowButton', false);
    const remainingCount = loadFromLocalStorage('tagsRemainingCount', 0);
    return {
      visibleCount,
      showButton,
      remainingCount,
      buttonWidth: 0,
    };
  });

  useEffect(() => {
    saveToLocalStorage('tagsVisibleCount', state.visibleCount);
    saveToLocalStorage('tagsShowButton', state.showButton);
    saveToLocalStorage('tagsRemainingCount', state.remainingCount);
  }, [state.visibleCount, state.showButton, state.remainingCount]);

  useEffect(() => {
    if (buttonRef.current) {
      dispatch({ type: 'SET_BUTTON_WIDTH', payload: buttonRef.current.offsetWidth });
    }
  }, [state.remainingCount]);

  useEffect(() => {
    if (!containerRef.current || KW.length === 0) return;

    const containerWidth = containerRef.current.offsetWidth;
    let totalWidth = 0;
    let lastVisibleIndex = 0;

    for (let i = 0; i < KW.length; i++) {
      const tagElem = tagsRef.current[i];
      if (tagElem) {
        const tagWidth = tagElem.offsetWidth;
        const reservedWidth = state.showButton ? state.buttonWidth : 0;

        if (totalWidth + tagWidth + reservedWidth > containerWidth) {
          break;
        }

        totalWidth += tagWidth;
        lastVisibleIndex = i + 1;
      }
    }

    const remaining = KW.length - lastVisibleIndex;

    dispatch({ type: 'SET_VISIBLE_COUNT', payload: lastVisibleIndex });
    dispatch({ type: 'SET_REMAINING_COUNT', payload: remaining });
    dispatch({ type: 'SET_SHOW_BUTTON', payload: remaining > 0 });
  }, [KW, state.showButton, state.buttonWidth]);


  return (
    <div className={styles.wrapperTags} ref={containerRef}>
      {KW.slice(0, state.visibleCount).map((tag, index) => (
        <Tag
          key={tag.value + index}
          className={styles.tag}
          ref={(el) => (tagsRef.current[index] = el)}
        >
          {tag.original} {tag.count}
        </Tag>
      ))}
      {state.showButton && (
        <ButtonSourse
          type='button'
          text={`Show All +${state.remainingCount}`}
          className={btnClasses}
          ref={buttonRef}
        />
      )}
    </div>
  );
};
