import styled from "styled-components";
import { motion } from "framer-motion";

export const LayOut = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  background-color: ${props => props.theme.bgColor};
`;
export const InfoContainer = styled.div`
  display: flex;
  width: 750px;
  height: 15vh;
  margin-top: 80px;
  justify-content: space-between;
  @media (max-width: 1080px) {
    width: 699px;
  }

  /* 화면 폭이 768px 이하일 때 */
  @media (max-width: 740px) {
    width: 489px;
  }
  @media (max-width: 510px) {
    width: 348px;
  }
`;
export const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
`;
export const InfoWrap = styled.div`
  display: flex;
  align-items: end;
`;
export const InfoBox = styled.div`
  display: flex;
  align-items: center;
`;
export const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 10px;
  object-fit: cover;
  @media (max-width: 510px) {
    width: 70px;
    height: 70px;
  }
`;
export const UserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Text = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin: 10px 10px 5px 0;
  cursor: pointer;
`;
export const FollowWrap = styled.div`
  display: flex;
  margin-top: 10px;
`;
export const ButtonBox = styled.div`
  height: 100%;
  display: flex;
  align-items: end;
`;
export const EditButton = styled.button`
  font-size: 16px;
  color: ${props => props.theme.mainColor};
  border: 2px solid ${props => props.theme.subColor};
  background-color: ${props => props.theme.subColor};
  height: 30px;
  padding: 0 15px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.mainColor};
    border: 2px solid ${props => props.theme.mainColor};
    background-color: white;
  }
  @media (max-width: 740px) {
    margin-top: 10px;
  }
  @media (max-width: 510px) {
    font-size: 10px;
  }
`;
export const MemoButton = styled.button`
  font-size: 16px;
  color: ${props => props.theme.bgColor};
  border: 2px solid ${props => props.theme.mainColor};
  background-color: ${props => props.theme.mainColor};
  height: 30px;
  padding: 0 15px;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.mainColor};
    border: 2px solid ${props => props.theme.mainColor};
    background-color: white;
  }
  @media (max-width: 510px) {
    font-size: 10px;
  }
`;
export const FollowButton = styled.button<{ $isFollowed: boolean | null }>`
  font-size: 16px;
  color: ${props => props.theme.bgColor};
  border: 2px solid
    ${props => (props.$isFollowed ? "gray" : props.theme.mainColor)};
  background-color: ${props =>
    props.$isFollowed ? "gray" : props.theme.mainColor};
  height: 30px;
  padding: 0 15px;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.mainColor};
    border: 2px solid ${props => props.theme.mainColor};
    background-color: white;
  }
`;
export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
`;

export const ToggleButton = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 40px;
  background-color: ${props => props.theme.subColor};
  border-radius: 20px;
  padding: 0 10px;
  cursor: pointer;
  position: relative;
`;

export const ToggleItem = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.18),
    0 4px 6px -4px rgb(0 0 0 / 0.18);
  color: ${props => props.theme.pointColor};
  font-weight: bold;
`;
export const Hr = styled.div`
  margin: 5vh 0 4vh 0;
  border-bottom: 1px solid ${props => props.theme.pointColor};
  width: 800px;
  @media (max-width: 1080px) {
    width: 699px;
  }

  /* 화면 폭이 768px 이하일 때 */
  @media (max-width: 740px) {
    width: 489px;
  }
  @media (max-width: 510px) {
    width: 348px;
  }
`;
