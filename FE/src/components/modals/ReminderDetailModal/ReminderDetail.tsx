import * as S from './ReminderDetail.styles';

function ReminderDetail({ isOpen, onClose }) {
  if (!isOpen) {
    return null; // 모달이 닫혔을 때는 아무것도 렌더링하지 않는다.
  }

  return (
    <S.Overlay>
      <S.Container>
        리마인더 모달
        {/* 모달 내용 */}
        {/* 모달 내용 추가 */}

        {/* 모달 닫기 버튼 */}
        <button onClick={onClose}>닫기</button>
      </S.Container>
    </S.Overlay>
  );
}

export default ReminderDetail;
