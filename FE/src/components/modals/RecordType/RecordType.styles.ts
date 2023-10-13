import { motion } from "framer-motion";
import styled from "styled-components";

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
  left: 0;
  right: 0;
  top: 300px;
  margin: 0 auto;
  z-index: 10;
  width: 46rem;
  height: 28rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: white;
  border-radius: 1rem;
  padding: 30px;
  @media (max-width: 1000px) {
    left: 0px;
    width: 400px;
    height: 500px;
  }
  @media (max-width: 450px) {
    width: 350px;
  }
`;

export const Header = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  @media (max-width: 1000px) {
    margin-top: 0px;
  }
`;

export const HeaderText = styled.div`
  color: ${props => props.theme.pointColor};
  font-weight: bold;
  font-size: 22px;
`;

export const UnderLine = styled.div`
  border-bottom: 3px solid ${props => props.theme.mainColor}; /* 밑줄 스타일과 색상 설정 */
  margin: 10px 0;
  width: 250px;
`;

export const BackButton = styled.button`
  border: 2px solid ${props => props.theme.pointColor};
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 15px;
  height: 10px;
  font-size: 13px;
  font-weight: 500;
  margin-top: 10px;
  margin-left: 20px;
  background-color: white;
  color: ${props => props.theme.pointColor};
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #064469;
    border: 2px solid ${props => props.theme.mainColor};
  }
  @media (max-width: 450px) {
    margin-left: 0;
  }
`;

export const BackButtonBox = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`;

export const Box = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 40px;
  width: 100%;
  @media (max-width: 1000px) {
    flex-direction: column;
    width: 300px;
    margin-top: 10px;
  }
`;

export const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Button = styled.div`
  border-radius: 10px;
  border: none;
  width: 300px;
  height: 200px;
  margin: 20px 0;
  padding: 20px;
  transition: transform 0.5s;
  background-color: ${props => props.theme.pointColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  &:hover {
    transform: translateY(-3px);
    background-color: ${props => props.theme.mainColor};
  }
  @media (max-width: 1000px) {
    width: 300px;
    height: 130px;
    margin: 10px 0;
  }
`;

export const Title = styled.span`
  display: block;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  ${Button}:hover & {
    color: white;
  }
`;

export const Hr = styled.div`
  border-bottom: 1px solid white;
  margin: 20px 0;
  width: 100%;
`;
export const Subtitle = styled.span`
  display: block;
  text-align: center;
  font-weight: 500;
  font-size: 15px;
  color: white;
  line-height: 1.5;
  ${Button}:hover & {
    color: white;
  }
`;
