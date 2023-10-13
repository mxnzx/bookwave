import { useNavigate } from "react-router-dom";
import * as S from "./HeaderComponent.styles";
import { Link } from "react-router-dom";

interface Props {
    nickname: string;
    isFollow: boolean;
    recordWriterImageUrl: string;
    recordWriterMemberId: number;
    recordId: number;
    userSeq: number;
}

function HeaderComponent({ nickname, isFollow, recordWriterImageUrl, recordWriterMemberId, recordId, userSeq }: Props) {
    const navigate = useNavigate();
    const handleEditClick = () => {
        navigate(`/recordedit/${recordId}/${userSeq}`);
    }

    return (
        <S.Header>
            <Link to={`/memorize/${recordWriterMemberId}`}>
                <S.Image src={recordWriterImageUrl} />
            </Link>
            <S.NickName>
                {nickname}
            </S.NickName>

            {/* 팔로잉이나 BBTI가 아니면 내 게시글 */}
            {recordWriterMemberId == userSeq ? (
                <S.Edit onClick={handleEditClick}>
                    수정
                </S.Edit>
            ) : isFollow ? (
                <S.FollowText>
                    팔로잉
                </S.FollowText>
            ) : (
                <S.BBTIText>
                    나와같은 BBTI
                </S.BBTIText>
            )}
        </S.Header>
    );
}

export default HeaderComponent;