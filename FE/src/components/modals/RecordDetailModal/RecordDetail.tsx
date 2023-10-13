import * as S from './RecordDetail.styles';
import HeaderComponent from './HeaderComponent'; // Header 컴포넌트 import 추가
import BookComponent from './BookComponent';
import BodyComponent from './BodyComponent';
import CommentComponent from './CommentComponent';
import { fetchRecodeDetail } from '../../../apis';
import { useEffect, useState } from 'react';
import profile from '../../../assets/icons/profile.png';

interface RecordDetailProps {
  isOpen: boolean;
  onClose: () => void;
  recordId: number;
}
type CommentType = {
  memberId: number;
  commentId: number;
  profileImageUrl: string | null;
  nickname: string;
  registDate: string;
  content: string;
};

// 피드 게시글 디테일
function RecordDetail({ isOpen, onClose, recordId }: RecordDetailProps) {
  const [recordWriterMemberId, setRecordWriterMemberId] = useState<number>(0);
  const [recordWriterImageUrl, setRecordWriterImageUrl] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [bookTitle, setBookTitle] = useState<string>('');
  const [bookId, setBookId] = useState<number>(0);
  const [bookAuthor, setBookAuthor] = useState<string>('');
  // const [bookImageUrl, setBookImageUrl] = useState<string>('');
  const [recordImageUrl, setRecordImageUrl] = useState<string>('');
  const [recordTitle, setRecordTitle] = useState<string>('');
  const [period, setPeriod] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [recordContent, setRecordContent] = useState<string>('');
  const [recordLikeCnt, setRecordLikeCnt] = useState<number>(0);
  const [recordCommentCnt, setRecordCommentCnt] = useState<number>(0);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const [refreshKey, setRefreshKey] = useState(false);
  const [delayRender, setDelayRender] = useState(false);
  const userSeq = localStorage.getItem("memberId");
  // 비동기 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayRender(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const RecodeInfo = async () => {
      try {
        if (recordId) {
          const Info = await fetchRecodeDetail(recordId);
          setRecordWriterMemberId(Info.recordWriterMemberId);
          setRecordWriterImageUrl(Info.recordWriterImageUrl || profile);
          setNickname(Info.nickname);
          setBookId(Info.bookId);
          setBookTitle(Info.bookTitle);
          setBookAuthor(Info.bookAuthor);
          // setBookImageUrl(Info.bookImageUrl);
          setRecordImageUrl(Info.recordImageUrl);
          setRecordTitle(Info.recordTitle);
          setPeriod(Info.period);
          setScore(Info.score);
          setRecordContent(Info.recordContent);
          setRecordLikeCnt(Info.recordLikeCnt);
          setRecordCommentCnt(Info.recordCommentCnt);
          setCommentList(Info.commentList);
          setIsLike(Info.isLike);
          setIsFollow(Info.isFollow);
          setCommentList(Info.commentList);

        }
      } catch (error) {
        console.error("독후감(모달) 정보 부르는데 어?");
      }
    };
    RecodeInfo();
  }, [refreshKey, delayRender, isOpen, onClose]);

  if (!isOpen) {
    return null; // 모달이 닫혔을 때는 아무것도 렌더링하지 않아요오~.
  }
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Container onClick={handleClick}>
        <S.Header>
          <HeaderComponent nickname={nickname} isFollow={isFollow} recordWriterImageUrl={recordWriterImageUrl} recordWriterMemberId={recordWriterMemberId} recordId={recordId} userSeq={userSeq} />
        </S.Header>
        <S.Book>
          <BookComponent bookId={bookId} bookTitle={bookTitle} bookAuthor={bookAuthor} recordImageUrl={recordImageUrl} />
        </S.Book>
        <S.Body>
          <BodyComponent recordTitle={recordTitle} period={period} score={score} recordContent={recordContent} />
        </S.Body>
        <S.Comment>
          <CommentComponent recordLikeCnt={recordLikeCnt} recordCommentCnt={recordCommentCnt} isLike={isLike} commentList={commentList} recordId={recordId} userSeq={userSeq} setRefreshKey={() => setRefreshKey((prev) => !prev)} />
        </S.Comment>
      </S.Container>
    </S.Overlay>
  );
}

export default RecordDetail;
