import { useState } from 'react';
import * as S from './CreateReminderPage.styles';
import { useNavigate } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import { postDairy } from '../../apis/Reminder/diary';
import useCheckAuthentication from '../../utils/Hooks/useCheckAuthentication';

function CreateReminderPage() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('#F5DADC');
  const [isLoading, setIsLoading] = useState(false);
  const [diaryContent, setDiaryContent] = useState(''); // 일기 내용 상태 추가

  const TempPlaceholder = "오늘의 감정에 맞는 책을 추천해드려요 :)";
  useCheckAuthentication();
  const changeColor = (color: string) => {
    setSelectedColor(color);
    // console.log(`${color} 색이다!`);
  };

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear(); // 현재 연도
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 현재 월 (0부터 시작하므로 1을 더하고 2자리로 포맷)
    const day = currentDate.getDate().toString().padStart(2, '0'); // 현재 일 (2자리로 포맷)

    const formattedDate = `${year}. ${month}. ${day}`;
    return formattedDate;
  }
  const currentDate = getCurrentDate();

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await postDairy({ diaryContent, color: selectedColor });
      // console.log(response, "일기 작성 성공");

      setTimeout(() => {
        setIsLoading(false);
        navigate('/recommend');
      }, 1000);
    } catch (error) {
      console.error("일기쓰려는데 어? ", error);
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Body>
        <S.HeaderText>
          오늘의 일기
        </S.HeaderText>
        <S.DateText>
          {currentDate}
        </S.DateText>
        <S.Box>
          <S.BoxText style={{ backgroundColor: selectedColor }}>
            <textarea
              maxLength={200}
              placeholder={TempPlaceholder}
              value={diaryContent} // 일기 내용 입력 상태와 바인딩
              onChange={(e) => setDiaryContent(e.target.value)} // 일기 내용 입력 핸들러
            />
          </S.BoxText>
          <S.BoxColor>
            {/* <S.BoxColorTitle>배경색</S.BoxColorTitle> */}
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
          <S.Button onClick={handleClick}>
            {isLoading ?
              <SpinnerCircular size={40} color="#ffffff" speed={100} />
              : '등록하기'}
          </S.Button>
        </S.Bottom>
      </S.Body>
    </S.Container>
  );

}
export default CreateReminderPage;