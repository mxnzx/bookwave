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
export const FeedWrap = styled.div`
  background-color: ${(props) => props.theme.mainColor};
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
export const FeedBox = styled.div<{bgColor?: string}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.bgColor || 'transparent'};
  transition: transform 0.3s ease-in-out;
  padding: 15px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

export const FeedContent = styled.span`
  font-size: 15px;
  font-weight: 500;
  @media (max-width: 1080px) {
    font-size: 15px;
  font-weight: 500;
  }
  @media (max-width: 740px) {
    font-size: 13px;
  font-weight: 500;
  }
  @media (max-width: 510px) {
  font-size: 11px;
  font-weight: 500;
  }
`;
