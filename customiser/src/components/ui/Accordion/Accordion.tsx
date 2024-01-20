import cn from 'classnames';
import { FC, ReactNode, useRef } from 'react';
import Button from '../Button';
import { current } from 'immer';

import styles from './Accordion.module.scss';
import InfoButton from '../InfoButton';

export type AccordionProps = {
  className?: string;

  step: string | number;
  currentStep: string | number;
  onTitleClick?: (step: string | number) => void;

  title: ReactNode;
  children?: ReactNode;
};

const Accordion: FC<AccordionProps> = ({
  className,
  children,
  title,
  currentStep,
  step,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTitleClick = () => {},
}) => {
  // TODO - Improve this
  const titlesWithInfo = ['TEXT COLOR'];
  const shouldShowInfoButton =
    title && typeof title === 'string' && titlesWithInfo.includes(title.toUpperCase());

  const handleTitleClick = () => {
    // console.log('key click', keyRef.current);

    onTitleClick(step);
  };

  const titleClassName = cn(styles.titleContainer, { [styles.active]: step === currentStep });

  return (
    <div className={cn(className)}>
      <div className={titleClassName} onClick={handleTitleClick}>
        {typeof step === 'number' && (
          <Button className={styles.titleStep} colour='red'>
            Step {step + 1}
          </Button>
        )}
        <Button className={styles.titleButton}>
          {title}
          {shouldShowInfoButton && <InfoButton title='TEXT COLOR' propStyles={styles} />}
        </Button>
      </div>
      {step === currentStep && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Accordion;
