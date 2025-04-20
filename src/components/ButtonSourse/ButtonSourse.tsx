import React from 'react';
import { Button } from 'antd';
import styles from './ButtonSourse.module.css';
import classNames from 'classnames';

interface ButtonSourseProps {
  text: string;
  className?: string;
  type: "button" | "reset" | "submit" | undefined;
  onClick?: () => void;
}

export const ButtonSourse = React.forwardRef<HTMLButtonElement, ButtonSourseProps>(
  ({ text, className, onClick }, ref) => {
    const combinedClassName = classNames(styles.btnSourse, className);
    return (
      <Button ref={ref} className={combinedClassName} onClick={onClick}>
        {text}
      </Button>
    );
  }
);
