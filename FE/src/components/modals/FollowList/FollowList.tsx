import React, { useEffect, useState } from "react";
import * as S from "./FollowList.styles";
import defaultImg from "../../../assets/icons/profile.png";
import {
  fetchFollower,
  fetchFollowing,
} from "../../../apis";
import { useScroll } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { followerModalState, followingModalState } from "../../../recoil";
import { useNavigate } from "react-router-dom";



type UserData = {
  memberId: number;
  email: string;
  nickname: string;
  profileImgPath: string | null;
};

type FollowerData = {
  followers: UserData[];
  totalFollowers: number;
  totalPages: number;
};

type FollowingData = {
  followings: UserData[];
  totalFollowings: number;
  totalPages: number;
};

const FollowList: React.FC<{type: "follower" | "following", id: number}> = ({type, id}) => {
  const setFollowerModal = useSetRecoilState(followerModalState);
  const setFollowingModal = useSetRecoilState(followingModalState);
  const [data, setData] = useState<FollowerData | FollowingData | null>(null);
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedData;
        if (type === "follower") {
          fetchedData = await fetchFollower(id);
        } else {
          fetchedData = await fetchFollowing(id);
        }
        setData(fetchedData);
      } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
      }
    };

    fetchData();
  }, [type, id]);

  const userList = 
  data && type === "follower" && "followers" in data ? data.followers : 
  data && type === "following" && "followings" in data ? data.followings : 
  [];

  const onOverlayClick = () => {
    setFollowerModal(false);
    setFollowingModal(false);
  };
  return (
    <S.Overlay
      onClick={onOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <S.ModalBox
        style={{ top: scrollY.get() + 300 }}
        initial={{ opacity: 0, y: "50%" }}
        animate={{ opacity: 1, y: "0%" }}
        exit={{ opacity: 0, y: "50%" }}
        transition={{ duration: 0.3 }}
      >
        <S.ModalTitle>{type === "follower" ? "팔로워" : "팔로잉"}</S.ModalTitle>
        <S.ModalHr />
        {userList?.map((item: UserData) => (
          <S.ModalInfoWrap>
            <S.ModalInfoBox onClick={() => navigate(`/memorize/${item.memberId}`)}>
              <S.ModalProfileImg src={item.profileImgPath || defaultImg} />
              <S.ModalText>{item.nickname}</S.ModalText>
            </S.ModalInfoBox>
          </S.ModalInfoWrap>
        ))}
      </S.ModalBox>
    </S.Overlay>
  );
};
export default FollowList;
