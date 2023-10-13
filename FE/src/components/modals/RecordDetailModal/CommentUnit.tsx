import { useState } from 'react';
import { deleteComment } from '../../../apis';
import * as S from './CommentUnit.styles';
import { Link } from 'react-router-dom';

type UnitProps = {
  userSeq: number;
  memberId: number;
  commentId: number;
  profileImageUrl: string | null;
  nickname: string;
  registDate: string;
  content: string;
  setRefreshKey?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean
};

function CommentUnit({ setRefreshKey, userSeq, memberId, commentId, profileImageUrl, nickname, registDate, content, onDelete, isDeleting }: UnitProps) {
  const [deleting, setDeleting] = useState(isDeleting); // 삭제 중 상태를 관리하는 상태 변수

  const handleDelete = async () => {
    if (deleting || !commentId) {
      return; // 이미 삭제 중이거나 commentId가 없는 경우 무시
    }

    try {
      setDeleting(true); // 삭제 중 상태로 설정하여 버튼 비활성화

      await deleteComment(commentId);

      setDeleting(false);
      if (setRefreshKey) {
        setRefreshKey();
      }
      if (onDelete) {
        onDelete(); // 댓글이 삭제되면 onDelete 함수 호출
      }
    } catch (error) {
      // console.error("삭제하는데 어?");
      setDeleting(false); // 삭제가 실패한 경우에도 버튼 활성화
    }
  };

  return (
    <S.Container>
      <Link to={`/memorize/${memberId}`}>
        <S.ProfileImage src={profileImageUrl || undefined} />
      </Link>
      <S.CommentBody>
        <S.Box>
          <S.CommentAuthor>{nickname}</S.CommentAuthor>
          <S.CommentDate>{registDate}</S.CommentDate>
          {userSeq == memberId && (
            <S.BoxButton onClick={handleDelete} disabled={deleting}>
              삭제
            </S.BoxButton>
          )}
        </S.Box>
        <S.CommentText>{content}</S.CommentText>
      </S.CommentBody>
    </S.Container>
  );
}

export default CommentUnit;