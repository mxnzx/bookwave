import * as S from './Recode.styles';
import { useState, useEffect } from 'react';
import RecordDetailModal from '../../components/modals/RecordDetailModal/RecordDetail';
import { fetchRecodeDetail, putLike } from '../../apis';
import profile from '../../assets/icons/profile.png';
import star from "../../assets/icons/star.png";
import { Link } from 'react-router-dom';
import TextMaxLength from '../Common/TextMaxLength';

function getFormattedDateDiff(createdDate: string): string {
  const now = new Date();
  const formattedDate = createdDate.replace(' ', 'T') + 'Z';
  const createdAt = new Date(formattedDate);


  const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  if (diffInSeconds < 60) return '방금 전';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;

  const diffInDays = Math.floor(diffInSeconds / 86400);
  if (diffInDays < 7) return `${diffInDays}일 전`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks}주 전`;
}

type PropsType = {
  recordId: number;
}

// 피드's 데이터
function Recode({ recordId }: PropsType) {
  const [isRecordDetailModalOpen, setIsRecordDetailModalOpen] = useState(false); // 피드 추가 모달 상태
  const openRecordDetailModal = () => { setIsRecordDetailModalOpen(true); };
  const closeRecordDetailModal = () => { setIsRecordDetailModalOpen(false); };

  const [recordWriterMemberId, setRecordWriterMemberId] = useState<number>();
  const [recordWriterImageUrl, setRecordWriterImageUrl] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [bookTitle, setBookTitle] = useState<string>('');
  const [bookAuthor, setBookAuthor] = useState<string>('');
  const [recordImageUrl, setRecordImageUrl] = useState<string>('');
  const [recordTitle, setRecordTitle] = useState<string>('');
  const [period, setPeriod] = useState<number>();
  const [score, setScore] = useState<number>(0);
  const [recordContent, setRecordContent] = useState<string>('');
  const [recordLikeCnt, setRecordLikeCnt] = useState<number>();
  const [recordCommentCnt, setRecordCommentCnt] = useState<number>();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [createdDate, setCreatedDate] = useState<string>('');
  const userSeq = Number(localStorage.getItem("memberId"));

  useEffect(() => {
    const RecodeInfo = async () => {
      if (!recordId || !userSeq) { // recordId나 userSeq가 없으면 함수를 종료
        return;
      }

      try {
        const Info = await fetchRecodeDetail(recordId);
        setRecordWriterMemberId(Info.recordWriterMemberId);
        setRecordWriterImageUrl(Info.recordWriterImageUrl || profile);
        setNickname(Info.nickname);
        setBookTitle(Info.bookTitle);
        setBookAuthor(Info.bookAuthor);
        setRecordImageUrl(Info.recordImageUrl);
        setRecordTitle(Info.recordTitle);
        setPeriod(Info.period);
        setScore(Info.score);
        setRecordContent(Info.recordContent);
        setRecordLikeCnt(Info.recordLikeCnt);
        setRecordCommentCnt(Info.recordCommentCnt);
        setIsLike(Info.isLike);
        setIsFollow(Info.isFollow);
        setCreatedDate(Info.formattedCreatedDate);
      } catch (error) {
        console.error("독후감(모달) 정보 부르는데 어?");
      }
    };
    RecodeInfo();
  }, [recordId, userSeq, isLike, recordLikeCnt, recordCommentCnt, isRecordDetailModalOpen]);

  // 좋아요 버튼 클릭 시 실행되는 함수
  const handleLikeClick = async () => {
    try {
      await putLike(recordId);
      setIsLike(!isLike);
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  // 게시글이 언제 적혔는지
  const dateDiff = getFormattedDateDiff(createdDate);

  return (
    <S.Container>
      <S.Header>
        <S.HeaderLeft>
          <Link to={`/memorize/${recordWriterMemberId}`}>
            <S.Image src={recordWriterImageUrl} />
          </Link>
          <S.NickName>
            {nickname}
          </S.NickName>
          <S.Time>
            {dateDiff}
          </S.Time>
        </S.HeaderLeft>
        <S.HeaderRight>
          <S.Text>
            {/* 팔로잉이나 BBTI가 아니면 내 게시글 */}
            {recordWriterMemberId == userSeq ? (
              <S.State>
                내 게시글
              </S.State>
            ) : isFollow ? (
              <S.State>
                팔로잉
              </S.State>
            ) : (
              <S.State>
                나와같은 BBTI
              </S.State>
            )}
          </S.Text>
        </S.HeaderRight>
      </S.Header>

      <S.Body onClick={openRecordDetailModal}>
        <S.Box>
          <S.BoxLeft>
            <S.BookInfo>
              <S.Title>
                <TextMaxLength text={bookTitle} maxLength={10} />
              </S.Title>
              <S.Author>
                <TextMaxLength text={bookAuthor} maxLength={10} />
              </S.Author>
              <S.BookImage src={recordImageUrl} />
              <S.BottomText>
                <S.Period>
                  <S.BoldText>독서기간 </S.BoldText>
                  {period !== undefined ? (period <= 0 ? "하루 미만" : `${period}일`) : "정보 없음"}
                </S.Period>
                <S.Star>
                  <S.BoldText>별점 </S.BoldText>
                  <S.StarIcon src={star} />
                  {(score).toFixed(1)}
                </S.Star>
              </S.BottomText>
            </S.BookInfo>
          </S.BoxLeft>
          <S.BoxRight>
            <S.TitleBox>
              <S.ReportTitle>
                <TextMaxLength text={recordTitle} maxLength={25} />
              </S.ReportTitle>
            </S.TitleBox>
            <S.ReportContent>
              <TextMaxLength text={recordContent} maxLength={140} />
            </S.ReportContent>
          </S.BoxRight>
        </S.Box>
      </S.Body>

      <S.Bottom>
        <S.LikeIcon isliked={isLike} onClick={handleLikeClick} />
        <S.LikeButton onClick={handleLikeClick}>
          좋아요 {recordLikeCnt}
        </S.LikeButton>
        <S.Comment />
        <S.Count>
          댓글 {recordCommentCnt}
        </S.Count>
      </S.Bottom>

      {/* 모달컴포넌트 */}
      <RecordDetailModal isOpen={isRecordDetailModalOpen} onClose={closeRecordDetailModal} recordId={recordId} />

    </S.Container>
  );
}

export default Recode;