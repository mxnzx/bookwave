import * as S from './ReminderDetail.styles';
import BookComponent from './BookComponent';
import { useEffect, useState } from 'react';
import { deleteDiary, fetchDiary } from '../../../apis/Reminder/diary';
import { useNavigate } from 'react-router-dom';
import { SpinnerCircular } from "spinners-react";

interface ReminderDetailProps {
  isOpen: boolean;
  onClose: () => void; // 함수 타입
  diaryId: number;
}

function ReminderDetail({ isOpen, onClose, diaryId }: ReminderDetailProps) {
  const [diaryWriterMemberId, setDiaryWriterMemberId] = useState<number>(0);
  const [diaryDate, setDiaryDate] = useState<string>('');
  const [diaryContent, setDiaryContent] = useState<string>('');
  const [diaryColor, setDiaryColor] = useState<string>('');
  const [todayBookId, setTodayBookId] = useState<number>(0);
  const [todayBookTitle, setTodayBookTitle] = useState<string>('');
  const [todayBookAuthor, setTodayBookAuthor] = useState<string>('');
  const [todayBookImgUrl, setTodayBookImgUrl] = useState<string>('');
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isOpen) {
          const data = await fetchDiary(diaryId);
          setDiaryWriterMemberId(data.diaryWriterMemberId);
          setDiaryDate(data.diaryDate);
          setDiaryContent(data.diaryContent);
          setDiaryColor(data.diaryColor);
          setTodayBookId(data.todayBookId);
          setTodayBookTitle(data.todayBookTitle);
          setTodayBookAuthor(data.todayBookAuthor);
          setTodayBookImgUrl(data.todayBookImgUrl);
        }
      } catch (error) {
        console.error("일기 상세모달 어? ", error);
      }
    };

    fetchData();
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleUpdateClick = async () => {
    setIsUpdateLoading(true);
    setTimeout(() => {
      navigate(`/reminderedit/${diaryId}/${diaryWriterMemberId}`);
    }, 1000);
  };

  const handleDeleteClick = async () => {
    setIsDeleteLoading(true);
    try {
      await deleteDiary(diaryId);
      console.log("일기 삭제 성공");

      setTimeout(() => {
        navigate('/recommend');
      }, 1000);
    } catch (error) {
      console.error("일기 삭제하려는데 어?: ", error);
    }
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Container onClick={handleClick}>
        <S.Box>
          <S.Header>
            <S.UpdateButton onClick={handleUpdateClick}>
              {isUpdateLoading ?
                <SpinnerCircular size={20} color="black" speed={100} />
                : '수정'}
            </S.UpdateButton>
            <S.DeleteButton onClick={handleDeleteClick}>
              {isDeleteLoading ?
                <SpinnerCircular size={20} color="red" speed={100} />
                : '삭제'}
            </S.DeleteButton>
          </S.Header>

          <S.ContentContainer>
            <S.LeftContent background={diaryColor}>
              <S.Reminder >
                <S.ReminderTop>
                  {diaryDate ? diaryDate : 'Loading...'}
                </S.ReminderTop>
                <S.ReminderMid>
                  {diaryContent ? diaryContent : 'Loading...'}
                </S.ReminderMid>
              </S.Reminder>
            </S.LeftContent>
            <S.RightContent>
              <S.Book>
                <BookComponent todayBookId={todayBookId} todayBookTitle={todayBookTitle} todayBookAuthor={todayBookAuthor} todayBookImgUrl={todayBookImgUrl} />
              </S.Book>
            </S.RightContent>

          </S.ContentContainer>

        </S.Box>
      </S.Container>
    </S.Overlay>
  );
}

export default ReminderDetail;
