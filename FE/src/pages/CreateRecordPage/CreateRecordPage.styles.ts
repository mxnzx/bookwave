import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-top: 60px;
  background-color: #ecf2f4;
  @media (max-width: 1250px) {
    flex-direction: column;
    width: 100%;
  }
  @media (max-width: 700px) {
    margin-top: 0px;
  }
  @media (max-width: 500px) {
    margin-bottom: 70px;
  }
`;
export const MainLeft = styled.div`
  height: 765px;
  width: 540px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ecf2f4;
  padding-left: 30px;
  @media (max-width: 1250px) {
    width: 100%;
    padding-left: 10px;
  }
`;
export const LeftBox = styled.div`
  /* height: 840px; */
  width: 310px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  /* margin-top: 100px; */
  @media (max-width: 1250px) {
    width: 90%;
  }
`;
export const BookInfo = styled.div`
  width: 100%;
  padding: 10px;
`;
export const PhotoUpload = styled.div`
  /* border: 1px solid yellow; */
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  padding-top: 50px;
`;
export const StarSelect = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
`;
export const MainRight = styled.div`
  /* height: 840px; */
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1250px) {
    width: 100%;
  }
`;
export const RightTop = styled.div`
  /* height: 100px;
  display: flex;
  align-items: center; */
`;
export const RightBody = styled.div`
  margin-top: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 1250px) {
    margin-top: 0;
  }
`;
export const CalendarBox = styled.div`
  height: 100px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 700px) {
    padding: 50px;
    height: 200px;
    display: flex;
    flex-direction: column;
  }
`;
export const CalendarUnit = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  @media (max-width: 700px) {
    margin: 10px 0;
  }
`;
export const CalendarTop = styled.div`
  display: flex;
`;
export const CalenderIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;
export const CalendarText = styled.h2`
  font-weight: bold;
  font-size: 20px;
  color: #064469;
`;
export const BodyBox = styled.div`
  /* border: 1px solid red; */
  border-radius: 10px;
  height: 600px;
  width: 90%;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 700px) {
    width: 75%;
    margin-top: 20px;
  }
`;
export const RightTitle = styled.div`
  /* border: 1px solid blue; */
  margin-top: 22px;
  input[type="text"] {
    font-size: 20px;
    border-radius: 5px;
    width: 50vw;
    height: 50px;
    padding: 20px;
    outline: none;
    border: none;
  }
  @media (max-width: 1250px) {
    input[type="text"] {
      width: 75vw;
    }
  }
`;
export const UnderLine = styled.div`
  border-bottom: 2px solid #9c9c9c;
  margin: 10px 0;
  width: 50vw;
`;
export const RightContent = styled.div`
  /* border: 1px solid green; */
  input[type="text"],
  textarea {
    border-radius: 5px;
    font-size: 20px;
    height: 350px;
    width: 50vw;
    padding: 20px;
    outline: none;
    border: none;
    resize: none;
    font-family: 'Pretendard-Regular';
  }
  @media (max-width: 1250px) {
    textarea {
      width: 75vw;
    }
  }
`;
export const Bottom = styled.div`
  width: 100%;
  height: 85px;
  background-color: #ecf2f4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const Button = styled.div`
  border: 10px solid #018abe;
  border-radius: 15px;
  border-width: 2px;
  padding: 10px 20px;
  width: 150px;
  height: 50px;
  font-size: 20px;
  color: #018abe;
  margin-right: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  transition: transform 0.5s;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #018abe;
  }
  @media (max-width: 700px) {
    margin-top: 15px;
    margin-right: 80px;
  }
  @media (max-width: 500px) {
    width: 100px;
    height: 40px;
    margin-top: 0;
    margin-right: 50px;
  }
`;
