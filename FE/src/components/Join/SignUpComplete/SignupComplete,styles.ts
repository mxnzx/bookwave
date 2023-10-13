import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 33rem;
  height: 23rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: white;
  border-radius: 1rem;
  @media (max-width: 565px){
      width: 26rem;
      height: 23rem;
    }

    @media (max-width: 450px) {
        width: 100vw;
        height: 100vh;
    }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  @media (max-width: 450px) {
        margin-top: 12vh;
    }
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 30px 0;
`;

export const Hr = styled.div`
  margin: 15px 0 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
`;
export const Title = styled.span`
  font-size: 25px;
  font-weight: 600;
  color: #064469;
`;
export const Text = styled.span`
  font-size: 18px;
  color: #373737;
  font-weight: 500;
  margin-bottom: 10px;
  & span {
    font-weight: 500;
    font-size: 18px;
    color: ${(props) => props.theme.pointColor};
  }
  @media (max-width: 450px) {
    margin-bottom: 30px;
    }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 5%;
  @media (max-width: 450px) {
    flex-direction: column;
    align-items: center;
    margin-top: 22vh;
    }
`;
export const BBTIButton = styled(motion.button)`
  width: 30%;
  height: 40px;
  font-weight: 600;
  font-size: 15px;
  border: none;
  border-radius: 20px;
  border: 2px solid #195A3A;
  @media (max-width: 565px){
      width: 40%;
    }

    @media (max-width: 450px) {
      width: 90%;
      border-radius: 7px;
    }
`;
export const MainButton = styled(motion.button)`
  width: 30%;
  height: 40px;
  font-size: 15px;
  font-weight: 600;
  border: 2px solid #D6E7EE;
  border-radius: 20px;
    @media (max-width: 565px){
      width: 40%;
    }

    @media (max-width: 450px) {
      width: 90%;
      border-radius: 7px;
      margin-top: 10px;
    }
`;

export const Circle = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-top: 8%;
`;