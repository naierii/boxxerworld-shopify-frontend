import Button from '@components/ui/Button';
import { usePortalRef } from '@hooks';
import cn from 'classnames';
import ReactDOM from 'react-dom';

import styles from './NavEditButtons.module.scss';

export interface NavEditButtonsProps {
  className?: string;
  onApply?: () => void;
  disabled: boolean;
}

const NavEditButtons = ({ className, disabled, onApply }: NavEditButtonsProps) => {
  const rootClassName = cn(styles.root, className);
  const portalRef = usePortalRef('CustomiserNavActions');

  if (!portalRef) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={rootClassName}>
      <Button onClick={onApply} disabled={disabled}>
        Apply to model
      </Button>
    </div>,
    portalRef,
  );
};

export default NavEditButtons;
