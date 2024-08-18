import Modal from 'react-modal';
import css from './ImageModal.module.css';
import { FiX } from 'react-icons/fi';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export default function ImageModal({ isOpen, onClose, imageUrl }: ImageModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={css.modal_overlay}
      className={css.modal}
      ariaHideApp={false}
    >
      <button className={css.close_btn} onClick={onClose}>
        <FiX />
      </button>
      <img src={imageUrl} alt="Large" className={css.image} />
    </Modal>
  );
}
