import React from "react";
import * as S from "./RecordType.styles";
import { useScroll } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { writeModalState } from "../../../recoil";
import { useNavigate } from "react-router-dom";

type RecordTypeProps = {
  openBookSelectModal: () => void;
};

const RecordType: React.FC<RecordTypeProps> = ({ openBookSelectModal }) => {
  const setWriteModal = useSetRecoilState(writeModalState);
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  const handleModal = () => {
    setWriteModal(false);
  };
  const handleDiaryModal = () => {
    navigate('/createreminder')
    setWriteModal(false);
  }
  const handleBookSelectModal = () => {
    openBookSelectModal();
    setWriteModal(false);
  }
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) { // 현재 대상과 이벤트 대상이 동일한 경우 (즉, Overlay를 직접 클릭한 경우)
      setWriteModal(false);
    }
  };
  return (
    <S.Overlay
      onClick={handleOutsideClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <S.ModalBox
        style={{ top: scrollY.get() + 100 }}
        initial={{ opacity: 0, y: "50%" }}
        animate={{ opacity: 1, y: "0%" }}
        exit={{ opacity: 0, y: "50%" }}
        transition={{ duration: 0.3 }}
      >
        <S.ModalWrap>
          <S.Header>
            <S.HeaderText>기록 유형을 선택해주세요</S.HeaderText>
          </S.Header>
          <S.Box>
            <S.Button onClick={handleBookSelectModal}>
              <S.Title>독서 기록</S.Title>
              <S.Hr />
              <S.Subtitle>
                책을 읽고 느낀 감정, <br />
                생각을 기록으로 오래 남겨봐요.
              </S.Subtitle>
            </S.Button>

            <S.Button onClick={handleDiaryModal}>
              <S.Title>일기</S.Title>
              <S.Hr />
              <S.Subtitle>
                어떤 하루를 보내셨나요?
                <br />
                오늘 느낀 감정과 생각을 기록하세요.
              </S.Subtitle>
            </S.Button>
          </S.Box>
          <S.BackButtonBox>
            <S.BackButton onClick={handleModal}>이전</S.BackButton>
          </S.BackButtonBox>
        </S.ModalWrap>
      </S.ModalBox>
    </S.Overlay >
  );
};
export default RecordType;
