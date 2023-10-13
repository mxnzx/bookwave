import styled from "styled-components";
import { motion } from "framer-motion";
import leftImg from "../../../assets/images/md.jpg";
import rightImg from "../../../assets/images/communitymd.jpg";

export const LayOut = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 86vh;
  align-items: center;
  background: linear-gradient(to bottom, white, #F6FAFD);
`;
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;
export const LeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 49%;
`;
export const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 49%;
  margin-top: 30px;
`;
export const TextBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 60px 0 30px 0;
`;
export const Title = styled(motion.span)`
  font-size: 1.7rem;
  font-weight: 700;
  color: black;
  margin-bottom: 0.4rem;
`;
export const Text = styled(motion.span)`
  font-size: 1.1rem;
  font-weight: 500;
  color: black;
  margin-bottom: 0.2rem;
  line-height: 1.3;
`;
export const BoxWrap = styled.div`
  width: 100%;
  height: 40vh;
  overflow: hidden;
`;
export const LeftImgBox = styled(motion.div)`
  width: 100%;
  height: 40vh;
  background-image: url(${leftImg});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
export const RightImgBox = styled(motion.div)`
  width: 100%;
  height: 40vh;
  background-image: url(${rightImg});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: transform 0.3s ease-in-out;
`;
export const Mask = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: white;
  width: 100%;
  z-index: 1;
`;