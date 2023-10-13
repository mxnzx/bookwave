import styled from "styled-components";

export const FeedContainer = styled.div`
  display: flex;
  margin-top: 60px;
`;
export const FeedLeft = styled.div`
  background-color: #ecf2f4;
  width: 50vw; 
`;
export const FeedCenter = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ecf2f4;
`;
export const FeedAdd = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 45px;
  padding-right: 50px;
  @media (max-width: 700px) {
    padding-right: 0px;
  }
`;
export const PlusButton = styled.div`
  display: flex;
  font-size: 13px;
  padding: 7px 12px;
  border-radius: 8px;
  margin-right: 10px;
  align-items: center;
  cursor: pointer;
  background-color: #064469;
  color: white;
  &:hover {
    color: #064469;
    background-color: transparent;
    border: 1px solid #064469;
  }
  @media (max-width: 1080px) {
    display: none;
  }
`;
export const PlusButton_second = styled.div`
  display: flex;
  font-size: 13px;
  padding: 7px 12px;
  border-radius: 8px;
  margin-right: 10px;
  align-items: center;
  cursor: pointer;
  background-color: #064469;
  color: white;
  &:hover {
    color: #064469;
    background-color: transparent;
    border: 1px solid #064469;
  }
  @media (min-width: 1080px) {
    display: none;
  }
`;
export const Feed = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  // 브라우저 별 스크롤바 숨기기
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge  */
  /* Chrome, Safari */
  &::-webkit-scrollbar {
    width: 0.5em;
    &::-webkit-scrollbar-track {
      background-color: transparent; /* 배경을 투명하게 설정 */
    }
  }
  @media (max-width: 700px) {
    width: 100vw;
  }
`;

export const RecodeBox = styled.div`
  margin: 10px;
  padding: 10px;
  width: 600px;
  height: 410px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 700px) {
    width: 100vw;
    margin-left: 5vw;
  }
`;

export const FeedRight = styled.div`
  background-color: #ecf2f4;
  width: 450px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center; 
  @media (max-width: 700px) {
    width: 100vw;
  }
`;
export const BBTI = styled.div`
  margin-top: 90px;
  margin-bottom: auto;
  width: 400px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1080px) {
    display: none;
  }
`;
export const BBTI_second = styled.div`
  margin-bottom: auto;
  width: 600px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 1080px) {
    display: none;
  }
  @media (max-width: 700px) {
    width: 95vw;
  }
`;
export const Footer = styled.div`
  margin-bottom: 20px;
  @media (max-width: 1080px) {
    display: none;
  }
`;
export const Spinner = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  font-size: 30px;
  gap: 20px;
`;
export const Right = styled.div`
  width: 100%;
  padding-right: 45px;
  display: flex;
  justify-content: flex-end; 
  @media (min-width: 1080px) {
    display: none;
  }
  @media (max-width: 700px) {
    padding-right: 0px;
  }
`;
