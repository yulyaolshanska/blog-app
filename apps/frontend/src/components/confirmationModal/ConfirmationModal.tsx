import React from 'react';

import styles from './ConfirmationModal.module.css';

type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmationModal: React.FC<Props> = ({
  message,
  onConfirm,
  onCancel
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onCancel}
          aria-label="Close modal"
        >
          &times;
        </button>
        <p>{message}</p>
        <div className={styles.modalActions}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Yes
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
