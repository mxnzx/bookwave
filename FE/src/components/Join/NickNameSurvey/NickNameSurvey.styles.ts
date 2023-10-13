import {styled} from "styled-components";
import { motion } from "framer-motion";

export const LayOut = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
`;
  
export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 22rem;
  height: 19rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: white;
  border-radius: 1rem;
  @media (max-width: 500px){
      height: 100vh;
      width: 100vw;
    }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  height: 100%;
  @media (max-width: 500px){
      height: 100vh;
      width: 75vw;
      justify-content: center;
    }
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export const Hr = styled.div`
  margin: 15px 0 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
`;
export const Title = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;
export const CheckButton = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.mainColor};
  font-weight: 700;
`;
export const Text = styled.span`
  font-size: 12px;
  color: #9c9c9c;
  font-weight: 500;
`;

export const NickNameBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  width: 100%;
  border: 1px solid rgb(191, 189, 189);
  border-radius: 5.5px;
  margin-top: 5px;
  font-size: 12px;
  outline: none;
  margin: 30px 0px 15px 0px;
  padding: 7px;
`;
export const NickNameInput = styled.input`
  border: 0;
  font-size: 12px;
  &:focus {
    outline: none;
    border: none;
  }
`;
export const SubmitBox = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;

`;
export const SubmitButton = styled(motion.button)`
  width: 50px;
  height: 30px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  margin-top: 2rem;
  background-color: ${props => props.theme.mainColor};
  color: ${props => props.theme.bgColor};
  &:hover {
    background-color: ${props => props.theme.subColor};
  color: ${props => props.theme.mainColor};
  }
`;

export const SuccessText = styled.p`
  color: green;
  font-size: 12px;
  margin: 5px 0;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: 5px 0;
`;