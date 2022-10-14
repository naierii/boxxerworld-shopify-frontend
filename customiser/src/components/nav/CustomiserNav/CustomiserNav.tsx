import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { AnimatePresence, m, useCycle } from 'framer-motion';
import NavButtons from '../NavButtons';
import NavFitting from '../NavFitting';
import NavFlags from '../NavFlags';
import NavHeader from '../NavHeader';
import NavOptions from '../NavOptions';
import NavPart from '../NavPart';
import NavSize from '../NavSize';

import styles from './CustomiserNav.module.scss';

export interface CustomiserNavProps {
  className?: string;
}

const CustomiserNav = ({ className }: CustomiserNavProps) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const rootClassName = cn(styles.root, className);
  const selectedPart = useCustomiserStore((state) => state.selectedPart);
  const selectedNav = useCustomiserStore((state) => state.selectedNav);

  return (
    <m.nav className={rootClassName} initial={'closed'} animate={isOpen ? 'open' : 'closed'}>
      <NavHeader className={styles.header} toggle={() => toggleOpen()} isOpen={isOpen} />
      <AnimatePresence initial={false}>
        <div className={styles.content}>
          {isOpen ? (
            <NavOptions toggle={() => toggleOpen()} />
          ) : selectedNav?.type === 'fitting' ? (
            <NavFitting />
          ) : selectedNav?.type === 'flags' ? (
            <NavFlags />
          ) : selectedNav?.type === 'size' ? (
            <NavSize />
          ) : selectedPart ? (
            <NavPart part={selectedPart} />
          ) : null}
        </div>
      </AnimatePresence>
      {!isOpen && <NavButtons className={styles.actions} />}
    </m.nav>
  );
};

export default CustomiserNav;
