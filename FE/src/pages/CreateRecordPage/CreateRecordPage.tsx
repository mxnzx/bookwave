import { useEffect, useState } from 'react';
import * as S from './CreateRecordPage.styles';
import BookInfoComponent from '../../components/CreateRecord/BookInfo';
import PhotoUploadComponent from '../../components/CreateRecord/PhotoUpload';
import StarPoint from '../../components/CreateRecord/StarPoint';
import CalendarComponent from '../../components/CreateRecord/Calendar';
import CalendarIcon from '../../assets/icons/calendar.png';
import { useNavigate, useParams } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import swal from "sweetalert";
import { fetchBookData, postChangeState, postRecode } from '../../apis';
import useCheckAuthentication from '../../utils/Hooks/useCheckAuthentication';

function CreateRecordPage() {
  const navigate = useNavigate();
  const { bookId: bookIdString, memberId: userSeqString } = useParams<{ bookId: string, memberId: string }>();
  const bookId = Number(bookIdString);
  const memberId = Number(userSeqString);
  const startText = '책을 읽기 시작한 날짜를 선택해주세요.';
  const endText = '책을 다 읽은 날짜를 선택해주세요.';
  useCheckAuthentication();
  useEffect(() => {
    const dataInfo = async () => {
      try {
        const Info = await fetchBookData(bookId, memberId);
        // console.log(Info);
        setBookTitle(Info.bookTitle);
        setBookAuthor(Info.bookAuthor);
        setBookImageUrl(Info.bookImageUrl);
      } catch (error) {
        console.error("일기를 폈는데 어?");
      }
    };
    dataInfo();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookImageUrl, setBookImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [star, setStar] = useState(2.5);
  const [uploadFile, setUploadFile] = useState<File | undefined>(undefined);

  const handleImageUpload = (imageFile: File | undefined) => {
    setUploadFile(imageFile);
  };


  const handleClick = async () => {
    if (isLoading) {
      return; // 이미 처리 중인 경우 클릭 무시
    }
  
    // 입력 검사 시작
    if (!startDate || !endDate) {
      swal('오류', '독서 시작 날짜와 완료 날짜를 선택해주세요.', 'warning');
      return;
    }
    if (!title.trim()) {
      swal('오류', '제목을 입력해주세요.', 'warning');
      return;
    }
    if (!content.trim()) {
      swal('오류', '본문을 작성해주세요.', 'warning');
      return;
    }
  
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      swal('오류', '시작 날짜는 종료 날짜보다 느릴 수 없습니다.', 'warning');
      return; // 함수 종료
    }
    setIsLoading(true);

    const payload = {
      memberId: memberId,
      bookId: bookId,
      title: title,
      content: content,
      startDate: startDate,
      endDate: endDate,
      star: star
    };

    try {
      await postRecode(payload, uploadFile);
      await postChangeState(bookId, 2);

      setTimeout(() => {
        navigate('/feed');
      }, 1000);
    } catch (error) {
      console.error("독후감 작성하는데 어? :", error);
    }
  };

  // 달력
  const handleStartDateSelect = (selectedDate: Date) => {
    const formattedDate = formatDate(selectedDate);
    setStartDate(formattedDate);
  };
  const handleEndDateSelect = (selectedDate: Date) => {
    const formattedDate = formatDate(selectedDate);
    setEndDate(formattedDate);
  };
  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0 based, so +1 and pad with leading 0
    const dd = date.getDate().toString().padStart(2, '0'); // Pad with leading 0
    return `${yyyy}-${mm}-${dd}`;
  };

  // 별점
  const handleRatingChange = (newRating: number) => {
    setStar(newRating);
  };
  
  const handleChange = (e: any) => {
    const inputValue = e.target.value;
  
    if (inputValue.length > 30) {
        swal('주의', '제목은 30글자 이내로 작성해주세요!', 'warning');
    } else {
        setTitle(inputValue);
    }
  };

  return (
    <S.Container>

      <S.MainLeft>
        <S.LeftBox>
          <S.BookInfo>
            <BookInfoComponent bookTitle={bookTitle} bookAuthor={bookAuthor} bookImageUrl={bookImageUrl} />
          </S.BookInfo>
          
          <S.StarSelect>
            <StarPoint rating={star} onRatingChange={handleRatingChange} />
          </S.StarSelect>
          <S.PhotoUpload>
            <PhotoUploadComponent onUpload={handleImageUpload} />
          </S.PhotoUpload>
        </S.LeftBox>
      </S.MainLeft>

      <S.MainRight>
        <S.RightTop />
        <S.RightBody>
          <S.CalendarBox>
            <S.CalendarUnit>
              <S.CalendarTop>
                <S.CalenderIcon src={CalendarIcon} />
                <S.CalendarText>독서 시작 날짜</S.CalendarText>
              </S.CalendarTop>
              <CalendarComponent placeholderText={startText} onDateSelect={handleStartDateSelect} />

            </S.CalendarUnit>

            <S.CalendarUnit>
              <S.CalendarTop>
                <S.CalenderIcon src={CalendarIcon} />
                <S.CalendarText>독서 완료 날짜</S.CalendarText>
              </S.CalendarTop>
              <CalendarComponent placeholderText={endText} onDateSelect={handleEndDateSelect} />
            </S.CalendarUnit>

          </S.CalendarBox>

          <S.BodyBox>
            <S.RightTitle>
              <input
                type='text'
                placeholder='제목을 30자 이내로 입력해주세요.'
                value={title}
                onChange={handleChange}
                maxLength={30}
              />
            </S.RightTitle>
            <S.UnderLine />
            <S.RightContent>
              <textarea placeholder='작품을 읽으면서 느꼈던 감정은 어떤 것이었나요? 다른 사람과 이 작품에 대한 느낀점을 공유해보아요 :)'
                value={content}
                onChange={(e) => setContent(e.target.value)} />
            </S.RightContent>
          </S.BodyBox>
        </S.RightBody>

        <S.Bottom>
          <S.Button onClick={handleClick}>
            {isLoading ?
              <SpinnerCircular size={40} color="#ffffff" speed={100} />
              : '등록'}
          </S.Button>
        </S.Bottom>

      </S.MainRight>
    </S.Container>
  );
}

export default CreateRecordPage;
