import styled from "styled-components";
import { motion } from "framer-motion";
import arrow from "@/assets/icons/right-arrow.png";


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
  width: 40rem;
  height: 30.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: white;
  border-radius: 1rem;
  @media (max-width: 700px){
      font-size: 12px;
      width: 27rem;
      height: 43rem;
    }

    /* 화면 폭이 768px 이하일 때 */
    @media (max-width: 500px) {
        width: 100vw;
        height: 100vh;
        justify-content: center;
    }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin: 40px 0 20px 0;
  color: #686868;
  & span {
    font-weight: 600;
    font-size: 25px;   
    color: ${props => props.theme.mainColor};
  }

`;

export const Text = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: #484747;
  line-height: 1.5;
  & span {
    font-weight: 600;
    font-size: 17px; 
    color: ${props => props.theme.pointColor};
  }
`;
export const PointTitle = styled.span`
  font-weight: 600; 
  color: ${props => props.theme.mainColor};
`;
export const PointText = styled.span`
  font-weight: 600;
  color: ${props => props.theme.pointColor};
`;
export const Hr = styled.div`
  margin: 30px 0 30px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
`;
export const BookWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;

  @media (max-width: 700px){
      flex-direction: column;
    }

    /* 화면 폭이 768px 이하일 때 */
    @media (max-width: 360px) {
        
    }
`;
export const BBTIButton = styled(motion.button)`
  width: 100%;
  height: 40px;
  font-weight: 600;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  color: ${props => props.theme.bgColor};
  background-color: ${props => props.theme.mainColor};
  margin-top: 1rem;
`;
export const BookBox = styled.div`
  width: 150px;
  height: 190px;
`;
export const BookImg = styled.img`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;
export const BookTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
`;

export const BookTitle = styled.span`
  font-size: 17px;
  font-weight: 600;
`;
export const Author = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #686868;
  margin-bottom: 10%;
`;
export const BookDetailBtn = styled.div`
  width: 25px;
  height: 25px;
  background-image: url(${arrow});
  background-size: cover;
  margin-top: 5px;
`;