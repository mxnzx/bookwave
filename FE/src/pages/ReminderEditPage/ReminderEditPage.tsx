import { useEffect, useState } from 'react';
import * as S from './ReminderEditPage.styles';
import { useNavigate, useParams } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import { fetchDiary, updateDiary } from '../../apis/Reminder/diary';

function ReminderEditPage() {
  const navigate = useNavigate();
  const { diaryId: diaryIdString, memberId: memberIdString } = useParams();
  const diaryId = Number(diaryIdString);
  const memberId = Number(memberIdString);
  const userSeq = localStorage.getItem("memberId"); // null 대신 빈 문자열을 기본값으로 설정

  // const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [diaryContent, setDiaryContent] = useState('');
  const [registDate, setRegistDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Number(userSeq) !== memberId) {
          navigate('/notfound');
        }
        if (diaryId !== undefined) {
          const diaryData = await fetchDiary(diaryId);
          setDiaryContent(diaryData.diaryContent); // 일기 내용 업데이트
          setRegistDate(diaryData.diaryDate); // 일기 등록일 업데이트
          setSelectedColor(diaryData.diaryColor); // 일기 배경색 업데이트
        }
      } catch (error) {
        console.error("일기 정보를 불러오는 중 에러 발생: ", error);
      }
    }; 
    fetchData();
  }, [diaryId]);

  const changeColor = (color: string) => {
    setSelectedColor(color);
    // console.log(`${color} 색이다!`);
  };

  const handleUpdateClick = async () => {
    setIsUpdateLoading(true);
    try {
      const payload = {
        diaryId: diaryId,
        content: diaryContent,
        color: selectedColor,
      };
      const response = await updateDiary(payload);
      // console.log("일기 수정 성공:", response);

      setTimeout(() => {
        navigate('/recommend');
      }, 1000);
    } catch (error) {
      console.error("일기 수정하려는데 어?:", error);
    }
  };

  return (
    <S.Container>
      <S.Body>
        <S.HeaderText>
          일기 수정
        </S.HeaderText>
        <S.DateText>
          {registDate}
        </S.DateText>
        <S.Box>
          <S.BoxText style={{ backgroundColor: selectedColor }}>
            <textarea
              maxLength={200}
              placeholder={diaryContent}
              value={diaryContent}
              onChange={(e) => setDiaryContent(e.target.value)} // 일기 내용 입력 핸들러
            />
          </S.BoxText>
          <S.BoxColor>
            <S.Circle_1 onClick={() => changeColor('#F5DADC')} />
            <S.Circle_2 onClick={() => changeColor('#F9E6A7')} />
            <S.Circle_3 onClick={() => changeColor('#DABFE1')} />
            <S.Circle_4 onClick={() => changeColor('#CCEBC7')} />
          </S.BoxColor>
        </S.Box>

        <S.Bottom>
          <S.BoxColor2>
            <S.Circle_1 onClick={() => changeColor('#F5DADC')} />
            <S.Circle_2 onClick={() => changeColor('#F9E6A7')} />
            <S.Circle_3 onClick={() => changeColor('#DABFE1')} />
            <S.Circle_4 onClick={() => changeColor('#CCEBC7')} />
          </S.BoxColor2>
          <S.UpdateButton onClick={handleUpdateClick}>
            {isUpdateLoading ?
              <SpinnerCircular size={30} color="#ffffff" speed={100} />
              : '수정하기'}
          </S.UpdateButton>
        </S.Bottom>
      </S.Body>
    </S.Container>
  );

}
export default ReminderEditPage;