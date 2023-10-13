import styled from "styled-components";
import LikeImage from "@/assets/icons/Like.png";
import LikeFullImage from "@/assets/icons/LikeFull.png";
import CommentIcon from "@/assets/icons/Comment.png";

export const Container = styled.div`
  /* border: 1px solid #000; */
  border-radius: 5px;
  background-color: white;
  background-repeat: no-repeat;
  background-position: center; 
  background-size: cover; 
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;
export const Header = styled.div`
  border-radius: 20px;
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const HeaderLeft = styled.div`
  margin-left: 20px;
  display: flex; 
  align-items: center; 
`;
export const HeaderRight = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center; 
`;
export const Image = styled.img`
  border-radius: 50%;
  width: 35px;
  height: 35px;
`;
export const NickName = styled.div`
  margin-left: 10px;
  font-size: 16px;
  height: 30px;
  max-width: 150px;
  display: flex;
  align-items: center;
  font-weight: 500;
  @media (max-width: 600px) {
    font-size: 15px;
  }
`;
export const Time = styled.div`
  margin-left: 10px;
  text-align: left;
  font-size: 12px;
  color: #8c8c8c;
`;
export const Text = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #064469;
`;
export const State = styled.div`
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  color: ${props => props.theme.pointColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Body = styled.div`
  background-color: #d6e7ee;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Box = styled.div`
  border-radius: 7px;
  width: 500px;
  height: 250px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    width: 90vw;
  }
`;
export const BoxLeft = styled.div`
  width: 180px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    width: 40vw;
  }
`;
export const BookInfo = styled.div`
  /* border: 1px solid #000; */
  border-radius: 5px;
  width: 150px;
  height: 220px;
  background-color: rgba(217, 217, 217, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  @media (max-width: 700px) {
    width: 25vw;
  }
`;
export const BoxRight = styled.div`
  width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  @media (max-width: 700px) {
    width: 60vw;
  }
`;
export const TitleBox = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`;
export const Title = styled.h2`
  font-size: 13px;
  margin-top: 2px;
  margin-bottom: 3px;
  font-weight: bold;
  color: #064469;
`;
export const Author = styled.h2`
  font-size: 5px;
  margin-bottom: 5px;
`;
export const BookImage = styled.img`
  width: 80px;
  max-width: 120px;
  border-radius: 3px;
  margin-bottom: 10px;
  cursor: pointer;
`;
export const BottomText = styled.div`
`;
export const Period = styled.p`
  font-size: 10px;
  margin-bottom: 5px;
`;
export const Star = styled.div`
  font-size: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const StarIcon = styled.img`
  width: 13px;
  height: 13px;
`;
export const BoldText = styled.span`
  font-weight: bold;
  font-size: 12px;
`;
export const ReportTitle = styled.div`
  padding: 20px 0;
  font-size: 15px;
  font-weight: 600;
  margin-left: 5px;
`;
export const ReportContent = styled.div`
  border-left: 5px solid #000;
  padding: 20px;
  background-color: #f9f6ed;
  width: 300px;
  height: 130px;
  margin-bottom: 10px;
  font-size: 12px;
  line-height: 1.4;
  @media (max-width: 700px) {
    width: 55vw;
    height: 50vh;
  }
`;
export const Bottom = styled.div`
  border-radius: 20px;
  height: 50px;
  display: flex;
  background-color: white;
  justify-content: flex-start;
  align-items: center;
`;

export const LikeIcon = styled.div<{ isliked: boolean }>`
  background-image: url(${props => props.isliked ? LikeFullImage : LikeImage});
  background-size: 100% 100%;
  width: 20px;
  height: 20px;
  margin-left: 20px;
`;
export const LikeButton = styled.button`
  background-color: transparent;
  border: none;
  margin-left: 5px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;
export const Comment = styled.div`
  background-image: url(${CommentIcon});
  background-size: 100% 100%;
  width: 20px;
  height: 20px;
  margin-left: 20px;
`;
export const Count = styled.span`
  margin-left: 10px;
  font-size: 13px;
  font-weight: 500;
  color: black;
`;
