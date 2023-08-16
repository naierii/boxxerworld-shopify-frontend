import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import NavFitting from '../NavFitting';
import NavFlags from '../NavFlags';
import NavHeader from '../NavHeader';
import NavImages from '../NavImages';
import NavOptions from '../NavOptions';
import NavPart from '../NavPart';
import NavSize from '../NavSize';
import NavText from '../NavText';

import styles from './CustomiserNav.module.scss';

export interface CustomiserNavProps {
  className?: string;
}

const CustomiserNav = ({ className }: CustomiserNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedPart = useCustomiserStore((state) => state.selectedPart);
  const selectedNav = useCustomiserStore((state) => state.selectedNav);

  const rootClassName = cn(
    styles.root,
    { [styles.open]: isOpen, [styles.hasActions]: selectedNav?.hasActions },
    className,
  );

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (selectedNav === null && selectedPart === null) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [selectedPart, selectedNav]);

  return (
    <motion.nav
      layout='preserve-aspect'
      transition={{
        type: 'spring',
        stiffness: 700,
        damping: 40,
      }}
      className={rootClassName}
    >
      <NavHeader className={styles.header} toggle={() => toggleOpen()} isOpen={isOpen} />
      <Suspense fallback={<div>Loading...</div>}>
        <AnimatePresence initial={false}>
          <motion.div
            id='scrollable'
            className={styles.content}
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1 },
              collapsed: { opacity: 0 },
            }}
          >
            {isOpen ? (
              <NavOptions toggle={() => toggleOpen()} />
            ) : selectedNav?.type === 'fitting' ? (
              <NavFitting />
            ) : selectedNav?.type === 'names' ? (
              <NavText />
            ) : selectedNav?.type === 'flags' ? (
              <NavFlags />
            ) : selectedNav?.type === 'images' ? (
              <NavImages />
            ) : selectedNav?.type === 'size' ? (
              <NavSize />
            ) : selectedPart ? (
              <NavPart part={selectedPart} />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </Suspense>
      {!isOpen && selectedNav?.hasActions && (
        <div className={styles.actions}>
          <div id='CustomiserNavMaterial'></div>
          <div id='CustomiserNavActions'></div>
        </div>
      )}
    </motion.nav>
  );
};

export default CustomiserNav;
