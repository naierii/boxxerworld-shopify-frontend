import Image from '@components/ui/Image';
import { useCustomiserStore } from '@store/customiser';

import { GraphicsContextGraphic, useGraphics } from '@context/GraphicsContext';
import { Dispatch, SetStateAction } from 'react';
import styles from './NavFlags.module.scss';

export interface NavFlagsFlagProps {
  flag: GraphicsContextGraphic;
  setShowSelector: Dispatch<SetStateAction<boolean>>;
}

export const NavFlagsFlag = ({ flag, setShowSelector: setSelectModel }: NavFlagsFlagProps) => {
  // const deleteFlag = useCustomiserStore((state) => state.deleteFlag);
  // const selectFlag = useCustomiserStore((state) => state.selectFlag);
  const { updateGraphic, deleteGraphic } = useGraphics();

  const editFlag = () => {
    if (flag.key) {
      updateGraphic(flag.key, { edit: true });
    }
    setSelectModel(true);
  };

  const deleteFlag = () => {
    if (flag.key) {
      deleteGraphic(flag.key);
    }
  };

  return (
    <div className={styles.flagItem}>
      <div className={styles.flagItemImage}>
        <Image image={flag.flag?.attributes?.image.data} />
      </div>
      <div className={styles.flagItemButtons}>
        <button onClick={editFlag}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24.785 24.788'>
            <path d='M24.785 6.739 18.046 0 0 18.049v6.739h6.739Zm-6.738-3.218 3.218 3.218-1.351 1.352-3.217-3.218Zm-3.112 3.112 3.218 3.218L7.467 20.538l-3.218-3.22ZM2.489 22.298v-3.219l3.218 3.218Z' />
          </svg>
        </button>
        <button onClick={() => deleteFlag()}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.601 23.219'>
            <path d='m14.601 11.609-1.489-1.489L2.992 0 .001 2.978l8.631 8.631-8.631 8.632 2.991 2.978L13.112 13.1Z' />
            <path d='m9 11.609 1.489 1.489 10.12 10.12L23.6 20.24l-8.631-8.631L23.6 2.977 20.609-.001l-10.12 10.119Z' />
          </svg>
        </button>
      </div>
    </div>
  );
};