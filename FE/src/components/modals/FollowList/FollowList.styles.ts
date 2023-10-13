import { motion } from "framer-motion";
import styled from "styled-components";

export const LayOut = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};
`;

export const ModalInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-bottom: 10px;
`;
export const ModalInfoBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
export const ModalProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 0 10px;
  object-fit: cover;
`;
export const UserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ModalText = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

export const ModalFollowButton = styled.button<{ $isFollowed: boolean | null }>`
  font-size: 13px;
  color: ${(props) => props.theme.bgColor};
  border: 2px solid ${(props) => (props.$isFollowed ? "gray" : props.theme.mainColor)};
  background-color: ${(props) => (props.$isFollowed ? "gray" : props.theme.mainColor)};
  height: 25px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.mainColor};
    border: 2px solid ${(props) => props.theme.mainColor};
    background-color: white;
  }
`;


export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.723);
  z-index: 5;
`;
export const ModalBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 100px;
  right: 0;
  top: 300px;
  margin: 0 auto;
  z-index: 10;
  width: 20rem;
  height: 23rem;
  overflow: auto;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: white;
  border-radius: 1rem;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    width: 0.5em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
export const ModalHr = styled.div`
  margin: 0 0 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
`;
export const ModalTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  margin: 15px 0;
`;