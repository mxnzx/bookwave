import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as S from "./Memorize";
import ProfileDiary from "../../components/Profile/ProfileReminder/ProfileDiary";
import ProfileRecord from "../../components/Profile/ProfileRecord/ProfileRecord";
import { PC, Tablet } from "../../utils/MediaQuery/MemorizeMQ";
import {
  fetchMemoMemberInfo,
  postFollow,
  fetchIsFollow,
  deleteFollow,
} from "../../apis";
import { useQuery } from "@tanstack/react-query";
import defaultImg from "../../assets/icons/profile.png";
import { followerModalState, followingModalState } from "../../recoil/member";
import { useRecoilState } from "recoil";
import FollowList from "../../components/modals/FollowList/FollowList";
import { writeModalState } from "../../recoil";
import RecordType from "../../components/modals/RecordType/RecordType";
import BookSelectModal from '../../components/modals/FeedBookSelectModal/FeedBookSelect';
import useCheckAuthentication from "../../utils/Hooks/useCheckAuthentication";

const Memorize = () => {
  const navigate = useNavigate();
  const memberId = Number(localStorage.getItem("memberId"));
  console.log(memberId);
 
 
 const { id: idString } = useParams();
 console.log(idString);
 const id = idString ? parseInt(idString, 10) : null;
  const [isToggled, setIsToggled] = useState(false);
  const [isFollow, setIsFollow] = useState<boolean | null>(null);
  const [followerModal, setFollowerModal] = useRecoilState(followerModalState);
  const [followingModal, setFollowingModal] = useRecoilState(followingModalState);
  const [writeModal, setWriteModal] = useRecoilState(writeModalState);
  const [isBookSelectModalOpen, setIsBookSelectModalOpen] = useState(false);
  const openBookSelectModal = () => { setIsBookSelectModalOpen(true); };
  const closeBookSelectModal = () => { setIsBookSelectModalOpen(false); };
  useCheckAuthentication();
  // 팔로우 여부
  useEffect(() => {
    if (memberId === id) {
      return
    }
    const fetchFollowStatus = async () => {
      try {
        if (id !== null) {
          const data = await fetchIsFollow(id);
          setIsFollow(data.data);
        }
      } catch (error) {
        console.error("Error fetching follow status:", error);
      }
    };
    fetchFollowStatus();
  }, [id]);
  // 기록페이지 유저 정보 조회
  const {
    data: memberInfo,
    isError,
    isLoading,
    refetch,
  } = useQuery(["memoMemberInfo", id], () => fetchMemoMemberInfo(id));
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading book detail</p>;

  const isMyPage = () => {
    return memberId === id;
  };
  // 팔로우 등록 / 취소
  const handleFollow = async () => {
    try {
      if (isFollow) {
        await deleteFollow(id);
      } else {
        await postFollow(id);
      }
      setIsFollow(!isFollow);
      refetch();
    } catch (error) {
      console.error("Error handling follow:", error);
    }
  };
  // 팔로우 모달
  const handleFollowerList = () => {
    setFollowerModal(!followerModal)
  }
  const handleFollowingList = () => {
    setFollowingModal(!followingModal)
  }
  const handleWrite = () => {
    setWriteModal(true)
  }

  return (
    <S.LayOut>
      <S.InfoContainer>
        <S.InfoWrap>
          <S.InfoBox>
            <S.ProfileImg src={memberInfo.profileImgPath || defaultImg} />
            <S.UserInfoWrap>
              <S.InfoBox>
                <S.Text>{memberInfo.nickname}</S.Text>
                <Tablet>
                  <S.ButtonBox>
                    {isMyPage() ? (
                      <>
                        <S.MemoButton
                          onClick={handleWrite}
                        >
                          작성하기
                        </S.MemoButton>

                        <S.EditButton
                          onClick={() => navigate(`/useredit/${memberId}`)}
                        >
                          정보수정
                        </S.EditButton>
                      </>
                    ) : (
                      <>
                        <S.FollowButton $isFollowed={isFollow} onClick={handleFollow}>
                          {isFollow ? "팔로우 취소" : "팔로우"}
                        </S.FollowButton>
                        <S.MemoButton onClick={() => navigate(`/shelf/${id}`)}>
                          책장보기
                        </S.MemoButton>
                      </>
                    )}
                  </S.ButtonBox>
                </Tablet>
              </S.InfoBox>
              <S.FollowWrap>
                <S.Text onClick={handleFollowerList}>팔로워 {memberInfo.followerCnt}</S.Text>
                <S.Text onClick={handleFollowingList}>팔로잉 {memberInfo.followingCnt}</S.Text>
              </S.FollowWrap>
            </S.UserInfoWrap>
          </S.InfoBox>
        </S.InfoWrap>
        {followerModal && id !== null && <FollowList type="follower" id={id} />}
        {followingModal && id !== null && <FollowList type="following" id={id} />}
        {writeModal && id !== null && <RecordType openBookSelectModal={openBookSelectModal} />}

        <PC>
          <S.ButtonBox>
            {isMyPage() ? (
              <>
                <S.MemoButton onClick={handleWrite}>
                  작성하기
                </S.MemoButton>
                <S.EditButton onClick={() => navigate(`/useredit/${memberId}`)}>
                  정보수정
                </S.EditButton>
              </>
            ) : (
              <>
                <S.FollowButton $isFollowed={isFollow} onClick={handleFollow}>
                  {isFollow ? "팔로우 취소" : "팔로우"}
                </S.FollowButton>
                <S.MemoButton onClick={() => navigate(`/shelf/${id}`)}>
                  책장보기
                </S.MemoButton>
              </>
            )}
          </S.ButtonBox>
        </PC>
      </S.InfoContainer>
      <S.FeedContainer>
        <S.Hr />
        {isMyPage() ? (
          <>
            <S.ToggleButton onClick={() => setIsToggled(!isToggled)}>
              <span
                style={{
                  position: "absolute",
                  left: "20px",
                  fontWeight: "400",
                  color: isToggled ? "#848383" : "rgba(0,0,0,0)",
                }}
              >
                독서기록
              </span>
              <span
                style={{
                  position: "absolute",
                  right: "20px",
                  fontWeight: "400",
                  color: isToggled ? "rgba(0,0,0,0)" : "#848383",
                }}
              >
                다이어리
              </span>
              {isToggled ? (
                <S.ToggleItem
                  layoutId="toggleItem"
                  style={{ marginLeft: "auto" }}
                >
                  다이어리
                </S.ToggleItem>
              ) : (
                <S.ToggleItem layoutId="toggleItem">독서기록</S.ToggleItem>
              )}
            </S.ToggleButton>
            {isToggled ? (
              <ProfileDiary />
            ) : (
              <ProfileRecord />
            )}
          </>
        ) : (
          <ProfileRecord />
        )}
      </S.FeedContainer>

      {isBookSelectModalOpen && <BookSelectModal isOpen={isBookSelectModalOpen} onClose={closeBookSelectModal} userSeq={memberId} />}

    </S.LayOut>
  );
};
export default Memorize;
