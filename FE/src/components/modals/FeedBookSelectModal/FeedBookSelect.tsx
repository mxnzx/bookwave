import * as S from './FeedBookSelect.styles';

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        {/* 모달 내용 */}
        <p>This is a modal!</p>
        <button onClick={onClose}>Close</button>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default Modal;
