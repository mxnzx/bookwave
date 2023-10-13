import styled from "styled-components";

export const Container = styled.div`
  /* border: 1px solid red; */
  font-family: "Pretendard-Regular";
  /* height: 400px; */
  width: 100%;
  margin-top: 20px;
  position: relative;
  padding: 0 50px;

`;

export const BookImage = styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 250px;
  img {
    height: 190px;
    object-fit: cover;
    z-index: 1;
    cursor: pointer;
    box-shadow: 0px 9px 10px 0px gray;
  }

  &::before {
    content: "";
    position: absolute;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    margin-top: 18px;
    background-color: ${props => props.theme.bgColor};
    z-index: 0;
  }
`;

export const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

export const BookTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  letter-spacing: -1px;
`;

export const Author = styled.p`
  font-size: 18px;
  color: #555;
  margin-top: 5px;
`;
