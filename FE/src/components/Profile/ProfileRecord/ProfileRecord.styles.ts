import styled from "styled-components";


export const FeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 1010px;
  margin-top: 4vh;
  @media (max-width: 1080px) {
    width: 699px;
  }
  @media (max-width: 740px) {
    width: 489px;
  }
  @media (max-width: 510px) {
    width: 348px;
  }
`;
export const FeedBox = styled.div`
  height: 330px;
  overflow: hidden;
  @media (max-width: 1080px) {
    height: 223px;
  }
  @media (max-width: 740px) {
    height: 153px;
  }
  @media (max-width: 510px) {
    height: 106px;
  }
`;
export const FeedImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;