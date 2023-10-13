import React, { useState } from "react";
import * as S from "./Record.styles";
import { useRecoilValue } from "recoil";
import { bookDetailState } from "../../../recoil/book";
import defaultImage from "../../../assets/icons/profile.png";
import RecordDetailModal from '../../../components/modals/RecordDetailModal/RecordDetail';
import icon from "../../../assets/icons/sad.png";
import TextMaxLength from "../../Common/TextMaxLength";

const Record: React.FC = () => {
  const [isRecordDetailModalOpen, setIsRecordDetailModalOpen] = useState(false);
  const closeRecordDetailModal = () => { setIsRecordDetailModalOpen(false); };
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const openRecordDetailModal = (id: number) => {  // 수정된 함수
    setSelectedRecordId(id);
    setIsRecordDetailModalOpen(true);
  };
  const memberId = localStorage.getItem('memberId') as unknown as number;
  const recordData = useRecoilValue(bookDetailState);

  const sliderSetting = {
    className: "center",
    centerMode: false,
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    dots: false,
    speed: 500,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 864,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      }
    ],
  }
  // 리코일로 데이터 받아옴
 // console.log(recordData?.recordPreviewDtoList, "레코드 리코일");

  return (
    <S.Container>
      <S.RecordWrap>
        <S.Title>
          이 책을 읽고 쓴 <S.PointTitle>독서 기록</S.PointTitle>이에요.
        </S.Title>
        <S.FeedWrap>
          {/* 아래 부분에서 recordData나 recordData.recordPreviewDtoList가 비어 있으면 메시지를 띄우도록 조건부 렌더링을 추가했습니다. */}
          {!recordData || (recordData && recordData.recordPreviewDtoList.length === 0) ? (
            <S.EmptyBox>
              <S.EmptyText>데이터가 부족해요</S.EmptyText>
              <S.EmptyIcon src={icon} />
            </S.EmptyBox>
          ) : (
            <S.StyledSlider {...sliderSetting}>
              {recordData?.recordPreviewDtoList.map((item, index) => (
                <S.FeedBox key={index} onClick={() => openRecordDetailModal(item.recordId)}>
                  <S.ProfileBox>
                    <S.ProfileImg src={item.recordMemberProfileImageUrl || defaultImage} />
                    <S.Name>{item.recordMemberNickname}</S.Name>
                  </S.ProfileBox>
                  <S.Hr />
                  <S.RecordContent>
                    <TextMaxLength text={item.recordContent} maxLength={100} />
                  </S.RecordContent>
                </S.FeedBox>
              ))}
            </S.StyledSlider>
          )}
        </S.FeedWrap>
      </S.RecordWrap>

      {selectedRecordId && <RecordDetailModal isOpen={isRecordDetailModalOpen} onClose={closeRecordDetailModal} recordId={selectedRecordId} userSeq={memberId} />}
    </S.Container>
  );
};
export default Record;
