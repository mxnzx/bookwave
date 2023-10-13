import { useEffect, useState } from 'react';
import * as S from './RecordEditPage.styles';
import BookInfoComponent from '../../components/CreateRecord/BookInfo';
import PhotoUploadComponent from './EditPhotoUpload';
import StarPoint from '../../components/CreateRecord/StarPoint';
import CalendarComponent from '../../components/CreateRecord/Calendar';
import CalendarIcon from '../../assets/icons/calendar.png';
import { useNavigate, useParams } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import swal from "sweetalert";
import { deleteRecode, fetchRecodeUpdate, updateRecode } from '../../apis';
import useCheckAuthentication from '../../utils/Hooks/useCheckAuthentication';

function RecordEditPage() {
  const navigate = useNavigate();
  const { recordId: recordIdString, memberId: memberIdString } = useParams();
  const recordId = Number(recordIdString);
  const memberId = Number(memberIdString);
  const userSeq = localStorage.getItem("memberId"); // null 대신 빈 문자열을 기본값으로 설정

  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [bookImageUrl, setBookImageUrl] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [recordImageUrl, setRecordImageUrl] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [recordTitle, setRecordTitle] = useState("");
  const [recordContent, setRecordContent] = useState("");

  const [uploadFile, setUploadFile] = useState<File | undefined>(undefined);
  useCheckAuthentication();
  // 이미지 업로드
  const handleImageUpload = (imageFile: File | undefined) => {
    setUploadFile(imageFile);
  };

  useEffect(() => {
    const RecodeInfo = async () => {
      try {
        if (Number(userSeq) !== memberId) {
          navigate('/notfound');
        }
        const Info = await fetchRecodeUpdate(recordId);
        setRating(Info.score);
        setBookImageUrl(Info.bookImageUrl);
        setBookTitle(Info.bookTitle);
        setBookAuthor(Info.bookAuthor);
        setRecordImageUrl(Info.recordImageUrl);
        setStartDate(Info.startDate);
        setEndDate(Info.endDate);
        setRecordTitle(Info.recordTitle);
        setRecordContent(Info.recordContent);
      } catch (error) {
        console.error("독후감 수정 페이지 들어왔는데 어? : ");
      }
    };
    RecodeInfo();
  }, []);

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
    setRating(newRating);
  };

  // 삭제 처리 버튼
  const handleDelteClick = async () => {
    try {
      await deleteRecode(recordId);
    } catch (error) {
      console.error("삭제하는데 어?");
    }
    setIsDeleteLoading(true);
    setTimeout(() => {
      navigate('/feed');
    }, 2000);
  };

  const handleChange = (e: any) => {
    const inputValue = e.target.value;
  
    if (inputValue.length > 30) {
        swal('제목 오류', '제목은 30글자 이내로 작성해주세요!', 'warning');
    } else {
        setRecordTitle(inputValue);
    }
  };
  // 수정 처리 버튼
  const handleUpdateClick = async () => {
    const payload = {
      recordId: recordId,
      bookImageUrl: bookImageUrl,
      recordImageUrl: recordImageUrl,
      title: recordTitle,
      content: recordContent,
      startDate: startDate,
      endDate: endDate,
      star: rating
    };

    try {
      await updateRecode(payload, uploadFile);

      setIsUpdateLoading(true);
      setTimeout(() => {
        navigate('/feed');
      }, 2000);

    } catch (error) {
      console.error("게시글 수정하려는데 어?:", error);
    }
  };

  return (
    <S.Container>

      <S.MainLeft>
        <S.LeftBox>
          <S.BookInfo>
            <BookInfoComponent bookTitle={bookTitle} bookAuthor={bookAuthor} bookImageUrl={bookImageUrl} />
          </S.BookInfo>
          <S.PhotoUpload>
            <PhotoUploadComponent onUpload={handleImageUpload} recordImageUrl={recordImageUrl} setRecordImageUrl={setRecordImageUrl} />
          </S.PhotoUpload>
          <S.StarSelect key={rating}>
            <StarPoint rating={rating} onRatingChange={handleRatingChange} />
          </S.StarSelect>
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
              <CalendarComponent placeholderText={startDate} onDateSelect={handleStartDateSelect} />
            </S.CalendarUnit>

            <S.CalendarUnit>
              <S.CalendarTop>
                <S.CalenderIcon src={CalendarIcon} />
                <S.CalendarText>독서 완료 날짜</S.CalendarText>
              </S.CalendarTop>
              <CalendarComponent placeholderText={endDate} onDateSelect={handleEndDateSelect} />
            </S.CalendarUnit>
          </S.CalendarBox>

          <S.BodyBox>
            <S.RightTitle>
              <input
                type='text'
                placeholder={recordTitle}
                value={recordTitle}
                onChange={handleChange}
              />
            </S.RightTitle>
            <S.UnderLine />
            <S.RightContent>
              <textarea placeholder={recordContent}
                value={recordContent}
                onChange={(e) => setRecordContent(e.target.value)} />
            </S.RightContent>
          </S.BodyBox>
        </S.RightBody>

        <S.Bottom>
          <S.DeleteButton onClick={handleDelteClick}>
            {isDeleteLoading ?
              <SpinnerCircular size={40} color="#ff0000" speed={100} />
              : '삭제하기'}
          </S.DeleteButton>
          <S.UpdateButton onClick={handleUpdateClick}>
            {isUpdateLoading ?
              <SpinnerCircular size={40} color="#ffffff" speed={100} />
              : '수정하기'}
          </S.UpdateButton>
        </S.Bottom>
      </S.MainRight>
    </S.Container>
  );
}

export default RecordEditPage;



