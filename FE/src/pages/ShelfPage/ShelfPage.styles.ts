import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//헤더 밑 전체 Container
export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #d6e7ee;
  position: static;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-top: 120px;
  margin-bottom: 120px;
`;

export const ShelfInfo = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;

`;
export const Title = styled.span`
    font-size: 2rem;
    font-weight: 700;
    color: #064469;
`;
export const SubTitle = styled.span`
    font-size: 1.8rem;
    font-weight: 500;
`;
export const SubText = styled.span`
    margin-top: 10px;
    font-size: 20px;
`;

export const ShelfContainer = styled.div`
  height: 300px;
  /* background-color: white; */
  margin: 75px 10px 10px 10px;
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;
export const WishShelf = styled.div`
  height: 45%;
  width: 100%;
  background-color: #6bc7b2;
  border-radius: 0.5rem;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 9px 14px grey;

`;

export const ReadingShelf = styled(WishShelf)`
  background-color: #fffea9;
`;

export const DoneShelf = styled(WishShelf)`
  background-color: #ffb4bd;
`;

export const TitleWrapper = styled.div`
  width: 25%;
  @media (max-width: 860px) {
    width: 50%;
  }
`;

export const BookList = styled.div`
  width: 90%;
  position: absolute;
  height: 120px;
  display: flex;
  flex-direction: row;
  z-index: 100;
  height: 100%;
  bottom: -25px;
  justify-content: center;
  align-items: center;
  @media (max-width: 400px) {
    bottom: -15px;
  }
`;

export const TitleInfo = styled.div`
  padding: 4px;
  border-bottom: 9px solid #064469;
  /* padding-bottom: 4px; */
  letter-spacing: -3px;
  font-weight: 600;
  @media (max-width: 860px) {
    font-size: 1.5rem;
  }
`;

export const BookContainer = styled.div`
  margin: 3%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 0%;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
export const BookWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  justify-content: center;
  align-items: center;
`;
//책 이미지 div
export const BookImg = styled.div`
  img {
    box-shadow: 0px 10px 10px black;
    border-radius: 1rem;
    height: 135px;
    width: 90px;
    object-fit: cover;
  }
`;

//책 이름
export const TextStyle = styled.p`
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const BookTitle = styled(TextStyle)`
  font-size: 1rem;
  width: 100%;
  font-weight: 500;
  word-break: break-all;
  padding-top: 20px;
  /* 화면 폭이 768px 이하일 때 */
  @media (max-width: 768px) {
    font-size: 1rem; /* 작은 폰트 크기 설정 */
  }
`;
//책 작가
export const BookAuthor = styled(TextStyle)`
  padding-top: 1%;
  font-size: 1rem;
  color: black;
  /* 화면 폭이 768px 이하일 때 */
  @media (max-width: 768px) {
    font-size: 0.8rem; /* 작은 폰트 크기 설정 */
  }
`;

export const ShelfBookContainer = styled.div`
  height: 120px;
  width: 60%;
  right: 0px;
  background-color: blue;
  position: absolute;
  border-radius: 1rem;
`;

export const StyledSlider = styled(Slider)`
  width: 88%;

  @media (max-width: 860px) {
    width: 70%;
  }
  .slick-slide > div > div {
    width: 100%;
    display: flex !important;
    flex-direction: column;
    align-items: center;
  }
  .slick-dots {
    position: static;
  }
  .slick-list {
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 25px;
    opacity: 0.5;
    color: #a1a1a1;
  }
`;
