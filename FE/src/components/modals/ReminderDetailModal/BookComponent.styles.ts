import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  padding: 20px 0;
  @media (max-width: 1000px) {
    display: flex;
  }
`;
export const BookImage = styled.div`
  /* border: 1px solid #000; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  img {
    width: 70%;
    max-width: 70%;
    border-radius: 15px;
  }
  @media (max-width: 1000px) {
    width: 50%;
    height: 100%;
    margin-top: 0px;
  }
  img {
    width: 60%;
    height: 90%;
    max-height: 90%;
    border-radius: 15px;
  }
`;
export const CardUnderLine = styled.div`
  width: 70%;
  height: 3px;
  margin: 20px 0;
  background-color: #064469;
  @media (max-width: 1000px) {
    display: none;
  }
`;
export const BookInfo = styled.div`
  /* border: 1px solid #000; */
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 10px;
  @media (max-width: 1000px) {
    width: 50%;
  }
`;
export const TodayBookFirst = styled.h2`
  /* border: 1px solid #000; */
  display: flex;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  color: #064469;
  margin-bottom: 25px;
  @media (max-width: 1000px) {
    display: none;
  }
`;
export const TodayBookSecond = styled.h2`
  /* border: 1px solid #000; */
  font-size: 20px;
  font-weight: bold;
  color: #064469;
  margin-top: 10px;
  margin-bottom: 20px;
  @media (min-width: 1000px) {
    display: none;
  }
  @media (max-width: 700px) {
    font-size: 15px;
  }
  @media (max-width: 500px) {
    font-size: 12px;
    margin-bottom: 5px;
  }
`;
export const BookTitle = styled.h2`
  /* border: 1px solid #000; */
  font-size: 18px;
  padding: 0 15%;
  font-weight: bold;
  @media (max-width: 500px) {
    font-size: 15px;
    margin: 10px 0;
  }
`;
export const Author = styled.p`
  /* border: 1px solid #000; */
  font-size: 15px;
  margin-top: 20px;
  color: #555;
  @media (max-width: 500px) {
    font-size: 10px;
    margin-top: 5px;
  }
`;
