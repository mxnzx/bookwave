import * as S from "./ProfileDiary.styles";
import { useQuery } from "@tanstack/react-query";
import { fetchMemoDiary } from "../../../apis";
import { useState } from "react";
import ReminderDetail from "../../modals/ReminderDetailModal/ReminderDetail";

interface IDiary {
  diaryId: number;
  diaryContent: string;
  diaryColor: string;
}
interface IDiaryData {
  diaryList: IDiary[];
}


const ProfileDiary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiaryId, setSelectedDiaryId] = useState<number | null>(null);
  const handleDiaryClick = (diaryId: number) => {
    setSelectedDiaryId(diaryId);
    setIsModalOpen(true);
  }

  const { data: diaryData, isError, isLoading } = useQuery<IDiaryData>(['memoDiary'], fetchMemoDiary);
  // console.log(diaryData, "일기 데이터");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading book detail</p>;


  return (
    <S.FeedGrid>
      {diaryData.diaryList.slice().reverse().map((item) =>
        <S.FeedWrap key={item.diaryId} onClick={() => handleDiaryClick(item.diaryId)}>
          <S.FeedBox bgColor={item.diaryColor}>
            <S.FeedContent>"{item.diaryContent}"</S.FeedContent>
          </S.FeedBox>
        </S.FeedWrap>)}

      {/* 모달 */}
      {selectedDiaryId !== null && (
        <ReminderDetail
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          diaryId={selectedDiaryId}
        />
      )}
    </S.FeedGrid>
  );



};


export default ProfileDiary;
