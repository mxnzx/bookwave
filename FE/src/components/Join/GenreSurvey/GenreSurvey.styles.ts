import styled from "styled-components";
import { motion } from "framer-motion";


export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 38rem;
  height: 33rem;
  overflow: auto;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: white;
  border-radius: 1rem;

  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    width: 0.5em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
  @media (max-width: 700px) {
    width: 25rem;
    height: 39rem;
    margin: 0 auto;
  }

  @media (max-width: 500px) {
    width: 100vw;
    height: 100vh;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  height: 100%;
  @media (max-width: 700px) {
    width: 90%;
  }

  @media (max-width: 500px) {
    justify-content: center;
  }
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
`;

export const Hr = styled.div`
  margin: 15px 0 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
`;
export const Title = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  & span {
    font-weight: 600;
    font-size: 1.2rem;
    color: ${(props) => props.theme.pointColor};
  }
`;

export const Text = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

export const GenreWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

export const GenreBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  color: #018abe;
  background-color: #ecf2f4;
  border-color: 2px solid #ecf2f4;
  cursor: pointer;

  /* 화면 폭이 768px 이하일 때 */
  @media (max-width: 385px) {
    width: 90px;
    height: 90px;
  }
`;
export const GenreIcon = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
`;
export const GenreIonBox = styled.div`
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 50%;
`;
export const GenreName = styled(motion.span)`
  font-size: 15px;
  font-weight: 600;
`;
export const SubmitBox = styled.div`
  display: flex;
  justify-content: end;
  width: 85%;
  margin-top: 20px;
  @media (max-width: 700px) {
    width: 95%;
  }

  @media (max-width: 500px) {
    justify-content: center;
  }
`;
export const SubmitButton = styled(motion.button)`
  width: 75px;
  height: 35px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  color: #d6e8ee;
  background-color: #064469;
  transition: all 0.3s;

  &:hover {
    color: #064469;
    background-color: #d6e8ee;
  }
  @media (max-width: 500px) {
    width: 21rem;
    height: 40px;
    border-radius: 5px;
  }
`;