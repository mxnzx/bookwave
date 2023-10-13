import styled from "styled-components";
import { motion } from "framer-motion";

export const LayOut = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 80px 0 50px 0;
`;
export const ImgBox = styled.div`
  width: 85%;
  height: 63vh;
  background-image: url('https://github-production-user-asset-6210df.s3.amazonaws.com/77240765/270154915-47118850-8b24-4935-9982-3b2a780a42ce.jpg');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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

export const ImgTextBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 10%;
`;

export const ImgTitle = styled(motion.span)`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.4rem;
`;
export const ImgText = styled(motion.span)`
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
  margin-bottom: 0.2rem;
  line-height: 1.3;
`;