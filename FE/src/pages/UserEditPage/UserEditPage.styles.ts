import styled from "styled-components";
import { motion } from "framer-motion";

export const LayOut = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 26rem;
  height: 30rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: #f3f3f3;
  border-radius: 1rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  height: 100%;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: start;
  width: 73%;
  margin-top: 30px;
`;

export const Title = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

export const Text = styled.span`
  font-size: 12px;
  color: #9c9c9c;
  font-weight: 500;
`;

export const GenreName = styled(motion.span)`
  font-size: 15px;
  font-weight: 600;
`;
export const SubmitBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  margin-top: 40px;
`;
export const SubmitButton = styled(motion.button)`
  font-size: 14px;
  font-weight: 500;
  padding: 0 15px;
  height: 30px;
  border: none;
  border-radius: 7px;
  border: 2px solid ${(props) => props.theme.pointColor};
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.pointColor};
  transition: all 0.3s;

  &:hover {
    color: ${(props) => props.theme.pointColor};
    background-color: white;
  }
`;
export const CancleButton = styled(motion.button)`
  font-size: 14px;
  font-weight: 500;
  padding: 3px 15px;
  border: none;
  border-radius: 7px;
  border: 2px solid #c8c8c8;
  color: white;
  background-color: #c8c8c8;
  transition: all 0.3s;

  &:hover {
    border-color: ${(props) => props.theme.pointColor};
    color: ${(props) => props.theme.pointColor};
    background-color: white;
  }
`;
export const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: -50px;
  position: absolute;
  top: 0;
`;
export const ProfileChangeBtn = styled.button`
  font-size: 14px;
  border: 2px solid ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.bgColor};
  padding: 3px 15px;
  border-radius: 10px;
  margin-top: 30px;
  &:hover {
    color: ${(props) => props.theme.mainColor};
    border-color: ${(props) => props.theme.mainColor};
    background-color: white;
  }
`;

export const CheckButton = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.mainColor};
  font-weight: 700;
`;

export const NickNameBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  width: 75%;
  border: 1px solid rgb(191, 189, 189);
  border-radius: 5.5px;
  margin-top: 5px;
  font-size: 12px;
  outline: none;
  margin-top: 5px;
  padding: 7px;
  background-color: white;
`;
export const NickNameInput = styled.input`
  border: 0;
  width: 70%;
  font-size: 12px;
  &:focus {
    outline: none;
    border: none;
  }
`;

export const InputBox = styled.input`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  width: 75%;
  border: 1px solid rgb(191, 189, 189);
  border-radius: 5.5px;
  margin-top: 5px;
  font-size: 12px;
  outline: none;
  padding: 7px;
  background-color: white;
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


export const SignOut = styled.div`
  display: flex;
  justify-content: end;
  width: 73%;
  margin-top: 33px;
`;
export const SignOutText = styled.span`
  font-size: 12px;
  color: #9c9c9c;
  font-weight: 500;
  cursor: pointer;
`;
