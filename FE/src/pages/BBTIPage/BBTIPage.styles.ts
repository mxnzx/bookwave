import styled from "styled-components";
import { motion } from "framer-motion";


export const LayOut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;
export const Container = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 41rem;
  height: 31rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: white;
  border-radius: 1rem;
  @media (max-width: 700px){
      width: 30rem;
    }

    /* 화면 폭이 768px 이하일 때 */
    @media (max-width: 500px) {
        width: 100vw;
        height: 100vh;
        justify-content: center;
    }
`;
export const Title = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: ${(props) => props.theme.mainColor};
  margin-top: 11%;
`;
export const StepIndicator = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: 30px 0 30px 0;
`;
export const StepDot = styled.div<{ $active: boolean }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 0 5px;
  border: 1px solid ${(props) => props.theme.pointColor};
  background-color: ${(props) =>
    props.$active ? props.theme.pointColor : "white"};
`;
export const Question = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
`;

export const AnswerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;
export const AnswerBox = styled.button`
  width: 100%;
  height: 60px;
  border: 2px solid ${(props) => props.theme.pointColor};
  color: ${(props) => props.theme.pointColor};
  background-color: white;
  font-size: 18px;
  font-weight: 500;
  border-radius: 7px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  margin-bottom: 40px;
  cursor: pointer;
  &:hover {
    color: white;
    border: none;
    background-color: ${(props) => props.theme.mainColor};
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`;
export const PrevButton = styled(motion.button)`
  width: 60px;
  height: 40px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  margin-bottom: 5%;
  cursor: pointer;
`;