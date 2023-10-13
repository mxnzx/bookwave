import { useState } from 'react';
import * as S from './CommentComponent.styles';
// import TempImage from '@/assets/Images/TempImage.jpg';
import CommentUnit from './CommentUnit';
import { deleteComment, postComment, putLike } from '../../../apis';
import { useRecoilValue } from 'recoil';
import { profileImageState } from "../../../recoil/member";
import profile from '../../../assets/icons/profile.png';


interface CommentProps {
  recordLikeCnt: number;
  recordCommentCnt: number;
  isLike: boolean;
  commentList: CommentType[];
  recordId: number;
  userSeq: number;
  setRefreshKey?: () => void;
}
type CommentType = {
  commentId: number;
  memberId: number;
  profileImageUrl: string | null;
  nickname: string;
  registDate: string;
  content: string;
};
function CommentComponent({ setRefreshKey, recordLikeCnt, recordCommentCnt, isLike, commentList, recordId, userSeq }: CommentProps) {
  const [isLiked, setIsLiked] = useState(isLike); // 좋아요 상태를 관리하는 상태 변수
  const [content, setContent] = useState('');
  const [isDeleting, setIsDeleting] = useState(false); // 삭제 중인지 여부를 나타내는 상태 변수
  const image = useRecoilValue(profileImageState);
  // 좋아요 버튼 클릭 시 실행되는 함수
  const handleLikeClick = async () => {
    try {
      // 서버에 좋아요 토글 요청 보내기
      await putLike(recordId);
      // 상태를 토글
      setIsLiked(!isLiked);
      if (setRefreshKey) {
        setRefreshKey();
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  // 댓글 삭제 함수
  const handleCommentDelete = async (commentId: number) => {
    if (!commentId) {
      return; // commentId가 없는 경우 무시
    }
    try {
      setIsDeleting(true); // 삭제 중 상태로 설정하고 버튼 비활성화
      await deleteComment(commentId);
      setIsDeleting(false);
      if (setRefreshKey) {
        setRefreshKey();
      }
    } catch (error) {
      // console.error("댓글 삭제 중 오류 발생:", error);
      setIsDeleting(false); // 삭제가 실패한 경우에도 버튼 활성화
    }
  };

  // 댓글 등록 함수
  const handleCommentSubmit = async () => {
    try {
      await postComment(recordId, content);
      setContent(''); // 댓글창 초기화
      if (setRefreshKey) {
        setRefreshKey();
      }
    } catch (error) {
      console.error('댓글 등록하려는데 어? :', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { // shift 키를 누르지 않고 엔터를 눌렀을 때만 처리
      e.preventDefault(); // 브라우저의 기본 행동을 막습니다 (예: form submit)
      handleCommentSubmit(); // 댓글 등록 함수 호출
    }
  };

  return (
    <S.Container>
      {/* Top 열 */}
      <S.Top>
        <S.TopLeft>
          <S.LikeIcon isLiked={isLiked} onClick={handleLikeClick} />
          <S.LikeText onClick={handleLikeClick}>
            좋아요 {recordLikeCnt}
          </S.LikeText>
        </S.TopLeft>
        <S.TopRight>
          <S.CommentIcon />
          <S.CommentBox>댓글 {recordCommentCnt}</S.CommentBox>
        </S.TopRight>
      </S.Top>


      {/* Input 열 */}
      <S.Input>
        <S.ProfileImage src={image} alt="임시 이미지" />
        <S.CommentInput
          placeholder="댓글을 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <S.SubmitButton onClick={handleCommentSubmit}>등록</S.SubmitButton>
      </S.Input>

      {/* 댓글 컴포넌트 */}
      {commentList.reverse().map(comment => (
        <S.Comment key={comment.commentId}>
          <CommentUnit
            setRefreshKey={setRefreshKey}
            userSeq={userSeq}
            commentId={comment.commentId}
            profileImageUrl={comment.profileImageUrl || profile}
            memberId={comment.memberId}
            nickname={comment.nickname}
            registDate={comment.registDate}
            content={comment.content}
            onDelete={() => handleCommentDelete(comment.commentId)}
            isDeleting={isDeleting}
          />
        </S.Comment>
      ))}

    </S.Container>
  );
}

export default CommentComponent;
