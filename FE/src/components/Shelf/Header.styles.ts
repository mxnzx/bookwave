import styled from "styled-components";
import BackImage from "../../assets/Images/bookshelf.jpg";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow-y: auto;
  background-image: url(${BackImage});
  background-size: cover; 
  background-repeat: no-repeat; 
  background-position: center;
`;
export const Box = styled.div`
  width: 30vw;
  height: 50%;
  background-color: rgba(255, 255, 255, 0.5);
`;
export const TextMain = styled.div`
  height: 60%;
  font-weight: bold;
  font-size: 5vw;
  padding-left: 3vw;
  color: #064469;
`;
export const TextSub = styled.div`
  height: 40%;
  font-weight: bold;
  font-size: 1.5vw;
  padding-left: 3vw;
  padding-top: 1vh;
  color: black;
`;
