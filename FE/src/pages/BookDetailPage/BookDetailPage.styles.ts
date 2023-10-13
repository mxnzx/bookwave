import styled from "styled-components";
import { motion } from "framer-motion";

interface BookInfoBoxProps {
  index: number;
}
export const LayOut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
`;
export const BookInfoContainer = styled.div`
  display: flex;
  width: 95%;
  min-height: 45vh;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: white;
  border-radius: 1rem;
  margin: 80px 0 0 0;
  padding: 30px 30px 30px 20px;
  @media (max-width: 800px){
    flex-direction: column;
    padding: 30px;
    align-items: center;
  }
`;

export const LeftBookWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  margin-right: 1%;
  @media (max-width: 500px) {
    width: 18rem;
  }
`;
export const BookTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.mainColor};
  margin-bottom: 10px;
`;
export const NomalText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
`;
export const BookImg = styled.img`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 170px;
  height: 250px;
  object-fit: cover;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  margin: 30px 0 30px 0;
  border-radius: 10px;
`;
export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
export const BookButton = styled(motion.button)`
width: 29%;
height: 30px;
font-size: 13px;
font-weight: 600;
border: 2px solid #064469;
border-radius: 5px;
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
margin-bottom: 5%;
cursor: pointer;
`;
export const RightBookWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 78%;
  @media (max-width: 600px){
    width: 100%;
  }

  @media (max-width: 360px) {
      
  }
`;
export const BookInfoWrap = styled.div`
  display: grid;
  width: 100%;
  height: 90px;
  grid-template-columns: repeat(8, 1fr);
  gap: 5px;
  background-color: white;
  border-radius: 10px;
  @media (max-width: 1080px){
    grid-template-columns: repeat(4, 1fr);
    height: 150px;
    margin-bottom: 30px;
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
    height: 160px;
  }
  @media (max-width: 370px) {
    height: 185px;
  }
`;
export const BookContainer = styled.div`
  display: flex;
  width: 100%;
`;
export const BookInfoBox = styled.div<BookInfoBoxProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: ${props => (props.index >= 4 ? props.theme.bgColor : props.theme.beigeColor)};
  border-radius: 7px;
  padding: 10px 5px;

`;
export const BookInfoTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.mainColor};
`;
export const BookInfoContent = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: black;
`;
export const BookIntro = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.beigeColor};
  width: 100%;
  height: 100%;
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px 40px;
`;
export const BookIntroContent = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #4c4c4c;
  line-height: 1.5;
  margin-top: 20px;
`;
export const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 45vw;
  min-height: 50vh;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: white;
  border-radius: 1rem;
`;