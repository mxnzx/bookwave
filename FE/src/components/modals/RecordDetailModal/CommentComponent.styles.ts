import styled from "styled-components";
import LikeImage from "@/assets/icons/Like.png";
import LikeFullImage from "@/assets/icons/LikeFull.png";
import CommentIconImage from "@/assets/icons/Comment.png";

// Container
export const Container = styled.div`
  font-family: "Pretendard-Regular";
  /* height: 100%; */
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  @media (max-width: 620px) {
    padding: 0 10px;
    width: 100%;
    justify-content: center;
    align-content: center;
  }
  @media (max-width: 470px) {
    padding: 0 10px;
  }
`;

// Top 열
export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 30px;
  @media (max-width: 470px) {
    margin: 20px 0;
  }
`;

export const TopLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const LikeIcon = styled.div<{ isLiked: boolean }>`
  background-image: url(${props => props.isLiked ? LikeFullImage : LikeImage});
  background-size: 100% 100%;
  width: 24px;
  height: 24px;
`;

export const LikeText = styled.button`
  font-size: 15px;
  /* margin-left: 10px; */
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const TopRight = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const CommentIcon = styled.div`
  background-image: url(${CommentIconImage});
  background-size: 100% 100%;
  width: 24px;
  height: 24px;
  /* margin-right: 10px; */
`;

export const CommentBox = styled.button`
  font-size: 15px;
  background-color: transparent;
  border: none;
`;

// Input 열
export const Input = styled.div`
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 10px;
  @media (max-width: 470px) {
    padding: 10px 0;
  }
`;

export const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 5px 20px;
`;

export const CommentInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
  font-size: 14px;
  height: 38px;
  margin-right: 10px;
  padding-left: 20px;
  @media (max-width: 470px) {
    padding-left: 5px;
  }
`;

export const SubmitButton = styled.button`
  background-color: ${props => props.theme.mainColor};
  color: white;
  border: none;
  height: 38px;
  width: 80px;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
`;

// Main 열
export const Comment = styled.div`
  /* border: 1px solid #ccc; */
  width: 100%;
  padding: 10px;
  display: flex;
`;

// test ---------------------------------

export const CommentBody = styled.div`
  /* border: 1px solid #ccc; */
  display: flex;
  flex-direction: column;
  width: 90%;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BoxTop = styled.div`
  display: flex;
  align-items: center;
`;

export const BoxButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0 5px;
`;

export const CommentAuthor = styled.span`
  font-weight: bold;
  margin-bottom: 4px;
`;

export const CommentText = styled.p`
  margin: 0;
  margin-top: 8px;
  font-size: 14px;
  color: #333;
`;

export const CommentDate = styled.span`
  font-size: 12px;
  color: #999;
  margin-left: 8px;
`;
