import styled from "styled-components";
import { motion } from "framer-motion";
import recommedImg from "../../../assets/images/guestrecommendlg.jpg"

export const LayOut = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 65vh;
  background-image: url(${recommedImg});
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${recommedImg}); */
  background-size: cover;
`;

export const TextBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 0 80px 0;
`;
export const Title = styled(motion.span)`
  font-size: 2.5rem;
  font-weight: 700;
  color: black;
  margin-bottom: 0.4rem;
`;
export const Text = styled(motion.span)`
  font-size: 1.3rem;
  font-weight: 500;
  color: black;
  margin-bottom: 0.2rem;
  line-height: 1.3;
`;

export const RecommendWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 90%;
`;

export const RecommendBox = styled(motion.div)`
  width: 170px;
  height: 170px;
  background-color: rgba(6, 68, 105, 0.8);
  padding: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RecommendTitle = styled.div`
  font-size: 20px;
  color: white;
  font-weight: 600;
`;
export const RecommendText = styled.div`
  font-size: 15px;
  color: white;
  font-weight: 500;
  line-height: 1.5;
`;
export const Hr = styled.div`
  margin: 15px 0 15px 0;
  border-bottom: 1px solid white;
  width: 100%;
`;
export const LogInBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const LogInButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 50px;
  color: white;
  font-weight: 600;
  font-size: 25px;
  cursor: pointer;
  background: linear-gradient(90deg, #D6E7EE 50%, #064469 50%);
  background-size: 200% 100%;
  background-position: right;
  transition: background 0.5s;

  &:hover {
    background-position: left;
    color: #064469;
  }
`;