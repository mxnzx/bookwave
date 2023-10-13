import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-top: 60px;

  @media (max-width: 1250px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const MainLeft = styled.div`
  height: 840px;
  width: 540px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ecf2f4;
  @media (max-width: 1250px) {
    width: 100%;
  }
`;

export const LeftBox = styled.div`
  /* border: 1px solid #000; */
  height: 840px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 1250px) {
    width: 90%;
  }
`;

export const BookInfo = styled.div`
  /* border: 1px solid #000; */
  /* height: 300px; */
  width: 100%;
  padding: 10px;
`;

export const PhotoUpload = styled.div`
  /* border: 1px solid #000; */
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const StarSelect = styled.div`
  /* border: 1px solid #000; */
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const MainRight = styled.div`
  /* border: 1px solid #000; */
  height: 840px;
  /* width: 900px; */
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ecf2f4;
  @media (max-width: 1250px) {
    width: 100%;
  }
`;

export const RightTop = styled.div`
  /* border: 1px solid #000; */
  height: 100px;
  /* width: 900px; */
  /* width: 100%; */
  display: flex;
  align-items: center;
`;

export const RightBody = styled.div`
  /* border: 1px solid #000; */
  /* width: 900px; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const CalendarBox = styled.div`
  /* border: 1px solid #000; */
  height: 100px;
  /* width: 900px; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CalendarUnit = styled.div`
  /* border: 1px solid #000; */
  /* width: 350px; */
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  margin: 0 50px;
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
  font-family: "Pretendard-Regular";
  font-weight: bold;
  font-size: 20px;
  color: #064469;
`;

export const BodyBox = styled.div`
  font-family: "Pretendard-Regular";
  /* border: 1px solid #000; */
  border-radius: 10px;
  height: 590px;
  /* width: 800px; */
  width: 90%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const RightTitle = styled.div`
  input[type="text"] {
    /* border: 1px solid #ccc; */
    font-size: 20px;
    border-radius: 5px;
    /* width: 750px; */
    width: 50vw;
    height: 50px;
    padding: 20px;
    outline: none;
  }
  @media (max-width: 1250px) {
    input[type="text"] {
      width: 80vw;
    }
  }
`;

export const UnderLine = styled.div`
  border-bottom: 2px solid #9c9c9c;
  margin: 10px 0;
  /* width: 750px; */
  width: 50vw;
`;

export const RightContent = styled.div`
  input[type="text"],
  textarea {
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 20px;
    height: 350px;
    /* width: 750px; */
    width: 50vw;
    padding: 20px;
    outline: none;
  }
  @media (max-width: 1250px) {
    textarea {
      width: 80vw;
    }
  }
`;

export const Bottom = styled.div`
  /* border: 1px solid #000; */
  font-family: "Pretendard-Regular";
  /* width: 900px; */
  width: 100%;
  height: 150px;
  background-color: #ecf2f4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const DeleteButton = styled.div`
  font-family: "Pretendard-Regular";
  border: 10px solid #018abe;
  border-radius: 15px;
  border-width: 2px;
  padding: 10px 20px;
  width: 150px;
  height: 50px;
  font-size: 20px;
  color: #018abe;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  transition: transform 0.5s;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: red;
    border-color: #018abe;
  }
  @media (max-width: 700px) {
    width: 140px;
  }
`;

export const UpdateButton = styled.div`
  font-family: "Pretendard-Regular";
  border: 10px solid #018abe;
  border-radius: 15px;
  border-width: 2px;
  padding: 10px 20px;
  width: 150px;
  height: 50px;
  font-size: 20px;
  color: #018abe;
  margin-right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  transition: transform 0.5s;
  cursor: pointer;

  &:hover {
    color: white; /* 마우스를 올렸을 때의 글자색 */
    background-color: #018abe; /* 마우스를 올렸을 때의 배경색 */
  }
  @media (max-width: 700px) {
    width: 140px;
    margin-right: 20px;
  }
`;
